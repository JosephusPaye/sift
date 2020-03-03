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
        class="font-mono text-sm p-5 document-background"
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
}

.theme-dark {
  .document-background {
    background-color: rgb(30, 30, 30);
  }

  .block-border {
    @apply border-dotted border-gray-700;
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
}
</style>
