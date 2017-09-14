import Vue from 'vue'
import Vuex from "vuex"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userToken : (function(){
      if(localStorage.getItem('userToken')){
        return JSON.parse(localStorage.getItem("userToken"))
      }
      return '';
    })(),
    userInfo :'',
    ticket_number: '',
    user_card_id: '',
    tips: {
      show: false,
      text: ''
    },
    order_id:(function(){
      if(localStorage.getItem('order_id')){
        return localStorage.getItem("order_id")
      }
      return '';
    })()
  },
  mutations: {
    setName (state) {

    },
    show_tips (state, args){
      state.tips.show = true;
      state.tips.text = args;
      var s = 2;
      setTimeout(() => state.tips.show = false, s * 1000)
    },
    set_user_info(state, val){
      state.userInfo = val || '';
      val = val || '' ;
      localStorage.setItem("userInfo", JSON.stringify(val))
    },
    set_user_Token(state, val){
      state.userToken = val || '';
      val = val || '' ;
      localStorage.setItem("userToken", JSON.stringify(val))
    },
    set_order_id(state, val){
      state.order_id = val || '';
      val = val || '' ;
      localStorage.setItem("order_id", val)
    }
  },
  actions :{
    showTips({commit}, val){
      commit('show_tips', val);
    },
    setUserInfo({commit},val){
      commit('set_user_info',val);
    },
    setUserToken({commit},val){
      commit('set_user_Token',val);
    },
    setOrderId({commit},val){
      commit('set_order_id',val);
    }
  }
})
