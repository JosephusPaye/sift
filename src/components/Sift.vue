<template>
  <div class="border border-gray-300">
    <div class="flex p-3">
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
    </div>
    <div
      v-if="view === 'interactive'"
      class="font-mono text-sm p-3 bg-gray-200"
    >
      <JsonValue :value="json" is-last />
    </div>
    <pre
      v-else
      class="bg-gray-200 p-3 overflow-y-auto overflow-x-auto text-sm"
      v-text="JSON.stringify(json, null, '  ')"
    ></pre>
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
      type: Object,
      required: true,
    },
    view: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>
