<template>
  <div class="userInfo">
    <table border="1">
      <tbody>
        <tr>
          <td>姓名</td>
          <td>身份证</td>
          <td>准考证</td>
          <td>手机号</td>
          <td>报考专业</td>
          <td>级别</td>
          <!--<td></td>-->
        </tr>
        <tr v-for="item in userData" :class="{'selectTicket' : item.ticket_id != ticketId}">
          <td v-text="item.name"></td>
          <td v-text='item.user_card_id'></td>
          <td v-text='item.number'></td>
          <td v-text='item.mobile'></td>
          <td v-text='item.specialty_name'></td>
          <td v-text='item.level_name'></td>
          <!--<td style="color:#fff"><el-radio class="radio" v-model="ticketId" v-if="item.ticket_id ==ticketId" :label="item.ticket_id">.</el-radio></td>-->
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  export default{
      name : 'userInfo',
      data () {
          return {
            userData:[],//JSON.parse(localStorage.getItem("userInfo"))
            ticketId : JSON.parse(localStorage.getItem("userToken")).ticket_id
          }
      },
      methods:{
        //获取自己的准考证信息
        userInfo :function(){
          var vm = this;
          vm.$axios.post('user/tickets').then(function(userInfo){
            vm.userData = userInfo.data.data;
            //vuex更新个人准考证信息
            //console.log('userInfo'+ JSON.stringify(userInfo.data.data))
            vm.$store.dispatch('setUserInfo', userInfo.data.data);
          })
        }
      },
      mounted:function(){
        this.$nextTick(function(){
          this.userInfo();
        })
      }
  }



</script>
<style scoped>
  table{
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    border: 1px solid #dbdbdb;
    font-size: 13px;
  }
  table td{
    padding: 9px 20px 9px 40px;
    border: 1px solid #dbdbdb;
    text-align: left;
    font-size: 14px;
    color: #606060;
  }
  table thead tr:first-child{
    background:#f5f5f5;
  }
  table tbody tr:nth-child(odd){
    background:#fafafa;
  }
  .el-radio {
    color: rgba(255, 255, 255,0)
  }
  .selectTicket td{
    background: #fff !important;
    color: #dbdbdb !important;
  }
</style>
