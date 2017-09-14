<template>
  <div class="checkInfo">
    <div class="title">
      2、订单确认并支付
    </div>
    <div class="padBox">
      <p class="plv2">个人信息</p>
      <userInfo></userInfo>
      <div class="tips">
        您的报考信息已经确认完毕，我们将根据上述信息为您进行报考。
      </div>
      <p class="plv2">订单信息</p>
      <orderInfo></orderInfo>
      <div class="togglePay" v-if="payStatusNumber != '1'">
        <p class="plv2">请选择支付方式</p>
        <div class="payBox">
          <div class="pay_input_box">
            <ul class="js_pay_method">
              <li id="order_alipay" v-bind:class="{ 'active' : isActive == 'alipay' }" @click="isActive ='alipay'">
                <span class="bottomright"></span>
              </li>
              <li id="order_weixinpay" v-bind:class="{ 'active' : isActive == 'weixin' }" @click="isActive ='weixin'">
                <span class="bottomright"></span>
              </li>
            </ul>
          </div>
        </div>
        <input type="button" @click="checkForm" class="pay_btn" value="确认支付">
      </div>
      <div class="paySuccess" v-if="payStatusNumber == '1'">
        <p class="plv2">支付状态</p>
        <div class="it">
          <img src="../../src/assets/success.jpg" alt="">
          <p>恭喜您，此订单支付成功。可至个人中心查看考生考试条。</p>
        </div>
      </div>
    </div>
    <!--微信支付二维码开始-->
    <div class="diolog" v-if="showErweima"></div>
    <div class="pay_erweima_box" v-show="showErweima">
      <a class="pay_erweima_box_close" @click="close">×</a>
      <div class="erweimabox">
        <div id="ewm_con">
        </div>
      </div>
      <p class="wz2">微信扫描二维码以完成支付</p>
      <p class="wz2">完成支付前请勿关闭窗口</p>
      <a class="pay_erweima_box_price"><em>￥</em><span class="pay_money">{{orderData.amount | formatMoney}}</span></a>
    </div>
    <!--微信支付二维码结束-->
    <!--支付成功开始-->
      <div class="PayTip" v-if="false">
        <a class="close" href="javascript:;">×</a>
        <div class="it">
          <img src="../../src/assets/fail.jpg" alt="">
          <p>支付失败，请重新支付</p>
        </div>
      </div>
    <!--支付成功结束-->
    <div id="aaa"></div>
  </div>
</template>

<script>
//  import QRCode from 'qrcodejs2'
  import axios from 'axios';
  import Step from '@/components/global/step'
  import userInfo from '@/components/global/userInfo'
  import orderInfo from '@/components/global/orderInfo'

  export default {
    name : 'order',
    data (){
      return {
        orderData :JSON.parse(localStorage.getItem("orderData")),
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
      checkForm : function(){
        var vm = this;
        var payNum = vm.isActive=="alipay"?1:2;
        var PC = 1 ;
        var order_id = localStorage.getItem('order_id');
        console.log(order_id)
        vm.$axios.post('http://192.168.50.10:11080/api/v1/order/pay',{order_id:order_id,pay_path:PC,pay_platform:payNum}).then(function(data){
          //获取支付地址
          vm.redirect_url = data.data.data.redirect_url;
          if(vm.isActive=="alipay"){
            window.open(vm.redirect_url);
          }else if(vm.isActive=="weixin"){
            vm.showErweima = true ;
            jQuery("#ewm_con").qrcode({
              text: vm.redirect_url,
              width:190,
              height:190
            });
          }
        });
        //开始验证支付状态计时器
        var loop = function(){
          var order_id = vm.$store.state.order_id;
          vm.$axios.post('order',{order_id:order_id}).then(function(order){
            //支付状态
            vm.payStatusNumber = order.data.data.status;
            if(vm.payStatusNumber == 1){
              vm.showErweima = false;
              clearInterval(t)
              vm.$store.dispatch('showTips', '已成功支付');
            }
          })
        }
        loop();
        var t = setInterval(loop,2000)
      },
      close : function(){
        this.showErweima = false ;
        jQuery("#ewm_con canvas").remove();
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
        require ('../../static/js/jquery.qrcode.js');
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
      userInfo,
      orderInfo
    }
  };

</script>
<style scoped="">
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
  p{
    margin: 0
  }
  .checkInfo .title{
    padding: 10px 20px;
    font-size: 16px;
    border-bottom: 1px solid #d0cfcf;
  }
  .padBox{
    padding: 0px 20px 40px;
    overflow: hidden;
  }
  p.plv2{
    margin: 20px 0 10px;
    color: #404040;
    font-size: 13px;
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
    font-size: 18px;
  }
  .status{
    color: #fa4d32;
    margin-bottom: 10px;
  }
  .tips{
    padding: 5px;
    border: 1px solid #fdc7c7;
    background: #ffe4e4;
    color: #ec0d0d;
    font-size: 14px;
    margin: 20px 0;
  }
  #order_alipay {
    display: inline-block;
    margin-right: 25px;
    position: relative;
    width: 140px;
    height: 42px;
    background-color: #f8fafc;
    border: 2px solid #f8fafc;
    cursor: pointer;
    background: url('../../src/assets/aliPay.png') no-repeat;
    background-position:34px
  }
  #order_weixinpay {
    display: inline-block;
    margin-right: 25px;
    position: relative;
    width: 140px;
    height: 42px;
    background-color: #f8fafc;
    border: 2px solid #f8fafc;
    cursor: pointer;
    background: url('../../src/assets/wechatPay.png') no-repeat;
    background-position:34px
  }
  .js_pay_method li.active {
    border-color: #166c78 !important;
  }
  .js_pay_method .active .bottomright {
    width: 26px;
    height: 26px;
    position: absolute;
    right: 0;
    bottom: 0;
    background: url('../../src/assets/gou.png') no-repeat;
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
  .pay_erweima_box .erweimabox #ewm_con{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;

  }
  #ewm_con p{
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
  .paySuccess .it img{
    margin-bottom: -6px;
  }
  .paySuccess .it p{
    display: inline-block;
    font-size: 17px;
    color:#125b64;
    font-weight: 600;
    text-indent: 5px;
  }





  .PayTip{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50% , -50%);
    background: #fff;
    width: 344px;
    border-radius: 3px;
    min-height: 78px;
    box-shadow: 1px 2px 4px #e4e1e1;
    text-align: center;
    z-index: 10001;
  }
  .PayTip .close{
    position: absolute;
    top: 1px;
    right: 3px;
    text-decoration: none;
    font-size: 22px;
    color: #aaa;
    cursor: pointer;
  }
  .PayTip .it{
    margin-top:16px ;
  }
  .PayTip .it img{
    margin-bottom:-6px ;
  }
  .PayTip .it p{
    display: inline-block;
    font-size: 17px;
    color:#125b64;
    font-weight: 600;
    text-indent: 5px;
  }
</style>
