<template>
  <div class="common">
    <div class="header">
      <div class="headCon">
        <div class="logo">
          <img src="../../src/assets/logo.jpg" alt="暨南大学">
        </div>
        <div class="adminTitle" >
          <img src="../../src/assets/computer.jpg" alt="">
          远程预约报考系统
        </div>
        <div class="userBox">
          <ul>
            <li><router-link to="/index" >预约订单</router-link></li>
            <li><router-link to="/userCenter" >个人中心</router-link></li>
            <li><router-link to="/notice" >通知</router-link></li>
            <li  class="line"><a href="javascript:;" v-text="name"></a></li>
            <li @click="loginOut"><a href="javascript:;">退出</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div id="content">
      <router-view></router-view>
    </div>
    <div class="footer">
      <p>地址：中国 广州市 黄埔大道西601号 邮编：510632</p>
      <p>官网：http://www.jnu.edu.cn</p>
      <p>版权所有©暨南大学 ICP备案号：粤ICP备 12087612号粤公网安备 44010602001461</p>
    </div>
    <tips></tips>
  </div>
</template>
<script>
  import tips from '@/components/global/tips'
  export default{
      data () {
          return {
            name : JSON.parse(localStorage.getItem("userToken")).username
        }
      },
    methods : {
      loginOut : function(){
        localStorage.removeItem('userToken');
        this.$router.push('/login')
      }
    },
    mounted : function(){
      this.$nextTick(function () {


      })

    },
    components :{
      tips
    }
  }
</script>
<style>
  .common{
    height: 100%;
  }
  .header {
    height :83px;
    background: #fff;
    border-bottom:1px solid #e6e6e6;
  }
  .footer{
    height :120px;
  }
  .header .headCon ,#content ,.footer{
    width: 1000px;
    margin: 0 auto;
  }
  .header .headCon{
    /*background: #ececec;*/
    height: 83px;
  }
  .header .logo{
    width: 180px;
    height: 83px;
    display: inline-block;
    /*background: url('../../src/assets/logo.jpg') center center no-repeat;*/
    float: left;
    position: relative;
  }
  .header .logo:after{
    content: "";
    position: absolute;
    width: 1px;
    height: 30px;
    background: #cdcdcd;
    right: -3px;
    top: 29px;
  }
  .header .logo img{
    display: block;
    margin-top: 11px;
  }
  .header .adminTitle{
    display: inline-block;
    margin: 28px 0 0 20px;
    font-size: 28px;
    vertical-align:middle;
  }
  .header .adminTitle img{
    margin-bottom: -5px;
  }
  #content{
    min-height: calc(100% - 264px);
    overflow: hidden;
    background: #fff;
    margin: 20px auto 40px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 5px;
    box-shadow: 0px 0px 8px 0px #dfdfdf;
  }
  .footer{
    background: #0f6a7b;
    padding: 29px 0;
    text-align: center;
    box-sizing: border-box;
  }
  .footer p{
    color:#efefef;
    font-size: 14px;
  }

  .userBox{
    display: inline-block;
    float: right;
    margin-top: 17px;
  }
  .userBox li{
    cursor: pointer;

    display: inline-block;
  }
  .userBox li:last-child{
    padding-right: 0;
  }
  .userBox li.line{
    border-right: 1px solid #b6b6b6;
  }
  .userBox li a{
    text-decoration: none;
    display: block;
    padding: 0 20px;
  }
  select{
    width: 123px;
    height: 25px;
    border-radius: 5px;
  }
  .router-link-active{
    text-decoration: underline !important;
    color:#0f6a7b
  }
  @media screen and (min-width: 1400px){
    .header .headCon, #content, .footer {
      width: 1200px;
    }
  }
</style>
