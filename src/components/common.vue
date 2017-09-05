<template>
  <div class="common">
    <div class="header">
      <div class="headCon">
        <div class="logo">
          <!--<img src="jinanLogo.png" alt="暨南大学">-->
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
      尾部
    </div>
    <tips></tips>
  </div>
</template>
<script>
  import tips from '@/components/global/tips'
  export default{
      data () {
          return {
            name : JSON.parse(localStorage.getItem("userToken"))[0].token_type
        }
      },
    methods : {
      loginOut : function(){
        localStorage.removeItem('userInfo');
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
    height :60px;
  }
  .header .headCon ,#content ,.footer{
    width: 1000px;
    margin: 0 auto;
  }
  .header .headCon{
    /*background: #ececec;*/
  }
  .header .logo{
    width: 180px;
    height: 83px;
    display: inline-block;

  }
  .header .logo img{
    display: block;
    width: 100%;
  }
  #content{
    min-height: calc(100% - 204px);
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
    /*border-bottom: 2px solid #0f6a7b;*/
  }
</style>
