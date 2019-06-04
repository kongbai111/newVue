<template>
    <div class="personalCenter">
      <div>
        <el-row class="tac">
          <el-col :span="12">
            <el-menu
              :style="hangt"
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>资料</span>
                </template>
                <router-link :to="{path:'/index/personalCenter/myCenter'}">
                  <el-menu-item index="1-1">
                    个人资料
                  </el-menu-item>
                </router-link>
                <router-link :to="{path:'/index/personalCenter/updatePassword'}">
                  <el-menu-item index="1-2">修改密码</el-menu-item>
                </router-link>
                <el-menu-item index="1-3">个性签名</el-menu-item>
                <el-menu-item index="1-4">其他</el-menu-item>
              </el-submenu>
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">账号管理</span>
              </el-menu-item>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-document"></i>
                  <span slot="title">权限管理</span>
                </template>
                <el-menu-item index="3-1">新增权限</el-menu-item>
                <el-menu-item index="3-3">分配权限</el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </div>
      <div>
        <router-view/>
      </div>
    </div>
</template>

<script>
import {dimensions} from '../../../test/unit/screen'
export default {
  name: 'personalCenter',
  data () {
    return {
      imageUrl: '',
      imagedeUrl: '',
      hangt: {
        minHeight: dimensions().h - 80 + 'px'
      }
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
  a{
    text-decoration: none;
  }
  .personalCenter{
    width: 100%;
    display: flex;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
</style>
