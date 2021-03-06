// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout } from '@/layouts'

export const adminRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/account/base',
    children: [
      // management
      {
        path: '/management',
        name: 'management',
        redirect: '/management/dormInfo',
        component: RouteView,
        meta: { title: '学生宿舍', keepAlive: true, icon: 'home' },
        children: [
          {
            path: '/management/dormInfo',
            name: 'dormInfo',
            component: () => import('@/views/management/dormInfo'),
            meta: { title: '学生宿舍信息', keepAlive: true }
          },
          {
            path: '/management/allocation',
            name: 'allocation',
            component: () => import('@/views/management/allocation'),
            meta: { title: '学生宿舍分配', keepAlive: true }
          },
          {
            path: '/management/cancellation',
            name: 'cancellation',
            component: () => import('@/views/management/cancellation'),
            meta: { title: '修改学生信息', keepAlive: true }
          }
        ]
      },
      // register
      {
        path: '/register',
        name: 'register',
        redirect: '/register/visitor',
        component: RouteView,
        meta: { title: '相关登记', keepAlive: true, icon: 'form' },
        children: [
          {
            path: '/registor/visitor',
            name: 'visitor',
            component: () => import('@/views/register/visitor'),
            meta: { title: '访客登记', keepAlive: false }
          },
          {
            path: '/registor/disobey',
            name: 'disobey',
            component: () => import('@/views/register/disobey'),
            meta: { title: '违纪登记', keepAlive: false }
          },
          {
            path: '/registor/check',
            name: 'check',
            component: () => import('@/views/register/check'),
            meta: { title: '卫生检查', keepAlive: false }
          },
          {
            path: '/registor/checkDorm',
            name: 'checkDorm',
            component: () => import('@/views/register/checkDorm'),
            meta: { title: '查寝登记', keepAlive: false }
          },
          {
            path: '/registor/judgeDorm',
            name: 'judgeDorm',
            component: () => import('@/views/register/judgeDorm'),
            meta: { title: '宿舍评比', keepAlive: false }
          }
        ]
      },
      // pay
      {
        path: '/pay',
        name: 'pay',
        redirect: '/pay/eleTotal',
        component: RouteView,
        meta: { title: '电网信息', keepAlive: true, icon: 'property-safety' },
        children: [
          {
            path: '/pay/eleTotal',
            name: 'eleTotal',
            component: () => import('@/views/pay/adEleCheck'),
            meta: { title: '用电信息', keepAlive: false }
          }
          // {
          //   path: '/pay/eleTotalAnalyse',
          //   name: 'eleTotalAnalyse',
          //   component: () => import('@/views/pay/eleTotalAnalyse'),
          //   meta: { title: '用电统计', keepAlive: false }
          // }
        ]
      },
      // employee
      // {
      //   path: '/worker',
      //   name: 'worker',
      //   redirect: '/worker/wokerInfo',
      //   component: RouteView,
      //   meta: { title: '员工管理', keepAlive: true, icon: 'solution' },
      //   children: [
      //     {
      //       path: '/worker/wokerInfo',
      //       name: 'wokerInfo',
      //       component: () => import('@/views/worker/workerInfo'),
      //       meta: { title: '员工信息', keepAlive: false }
      //     }
      //   ]
      // },
      // account
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/base',
        name: 'account',
        meta: { title: '个人信息', icon: 'user', keepAlive: true, permission: ['user'] },
        children: [
          {
            path: '/account/base',
            name: 'BaseSettings',
            component: () => import('@/views/account/settings/adminBaseSetting'),
            meta: { title: '基本信息', permission: ['user'] }
          },
          {
            path: '/account/security',
            name: 'SecuritySettings',
            component: () => import('@/views/account/settings/Security'),
            meta: { title: '密码设置', keepAlive: true, permission: ['user'] }
          }
        ]
      }
    ]
  }
]

export const studentRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/account/base',
    children: [
      // pay
      {
        path: '/pay',
        name: 'pay',
        redirect: '/pay/payTotal',
        component: RouteView,
        meta: { title: '用电信息', keepAlive: true, icon: 'dollar' },
        children: [
          {
            path: '/pay/payTotal',
            name: 'payTotal',
            component: () => import('@/views/pay/payTotal'),
            meta: { title: '电表充值', keepAlive: false }
          },
          {
            path: '/pay/eleSearch',
            name: 'eleSearch',
            component: () => import('@/views/pay/eleSearch'),
            meta: { title: '用电查询', keepAlive: false }
          },
          {
            path: '/pay/paySearch',
            name: 'paySearch',
            component: () => import('@/views/pay/paySearch'),
            meta: { title: '充值记录查询', keepAlive: false }
          }
        ]
      },
      // repair
      {
        path: '/repair',
        name: 'repair',
        component: RouteView,
        redirect: '/repair/apply',
        meta: { title: '宿舍报修', icon: 'tool', keepAlive: true },
        children: [
          {
            path: '/repair/apply',
            name: 'apply',
            component: () => import('@/views/repair/apply'),
            meta: { title: '报修申请', keepAlive: false }
          },
          {
            path: '/repair/showProgress',
            name: 'showProgress',
            component: () => import('@/views/repair/showProgress'),
            meta: { title: '报修记录', keepAlive: false }
          }
        ]
      },
      // news
      {
        path: '/news',
        name: 'news',
        component: RouteView,
        redirect: '/news/disobeyNews',
        meta: { title: '相关消息', icon: 'mail', keepAlive: true },
        children: [
          {
            path: '/news/disobeyNews',
            name: 'disobeyNews',
            component: () => import('@/views/studentInfo/disobeyNews'),
            meta: { title: '违纪消息', keepAlive: false }
          },
          {
            path: '/news/checkNews',
            name: 'checkNews',
            component: () => import('@/views/studentInfo/checkNews'),
            meta: { title: '卫生结果消息', keepAlive: false }
          }
        ]
      },
      // account
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/base',
        name: 'account',
        meta: { title: '个人信息', icon: 'user', keepAlive: true },
        children: [
          {
            path: '/account/base',
            name: 'BaseSettings',
            component: () => import('@/views/account/settings/studentBaseSetting'),
            meta: { title: '基本信息', permission: ['user'] }
          },
          {
            path: '/account/security',
            name: 'SecuritySettings',
            component: () => import('@/views/account/settings/Security'),
            meta: { title: '密码设置', keepAlive: true, permission: ['user'] }
          }
        ]
      }
    ]
  }
]

export const repairRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/repair/generateOrder',
    children: [
      {
        path: '/repair',
        name: 'repair',
        redirect: '/repair/generateOrder',
        component: RouteView,
        meta: { title: '订单管理', icon: 'tool', keepAlive: true },
        children: [
          {
            path: '/repair/generateOrder',
            name: 'generateOrder',
            component: () => import('@/views/repair/generateOrder'),
            meta: { title: '未接订单' }
          },
          {
            path: '/repair/orderUnfinish',
            name: 'orderUnfinish',
            component: () => import('@/views/repair/orderUnfinish'),
            meta: { title: '未完成订单' }
          },
          {
            path: '/repair/orderFinished',
            name: 'orderFinished',
            component: () => import('@/views/repair/orderFinished'),
            meta: { title: '已完成订单' }
          }
        ]
      },
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/base',
        name: 'account',
        meta: { title: '个人信息', icon: 'user', keepAlive: true },
        children: [
          {
            path: '/account/base',
            name: 'BaseSettings',
            component: () => import('@/views/account/settings/repairBaseSetting'),
            meta: { title: '基本信息' }
          },
          {
            path: '/account/security',
            name: 'SecuritySettings',
            component: () => import('@/views/account/settings/Security'),
            meta: { title: '密码设置', keepAlive: true }
          }
        ]
      }
    ]
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
