<template>
  <div class="NoFound">
    <div class="imgbox">
      <img src="../../../src/assets/404pen.png" alt="">
      <div class="tips">
        <p>COMPONENT NOT FOUND</p>
        <p>抱歉，你请求的页面不存在!</p>
      </div>
      <div class="btn">
        <router-link to="/index">返回系统首页</router-link>
        <a href="javascript:window.history.back()">返回继续操作</a>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
      data (){
          return {
              title : '404页面出现了一些错误'
          }
      }
  }
</script>
<style scoped="">
  h1{
    text-align: center;
  }
  .imgbox{
    width: 818px;
    height:322px;
    margin: 50px auto;
  }
  .tips{
    margin-top: 88px;
  }
  .tips p{
    text-align: center;
    font-size: 32px;
    margin-top: 16px;
  }
  .btn{
    text-align: center;
    margin-top: 100px;
  }
  .btn a{
    width: 312px;
    height:77px;
    line-height: 62px;
    text-align: center;
    color:#fff;
    text-decoration: none;
    font-size: 26px;
    display: inline-block;
    background: url(../../../src/assets/404btn.png);
  }
</style>
