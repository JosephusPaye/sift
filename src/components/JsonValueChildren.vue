<template>
  <div
    v-if="children.length > 0"
    class="pl-6 border-l block-border"
    style="margin-left: 2px"
  >
    <template v-if="isArray">
      <JsonValue
        :key="index"
        :value="child"
        :is-last="index === children.length - 1"
        v-for="(child, index) in children"
      />
    </template>
    <JsonValue
      :key="child[0]"
      :label="child[0]"
      :value="child[1]"
      :is-last="index === children.length - 1"
      v-for="(child, index) in children"
      v-else
    />
  </div>
</template>

<script>
export default {
  name: 'JsonValueChildren',
  components: {
    JsonValue: () => import('./JsonValue.vue'),
  },
  props: {
    isArray: Boolean,
    children: Array,
  },
};
</script>
