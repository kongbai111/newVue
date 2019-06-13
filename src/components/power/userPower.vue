<template>
  <div class="userPower">
    <el-form ref="ruleForm" :rules="rules" :model="ruleForm" label-width="110px">
      <el-form-item label="用户名或电话" prop="powerName">
        <el-input v-model="ruleForm.powerName" placeholder="请输入用户名或电话"></el-input>
      </el-form-item>
      <el-form-item label="职位名" prop="powerName">
        <el-select v-model="ruleForm.value" placeholder="请选择">
          <el-option
            v-for="item in ruleForm.options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('ruleForm')">新增</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'userPower',
  data () {
    return {
      ruleForm: {
        powerName: '',
        options: [],
        value: ''
      },
      rules: {
        powerName: [
          { required: true, message: '请输入用户名或电话', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    let name = this.$cookie.get('name')
    this.uid = name
    this.seletPower()
  },
  methods: {
    seletPower () {
      this.$axios.get(this.$host + '/powerRelation/selectPosition').then(data => {
        if (data.data.code === 1) {
          this.$alert(data.errorMsg, '登录失败', {
            confirmButtonText: '确定'
          })
        } else {
          this.ruleForm.options = data.data.errData
        }
      })
    },
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('此操作将新增权限职位, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let params = {
              uid: '',
              userId: '',
              powerRelationId: '',
              PRSort: 1
            }
            params.uid = this.uid
            params.userId = this.ruleForm.powerName
            params.powerRelationId = this.ruleForm.value
            this.$http.post(this.$host + '/powerRelation/bind', params).then(data => {
              if (data.data.code === 1) {
                this.$alert(data.data.errorMsg, '新增失败', {
                  confirmButtonText: '确定'
                })
              } else if (data.data.code === 0) {
                this.$message({
                  type: 'success',
                  message: data.data.errorMsg
                })
                this.ruleForm.powerName = ''
                this.ruleForm.value = ''
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消修改'
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
