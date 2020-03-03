<template>
  <div class="pl-6 -ml-6 relative token-default">
    <template v-if="label">
      <span class="token-key">{{ JSON.stringify(label) + '' }}</span
      >{{ '":&nbsp;' }}
    </template>

    <template v-if="type === 'object'">
      <span>{</span>
      <JsonValueChildren :children="Object.entries(value)" />
      <span>}</span>
    </template>

    <template v-if="type === 'array'">
      <span>[</span>
      <JsonValueChildren :children="value" is-array />
      <span>]</span>
    </template>

    <template v-else-if="type === 'string'">
      <span class="token-string">{{ JSON.stringify(value) }}</span>
    </template>

    <template v-else-if="type === 'number'">
      <span class="token-number">{{ value }}</span>
    </template>

    <template v-else-if="type === 'boolean'">
      <span class="token-boolean">{{ value }}</span>
    </template>

    <template v-else-if="type === 'null'">
      <span class="token-null">null</span>
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
