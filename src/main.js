import Vue from 'vue'
import App from './App'
import Router from './router'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
// 引用API文件
import api from './api/index.js'
// 将API方法绑定到全局
Vue.prototype.$api = api

Vue.config.productionTip = false

Vue.use(Router)
Vue.use(VueResource)
Vue.use(VueRouter)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  Router,
  template: '<App/>',
  components: { App }
})
