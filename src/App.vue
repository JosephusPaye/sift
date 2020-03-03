<template>
  <div id="app" class="p-4 max-w-4xl mx-auto">
    <Sift :json="json" :view.sync="view" />
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
      typeString: 'string',
      typeNumber: 3.14,
      typePositiveBoolean: true,
      typeNegativeBoolean: false,
    };
    const typeSimpleArray = ['ok boomer', 1, true, 3.14, null, false];
    return {
      view: 'interactive',
      json: {
        ...nested,
        nested,
        typeSimpleArray,
        typeSimpleArray: [
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
