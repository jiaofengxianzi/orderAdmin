<template>
  <div class="checkInfo">
    <div class="title">
      1、确认信息
    </div>
    <div class="padBox">
    <p class="plv2">个人信息</p>
      <userInfo></userInfo>
    <p class="plv2">报考信息</p>
    <table  v-model="detailsData">
      <thead>
        <tr>
          <td colspan="4">报考专业：<span>{{specialtyName}}</span>　　　城市：<span>{{cityName}}</span>　　　考点选择：
            <select v-model="place_id">
            <option value="-1">请选择考点</option>
            <option v-for="(options , key) in detailsData" :value="key">
              {{options.exam_place[0].place_name}}
            </option>
          </select>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>考试日期</td>
          <td>考试时间</td>
          <td>课程代号</td>
          <td>报考课程名称</td>
        </tr>
        <!--.data.plan_details-->
        <tr v-for="item in detailsData">
          <td>{{item.test_start_date}}</td>
          <td>{{item.test_end_date}}</td>
          <td>{{item.course_code}}</td>
          <td>
            <label>
              <input type="checkbox"
                     :value="item.id"
                     v-model="plan_ids">
              {{item.course_name}}
            </label>
          </td>
        </tr>
      </tbody>
    </table>
      <!--<ul>-->
        <!--<li v-for="item in plan_ids">{{item}}</li>-->
      <!--</ul>-->
    <input type="button" @click="checkForm" value="信息准确，进入下一步">
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Step from '@/components/global/step'
import userInfo from '@/components/global/userInfo'
export default {
    name : 'index',
    data (){
        return {
          testBody : '-1',
          detailsData :[],
          cityName:'',
          specialtyName:'',
          place_id :'-1',
          plan_ids :[],
          ticket_id :''
        }
    },
    methods : {
        //获取当前考试计划信息
        plan_details : function(){
          var vm = this;
          vm.$axios.post('plans').then(function(plan){
            vm.detailsData = plan.data.data.plan_details;
            vm.cityName = plan.data.data.city.city_name;
            vm.specialtyName = plan.data.data.specialty.specialty_name;
          })
        }
        ,
        checkForm : function(){
          if(this.place_id == '-1'){
            this.$store.dispatch('showTips', '请选择考点');
            return false;
          };
          if(this.plan_ids.length == 0){
            this.$store.dispatch('showTips', '请选择报考科目');
            return false;
          }

          //获取订单id并到确认支付页面
          var vm = this;
          //从子vuex获取准考证id
          vm.ticket_id = this.$store.state.userInfo[0].ticket_id;
          vm.$axios.post('confirm',{place_id:vm.place_id,plan_ids:vm.plan_ids,ticket_id:vm.ticket_id}).then(function(idData){
            if(idData){
              //vuex更新订单id order_id
              vm.$store.dispatch('setOrderId', idData.data.order_id);
              vm.$router.push('/order')
            }{

            }

          })



        }
    },
    mounted : function(){
        this.$nextTick(function(){
          this.plan_details();
        })
    },
  components:{
        Step,
    userInfo
  }
};

</script>
<style scoped="">
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
    text-align: left;
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
    padding: 20px 20px 40px;
  }
  p.plv2{
    margin: 10px 0 10px;
  }
  input[type='button']{
    margin: 50px auto 0;
    display: block;
    padding: 7px 17px;
    border: 0;
    border-radius: 3px;
    background: #0f6a7b;
    color: #fff;
    cursor: pointer;
  }
</style>
