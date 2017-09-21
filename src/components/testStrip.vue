<template>
  <transition name="index">
  <div v-if="show" class="testStrip">
    <p class="plv2">考生个人信息</p>
    <userInfo></userInfo>
    <p class="plv2"  >报考订单确认</p>
    <div v-if="reserves_list.length == 0" class="noData">暂无报考订单，现在去 <router-link to="/index">预约下单</router-link></div>
    <div class="reserves_list" v-else=""  v-for="list in reserves_list">
      <table>
        <tbody>
        <tr>
          <td>订单编号</td>
          <td colspan="3" >{{list.oid}}</td>
          <td>订单状态</td>
        </tr>
        <tr>
          <td>报考专业</td>
          <td colspan="3">{{list.specialty_name}}</td>
          <td rowspan="100">
            <p class="status">{{list.status | status}}</p>
            <p><a href="javascript:;" @click="closeOrder" v-if="list.status != '7'">取消订单</a></p>
          </td>
        </tr>
        <tr>
          <td>序号</td>
          <td>考试时间</td>
          <td>报考科目</td>
          <td>单价</td>

        </tr>
        <tr v-for="(item,key) in list.plan_details">
          <td>{{key+1}}</td>
          <td>{{item.format_exam_date.date}}　{{item.format_exam_date.hour}}</td>
          <td>{{item.course_name}}</td>
          <td>{{item.price | formatMoney}}</td>
        </tr>
        <tr>
          <td style="text-align: center" colspan="4">你共报考 <span>{{list.plan_details.length}}</span> 科，共计报考费 ￥<span>{{list.price_total | formatMoney}}</span>元</td>

        </tr>
        </tbody>
      </table>
    </div>
    <div v-if="reserves_list.length != 0">
      <p class="plv2" >报名成功</p>
      <table >
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
            <td rowspan="100" style="width:200px;line-height: 1.2;color:#f44336;">带好准考证，身份证，自觉遵守考场纪律！</td>
          </tr>
          <tr v-for="item in detailsData[0]">
            <td>{{item.format_exam_date.date}}　{{item.format_exam_date.hour}}</td>
            <td>{{item.course_name}}</td>
            <td>{{item.place_addr}}</td>
            <td>{{item.room_code}}</td>
          </tr>
        </thead>
      </table>
    </div>
  </div>
  </transition>
</template>
<script>
  import axios from 'axios';
  import userInfo from '@/components/global/userInfo'

  export default{
    data (){
      return {
        show: false ,
        reserves_list:[],
        orderData :[],
        detailsData:[],
        specialtyName:'',
        isActive:'alipay',
        payStatusNumber : '',
        order_id:'',
        redirect_url:'',
        showErweima:false,
        ticket_id : ''
      }
    },
    methods : {

      //获取当前的考试预约信息
      order_details : function(){
        var vm = this;
        vm.ticket_id =JSON.parse(localStorage.getItem("userInfo"))[0].ticket_id ;
        vm.$axios.post('user/reserves',{'ticket_id':vm.ticket_id}).then(function(order){
          //订单数组
          vm.reserves_list = order.data.data.reserves_list;

          order.data.data.reserves_list.forEach(function(v){
            v.status_name = v.status
          });

          //考试条加所有考试计划字段 遍历汇总
          //vm.payStatusNumber = order.data.data.status_name;

          order.data.data.reserves_list.forEach(function(v){
            vm.detailsData.push(v.plan_details)
          });
        })
      }
      ,
      closeOrder : function(){
        var vm = this;
        vm.$axios.post('order/cancel',{order_id:vm.order_id}).then(function(data){
          vm.$router.push('/index');
          localStorage.setItem('order_id','');

          //this.$store.dispatch('setOrderId', '');
        })
      }
    },
    mounted : function(){
      this.$nextTick(function(){
        this.show = true ;
        this.order_details();
      })
    },
    filters :{
      formatMoney : function(num){
        num= (num*0.01).toFixed(2);
        num+='';
        var reg=num.indexOf('.') >-1 ? /(\d{1,3})(?=(?:\d{3})+\.)/g : /(\d{1,3})(?=(?:\d{3})+$)/g;//确定使用有哪个正则
        return num.replace(reg, '$1,');
      },
      status : function(statusNum){
        switch (statusNum){
          case 0 :
            return '初始化';
            break;
          case 1:
            return '已确认';
            break;
          case 2:
            return '已支付';
            break;
          case 3:
            return '支付失败';
            break;
          case 4:
            return '取消预约';
            break;
          case 5:
            return '已到场';
            break;
          case 6:
            return '未到场';
            break;
          case 7:
            return '预约完成';
            break;
          default:
            return '未知错误';
        }
      }
    },

    components : {
      userInfo,

    }
  }
</script>
<style scoped>
  .testStrip{
    padding: 0 20px 20px 20px;
  }
  .reserves_list{
    margin-bottom: 20px;
  }
  .noData{
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: #fafafa;
    font-size: 14px;
  }
  .status{
    color:red
  }
</style>
