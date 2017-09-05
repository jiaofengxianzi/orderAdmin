<template>
  <div class="layerTips" v-show="show">
    <div class="tipBox">
      <p class="tipTitle">操作提示</p>
      <p class="tips-txt">{{ text }}</p>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'layerTips',
    computed: {
      show () {
        return this.$store.state.tips.show
      },
      text () {
        return this.$store.state.tips.text
      }
    }
  }
</script>
<style>
  .tipBox {
    width: 300px;
    position: fixed;
    padding: 10px 0 20px 0;
    top: 50%;
    left: 50%;
    right: 0;
    transform: translate(-50% , -50%);
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.47);
    border-radius: 5px;
    text-align: center;
  }
  p{
    margin: 0 0 10px;
  }
  p.tipTitle{
    font-size: 12px;
  }
  .tips-txt{
    color:#F44336;
  }
</style>




