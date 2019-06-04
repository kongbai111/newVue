<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">
        <router-link :to="{path:'/index/home'}">首页
        </router-link>
      </el-menu-item>
      <el-menu-item index="2">共享资料</el-menu-item>
      <el-menu-item index="3">消息中心</el-menu-item>
      <el-menu-item index="4">订单管理</el-menu-item>
      <el-menu-item index="6" class="me">欢迎你</el-menu-item>
      <router-link :to="{path:'/index/personalCenter/myCenter'}">
        <el-menu-item index="5" class="me">
          <div class="topImg">
            <img :src="imageUrl"/>
          </div>
        </el-menu-item>
      </router-link>
    </el-menu>
    <div>
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      activeIndex: '1',
      imageUrl: '',
      uid: ''
    }
  },
  mounted () {
    let name = this.$cookie.get('name')
    this.uid = name
    this.selectContent()
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
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
          this.imageUrl = this.$host + data.data.errData.img
        }
      })
    }
  }
}
</script>

<style scoped>
  .me{
    float: right;
    padding-left: 0;
  }
  .topImg{
    width: 45px;
    height: 45px;
  }
  .topImg img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
</style>
