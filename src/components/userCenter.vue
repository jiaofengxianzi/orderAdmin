<template>
  <div class="userCenter">
    <div class="tab">
      <ul>
        <li><router-link to="/userCenter/grades">我的成绩</router-link></li>
        <li><router-link to="/userCenter/testStrip">考生考试条</router-link></li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
      data (){
          return {
            tabVal : 1
          }
      },
    methods :{
      get_center_info : function(){

      }
    },
    mounted : function(){
      this.$nextTick(function(){
        this.get_center_info();
      })
    }
  }
</script>


<style scoped>
  .tab ul{
    margin: 0;
    height: 40px;
    border-bottom: 1px solid#d9d9d9;
    line-height: 39px;
  }
  .tab ul li{
    display: inline-block;

    margin: 0 10px 0 20px;
    cursor: pointer;
  }
  .tab ul li a{
   text-decoration: none;
    padding: 0 15px;
    display: block;
  }
  .router-link-active{
    border-bottom: 2px solid #0f6a7b;
  }
</style>
