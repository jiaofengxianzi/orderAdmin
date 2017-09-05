<template>
  <div class="testStrip">
    <p class="plv2">考生个人信息</p>
    <userInfo></userInfo>
    <p class="plv2">报考订单确认</p>
    <orderInfo></orderInfo>
    <p class="plv2">报名成功</p>
    <table>
      <thead>
        <tr>
          <td colspan="4">考生考试条</td>
          <td>考试注意事项</td>
        </tr>
        <tr>
          <td>考试时间</td>
          <td>考试科目</td>
          <td>考试地点</td>
          <td>考场代号</td>
          <td rowspan="100">1</td>
        </tr>
        <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>4</td>

        </tr>
      </thead>
    </table>
  </div>
</template>
<script>
  import userInfo from '@/components/global/userInfo'
  import orderInfo from '@/components/global/orderInfo'
  export default{
      data (){
          return{

          }
      },
    components : {
      userInfo,
      orderInfo
    }
  }
</script>
<style scoped>
  .testStrip{
    padding: 0 20px 20px 20px;
  }
  table{
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    border: 1px solid #e8e8e8;
    font-size: 13px;
  }
  table td{
    padding: 9px 20px 9px 40px;
    border: 1px solid #e8e8e8;
    text-align: center;
  }
  table thead tr:first-child{
    background:#f5f5f5;
  }
  table tbody tr:nth-child(odd){
    background:#fafafa;
  }
  p.plv2{
    margin: 26px 0 10px;
  }
</style>
