import { userRole } from '@/api/login';
import { SET_ROLES, SET_ADDROUTERS } from './mutationg-type';
import { dynamicRoute } from '@/router';
export default {
  getRoles({ commit }) {
    // 获取用户角色
    return new Promise(resolve => {
      userRole().then(response => {
        // console.log(response);
        let roleData = response.data.role;
        // console.log(roleData);
        commit(SET_ROLES, roleData);
        resolve(response);
      });
    });
  },
  // 创建动态路由
  createRouter({ commit }, data) {
    return new Promise(resolve => {
      let role = data;
      let addRouters = [];
      // 超管不用过滤
      if (role.includes('admin')) {
        addRouters = dynamicRoute;
      } else {
        // 普通
        dynamicRoute.filter(item => {
          if (role.includes(item.mate.system)) {
            return item;
          }
        });
      }
      commit(SET_ADDROUTERS, addRouters);
      resolve(addRouters);
    });
  }
};
