<template>
  <div id="app" class="h-screen p-3 md:p-6 max-w-6xl mx-auto grid gap-6">
    <div class="flex min-w-0">
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
        class="ml-3 px-4 py-1"
        :class="[theme === 'light' ? 'bg-blue-600 text-white' : 'bg-gray-300']"
        @click="theme = 'light'"
      >
        Light
      </button>
      <button
        class="px-4 py-1 ml-px"
        :class="[theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-gray-300']"
        @click="theme = 'dark'"
      >
        Dark
      </button>

      <button
        class="px-4 py-1 ml-auto bg-gray-300"
        :class="[jsonInputInvalid ? 'opacity-50' : '']"
        @click="onJsonButtonClick()"
        :disabled="jsonInputInvalid"
      >
        {{ showJsonInput ? 'Submit data' : 'Change data' }}
      </button>
    </div>
    <div class="min-h-0 min-w-0">
      <Sift
        v-if="!showJsonInput"
        :json="json"
        :view.sync="view"
        :theme.sync="theme"
      />
      <textarea
        v-else
        class="text-sm w-full h-full p-3 font-mono border-2 bg-gray-100  whitespace-pre resize-none focus:outline-none"
        :class="[
          jsonInputInvalid
            ? 'border-red-500 focus:border-red-500'
            : 'border-gray-500 focus:border-blue-500',
        ]"
        placeholder="Enter JSON data"
        spellcheck="false"
        rows="12"
        ref="input"
        v-model="jsonInput"
      ></textarea>
    </div>

    <div class="mx-auto">
      <div class="text-center text-gray-500 text-sm">
        Created by
        <a
          class="underline hover:text-gray-800 focus:text-gray-800"
          href="https://twitter.com/JosephusPaye"
          target="_blank"
          rel="noopener"
          >Josephus Paye II</a
        >
        for
        <a
          class="underline hover:text-gray-800 focus:text-gray-800"
          href="https://twitter.com/JosephusPaye/status/1214853295023411200"
          target="_blank"
          rel="noopener"
          >#CreateWeekly</a
        >. View on
        <a
          class="underline hover:text-gray-00 focus:text-gray-800"
          href="https://github.com/JosephusPaye/sift"
          target="_blank"
          rel="noopener"
          >Github</a
        >.
      </div>
    </div>
  </div>
</template>

<script>
import debounce from 'debounce';
import Sift from './components/Sift.vue';

const debouncedParseInput = debounce((input, callback) => {
  try {
    callback({ valid: true, parsed: JSON.parse(input) });
  } catch (err) {
    callback({ valid: false });
  }
}, 300);

export default {
  name: 'App',

  components: {
    Sift,
  },

  data() {
    const nested = {
      typeNull: null,
      typeString: `To provide a more reasonable default minimum size for grid items, this specification defines that the auto value of "min-width" / "min-height" also applies an \nautomatic minimum size in the specified axis to grid items whose overflow is visible. (The effect is analogous to the automatic minimum size imposed on flex items.)`,
      typeNumber: 3.14,
      typePositiveBoolean: true,
      typeNegativeBoolean: false,
    };
    const typeSimpleArray = [
      `To provide a more reasonable default minimum size for grid items, this specification defines that the auto value of "min-width" / "min-height" also applies an \nautomatic minimum size in the specified axis to grid items whose overflow is visible. (The effect is analogous to the automatic minimum size imposed on flex items.)`,
      1,
      true,
      3.14,
      null,
      false,
    ];
    const json = [
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
    ];
    return {
      view: 'interactive',
      theme: 'light',
      jsonInput: JSON.stringify(json, null, '  '),
      jsonInputParsed: {},
      jsonInputInvalid: false,
      showJsonInput: false,
      json,
    };
  },

  watch: {
    showJsonInput(show) {
      if (show) {
        this.$nextTick(() => {
          this.$refs.input.focus();
        });
      }
    },

    jsonInput: {
      handler(input) {
        this.parseInput(input);
      },
      immediate: true,
    },
  },

  methods: {
    parseInput(input) {
      if (input.trim().length === 0) {
        return;
      }

      debouncedParseInput(input, ({ valid, parsed }) => {
        if (!valid) {
          this.jsonInputInvalid = true;
        } else {
          this.jsonInputParsed = parsed;
          this.jsonInputInvalid = false;
        }
      });
    },

    onJsonButtonClick() {
      if (!this.showJsonInput) {
        this.showJsonInput = true;
      } else if (!this.jsonInputInvalid) {
        this.json = this.jsonInputParsed;
        this.showJsonInput = false;
      }
    },
  },
};
</script>

<style>
@import './assets/tailwind.css';

body {
  color: rgba(0, 0, 0, 0.87);
  @apply text-base;
}

#app {
  grid-template-rows: 36px 1fr;
}

.js-focus-visible :focus:not(.focus-visible) {
  outline: none;
}
</style>
