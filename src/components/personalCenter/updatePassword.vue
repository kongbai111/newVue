<template>
    <div class="updatePassword">
      <el-form ref="ruleForm" :rules="rules" :model="ruleForm" label-width="80px">
        <el-form-item label="原密码" prop="oldPw">
          <el-input v-model="ruleForm.oldPw" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPw">
          <el-input v-model="ruleForm.newPw" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="qzPw">
          <el-input v-model="ruleForm.qzPw" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('ruleForm')">修改</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
export default {
  name: 'updatePassword',
  data () {
    var oldPwone = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入原密码'))
      } else {
        callback()
      }
    }
    var newPw = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else if (value === this.ruleForm.oldPw) {
        callback(new Error('不能与原密码相同'))
      } else {
        callback()
      }
    }
    var qzPw = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.ruleForm.newPw) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      uid: '',
      ruleForm: {
        oldPw: '',
        newPw: '',
        qzPw: ''
      },
      rules: {
        oldPw: [
          { validator: oldPwone, trigger: 'blur' }
        ],
        newPw: [
          { validator: newPw, trigger: 'blur' }
        ],
        qzPw: [
          { validator: qzPw, trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    let name = this.$cookie.get('name')
    this.uid = name
  },
  methods: {
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('此操作将修改密码, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let params = {
              username: '',
              password: '',
              ordPw: ''
            }
            params.username = this.uid
            params.ordPw = this.$md5(this.ruleForm.oldPw)
            params.password = this.$md5(this.ruleForm.qzPw)
            this.$http.post(this.$host + '/users/updatePw', params).then(data => {
              if (data.data.code === 1) {
                this.$alert(data.data.errorMsg, '修改失败', {
                  confirmButtonText: '确定'
                })
              } else if (data.data.code === 0) {
                this.$message({
                  type: 'success',
                  message: '修改成功!'
                })
                this.ruleForm.oldPw = ''
                this.ruleForm.qzPw = ''
                this.ruleForm.newPw = ''
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
 .updatePassword{
   margin:100px 0 0 400px;
 }
</style>
