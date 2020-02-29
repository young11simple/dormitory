// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
// import { worker } from '@/core/icons'

export const adminRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/pay/payTotal',
    children: [
      // studentInfo
      {
        path: '/studentInfo',
        name: 'studentInfo',
        redirect: '/studentInfo/search',
        component: RouteView,
        meta: { title: '学生信息', keepAlive: true, icon: 'team' },
        children: [
          {
            path: '/studentInfo/search',
            name: 'search',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: '查看学生信息', keepAlive: false }
          },
          {
            path: '/studentInfo/update',
            name: 'search',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: '更新学生信息', keepAlive: false }
          }
        ]
      },
      // pay
      {
        path: '/pay',
        name: 'pay',
        redirect: '/pay/payTotal',
        component: RouteView,
        meta: { title: '电网缴费', keepAlive: true, icon: 'property-safety', permission: ['pay'] },
        children: [
          {
            path: '/pay/SCAUNetTotal',
            name: 'SCAUNetTotal',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: '校园网信息', keepAlive: false }
          },
          {
            path: '/pay/payTotal',
            name: 'payTotal',
            component: () => import('@/views/pay/payTotal'),
            meta: { title: '用电信息', keepAlive: false, permission: ['pay'] }
          },
          {
            path: '/pay/noPayTotal',
            name: 'noPayTotal',
            component: () => import('@/views/pay/payTotal'),
            meta: { title: '缴费通知', keepAlive: false, permission: ['pay'] }
          },
          {
            path: '/pay/elePreTotal',
            name: 'elePreTotal',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: '用电预警通知', keepAlive: false, permission: ['pay'] }
          }
        ]
      },
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: RouteView,
        meta: { title: '宿舍管理', keepAlive: true, icon: 'home', permission: ['dashboard'] },
        children: [
          {
            path: '/dashboard/analysis',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: '宿舍信息添加', keepAlive: false, permission: ['dashboard'] }
          },
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: { title: '宿舍信息查看', keepAlive: true, permission: ['dashboard'] }
          },
          {
            path: '/dashboard/test-work',
            name: 'TestWork',
            component: () => import('@/views/dashboard/TestWork'),
            meta: { title: '宿舍信息删除', keepAlive: true, permission: ['dashboard'] }
          },
          {
            path: '/dashboard/test-work',
            name: 'TestWork',
            component: () => import('@/views/dashboard/TestWork'),
            meta: { title: '随机分配宿舍', keepAlive: true, permission: ['dashboard'] }
          },
          {
            path: '/dorm/test-work',
            name: 'TestWork',
            component: () => import('@/views/dashboard/TestWork'),
            meta: { title: '人工分配宿舍', keepAlive: true, permission: ['dashboard'] }
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
          }
        ]
      },
      // employee
      {
        path: '/worker',
        name: 'worker',
        redirect: '/worker/wokerMan',
        component: RouteView,
        meta: { title: '员工管理', keepAlive: true, icon: 'solution' },
        children: [
          {
            path: '/worker/wokerMan',
            name: 'wokerMan',
            component: () => import('@/views/register/visitor'),
            meta: { title: '员工信息', keepAlive: false }
          }
        ]
      },
      // account
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        meta: { title: '个人信息', icon: 'user', keepAlive: true, permission: ['user'] },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/account/center/Index'),
            meta: { title: '个人中心', keepAlive: true, permission: ['user'] }
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: '个人设置', hideHeader: true, permission: ['user'] },
            redirect: '/account/settings/base',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/base',
                name: 'BaseSettings',
                component: () => import('@/views/account/settings/BaseSetting'),
                meta: { title: '基本设置', permission: ['user'] }
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: { title: '安全设置', keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import('@/views/account/settings/Custom'),
                meta: { title: '个性化设置', keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/binding',
                name: 'BindingSettings',
                component: () => import('@/views/account/settings/Binding'),
                meta: { title: '账户绑定', keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/notification',
                name: 'NotificationSettings',
                component: () => import('@/views/account/settings/Notification'),
                meta: { title: '新消息通知', keepAlive: true, permission: ['user'] }
              }
            ]
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
    redirect: '/pay/payTotal',
    children: [
      // pay
      {
        path: '/pay',
        name: 'pay',
        redirect: '/pay/payTotal',
        component: RouteView,
        meta: { title: '用电信息', keepAlive: true, icon: 'dollar', permission: ['pay'] },
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
            meta: { title: '用电查询', keepAlive: false, permission: ['pay'] }
          },
          {
            path: '/pay/refund',
            name: 'refund',
            component: () => import('@/views/pay/refund'),
            meta: { title: '电表退费', keepAlive: false, permission: ['pay'] }
          },
          {
            path: '/pay/paySearch',
            name: 'paySearch',
            component: () => import('@/views/pay/paySearch'),
            meta: { title: '充值记录查询', keepAlive: false, permission: ['pay'] }
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
            meta: { title: '查看进度', keepAlive: false }
          }
        ]
      },
      // news
      {
        path: '/news',
        name: 'news',
        component: RouteView,
        redirect: '/news/showNews',
        meta: { title: '相关消息', icon: 'mail', keepAlive: true },
        children: [
          {
            path: '/news/showNews',
            name: 'showNews',
            component: () => import('@/views/repair/apply'),
            meta: { title: '相关消息', keepAlive: false }
          }
        ]
      },
      // account
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        meta: { title: '个人信息', icon: 'user', keepAlive: true, permission: ['user'] },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/account/center/Index'),
            meta: { title: '个人中心', keepAlive: true, permission: ['user'] }
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: '个人设置', hideHeader: true, permission: ['user'] },
            redirect: '/account/settings/base',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/base',
                name: 'BaseSettings',
                component: () => import('@/views/account/settings/BaseSetting'),
                meta: { title: '基本设置', permission: ['user'] }
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: { title: '安全设置', keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import('@/views/account/settings/Custom'),
                meta: { title: '个性化设置', keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/binding',
                name: 'BindingSettings',
                component: () => import('@/views/account/settings/Binding'),
                meta: { title: '账户绑定', keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/notification',
                name: 'NotificationSettings',
                component: () => import('@/views/account/settings/Notification'),
                meta: { title: '新消息通知', keepAlive: true, permission: ['user'] }
              }
            ]
          }
        ]
      }
    ]
  }
]

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/dashboard/workplace',
    children: [
      // pay
      {
        path: '/pay',
        name: 'pay',
        redirect: '/pay/payTotal',
        component: RouteView,
        meta: { title: '宿舍缴费', keepAlive: true, icon: 'property-safety', permission: ['pay'], roles: ['admin'] },
        children: [
          {
            path: '/pay/payTotal',
            name: 'payTotal',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: '宿舍缴费信息', keepAlive: false, permission: ['pay'], roles: ['admin'] }
          },
          {
            path: '/pay/eleTotal',
            name: 'eleTotal',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: '宿舍用电信息', keepAlive: false, permission: ['pay'], roles: ['admin'] }
          },
          {
            path: '/pay/noPayTotal',
            name: 'noPayTotal',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: '未缴费通知', keepAlive: false, permission: ['pay'], roles: ['student'] }
          },
          {
            path: '/pay/elePreTotal',
            name: 'elePreTotal',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: '用电预警通知', keepAlive: false, permission: ['pay'], roles: ['student'] }
          }
        ]
      },
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: RouteView,
        meta: { title: '宿舍管理', keepAlive: true, icon: 'home', permission: ['dashboard'], roles: ['admin'] },
        children: [
          {
            path: '/dashboard/analysis',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: '宿舍信息添加', keepAlive: false, permission: ['dashboard'], roles: ['admin'] }
          },
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: { title: '宿舍信息查看', keepAlive: true, permission: ['dashboard'], roles: ['student'] }
          },
          {
            path: '/dashboard/test-work',
            name: 'TestWork',
            component: () => import('@/views/dashboard/TestWork'),
            meta: { title: '宿舍信息删除', keepAlive: true, permission: ['dashboard'], roles: ['admin'] }
          },
          {
            path: '/dashboard/test-work',
            name: 'TestWork',
            component: () => import('@/views/dashboard/TestWork'),
            meta: { title: '随机分配宿舍', keepAlive: true, permission: ['dashboard'], roles: ['admin'] }
          },
          {
            path: '/dorm/test-work',
            name: 'TestWork',
            component: () => import('@/views/dashboard/TestWork'),
            meta: { title: '人工分配宿舍', keepAlive: true, permission: ['dashboard'], roles: ['student'] }
          }
        ]
      },

      // register
      {
        path: '/reg',
        redirect: '/reg/visitorsReg',
        component: PageView,
        meta: { title: '相关登记', icon: 'form', permission: ['reg'] },
        children: [
          {
            path: '/reg/visitorsReg',
            name: 'visitorsReg',
            component: () => import('@/views/form/BasicForm'),
            meta: { title: '访客登记', keepAlive: true, permission: ['reg'] }
          },
          {
            path: '/reg/dormJudge',
            name: 'dormJudge',
            component: () => import('@/views/form/stepForm/StepForm'),
            meta: { title: '宿舍评优', keepAlive: true, permission: ['reg'] }
          },
          {
            path: '/reg/dormClean',
            name: 'dormClean',
            component: () => import('@/views/form/advancedForm/AdvancedForm'),
            meta: { title: '卫生检查', keepAlive: true, permission: ['reg'] }
          },
          {
            path: '/reg/disobeyReg',
            name: 'disobeyReg',
            component: () => import('@/views/form/advancedForm/AdvancedForm'),
            meta: { title: '违纪登记', keepAlive: true, permission: ['reg'] }
          }
        ]
      },

      // list
      {
        path: '/list',
        name: 'list',
        component: PageView,
        redirect: '/list/table-list',
        meta: { title: '列表页', icon: 'table', permission: ['table'] },
        children: [
          {
            path: '/list/table-list/:pageNo([1-9]\\d*)?',
            name: 'TableListWrapper',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/list/TableList'),
            meta: { title: '查询表格', keepAlive: true, permission: ['table'] }
          },
          {
            path: '/list/basic-list',
            name: 'BasicList',
            component: () => import('@/views/list/StandardList'),
            meta: { title: '标准列表', keepAlive: true, permission: ['table'] }
          },
          {
            path: '/list/card',
            name: 'CardList',
            component: () => import('@/views/list/CardList'),
            meta: { title: '卡片列表', keepAlive: true, permission: ['table'] }
          },
          {
            path: '/list/search',
            name: 'SearchList',
            component: () => import('@/views/list/search/SearchLayout'),
            redirect: '/list/search/article',
            meta: { title: '搜索列表', keepAlive: true, permission: ['table'] },
            children: [
              {
                path: '/list/search/article',
                name: 'SearchArticles',
                component: () => import('../views/list/search/Article'),
                meta: { title: '搜索列表（文章）', permission: ['table'] }
              },
              {
                path: '/list/search/project',
                name: 'SearchProjects',
                component: () => import('../views/list/search/Projects'),
                meta: { title: '搜索列表（项目）', permission: ['table'] }
              },
              {
                path: '/list/search/application',
                name: 'SearchApplications',
                component: () => import('../views/list/search/Applications'),
                meta: { title: '搜索列表（应用）', permission: ['table'] }
              }
            ]
          }
        ]
      },

      // profile
      {
        path: '/profile',
        name: 'profile',
        component: RouteView,
        redirect: '/profile/basic',
        meta: { title: '详情页', icon: 'profile', permission: ['profile'] },
        children: [
          {
            path: '/profile/basic',
            name: 'ProfileBasic',
            component: () => import('@/views/profile/basic/Index'),
            meta: { title: '基础详情页', permission: ['profile'] }
          },
          {
            path: '/profile/advanced',
            name: 'ProfileAdvanced',
            component: () => import('@/views/profile/advanced/Advanced'),
            meta: { title: '高级详情页', permission: ['profile'] }
          }
        ]
      },

      // result
      {
        path: '/result',
        name: 'result',
        component: PageView,
        redirect: '/result/success',
        meta: { title: '结果页', icon: 'check-circle-o', permission: ['result'] },
        children: [
          {
            path: '/result/success',
            name: 'ResultSuccess',
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/Success'),
            meta: { title: '成功', keepAlive: false, hiddenHeaderContent: true, permission: ['result'] }
          },
          {
            path: '/result/fail',
            name: 'ResultFail',
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/Error'),
            meta: { title: '失败', keepAlive: false, hiddenHeaderContent: true, permission: ['result'] }
          }
        ]
      },

      // Exception
      {
        path: '/exception',
        name: 'exception',
        component: RouteView,
        redirect: '/exception/403',
        meta: { title: '异常页', icon: 'warning', permission: ['exception'] },
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
            meta: { title: '403', permission: ['exception'] }
          },
          {
            path: '/exception/404',
            name: 'Exception404',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
            meta: { title: '404', permission: ['exception'] }
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
            meta: { title: '500', permission: ['exception'] }
          }
        ]
      },

      // account
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        meta: { title: '个人页', icon: 'user', keepAlive: true, permission: ['user'] },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/account/center/Index'),
            meta: { title: '个人中心', keepAlive: true, permission: ['user'] }
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: '个人设置', hideHeader: true, permission: ['user'] },
            redirect: '/account/settings/base',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/base',
                name: 'BaseSettings',
                component: () => import('@/views/account/settings/BaseSetting'),
                meta: { title: '基本设置', permission: ['user'] }
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: { title: '安全设置', keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import('@/views/account/settings/Custom'),
                meta: { title: '个性化设置', keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/binding',
                name: 'BindingSettings',
                component: () => import('@/views/account/settings/Binding'),
                meta: { title: '账户绑定', keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/notification',
                name: 'NotificationSettings',
                component: () => import('@/views/account/settings/Notification'),
                meta: { title: '新消息通知', keepAlive: true, permission: ['user'] }
              }
            ]
          }
        ]
      },

      // other
      {
        path: '/other',
        name: 'otherPage',
        component: PageView,
        meta: { title: '其他组件', icon: 'slack', permission: ['dashboard'] },
        redirect: '/other/icon-selector',
        children: [
          {
            path: '/other/icon-selector',
            name: 'TestIconSelect',
            component: () => import('@/views/other/IconSelectorView'),
            meta: { title: 'IconSelector', icon: 'tool', keepAlive: true, permission: ['dashboard'] }
          },
          {
            path: '/other/list',
            component: RouteView,
            meta: { title: '业务布局', icon: 'layout', permission: ['support'] },
            redirect: '/other/list/tree-list',
            children: [
              {
                path: '/other/list/tree-list',
                name: 'TreeList',
                component: () => import('@/views/other/TreeList'),
                meta: { title: '树目录表格', keepAlive: true }
              },
              {
                path: '/other/list/edit-table',
                name: 'EditList',
                component: () => import('@/views/other/TableInnerEditList'),
                meta: { title: '内联编辑表格', keepAlive: true }
              },
              {
                path: '/other/list/user-list',
                name: 'UserList',
                component: () => import('@/views/other/UserList'),
                meta: { title: '用户列表', keepAlive: true }
              },
              {
                path: '/other/list/role-list',
                name: 'RoleList',
                component: () => import('@/views/other/RoleList'),
                meta: { title: '角色列表', keepAlive: true }
              },
              {
                path: '/other/list/system-role',
                name: 'SystemRole',
                component: () => import('@/views/role/RoleList'),
                meta: { title: '角色列表2', keepAlive: true }
              },
              {
                path: '/other/list/permission-list',
                name: 'PermissionList',
                component: () => import('@/views/other/PermissionList'),
                meta: { title: '权限列表', keepAlive: true }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
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
    path: '/test',
    component: BlankLayout,
    redirect: '/test/home',
    children: [
      {
        path: 'home',
        name: 'TestHome',
        component: () => import('@/views/Home')
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
