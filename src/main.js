// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import axios from 'axios' // 引入axios
import VueCookie from 'vue-cookie'
import qs from 'qs'
import md5 from 'md5-node'
import querystring from 'querystring'
import ElementUI from 'element-ui'
import { backEnd } from '../config/config'
import 'element-ui/lib/theme-chalk/index.css'

// 全局使用axios
Vue.prototype.$http = axios
Vue.prototype.$md5 = md5
Vue.prototype.$host = backEnd
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
Vue.prototype.$querystring = querystring
// 设置token
axios.defaults.headers.common['token'] = 'f4c902c9ae5a2a9d8f84868ad064e706'
// 设置请求头
axios.defaults.headers.post['Content-type'] = 'text/plain'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(ElementUI)
Vue.use(VueCookie)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
