import 'focus-visible';
import * as emojicon from 'emojicon';
import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

emojicon.set('🔎');

new Vue({
  render: h => h(App),
}).$mount('#app');
