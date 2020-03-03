<template>
  <div class="pl-6 -ml-6 relative">
    <template v-if="label">
      {{ '"' }}<span class="text-black">{{ label }}</span
      >{{ '":&nbsp;' }}
    </template>

    <template v-if="type === 'object'">
      <span class="font-bold">{</span>
      <JsonValueChildren :children="Object.entries(value)" />
      <span class="font-bold">}</span>
    </template>

    <template v-if="type === 'array'">
      <span class="font-bold">[</span>
      <JsonValueChildren :children="value" is-array />
      <span class="font-bold">]</span>
    </template>

    <template v-else-if="type === 'string'">
      <span class="text-green-700">{{ JSON.stringify(value) }}</span>
    </template>

    <template v-else-if="type === 'number'">
      <span class="text-blue-700 font-bold">{{ value }}</span>
    </template>

    <template v-else-if="type === 'boolean'">
      <span class="text-blue-700 font-bold">{{ value }}</span>
    </template>

    <template v-else-if="type === 'null'">
      <span class="text-blue-700 font-bold">null</span>
    </template>

    <span v-if="!isLast">,</span>
  </div>
</template>

<script>
import { type } from './json';
import JsonValueChildren from './JsonValueChildren.vue';

export default {
  name: 'JsonValue',
  components: {
    JsonValueChildren,
  },
  props: {
    label: String,
    value: null,
    isLast: Boolean,
  },
  computed: {
    type() {
      return type(this.value);
    },
  },
};
</script>
