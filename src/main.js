import Vue from 'vue'
import App from './App'
import router from './router'
import axios from '@/axios/axiosRequire'
import store from '@/store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.use(ElementUI)
new Vue({
  el: '#app',
  router,
  store,
  //template: '<App/>',
  //components: { App }
  render : h=>h(App)
});
