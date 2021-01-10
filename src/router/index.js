import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  // {
  //   path: '/',
  //   redirect: 'login',
  //   mate: {
  //     name: '主页'
  //   }
  // },
  /**
   *  登录
   */
  {
    path: '/',
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
    path: '/home',
    name: 'home',
    mate: {
      name: '控制台',
      icon: 'console'
    },
    component: () => import('../views/Home/Home.vue')
  },
  /**
   * 信息管理
   */
  {
    path: '/info',
    name: 'info',
    mate: {
      name: '信息管理',
      icon: 'info'
    },
    component: () => import('../views/Home/Home.vue'),
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
      icon: 'user'
    },
    component: () => import('../views/Home/Home.vue'),
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
  }
];

const router = new VueRouter({
  routes
});

export default router;
