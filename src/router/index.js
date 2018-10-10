import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import Read from '@/components/read/Read'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/read',
      name: 'read',
      component: Read
    }
  ],
  mode: 'history'
})
