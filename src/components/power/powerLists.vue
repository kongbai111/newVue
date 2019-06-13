<template>
  <div class="powerLists">
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="time"
        label="日期"
        align="center"
        width="200">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        align="center"
        width="120">
      </el-table-column>
      <el-table-column
        prop="value"
        label="权限"
        align="center"
        min-width="200">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'getPower',
  data () {
    return {
      tableData: [
        {
          time: '2016-05-02',
          name: '王小虎',
          value: 200333
        }
      ]
    }
  },
  mounted () {
    let name = this.$cookie.get('name')
    this.uid = name
    this.selectable()
  },
  methods: {
    handleClick (row) {
      console.log(row)
    },
    selectable () {
      this.$axios.get(this.$host + '/powerRelation/selectPowerRList').then(data => {
        if (data.data.code === 1) {
          this.$alert(data.errorMsg, '登录失败', {
            confirmButtonText: '确定'
          })
        } else {
          this.tableData = data.data.errData
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
