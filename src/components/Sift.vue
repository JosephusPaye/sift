<template>
  <div :class="['flex flex-col w-full h-full', 'theme-' + theme]">
    <div class="document-search p-2 w-full">
      <input
        class="document-search-input w-full px-3 py-1 border border-transparent focus:outline-none"
        :class="[filterInvalid ? 'invalid' : '']"
        type="text"
        placeholder="Filter or navigate..."
        spellcheck="false"
        v-model="filter"
      />
    </div>
    <div class="flex-grow overflow-x-auto overflow-y-auto">
      <div
        v-if="view === 'interactive'"
        class="font-mono text-sm py-5 pl-8 pr-6 min-h-full document-background"
      >
        <JsonValue v-if="hasResults" :value="jsonFiltered" is-last />
        <div v-else class="token-default font-sans -ml-2">
          No matching values
        </div>
      </div>
      <pre
        v-else
        class="bg-gray-200 p-5 overflow-y-auto overflow-x-auto text-sm"
        v-text="JSON.stringify(json, null, '  ')"
      ></pre>
    </div>
  </div>
</template>

<script>
import debounce from 'debounce';
import JsonValue from './JsonValue.vue';
import { filterByPathAndQuery } from '../json';

const debouncedFilter = debounce((data, filter, callback) => {
  callback(filterByPathAndQuery(data, filter));
}, 300);

export default {
  name: 'Sift',

  components: {
    JsonValue,
  },

  props: {
    json: {
      type: [Object, Array],
      required: true,
    },
    view: {
      type: String,
      default: 'interactive',
    },
    theme: {
      type: String,
      default: 'dark',
    },
  },

  data() {
    return {
      filter: '',
      filterInvalid: false,
      jsonFiltered: this.json,
      hasResults: true,
    };
  },

  watch: {
    filter() {
      this.performFilter(this.json, this.filter);
    },

    json() {
      this.performFilter(this.json, this.filter);
    },
  },

  methods: {
    performFilter(data, filter) {
      if (filter.trim().length === 0) {
        this.filterInvalid = false;
        this.jsonFiltered = this.json;
        this.hasResults = true;
        return;
      }

      debouncedFilter(data, filter, ({ valid, result }) => {
        if (valid) {
          this.filterInvalid = false;
          this.jsonFiltered = result;
          this.hasResults = result !== undefined;
        } else {
          this.filterInvalid = true;
        }
      });
    },
  },
};
</script>

<style lang="scss">
.theme-light {
  .document-search {
    @apply bg-gray-300;
  }

  .document-search-input {
    @apply bg-white;

    &.invalid {
      @apply border-red-600;
    }

    &:focus:not(.invalid) {
      @apply border-blue-500;
    }
  }

  .document-background {
    @apply bg-gray-200;
  }

  .block-border {
    @apply border-dotted border-gray-500;
  }

  .block-arrow {
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="rgba(0,0,0,0.15)"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');

    &:hover,
    &:focus.focus-visible {
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="rgba(0,0,0,0.4)"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');
    }

    &:active {
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="rgba(0,0,0,0.5)"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');
    }
  }

  .token-default {
    color: #000;
  }

  .token-null,
  .token-boolean {
    color: #0000ff;
  }

  .token-string {
    color: #a31515;
  }

  .token-number {
    color: #09885a;
  }

  .token-key {
    color: #0451a5;
  }

  .token-comment {
    color: #008000;
  }
}

.theme-dark {
  .document-search {
    background-color: rgb(10, 10, 10);
  }

  .document-search-input {
    background-color: rgb(30, 30, 30);
    color: white;

    &.invalid {
      @apply border-red-600;
    }

    &:focus:not(.invalid) {
      @apply border-blue-500;
    }
  }

  .document-background {
    background-color: rgb(30, 30, 30);
  }

  .block-border {
    @apply border-dotted border-gray-700;
  }

  .block-arrow {
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="rgba(255,255,255,0.2)"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');

    &:hover,
    &:focus.focus-visible {
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="rgba(255,255,255,0.5)"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');
    }

    &:active {
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="rgba(255,255,255,0.65)"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');
    }
  }

  .token-default {
    color: #d4d4d4;
  }

  .token-null,
  .token-boolean {
    color: #569cd6;
  }

  .token-string {
    color: #ce9178;
  }

  .token-number {
    color: #b5cea8;
  }

  .token-key {
    color: #9cdcfe;
  }

  .token-comment {
    color: #6a9955;
  }
}
</style>
