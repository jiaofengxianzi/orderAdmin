import axios from 'axios'
import store from '@/store'
import router from '@/router'

//超时时间
axios.defaults.timeout = 5000;
//axios.defaults.baseURL = '//192.168.30.215:3000';
//axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.baseURL = 'http://192.168.50.10:11080/api/v1/';
// http request 拦截器
axios.interceptors.request.use(
    config =>{
      if(store.state.userToken.access_token){//store.state.token判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.Authorization = `Bearer ${store.state.userToken.access_token}`;
      }
      return config ;
    },
    err =>{
      return Promise.reject(err)
    }
);
// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:// 返回 401 清除token信息并跳转到登录页面
            store.dispatch('setUserToken', '');
            router.replace({
              path: 'login',
              query: {redirect: router.currentRoute.fullPath}
            })
      }
    }
    return Promise.reject(error.response.data)   // 返回接口返回的错误信息
  });
export default axios;
