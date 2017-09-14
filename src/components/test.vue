<template>
  <div class="test">
    <select name="" id="" v-model="select">
      <option :value="item.id" v-for="item in data"> {{item.test}}</option>
    </select>
    <input type="text" v-model="select">
  </div>
</template>
<script>
  export default{
      data (){
          return {
              select : '1',
              data : [{id:'1',test:'a'},{id:'2',test:'b'},{id:'3',test:'c'}]
          }
      }
  }
</script>
