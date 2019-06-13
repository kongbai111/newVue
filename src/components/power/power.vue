<template>
  <div class="power">
    <div>
      <el-row class="tac">
        <el-col :span="12">
          <el-menu
            :style="hangt"
            default-active="1-1"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span slot="title">权限管理</span>
              </template>
              <el-menu-item index="1-1">
                <router-link :to="{ path: '/index/power/getPower' }">
                  新增权限
                </router-link>
              </el-menu-item>
              <el-menu-item index="1-2">
                <router-link :to="{ path: '/index/power/distributionPower' }">
                  分配权限
                </router-link>
              </el-menu-item>
              <el-menu-item index="1-3">
                <router-link :to="{ path: '/index/power/powerLists' }">
                  权限列表
                </router-link>
              </el-menu-item>
              <el-menu-item index="1-4">
                <router-link :to="{ path: '/index/power/bindPower' }">
                  绑定权限
                </router-link>
              </el-menu-item>
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
  name: 'power',
  data () {
    return {
      hangt: {
        minHeight: dimensions().h - 80 + 'px'
      }
    }
  }
}
</script>

<style scoped>
  a{
    text-decoration: none;
    color: white;
  }
  a:visited{
    color: inherit;
  }
  a:hover{
    color: inherit;
  }
  .power{
    width: 100%;
    display: flex;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
</style>
