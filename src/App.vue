<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import '@/assets/css/style.css'
export default {
  name: 'app'
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  line-height: 1;
}
  html,body{
    margin: 0;
    padding: 0;
    height: 100%;
    background: #f7f7f7;
  }

ul{
  padding: 0;
  list-style-type: none;
}
li{
  list-style: none;
}

a {
  color: #000;

}
</style>
