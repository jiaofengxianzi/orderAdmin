<template>

  <div class="grades">
    <table>
      <tbody>
        <tr>
          <td>考试时间</td>
          <td>考试科目</td>
          <td>考试成绩</td>
        </tr>
        <tr v-if="gradesData.length != 0" v-for="grades in gradesData">
          <td>{{grades.test_date}}</td>
          <td>{{grades.course_name}}</td>
          <td>{{grades.results}}</td>
        </tr>
        <tr v-else>
          <td colspan="3">暂无考试成绩</td>
        </tr>
      </tbody>
    </table>
  </div>

</template>
<script>
  export default{
      data (){
          return {
            ticket_id : '',
            gradesData : null
          }
      },
    methods : {
      getGrades : function(){
          var vm = this ;
          this.ticket_id = JSON.parse(localStorage.getItem('userInfo'))[0].ticket_id;console.log(this.ticket_id)
          this.$axios.post('user/test/results',{ticket_id : this.ticket_id}).then(function(result){
              vm.gradesData = result.data.data;
          })
      }
    },

    mounted : function(){
      this.$nextTick(function(){
        this.getGrades();
      })
    }
  }
</script>
<style scoped>
  .grades{
    padding: 20px;
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

</style>
