import Vue from 'vue'
import Router from 'vue-router'
import PlanVC from '@/pages/planVC'
import loginVC from '@/pages/login'
import routerPush from '@/pages/routerPush'
import XZcaizhong from '@/pages/XZcaizhong'
import lossPwdVC from '@/pages/lossPwd'
import lossPwdVC1 from '@/pages/lossPwd1'
import registVC from '@/pages/regist'
import isNeedLogin from '@/pages/isNeedLogin'
import error from '@/pages/error'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'isNeedLogin',
      component: isNeedLogin
    },
    {
      path: '/login',
      name: 'loginVC',
      component: loginVC
    },
    {
      path: '/regist',
      name: 'registVC',
      component: registVC
    },
    {
      path: '/planVC',
      name: 'PlanVC',
      component: PlanVC,
      beforeEnter(to, form, next) {
        if (to.path === '/login') {
          next({ name: 'loginVC' })
        }

        next()
      }
    },
    {
      path: '/routerPush',
      name: 'routerPush',
      component: routerPush
    },
    {
      path: '/lossPwd',
      name: 'lossPwdVC',
      component: lossPwdVC
    },
    {
      path: '/lossPwd1',
      name: 'lossPwdVC1',
      component: lossPwdVC1
    },
    {
      path: '/error',
      name: 'error',
      component: error
    },
    {
      path: '/XZcaizhong',
      name: 'XZcaizhong',
      component: XZcaizhong
    },

  ]
})
