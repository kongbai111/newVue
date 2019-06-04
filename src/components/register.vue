<template>
  <div class="register" :style="register">
    <div class="register-big">
      <div class="form-big">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="uname">
            <el-input v-model="ruleForm.uname"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input v-model="ruleForm.age" class="ageclass"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="region">
            <el-select v-model="ruleForm.address" placeholder="请选择活动区域">
              <el-option label="重庆" value="重庆"></el-option>
              <el-option label="北京" value="北京"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生日" required>
            <el-col :span="18">
              <el-form-item prop="date1">
                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.birthday" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="ruleForm.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
            <router-link :to="{path:'/'}">
              <el-button>返回登录</el-button>
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
  name: 'register',
  data () {
    return {
      register: {
        height: dimensions().h + 'px',
        width: dimensions().x + 'px'
      },
      ruleForm: {
        name: '',
        address: '',
        birthday: '',
        sex: '',
        uname: '',
        age: 0,
        phone: '',
        username: '',
        password: '',
        email: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入真名', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请选择住址', trigger: 'change' }
        ],
        birthday: [
          { type: 'date', required: true, message: '请选择出身日期', trigger: 'change' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        phone: [
          { min: 11, max: 11, message: '请填写正确的电话', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请填写登录名', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      let data = {
        name: '',
        age: 0,
        sex: 0,
        phone: '',
        uname: '',
        username: '',
        password: '',
        headPortrait: '',
        address: '',
        birthday: '',
        email: ''
      }
      data.name = this.ruleForm.name
      data.age = this.ruleForm.age
      data.sex = this.ruleForm.sex === '男' ? 1 : 0
      data.phone = this.ruleForm.phone
      data.uname = this.ruleForm.uname
      data.username = this.ruleForm.username
      data.password = this.ruleForm.password
      data.headPortrait = this.ruleForm.headPortrait
      data.address = this.ruleForm.address
      data.birthday = this.ruleForm.birthday
      data.email = this.ruleForm.email

      console.log(this.ruleForm.birthday)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post(this.$host + '/users/', data).then(data => {
            if (data.body.code === 1) {
              this.$alert(data.body.errorMsg, '注册失败', {
                confirmButtonText: '确定'
              })
            } else {
              this.$alert(data.body.message, '注册成功')
              this.$router.push({path: '/'})
            }
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
  .register{
    display: flex;
    background-color: #ff9746;
    justify-content: center;
    align-items: center;
  }
  .register .register-big{
    width: 420px;
    border-radius: 10px;
    background-color: white;
    padding: 50px;
  }
  .register .register-big .form-big{
    width: 100%;
  }
  .ageclass{
    width: 30%;
  }
</style>
