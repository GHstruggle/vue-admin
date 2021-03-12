import { login, logout } from '@/api/login.js';
import { SET_TOKEN, SET_USERNAME } from './mutations-type';
import { setToken, setUserName, removetoKen, removeUserName } from '../../../utils/cookies';
export default {
  /**
   *  登录
   */
  userLogin({ commit }, requestData) {
    return new Promise((resolve, reject) => {
      login(requestData)
        .then(res => {
          commit(SET_TOKEN, res.data.token); // 触发mutations对象中方法间接把数据存储state
          commit(SET_USERNAME, res.data.username);
          setToken(res.data.token); // 存储token
          setUserName(res.data.username); // 存储用户名/cookie
          resolve(res);
        })
        .catch(error => reject(error));
    });
  },
  /**
   *  退出
   */
  async exit({ commit }) {
    return new Promise(resolve => {
      logout().then(res => {
        removetoKen();
        removeUserName();
        commit(SET_TOKEN, '');
        commit(SET_USERNAME, '');
        resolve(res);
      });
    }).catch(error => error);
  }
};
