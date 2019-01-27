import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/css/forum.css'

import {routes} from './router/index.js'
// 引用API文件
import api from './api/index.js'
import axios from 'axios'
// 引入样式
import 'vue-easytable/libs/themes-base/index.css'
// 导入 table 和 分页组件
import {VPagination, VTable} from 'vue-easytable'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

axios.defaults.withCredentials = true
// 将API方法绑定到全局
Vue.prototype.$api = api

Vue.config.productionTip = false

// 注册到全局
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Element)
Vue.use(mavonEditor)

const router = new VueRouter({
  routes,
  mode: 'history'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
