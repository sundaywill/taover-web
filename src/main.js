// 兼容老版，充值跳转
if (window.location.href.indexOf('#/recharge') > 0)
  window.location.replace('http://m.taover.com/Recharge/index')

import Vue from 'vue'
// Vue Configuration
Vue.config.devtools = true//process.env.NODE_ENV !== 'production'

// Vue Router and Vuex Store Configuration
import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'
sync(store, router)
window.router = router
store.commit('AUTH')

// Vue Resource Http Configuration
import http from './http'

// Startup Vue
import App from './App.vue'
const app = new Vue({
  router,
  store,
  http,
  ...App
})

// Startup The App
app.$mount('#app')
