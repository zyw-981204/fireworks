// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import axios from 'axios'
import ElementUI from 'element-ui'

import store from './store/store.js'
import router from './router/index.js'

import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$axios = axios

import './assets/css/reset.css'
import './assets/css/style.css'
import './assets/css/index.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
