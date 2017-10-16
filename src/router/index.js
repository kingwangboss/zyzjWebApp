import Vue from 'vue'
import Router from 'vue-router'
import PlanVC from '@/pages/planVC'
import loginVC from '@/pages/login'
import routerPush from '@/pages/routerPush'
import XZcaizhong from '@/pages/XZcaizhong'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'loginVC',
      component: loginVC
    },
    {
      path: '/planVC',
      name: 'PlanVC',
      component: PlanVC
    },
    {
      path: '/routerPush',
      name: 'routerPush',
      component: routerPush
    },
    {
      path: '/XZcaizhong',
      name: 'XZcaizhong',
      component: XZcaizhong
    },
  ]
})
