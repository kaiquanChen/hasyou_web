import Vue from 'vue'
import Router from 'vue-router'
import Root from '@/components/Root'
import foo from '@/components/footer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Header',
      component: Root
    },
    {
      path: '/foo',
      name: 'davidfooter',
      component: foo
    }
  ]
})
