import Vue from 'vue'
import Router from 'vue-router'
import PlanVC from '@/pages/planVC'
import routerPush from '@/pages/routerPush'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PlanVC',
      component: PlanVC
    },
    {
      path: '/routerPush',
      name: 'routerPush',
      component: routerPush
    },
  ]
})
