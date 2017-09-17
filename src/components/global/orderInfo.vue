<template>
  <div class="orderInfo">
    <table v-model="orderData">
      <tbody>
      <tr>
        <td>订单编号</td>
        <td colspan="3">{{order_id}}</td>
        <td>订单状态</td>
      </tr>
      <tr>
        <td>报考专业</td>
        <td colspan="3">{{specialtyName}}</td>
        <td rowspan="100">
          <p class="status">{{getStatus}}</p>
          <p><a href="javascript:;" @click="closeOrder" v-if="payStatusNumber != '1'">取消订单</a></p>
        </td>
      </tr>
      <tr>
        <td>序号</td>
        <td>时间</td>
        <td>报考科目</td>
        <td>单价</td>

      </tr>
      <tr v-for="(item,key) in detailsData">
        <td>{{key+1}}</td>
        <td>{{item.test_start_date}}</td>
        <td>{{item.course_name}}</td>
        <td>{{item.price | formatMoney}}</td>
      </tr>
      <tr>
        <td style="text-align: center" colspan="4">你共报考 <span>{{detailsData.length}}</span> 科，共计报考费 ￥<span>{{orderData.amount | formatMoney}}</span>元</td>

      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  import axios from 'axios';
  import Step from '@/components/global/step'
  import userInfo from '@/components/global/userInfo'
  export default {
    name : 'order',
    data (){
      return {
        orderData :[],
        detailsData:[],
        specialtyName:'',
        isActive:'alipay',
        payStatusNumber : '',
        order_id:'',
        redirect_url:'',
        showErweima:false
      }
    },
    methods : {

      //获取订单详情
      order_details : function(){
        var vm = this;
        var order_id = this.$store.state.order_id;
        vm.$axios.post('order',{order_id:order_id}).then(function(order){
          //订单总信息
          vm.orderData = order.data.data;
          localStorage.setItem("orderData",JSON.stringify(order.data.data))
          //报考信息
          vm.detailsData = order.data.data.plan_detail;
          //专业名
          vm.specialtyName = order.data.data.plan_detail[0].specialty.specialty_name;
          //支付状态
          vm.payStatusNumber = order.data.data.status;
          //订单id
          vm.order_id = order.data.data.oid;

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
    computed:{
      getStatus : function(){
        switch (this.payStatusNumber){
          case 0 :
            return '已创建';
            break;
          case 1:
            return '已支付';
            break;
          case 2:
            return '取消支付';
            break;
          case 3:
            return '支付过期';
            break;
          case 4:
            return '支付失败';
            break;
          case 5:
            return '已回调，但是超过支付';
            break;
          default:
            return '未知错误';
        }
      }
    },
    mounted : function(){
      this.$nextTick(function(){
        if(localStorage.getItem("order_id") == ''){
          this.$router.push('/index');
        }
        this.order_details();
      })
    },
    filters :{
      formatMoney : function(num){
        num= (num*0.01).toFixed(2);
        num+='';
        var reg=num.indexOf('.') >-1 ? /(\d{1,3})(?=(?:\d{3})+\.)/g : /(\d{1,3})(?=(?:\d{3})+$)/g;//确定使用有哪个正则
        return num.replace(reg, '$1,');
      }
    },
    components:{
      Step,
      userInfo
    }
  };

</script>
<style scoped="">

  .checkInfo .title{
    padding: 10px 20px;
    font-size: 16px;
    border-bottom: 1px solid #d0cfcf;
  }
  .padBox{
    padding: 20px 20px 40px;
  }
  p.plv2{
    margin: 10px 0 10px;
  }
  .pay_btn{
    display: block;
    width: 140px;
    height: 45px;
    border: 0;
    border-radius: 3px;
    background: #0f6a7b;
    color: #fff;
    cursor: pointer;
    font-size: 17px;
  }
  .status{
    color: #fa4d32;
    margin-bottom: 10px;
  }
  .tips{
    padding: 5px;
    border: 1px solid #fdc7c7;
    background: #ffe4e4;
    color: #e60000;
    font-size: 14px;
    margin: 20px 0;
  }
  #order_alipay {
    display: inline-block;
    margin-right: 25px;
    position: relative;
    width: 220px;
    height: 80px;
    background-color: #f8fafc;
    border: 2px solid #f8fafc;
    cursor: pointer;
    background-image: url('http://www.sxmaps.com/Public/Pc/images/order/zhifubao.png');
  }
  #order_weixinpay {
    display: inline-block;
    margin-right: 25px;
    position: relative;
    width: 220px;
    height: 80px;
    background-color: #f8fafc;
    border: 2px solid #f8fafc;
    cursor: pointer;
    background-image: url('http://www.sxmaps.com/Public/Pc/images/order/weixin.png');
  }
  .js_pay_method li.active {
    border-color: #fa4d32 !important;
  }
  .js_pay_method .active .bottomright {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 0;
    bottom: 0;
    background: url('http://www.sxmaps.com/Public/Pc/images/order/gou.png');
  }
  /*二维码样式*/
  .pay_erweima_box{
    width: 260px;
    height: 300px;
    position: fixed;
    background: #fff;
    left: 0;
    right: 0px;
    top: 0px;
    bottom: 0;
    margin: auto;
    z-index: 10001;
    line-height: 1;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.15);
  }
  .pay_erweima_box_close{
    position: absolute;
    right: 0px;
    top: 0px;
    width: 21px;
    height: 21px;
    text-align: center;
    line-height: 21px;
    cursor: pointer;
    color: #aaa;
    font-size: 21px;
  }
  .pay_erweima_box_close:hover{

    /*background: #aaa;
    color: #fff;
    transition: .3s all linear;*/
  }

  .pay_erweima_box .wz1{
    margin: 30px 0 20px;
    text-align: center;
    font-size: 16px;
    color: #484848;
  }
  .pay_erweima_box .erweimabox{
    width: 190px;
    height: 190px;
    margin: 30px auto 10px;
    border: 1px solid #e3e3e3;
    position: relative;

  }
  .pay_erweima_box .wz2{
    margin: 4px;
    text-align: center;
    font-size: 14px;
    color: #484848;
  }
  .pay_erweima_box .pay_erweima_box_price{
    text-align: center;
    font-size: 16px;
    display: block;
    color: #fa6446;
    font-weight: 600;
  }
  .pay_erweima_box .erweimabox .ewm_con{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;

  }
  .ewm_con p{
    text-align: center;
    line-height: 190px;
    color: #666666;
    font-size: 14px;
  }
  .pay_erweima_box .erweimabox .gq{
    display: block;
    margin-top: 30px;
    text-align: center;
    width: 100%;
    color: #484848;
    font-size: 16px;

  }
  .pay_erweima_box .erweimabox .tp{
    margin: auto;
    display: block;
    width: 40px;
    margin-top: 39px;

  }
  .pay_erweima_box .erweimabox .loadImg{
    display: block;
    width:100%;
  }
  .pay_erweima_box .erweimabox .dj{
    display: block;
    margin: auto;
    width: 100%;
  }
  .diolog{
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0,0,0,.5);
    left: 0;
    top: 0;
    z-index: 10000;
  }
</style>
