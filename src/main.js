import Vue from 'vue'
import App from './App.vue'

import paiui from './paiui/index'
paiui.install(Vue);

new Vue({
  el: '#app',
  render: h => h(App)
})
