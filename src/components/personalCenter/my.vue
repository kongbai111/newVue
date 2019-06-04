<template>
    <div class="my" :style="mybig">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="big demo-ruleForm">
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
        <el-form-item label="头像" prop="sex">
          <el-upload
            class="avatar-uploader"
            action = "string"
            :http-request="uploadSectionFile"
            :show-file-list="false">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
import {dimensions} from '../../../test/unit/screen'
export default {
  inject: ['reload'],
  name: 'my',
  data () {
    return {
      imageUrl: '',
      imagedeUrl: '',
      uid: '',
      mybig: {
        width: dimensions().x * 80 / 100 + 'px'
      },
      ruleForm: {
        name: '',
        address: '',
        birthday: '',
        sex: '',
        uname: '',
        age: 0,
        phone: '',
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
        ]
      }
    }
  },
  mounted () {
    let name = this.$cookie.get('name')
    this.uid = name
    this.selectContent()
  },
  methods: {
    uploadSectionFile (params) {
      let type = 0
      const isJPG = params.file.type === 'image/jpeg'
      const isGIF = params.file.type === 'image/gif'
      const isPNG = params.file.type === 'image/png'
      const isBMP = params.file.type === 'image/bmp'
      if (!isJPG && !isGIF && !isPNG && !isBMP) {
        this.$message.error('上传图片必须是JPG/GIF/PNG/BMP 格式!')
        type = 1
      }
      const isLt2M = params.file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
        type = 1
      }
      if (type === 0) {
        let param = new FormData() // 创建form对象
        param.append('file', params.file, params.file.name) // 通过append向form对象添加数据
        param.append('chunk', '0')
        param.append('deleteUrl', this.imagedeUrl)
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        } // 添加请求头
        this.$http.post(this.$host + '/gongyong/getImg', param, config).then(data => {
          if (data.body.code === 0) {
            this.imageUrl = this.$host + data.body.pathname
            this.imagedeUrl = data.body.pathname
          } else {
            this.$message.error('图片上传失败')
          }
        })
      }
    },
    selectContent () {
      let params = {
        username: ''
      }
      params.username = this.uid
      this.$axios.get(this.$host + '/users/grxx', {params: params}).then(data => {
        if (data.data.code === 1) {
          this.$alert(data.errorMsg, '登录失败', {
            confirmButtonText: '确定'
          })
        } else if (data.data.code === 0) {
          this.ruleForm.name = data.data.errData.name
          this.ruleForm.address = data.data.errData.address
          this.ruleForm.birthday = data.data.errData.birthday
          this.ruleForm.sex = data.data.errData.sex
          this.ruleForm.uname = data.data.errData.uname
          this.ruleForm.age = data.data.errData.age
          this.ruleForm.phone = data.data.errData.phone
          this.ruleForm.email = data.data.errData.email
          this.imageUrl = this.$host + data.data.errData.img
          this.imagedeUrl = data.data.errData.img
        }
      })
    },
    submitForm (formName) {
      let data = {
        name: '',
        age: 0,
        sex: 0,
        phone: '',
        uname: '',
        address: '',
        birthday: '',
        email: '',
        img: '',
        username: ''
      }
      data.name = this.ruleForm.name
      data.age = this.ruleForm.age
      data.sex = this.ruleForm.sex === '男' ? 1 : 0
      data.phone = this.ruleForm.phone
      data.uname = this.ruleForm.uname
      data.address = this.ruleForm.address
      data.birthday = this.ruleForm.birthday
      data.email = this.ruleForm.email
      data.img = this.imagedeUrl
      data.username = this.uid

      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post(this.$host + '/users/update', data).then(data => {
            if (data.body.code === 1) {
              this.$alert(data.body.errorMsg, '注册失败', {
                confirmButtonText: '确定'
              })
            } else {
              this.$alert(data.body.message, '保存成功')
              this.reload()
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
  .my{
    width: 100%;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: #1f222e solid 1px;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .big {
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    width: 500px;
  }
</style>
