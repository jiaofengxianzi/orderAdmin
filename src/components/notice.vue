<template>
  <div class="notice">
    <div class="tab">
      <ul>
        <li><router-link to="/notice">最近通知</router-link></li>
      </ul>
    </div>
    <div class="noticeBox">
      <ul>
        <li><a href="javascript:;" @click="notice()">暨南大学考试预约系统通知功能</a> <span class="notice-date">2017-09-18</span></li>
      </ul>
    </div>

  </div>
</template>
<script>
  export default{
      data (){
          return {

          }
      },
    methods : {
      notice : function(){
        this.$router.push('/notice/details')
      }
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
  .noticeBox ul{
    margin: 0;
    padding: 0 20px;
  }
  .noticeBox ul li{
    line-height: 43px;
    border-bottom: 1px solid#dfdfdf;
    cursor: pointer;
  }
  .noticeBox ul li:hover{
    color:#0f6a7b
  }

  .noticeBox .notice-date{
    float: right;
    margin-right: 10px;
  }

</style>
