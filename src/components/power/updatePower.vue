<template>
  <div class="updatePower">
    <el-form ref="ruleForm" :rules="rules" :model="ruleForm" label-width="100px">
      <el-form-item label="权限职位名" prop="powerName">
        <el-input v-model="ruleForm.powerName"></el-input>
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="ruleForm.Number"></el-input>
      </el-form-item>
      <el-form-item label="上级名称" prop="PSuperior">
        <div v-for="pow in ruleForm.PSuperior" :key="pow.label">
          <div>{{ pow.label }}</div>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="ruleForm.value">
            <el-checkbox v-for="city in pow.lists" :label="city.value" :key="city.label">{{city.label}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('ruleForm')">新增</el-button>
        <router-link :to="{ path: '/index/power/PowerLists' }">
          <el-button>
            取消
          </el-button>
        </router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'updatePower',
  data () {
    var oldPwone = (rule, value, callback) => {
      if (this.ruleForm.value === '') {
        return callback(new Error('请选择权限'))
      } else {
        callback()
      }
    }
    return {
      uid: '',
      checkAll: false,
      isIndeterminate: true,
      ruleForm: {
        powerName: '',
        PSuperior: [],
        value: [],
        Number: 1
      },
      rules: {
        powerName: [
          { required: true, message: '请输入功能名', trigger: 'blur' }
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
    this.seletPower()
    this.seletPowerOne()
  },
  methods: {
    async seletPower () {
      await this.$axios.get(this.$host + '/powerRelation/select').then(data => {
        if (data.data.code === 1) {
          this.$alert(data.errorMsg, '登录失败', {
            confirmButtonText: '确定'
          })
        } else {
          this.ruleForm.PSuperior = data.data.errData
        }
      })
    },
    async seletPowerOne () {
      let params = {}
      params.id = this.$route.query.id
      await this.$axios.get(this.$host + '/powerRelation/selectPower', {params: params}).then(data => {
        if (data.data.code === 1) {
          this.$alert(data.errorMsg, '登录失败', {
            confirmButtonText: '确定'
          })
        } else {
          this.ruleForm.value = data.data.errData.items
          this.ruleForm.powerName = data.data.errData.name
          this.ruleForm.Number = data.data.errData.sort
        }
      })
    },
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('此操作将修改权限职位, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let params = {
              uid: '',
              powerName: '',
              powerRelationId: '',
              PRSort: 1
            }
            params.uid = this.uid
            params.pwId = this.$route.query.id
            params.powerName = this.ruleForm.powerName
            params.powerRelationId = this.ruleForm.value
            params.PRSort = this.ruleForm.Number
            this.$http.post(this.$host + '/powerRelation/update', params).then(data => {
              if (data.data.code === 1) {
                this.$alert(data.data.errorMsg, '修改失败', {
                  confirmButtonText: '确定'
                })
              } else if (data.data.code === 0) {
                this.$message({
                  type: 'success',
                  message: data.data.errorMsg
                })
                this.$router.push({path: '/index/power/powerLists'})
                this.ruleForm.powerName = ''
                this.ruleForm.value = ''
                this.ruleForm.Number = 1
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
  .updatePower{
    margin:100px 0 0 300px;
  }
</style>
