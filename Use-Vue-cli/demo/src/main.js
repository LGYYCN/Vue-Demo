import Vue from 'vue'
import App from './App.vue'
import Test from './Test.vue'
import Movies from './Movies.vue'
import 'babel-polyfill'

new Vue({
  el: '#app',
  // render: h => h(App),
  ...Movies,
})
