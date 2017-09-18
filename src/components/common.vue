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
    <div id="content" >
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
            name : JSON.parse(localStorage.getItem("userToken")).username,
            screenHeight: document.body.clientHeight-264,
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
        document.getElementById('content').style.minHeight=this.screenHeight+"px";//页面初始化
        window.onresize = () => {
          return (() => {
            this.screenHeight = document.body.clientHeight
          })()
        }

      })

    },
    watch : {
      screenHeight (val) {
        this.screenHeight = val ;
        document.getElementById('content').style.minHeight=this.screenHeight-264+"px";//检测窗口的大小，并赋值
      }
    },
    components :{
      tips
    }
  }
</script>
<style>

</style>
