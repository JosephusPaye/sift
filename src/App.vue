<template>
  <div id="app" class="p-3 md:p-6 max-w-4xl mx-auto">
    <div class="flex mb-6">
      <button
        class="px-4 py-1"
        :class="[
          view === 'interactive' ? 'bg-blue-600 text-white' : 'bg-gray-300',
        ]"
        @click="view = 'interactive'"
      >
        Interactive
      </button>
      <button
        class="px-4 py-1 ml-px"
        :class="[view === 'plain' ? 'bg-blue-600 text-white' : 'bg-gray-300']"
        @click="view = 'plain'"
      >
        Plain
      </button>
      <button
        class="ml-auto px-4 py-1"
        :class="[
          theme === 'light' ? 'bg-blue-600 text-white' : 'bg-gray-300',
          view === 'plain' ? 'opacity-50' : '',
        ]"
        :disabled="view === 'plain'"
        @click="theme = 'light'"
      >
        Light
      </button>
      <button
        class="px-4 py-1 ml-px"
        :class="[
          theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-gray-300',
          view === 'plain' ? 'opacity-50' : '',
        ]"
        @click="theme = 'dark'"
      >
        Dark
      </button>
    </div>
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
