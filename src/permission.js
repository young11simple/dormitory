import Vue from 'vue'
import router from './router'
import store from './store'

import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { ROLE_ID, ACCESS_TOKEN } from './store/mutation-types'
import { adminRouterMap, studentRouterMap, repairRouterMap } from '@/config/router.config'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['login', 'register', 'registerResult'] // no redirect whitelist
// const defaultRoutePath = '/management/dormInfo'

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`))
  if (Vue.ls.get(ACCESS_TOKEN) && Vue.ls.get(ROLE_ID)) {
    /* has token */
    if (to.path === '/user/login') {
      // next({ path: defaultRoutePath })
      next({ name: 'index' }) // 强制去到主页
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) {
        store.commit('SET_ROLES', { length: 10 }) // 只能加载一次
        if (Vue.ls.get(ROLE_ID) === 'admin') { // 权限
          router.addRoutes(adminRouterMap)
          store.commit('SET_ROUTERS', adminRouterMap)
          console.log('permission管理员上线')
        } else if (Vue.ls.get(ROLE_ID) === 'student') {
          router.addRoutes(studentRouterMap)
          store.commit('SET_ROUTERS', studentRouterMap)
          console.log('permission学生上线')
        } else {
          router.addRoutes(repairRouterMap)
          store.commit('SET_ROUTERS', repairRouterMap)
          console.log('permission维修人员上线')
        }
        const redirect = decodeURIComponent(to.path)
        console.log('redirect重定向')
        console.log(redirect)
        if (to.path === redirect) {
          // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          // next({ name: 'index' }) // 强制去到主页
          console.log('to.path === redirect', redirect)
          next({ ...to, replace: true })
        } else {
          // 跳转到目的路由
          // next({ name: 'index' }) // 强制去到主页
          next({ path: redirect })
        }
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.name)) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next({ path: '/user/login', query: { redirect: to.fullPath } })
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
