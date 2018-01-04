import Vue from 'vue'
import Router from 'vue-router'
import PlanVC from '@/pages/planVC'
// import loginVC from '@/pages/login'
// import routerPush from '@/pages/routerPush'
// import changePlan from '@/pages/changePlan'
// import XZcaizhong from '@/pages/XZcaizhong'
// import lossPwdVC from '@/pages/lossPwd'
// import lossPwdVC1 from '@/pages/lossPwd1'
// import registVC from '@/pages/regist'
// import isNeedLogin from '@/pages/isNeedLogin'
// import error from '@/pages/error'
// import planShare from '@/pages/planShare'
// import setting1 from '@/pages/shujufenxi/setting1'
// import setting2 from '@/pages/shujufenxi/setting2'
// import setting3 from '@/pages/shujufenxi/setting3'
// import setting4 from '@/pages/shujufenxi/setting4'
// import buy from '@/pages/buy'
// import pay from '@/pages/pay'
// import about from '@/pages/wo/about'
// import feeback from '@/pages/wo/feeback'
// import shouquan from '@/pages/wo/shouquan'
// import XGpwd from '@/pages/wo/XGpwd'
import PlanDetail from '@/pages/planDetail'
// import setParameter from '@/pages/setParameter'
// import test from '@/pages/test'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'isNeedLogin',
            //   component: isNeedLogin
            component: resolve => require(['@/pages/isNeedLogin'],resolve)
        },
        {
            path: '/login',
            name: 'loginVC',
            // component: loginVC
            component: resolve => require(['@/pages/login'], resolve)
        },
        {
            path: '/regist',
            name: 'registVC',
            // component: registVC
            component: resolve => require(['@/pages/regist'], resolve)
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
            // component: routerPush
            component: resolve => require(['@/pages/routerPush'], resolve),
        },
        {
            path: '/lossPwd',
            name: 'lossPwdVC',
            // component: lossPwdVC
            component: resolve => require(['@/pages/lossPwd'], resolve)
        },
        {
            path: '/lossPwd1',
            name: 'lossPwdVC1',
            // component: lossPwdVC1
            component: resolve => require(['@/pages/lossPwd1'], resolve)
        },
        {
            path: '/error',
            name: 'error',
            // component: error
            component: resolve => require(['@/pages/error'], resolve),
        },
        {
            path: '/XZcaizhong',
            name: 'XZcaizhong',
            // component: XZcaizhong
            component: resolve => require(['@/pages/XZcaizhong'], resolve),
        },
        {
            path: '/planVC/planDetail',
            name: 'PlanDetail',
            component: PlanDetail
        },
        {
            path: '/changePlan',
            name: 'changePlan',
            // component: changePlan
            component: resolve => require(['@/pages/changePlan'], resolve),
        },
        {
            path: '/shujufenxi/setting1',
            name: 'setting1',
            // component: setting1
            component: resolve => require(['@/pages/shujufenxi/setting1'], resolve),
        },
        {
            path: '/shujufenxi/setting2',
            name: 'setting2',
            // component: setting2
            component: resolve => require(['@/pages/shujufenxi/setting2'], resolve),
        },
        {
            path: '/shujufenxi/setting3',
            name: 'setting3',
            // component: setting3
            component: resolve => require(['@/pages/shujufenxi/setting3'], resolve),
        },
        {
            path: '/shujufenxi/setting4',
            name: 'setting4',
            // component: setting4
            component: resolve => require(['@/pages/shujufenxi/setting4'], resolve),
        },
        {
            path: '/wo/about',
            name: 'about',
            // component: about
            component: resolve => require(['@/pages/wo/about'], resolve),
        },
        {
            path: '/wo/feeback',
            name: 'feeback',
            // component: feeback
            component: resolve => require(['@/pages/wo/feeback'], resolve),
        },
        {
            path: '/wo/shouquan',
            name: 'shouquan',
            // component: shouquan
            component: resolve => require(['@/pages/wo/shouquan'], resolve),
        },
        {
            path: '/wo/XGpwd',
            name: 'XGpwd',
            // component: XGpwd
            component: resolve => require(['@/pages/wo/XGpwd'], resolve),
        },
        {
            path: '/buy',
            name: 'buy',
            // component: buy
            component: resolve => require(['@/pages/buy'], resolve),
        },
        {
            path: '/pay',
            name: 'pay',
            // component: pay
            component: resolve => require(['@/pages/pay'], resolve),
        },
        {
            path: '/planShare',
            name: 'planShare',
            // component: planShare
            component: resolve => require(['@/pages/planShare'], resolve),
        },

        {
            path: '/planVC/planDetail/setParameter',
            name: 'setParameter',
            // component: setParameter
            component: resolve => require(['@/pages/setParameter'], resolve),
        },
        {
            path: '/test',
            name: 'test',
            // component: test
            component: resolve => require(['@/pages/test'], resolve),
        },

    ]
})
