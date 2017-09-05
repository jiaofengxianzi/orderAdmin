<template>
  <div class="grades">
    <table>
      <tbody>
      <tr>
        <td>考试时间</td>
        <td>考试科目</td>
        <td>考试成绩</td>
      </tr>
        <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
        </tr>
        <tr>
          <td>4</td>
          <td>5</td>
          <td>6</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>

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
    text-align: left;
  }
  table thead tr:first-child{
    background:#f5f5f5;
  }
  table tbody tr:nth-child(odd){
    background:#fafafa;
  }
</style>
