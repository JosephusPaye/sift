<template>
  <div :class="['flex flex-col w-full h-full', 'theme-' + theme]">
    <div class="document-search p-2 w-full flex">
      <input
        type="text"
        placeholder="Filter..."
        spellcheck="false"
        class="document-search-input w-full px-3 py-1 border border-transparent focus:outline-none"
        :class="[
          filterInvalid ? 'invalid' : '',
          view === 'plain' ? 'opacity-50' : '',
        ]"
        :disabled="view === 'plain'"
        v-model="filter"
      />
      <button
        class="flex document-help-button ml-1 px-2"
        title="Filter help"
        :class="[
          view !== 'plain' && showHelp ? 'is-open' : '',
          view === 'plain' ? 'opacity-50 cursor-default' : '',
        ]"
        :disabled="view === 'plain'"
        @click="showHelp = !showHelp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-help-circle"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      </button>
    </div>
    <div
      class="py-4 px-5 document-help token-default border-b"
      v-if="view !== 'plain' && showHelp"
    >
      <p>
        Enter a filter in the form:
        <code>&lt;path&gt; &lt;query&gt;</code>. Note the separating space,
        which is required even if <code>&lt;path&gt;</code> is empty.
      </p>
      <ul class="list-disc mt-2 ml-3">
        <li class="ml-4 pl-2">
          <code>&lt;path&gt;</code> can be any valid JS property access, e.g.
          <code>.data.persons[0].age</code>. For array indices, you can use
          <code>*</code> to match all items. <code>&lt;path&gt;</code> can be
          empty, in which case you'd have a space followed by
          <code>&lt;query&gt;</code>.
        </li>
        <li class="ml-4 pl-2 mt-1">
          <code>&lt;query&gt;</code> will filter the data to show only items
          whose value include the query.
        </li>
      </ul>
    </div>
    <div
      v-if="view === 'interactive'"
      class="flex-grow overflow-x-auto overflow-y-auto"
    >
      <div
        class="font-mono text-sm py-5 pl-8 pr-6 w-full min-h-full document-background"
      >
        <JsonValue v-if="hasResults" :value="jsonFiltered" is-last />
        <div v-else class="token-default font-sans -ml-2">
          No matching values
        </div>
      </div>
    </div>
    <pre
      v-else
      class="flex-grow font-mono text-sm p-5 document-background token-default overflow-x-auto overflow-y-auto"
      v-text="JSON.stringify(json, null, '  ')"
    ></pre>
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
      showHelp: false,
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

  .document-help-button {
    color: rgba(0, 0, 0, 0.54);

    &:hover,
    &:focus {
      color: rgba(0, 0, 0, 0.87);
    }

    &.is-open {
      @apply text-blue-500;
    }
  }

  .document-help {
    @apply border-gray-400;

    code {
      color: #e53e3e;
    }
  }

  .document-help,
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

  .document-help-button {
    color: #d4d4d4;

    &:hover,
    &:focus {
      color: #ffffff;
    }

    &.is-open {
      @apply text-blue-400;
    }
  }

  .document-help {
    @apply border-black;

    code {
      color: #ce9178;
    }
  }

  .document-help,
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
