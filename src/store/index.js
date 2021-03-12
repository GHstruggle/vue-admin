import Vue from 'vue';
import Vuex from 'vuex';

import meuns from './modules/menus/index';
import login from './modules/login/index';
import dynamicRoute from './modules/dynamicRoute/index';

Vue.use(Vuex);
const store = new Vuex.Store({
  /**
   *  存储变量
   */
  state: {},
  /**
   *  定义修改state方法
   */
  mutations: {},
  /**
   *  异步调用mutations
   */
  actions: {},
  /**
   *  将数据过滤输出
   */
  getters: {},
  modules: {
    meuns,
    login,
    dynamicRoute
  }
});
export default store;
