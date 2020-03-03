<template>
  <div class="pl-6 ml-1 border-l border-dotted border-gray-500">
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
