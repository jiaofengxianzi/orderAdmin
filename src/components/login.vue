<template>
  <div class="login">
    <div class="loginHead">
      <div class="loginCon">
        <div class="logo">
          <img src="../../src/assets/logo.jpg" alt="暨南大学">
        </div>
        <div class="adminTitle" >
          <img src="../../src/assets/computer.jpg" alt="">
          远程预约报考系统
        </div>
      </div>

    </div>
    <div class="main">
      <div class="loginBg"></div>
      <div class="loginBox">
        <div class="title">账号登录</div>
        <input type="text" value="" v-model="ticket_number" placeholder="请输入你的准考证">
        <input type="text" value="" v-model="user_card_id" placeholder="请输入你的身份证">
        <button  v-on:click="doLogin">登录</button>
        <p>提示信息：</p>
        <p>1.若考生身份证和准考证核对无误，多次登录无效请联系：</p>
        <p>0574—xxxxxxxx</p>
        <p>2.身份证与准考证应匹配，如多个准考证于其中任意一个准考证匹配即可。</p>
      </div>
    </div>
    <div class="Lfooter">
      <p>地址：中国 广州市 黄埔大道西601号 邮编：510632</p>
      <p>官网：http://www.jnu.edu.cn</p>
      <p>版权所有©暨南大学 ICP备案号：粤ICP备 12087612号粤公网安备 44010602001461</p>
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
      ticket_number : '',
      user_card_id : ''
    }
  },
  methods : {
      doLogin : function(){

        var vm = this;
        if(vm.ticket_number==''){
          vm.$message.error('请输入你的准考证');
          return ;
        }else if(vm.user_card_id == ''){
          vm.$message.error('请输入你的身份证');
          return ;
        }
        vm.$axios.post('third_login/user_card',{ticket_number:this.ticket_number,user_card_id:this.user_card_id})
          .then(function (response) {
            var data = response.data;
            if(data.ret === 0){
              vm.$store.dispatch('setUserToken', data.data);
              var prams = decodeURIComponent(vm.$route.query.redirect || '/');
              if(prams == '/'){
                vm.$router.push('/common')
              }else{
                vm.$router.push(prams)
              }

            }else{
              vm.$message.error(data.res_info);
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
  .login{
    height: 100%;
  }
  .loginHead{
    height: 80px;
    background: #fff;
  }
  .loginCon{
    width: 1200px;
    margin: 0 auto;
  }
  .loginCon .logo{
    display: inline-block;
    margin-top: 10px;
    float: left;
  }
  .loginCon .adminTitle{
    display: inline-block;
    margin: 27px 30px;
    font-size: 27px;
  }
  .loginCon .adminTitle img{
    margin-bottom: -6px;
  }
  .loginBox{
    position: absolute;
    left: 650px;
    right: 0px;
    top: 113px;
    bottom: 0;
    margin: 0 auto;
    border: 1px solid #e5e5e5;
    z-index: 99;
    border-radius: 5px;
    background-color: rgb(252, 252, 252);
    box-shadow: 0px 0px 30px 0px rgba(15, 76, 83, 0.14);
    width: 532px;
    height: 554px;
    text-align: center;
  }
  .loginBox .title{
    width: 100%;
    text-align: center;
    font-size: 24px;
    color: rgba(0,0,0,.7);
    margin: 40px 0 20px;
  }
  .loginBox input{
    border-style: solid;
    border-width: 1px;
    border-color: rgb(212, 212, 212);
    border-radius: 4px;
    background-color: rgb(252, 252, 252);
    width: 408px;
    height: 58px;
    display: inline-block;
    margin-bottom: 16px;
    font-size: 19px;
    text-indent:20px;
  }
  .loginBox button{
    display: block;
    margin:10px auto 42px;
    border-radius: 4px;
    background-color: rgb(18, 91, 100);
    width: 120px;
    height: 48px;
    border: none;
    color: #fff;
    font-size: 19px;
    cursor: pointer;
  }
  .loginBox p{
    width: 412px;
    text-align: left;
    margin: 3px auto;
    font-size: 14px;
    color: #35322e;
    line-height: 1.5;
  }
  .loginBox input:active, input:focus{
    border:1px solid #125b64;
    border-radius: 4px;
    background-color: rgb(252, 252, 252);
    outline:none;
    box-shadow: 0px 0px 5px 0px #125b64;
    transition: all .2s linear;
  }

  .main{
    width: 100%;
    height:790px;
    position: relative;
  }
  .main .loginBg{
    background: url(../../src/assets/main.jpg) no-repeat center top;
    height:880px;
  }
  .Lfooter{
    height :120px;
    margin: 0 auto;
  }
  .Lfooter{
    background: #0f6a7b;
    padding: 29px 0;
    text-align: center;
    box-sizing: border-box;
  }
  .Lfooter p{
    color: #efefef;
    font-size: 14px;
    line-height: 1;
    margin: 0 0 12px 0;
  }
  .errorMsg{
    width: 410px;
    text-align: left;
    height: 20px;
    margin: auto;
  }
</style>
