<template>
  <div class="login">
    <div class="loginHead">
      <div class="loginCon">
        <!--<img src="123.png" alt="">-->
        <div>远程预约考试系统</div>
      </div>
    </div>
    <div class="loginBox">
      <div class="title">账号登录</div>
      <input type="text" value="" v-model="ticket_number">
      <input type="password" value="" v-model="user_card_id">
      <input type="button" v-on:click="doLogin" value="登录">
    </div>
  </div>
</template>

<script>

//import axios from 'axios'
//import store from '@/store/index'
export default {
  name: 'login',
  data () {
    return {
      msg: '远程预约考试系统',
      ticket_number : 'xd',
      user_card_id : '123456',
    }
  },
  methods : {
      doLogin : function(){

        var vm = this;

        vm.$axios.post('/third_login/user_card',{ticket_number:this.ticket_number,user_card_id:this.user_card_id})
          .then(function (response) {
            var data = response.data;
            if(data.ret === 0){
              vm.$store.dispatch('setUserToken', data.data);
              vm.$router.push('/common')
            }else{
                alert(data.msg)
            }
          })
          .catch(function (response) {
            console.log(response);
          });
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .loginHead{
    height: 66px;
    background: #fff;
  }
  .loginCon{
    width: 1200px;
    margin: 0 auto;
  }
  .loginBox{
    width: 392px;
    height: 462px;
    position: absolute;
    background: #fff;
    left: 600px;
    right: 0px;
    top: 25px;
    bottom: 0;
    margin: auto;
    box-shadow: 1px 1px 2px 0 #e5e5e5;
    border: 1px solid #e5e5e5;
    z-index: 99;
  }
  .loginBox .title{
    width: 100%;
    text-align: center;
    font-size: 24px;
    color: rgba(0,0,0,.7);
    margin: 40px 0;
  }

</style>
