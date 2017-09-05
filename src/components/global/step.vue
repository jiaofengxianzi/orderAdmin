<template>
  <div id="step">
    步骤条：
    <ul>
      <li>1——</li>
      <li>2——</li>
      <li>3——</li>
      <li>4</li>
    </ul>
  </div>
</template>
<script>
  export default{
      data (){
          return {
              step:'3'
          }
      }
  }
</script>
<style>
  li{
    display: inline-block;
  }
</style>
