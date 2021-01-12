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
      next();
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
