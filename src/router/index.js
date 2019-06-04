import Vue from 'vue'
import Router from 'vue-router'
import VueCookie from 'vue-cookie'
import axios from 'axios' // 引入axios
import { backEnd } from '../../config/config' // 引入axios

import login from '@/components/login'
import index from '@/components/index'
import register from '@/components/register'

import personalCenter from '@/components/personalCenter/personalCenter'
import myCenter from '@/components/personalCenter/my'
import updatePassword from '@/components/personalCenter/updatePassword'

import home from '@/components/home/home'

Vue.use(Router)

const routes = [
  {
    path: '*',
    name: 'login',
    component: login
  }, {
    path: '/register',
    name: 'register',
    component: register
  }, {
    path: '/index',
    name: 'index',
    component: index,
    children: [{
      path: '/index/personalCenter',
      name: 'personalCenter',
      component: personalCenter,
      meta: { requireAuth: true },
      children: [{
        path: '/index/personalCenter/myCenter',
        name: 'myCenter',
        component: myCenter,
        meta: { requireAuth: true }
      }, {
        path: '/index/personalCenter/updatePassword',
        name: 'updatePassword',
        component: updatePassword,
        meta: { requireAuth: true }
      }]
    }, {
      path: '/index/home',
      name: 'home',
      component: home,
      meta: { requireAuth: true }
    }]
  }
]
// // 备注：请注意路由中的 meta:{requireAuth: true }，这个配置，主要为下面的验证做服务。
// // if(to.meta.requireAuth) 这段代码意思就是说，如果requireAuth: true ,那就判断用户是否存在。
// // 如果存在，就继续执行下面的操作，如果不存在，就删除客户端的Cookie,同时页面跳转到登录页，代码如下。
// //这个是请求页面路由的时候会验证token存不存在，不存在的话会到登录页
const router = new Router({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    let arr = VueCookie.get('text')
    let name = VueCookie.get('name')
    let params = {}
    params.username = name
    if (name) {
      axios.get(backEnd + '/users/cookie', {params: params}).then(data => {
        if (arr === data.data.errData.u_uuid) {
          next()
        } else {
          alert('身份验证错误，请重新登录')
          next({
            path: '/'
          })
        }
      })
    } else {
      alert('请先登录')
      next({
        path: '/'
      })
    }
  } else {
    next()
  }
})
export default router
