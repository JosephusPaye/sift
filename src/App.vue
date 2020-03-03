<template>
  <div id="app">
    <Sift :json="$options" />
  </div>
</template>

<script>
import Sift from './components/Sift.vue';

export default {
  name: 'App',
  components: {
    Sift,
  },
};
</script>

<style>
@import './assets/tailwind.css';

body {
  color: rgba(0, 0, 0, 0.87);
  @apply text-base;
}

.js-focus-visible :focus:not(.focus-visible) {
  outline: none;
}
</style>
