<template>
  <div class="NoFound">
    <h1>{{title}}</h1>
  </div>
</template>
<script>
  export default{
      name : '404',
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
</style>
