<template>
  <div>{{ JSON.stringify(json, null, '  ') }}</div>
</template>

<script>
export default {
  name: 'Sift',
  props: {
    json: Object,
  },
};
</script>
