<template>
  <div class="pl-6 -ml-6 relative token-default">
    <button
      class="block-arrow w-3 h-3 background-cover absolute left-0 top-0 bg-center mt-1 ml-2"
      v-if="type === 'array' || type === 'object'"
      :style="{ transform: `rotate(${collapsed ? '-90deg' : '0'})` }"
      @click="collapsed = !collapsed"
    ></button>

    <template v-if="label">
      <span class="token-key">{{ JSON.stringify(label) + '' }}</span
      >{{ '":&nbsp;' }}
    </template>

    <template v-if="type === 'object'">
      <span>{</span>
      <JsonValueChildren
        v-show="!collapsed"
        :children="Object.entries(value)"
      />
      <span v-show="collapsed" class="px-1">&hellip;</span>
      <span>}</span>
    </template>

    <template v-else-if="type === 'array'">
      <span>[</span>
      <JsonValueChildren v-show="!collapsed" :children="value" is-array />
      <span v-show="collapsed" class="px-1">&hellip;</span>
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

    <span v-if="collapsed" class="token-comment whitespace-pre pl-2 select-none"
      >// {{ childrenCount }}</span
    >
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

  data() {
    return {
      collapsed: false,
    };
  },

  computed: {
    type() {
      return type(this.value);
    },

    childrenCount() {
      if (this.type === 'array') {
        const count = this.value.length;
        return count + ' ' + this.pluralize('item', count);
      } else if (this.type === 'object') {
        const count = Object.entries(this.value).length;
        return count + ' ' + this.pluralize('item', count);
      }
      return undefined;
    },
  },

  methods: {
    pluralize(word, count) {
      return count === 1 ? word : word + 's';
    },
  },
};
</script>
