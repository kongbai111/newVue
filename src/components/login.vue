<template>
  <div class="login" :style="login">
    <div class="login-big">
      <div class="login-top">
      </div>
      <div class="login-button">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            <router-link :to="{path:'/register'}">
              <el-button>注册</el-button>
            </router-link>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {dimensions} from '../../test/unit/screen'
export default {
  name: 'login',
  data () {
    return {
      msg: '6666666',
      login: {
        height: dimensions().h + 'px',
        width: dimensions().x + 'px'
      },
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {},
  methods: {
    submitForm (formName) {
      let params = {
        username: '',
        password: ''
      }
      params.username = this.ruleForm.username
      params.password = this.ruleForm.password
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.get(this.$host + '/users/', {params: params}).then(data => {
            if (data.data.code === 1) {
              this.$alert(data.errorMsg, '登录失败', {
                confirmButtonText: '确定'
              })
            } else if (data.data.code === 0) {
              this.$cookie.delete('text')
              this.$cookie.delete('name')
              this.$cookie.set('name', data.data.errData.username, 1)
              this.$cookie.set('text', data.data.errData.u_uuid, 1)
              let arr = this.$cookie.get('text')
              if (arr) {
                this.$message({
                  message: '登录成功',
                  type: 'success'
                })
                this.$router.push({path: '/index/home'})
              } else {
                this.$alert(data.errorMsg, '登录失败,系统错误', {
                  confirmButtonText: '确定'
                })
              }
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    change: function () {
      console.log(this.names)
    },
    async addConfirm () {
      // axios实现跨域请求
    }
  }
}
</script>

<style scoped>
  .login{
    background-color: #ff9746;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login .login-big{
    width: 420px;
    height: 300px;
    background-color: white;
    border-radius: 10px;
  }
  .login .login-big .login-top{
    width: 100%;
    height: 100px;
    background-color: #2b85e4;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .login .login-big .login-button{
    padding:20px 30px;
  }
</style>
