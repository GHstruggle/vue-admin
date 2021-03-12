import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
export const defaultRoute = [
  {
    path: '/',
    redirect: 'login',
    hide: true, // 过滤当前路由显示
    mate: {
      name: '主页'
    }
  },
  /**
   *  登录
   */
  {
    path: '/login',
    name: 'login',
    hide: true, // 过滤当前路由显示
    mate: {
      name: '登录'
    },
    component: () => import('../views/Login/Login.vue')
  },
  /**
   *  主页
   */
  {
    path: '/console',
    name: 'console',
    mate: {
      name: '控制台',
      icon: 'console'
    },
    component: () => import('../views/console/console.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        mate: {
          name: '首页'
        },
        component: () => import('../views/console/Home.vue')
      }
    ]
  },
  // 404
  {
    path: '/404',
    hide: true, // 过滤当前路由显示
    mate: {
      name: '404',
      icon: 'console'
    },
    component: () => import('../views/console/console.vue'),
    children: [
      {
        path: '/404',
        mate: {
          name: '404'
        },
        component: () => import('@/404.vue')
      }
    ]
  }
];
const routes = [...defaultRoute];

export const dynamicRoute = [
  /**
   * 信息管理
   */
  {
    path: '/info',
    name: 'info',
    mate: {
      name: '信息管理',
      icon: 'info',
      system: 'infoSystem'
    },
    component: () => import('../views/console/console.vue'),
    children: [
      {
        path: '/infoList',
        name: 'infoList',
        mate: {
          name: '信息列表'
        },
        component: () => import('../views/Info/InfoList')
      },
      {
        path: '/infoCategory',
        name: 'infoCategory',
        mate: {
          name: '信息分类'
        },
        component: () => import('../views/Info/InfoCategory')
      },
      {
        path: '/infoDetail',
        name: 'infoDetail',
        mate: {
          name: '信息详情',
          hide: true // 过滤当前路由显示
        },
        component: () => import('../views/Info/infoDetail')
      }
    ]
  },
  /**
   *  用户管理
   */
  {
    path: '/userAdminister',
    name: 'userAdminister',
    mate: {
      name: '用户管理',
      icon: 'user',
      system: 'userSystem'
    },
    component: () => import('../views/console/console.vue'),
    children: [
      {
        path: '/administerList',
        name: 'administerList',
        mate: {
          name: '用户列表'
        },
        component: () => import('../views/UserAdminister/AdministerList')
      }
    ]
  },
  { path: '*', redirect: '/404', hide: true }
];

const router = new VueRouter({
  routes
});

export default router;
