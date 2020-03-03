<template>
  <div id="app" class="p-3 md:p-6 max-w-4xl mx-auto">
    <Sift :json="json" :view.sync="view" :theme.sync="theme" />
  </div>
</template>

<script>
import Sift from './components/Sift.vue';

export default {
  name: 'App',
  components: {
    Sift,
  },
  data() {
    const nested = {
      typeNull: null,
      typeString: 'ok boomer',
      typeNumber: 3.14,
      typePositiveBoolean: true,
      typeNegativeBoolean: false,
    };
    const typeSimpleArray = ['ok boomer', 1, true, 3.14, null, false];
    return {
      view: 'interactive',
      theme: 'light',
      json: [
        {
          ...nested,
          nested,
          typeSimpleArray,
          typeComplexArray: [
            {
              ...nested,
              nested,
              typeSimpleArray,
            },
            {
              ...nested,
              nested,
              typeSimpleArray,
            },
          ],
        },
      ],
    };
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
