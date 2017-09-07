import Vue from 'vue'
import App from './App'
import router from './router'
import axios from '@/axios/axiosRequire'
import store from '@/store/index'

Vue.config.productionTip = false
Vue.prototype.$axios = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});