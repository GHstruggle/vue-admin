import router from './index';
import { getToken, removeUserName, removetoKen } from '../utils/cookies';
import store from '../store/index';

const AUTH_WHITE_LIST = ['/login']; //白名单路由

router.beforeEach((to, from, next) => {
  // token存在 放行
  if (getToken()) {
    if (to.path == '/login') {
      removeUserName();
      removetoKen();
      store.commit('login/SET_TOKEN', '');
      store.commit('login/SET_USERNAME', '');
      next();
    } else {
      // 动态路由分配
      if (store.getters['dynamicRoute/roles'].length === 0) {
        store.dispatch('dynamicRoute/getRoles').then(respones => {
          let role = respones.data.role;
          let button = respones.data.button; //按钮权限
          store.commit('dynamicRoute/SET_BUTTONPERM', button);
          console.log(respones);
          store.dispatch('dynamicRoute/createRouter', role).then(() => {
            let addRouters = store.getters['dynamicRoute/addRouters'];
            let allRouters = store.getters['dynamicRoute/allRouters'];
            // 添加动态路由
            router.addRoutes(addRouters);
            // 路由更新
            router.options.routes = allRouters;
            next({ ...to, replace: true });
          });
        });
      } else {
        next();
      }
    }
  } else {
    // token不存在
    // 跳转的页面是否在白名单，在白名单就放行
    if (AUTH_WHITE_LIST.includes(to.path)) {
      next();
    } else {
      // 不再白名单，重定向至登录页
      next('/login');
    }
  }
});
