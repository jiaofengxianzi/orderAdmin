<template>
  <div class="checkInfo">
    <div class="title">
      1、确认信息
    </div>
    <div class="padBox">
    <p class="plv2">个人信息</p>
      <userInfo></userInfo>
      <div class="tips">
        PS：如有问题请联系相关老师修改，联系电话：0755-xxxxxxxxxxxx
      </div>
    <p class="plv2">报考信息</p>
    <table>
      <thead>
        <tr>
          <td colspan="4">报考专业：<span>{{specialtyName}}</span>　　　城市：<span>{{cityName}}</span>　　　考点选择：
            <select v-model="place_id" @change="plan_ids = []">
              <option value="-1">请选择考点</option>
              <option v-for="options in palceArr" v-bind:value="options.id">
                {{options.place_name}}
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
        <tr v-for="item in detailsData" id="wt" :arr="item.exam_id.indexOf(place_id)" :class="{'no-drop' : (item.exam_id.indexOf(place_id))>=0?false:true}">
          <td>{{item.test_start_date}}</td>
          <td>{{item.test_end_date}}</td>
          <td>{{item.course_code}}</td>
          <td>
            <label>
              <input type="checkbox" :class="'checkbox'" :value="item.id" checked v-model="plan_ids"  :disabled="(item.exam_id.indexOf(place_id))>=0?false:true"> {{item.course_name}}
            </label>
          </td>
        </tr>
      </tbody>
    </table>
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
          detailsData :[],//报考详情
          cityName:'',//城市
          specialtyName:'',//专业
          exam_place:[],//考点
          place_id :'-1',//考点默认选择
          plan_ids :[],//报考的考试计划
          ticket_id :'',
          userData:[],
          palceArr: []
        }
    },
    methods : {

        //获取自己的准考证信息
        userInfo :function(){
          var vm = this;
          vm.$axios.post('http://192.168.50.10:11080/api/v1/user/tickets').then(function(userInfo){
            vm.userData = userInfo.data.data;
            vm.ticket_id = userInfo.data.data[0].ticket_id;
            //vuex更新个人准考证信息
            vm.$store.dispatch('setUserInfo', userInfo.data.data);

            //获取当前考试计划信息
            vm.$axios.post('http://192.168.50.10:11080/api/v1/user/plans',{'ticket_id':vm.ticket_id}).then(function(plan){
              //每一条考试计划加exam_id

              plan.data.data.plan_details.forEach(function(i){
                var arr1 =[];
                  i.exam_place.forEach(function(j){
                    arr1.push(j.id)
                  });

                  i.exam_id = arr1
              });

              vm.detailsData = plan.data.data.plan_details;

              vm.cityName = plan.data.data.city.city_name;
              vm.specialtyName = plan.data.data.specialty.specialty_name;
              //考点
              vm.exam_place = plan.data.data.plan_details[0].exam_place;


              var palceArr1 = [];
              for(var i = 0 ; i<vm.detailsData.length;i++){
                for(var j = 0 ; j < vm.detailsData[i].exam_place.length; j++ ){
                  palceArr1.push(vm.detailsData[i].exam_place[j]);
                }

              };
              //过滤数组中相同key的对象元素
              Array.prototype.filter1 = function(){
                for(var i=0, temp={}, result=[], ci; ci=this[i++];){
                  var id = ci.id;
                  if(temp[id]){
                    continue;
                  }
                  temp[id] = true;
                  result.push(ci);
                }
                return result;
              };
              //console.log(palceArr.filter())
              vm.palceArr = palceArr1.filter1();
              //去重
//              Array.prototype.unique = function(){
//                var res = [];
//                var json = {};
//                for(var i = 0; i < this.length; i++){
//                  if(!json[this[i]]){
//                    res.push(this[i]);
//                    json[this[i]] = 1;
//                  }
//                }
//                return res;
//              }

            })
          })
        },
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
          vm.$axios.post('http://192.168.50.10:11080/api/v1/plan/confirm',{place_id:vm.place_id,plan_ids:vm.plan_ids,ticket_id:vm.ticket_id}).then(function(idData){
            if(idData){
              //vuex更新订单id order_id
              vm.$store.dispatch('setOrderId', idData.data.data.order_id);
              vm.$router.push('/order')
            }{

            }

          })
        }
    },
    computed:{

    },
    mounted : function(){
        this.$nextTick(function(){
          this.userInfo();
          //this.plan_details();

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
    padding: 12px 20px;
    font-size: 16px;
    border-bottom: 1px solid #d0cfcf;
    color: #202020;
  }
  .padBox{
    padding: 0px 20px 40px;
  }
  p.plv2{
    margin: 20px 0 10px;
    font-size: 14px;
    color: #404040;
  }
  input[type='button']{
    margin: 100px auto 0;
    display: block;
    width: 180px;
    height: 34px;
    border-radius: 3px;
    background: #0f6a7b;
    color: #fff;
    cursor: pointer;
    border: 0;
  }
  input[type='button']:hover{
    background-color: #166c78;
  }
  select{
    width: 234px;
    height: 22px;
    border-radius: 5px;
    padding-left: 10px;
  }
  .tips{
    padding: 5px;
    border: 1px solid #fdc7c7;
    background: #ffe4e4;
    color: #ec0d0d;
    font-size: 14px;
    margin: 20px 0;
  }
  .no-drop *{
    cursor: no-drop;
    background: #ffeeee;
    color: #bfbfbf;

  }
</style>
