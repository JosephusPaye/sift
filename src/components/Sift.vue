<template>
  <div :class="['theme-' + theme]">
    <div class="flex">
      <button
        class="px-4 py-1"
        :class="[
          view === 'interactive' ? 'bg-blue-600 text-white' : 'bg-gray-300',
        ]"
        @click="$emit('update:view', 'interactive')"
      >
        Interactive
      </button>
      <button
        class="px-4 py-1 ml-px"
        :class="[view === 'plain' ? 'bg-blue-600 text-white' : 'bg-gray-300']"
        @click="$emit('update:view', 'plain')"
      >
        Plain
      </button>
      <button
        class="ml-auto px-4 py-1"
        :class="[
          theme === 'light' ? 'bg-blue-600 text-white' : 'bg-gray-300',
          view === 'plain' ? 'opacity-50' : '',
        ]"
        :disabled="view === 'plain'"
        @click="$emit('update:theme', 'light')"
      >
        Light
      </button>
      <button
        class="px-4 py-1 ml-px"
        :class="[
          theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-gray-300',
          view === 'plain' ? 'opacity-50' : '',
        ]"
        @click="$emit('update:theme', 'dark')"
      >
        Dark
      </button>
    </div>
    <div class="mt-6">
      <div
        v-if="view === 'interactive'"
        class="font-mono text-sm py-5 pl-8 pr-6 document-background"
      >
        <JsonValue :value="json" is-last />
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
import JsonValue from './JsonValue.vue';

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
      required: true,
    },
    theme: {
      type: String,
      default: 'dark',
    },
  },
};
</script>

<style lang="scss">
.theme-light {
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
