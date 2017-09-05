<template>
  <div class="notice">
    <div class="tab">
      <ul>
        <li><router-link to="/notice">最近通知</router-link></li>
      </ul>
    </div>
    <div class="noticeBox">
      <ul>
        <li>2017圣诞节快乐圣诞节</li>
        <li>2017圣诞节快乐圣诞节</li>
        <li>2017圣诞节快乐圣诞节</li>
      </ul>
    </div>
  </div>
</template>
<script>

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
</style>
