<template>
  <div class="getPower">
    <el-form ref="ruleForm" :rules="rules" :model="ruleForm" label-width="100px">
      <el-form-item label="功能名" prop="powerName">
        <el-input v-model="ruleForm.powerName"></el-input>
      </el-form-item>
      <el-form-item label="功能英文名（路由）" prop="powerEnName">
        <el-input v-model="ruleForm.powerEnName"></el-input>
      </el-form-item>
      <el-form-item label="是否二级" prop="IsTwo">
        <el-radio-group @change="show()" v-model="ruleForm.IsTwo">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :style="xians" label="上级名称" prop="PSuperior">
        <el-select v-model="ruleForm.value" placeholder="请选择">
          <el-option
            v-for="item in ruleForm.PSuperior"
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
  name: 'getPower',
  data () {
    var oldPwone = (rule, value, callback) => {
      if (this.ruleForm.IsTwo === 1) {
        if (this.ruleForm.PSuperior === '') {
          return callback(new Error('请输入原密码'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      uid: '',
      xians: {
        display: 'none'
      },
      ruleForm: {
        powerName: '',
        powerEnName: '',
        IsTwo: 2,
        PSuperior: [],
        value: ''
      },
      rules: {
        powerName: [
          { required: true, message: '请输入功能名', trigger: 'blur' }
        ],
        powerEnName: [
          { required: true, message: '请输入功能英文名', trigger: 'blur' }
        ],
        PSuperior: [
          { validator: oldPwone, trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    let name = this.$cookie.get('name')
    this.uid = name
  },
  methods: {
    show () {
      let item
      if (this.ruleForm.IsTwo === 1) {
        this.$axios.get(this.$host + '/power/select').then(data => {
          if (data.data.code === 1) {
            this.$alert(data.errorMsg, '登录失败', {
              confirmButtonText: '确定'
            })
          } else {
            this.ruleForm.PSuperior = data.data.errData
          }
        })
        item = {
          display: 'block'
        }
      } else {
        item = {
          display: 'none'
        }
        this.ruleForm.PSuperior = []
      }
      this.xians = item
    },
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('此操作将新增权限, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let params = {
              uid: '',
              powerName: '',
              powerEnName: '',
              IsTwo: 2,
              PSuperior: ''
            }
            params.uid = this.uid
            params.powerName = this.ruleForm.powerName
            params.powerEnName = this.ruleForm.powerEnName
            params.IsTwo = this.ruleForm.IsTwo
            params.PSuperior = this.ruleForm.value
            this.$http.post(this.$host + '/power', params).then(data => {
              if (data.data.code === 1) {
                this.$alert(data.data.errorMsg, '修改失败', {
                  confirmButtonText: '确定'
                })
              } else if (data.data.code === 0) {
                this.$message({
                  type: 'success',
                  message: data.data.errorMsg
                })
                this.ruleForm.powerName = ''
                this.ruleForm.powerEnName = ''
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
  .getPower{
    margin:100px 0 0 300px;
  }
</style>
