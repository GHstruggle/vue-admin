import { MENU_STATUS } from './mutations-types';
/**
 *  包含多个接收组件通知触发mutations调用
 */
export default {
  menuStatus: ({ commit }) => commit(MENU_STATUS) // 提交对mutations的请求
};
