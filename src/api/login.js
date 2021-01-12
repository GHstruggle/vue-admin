import { request } from '@/utils/request.js';
// 获取验证码
export function getCode(data) {
  return request('/getSms/', 'post', data);
}
// 注册
export function register(data) {
  return request('/register/', 'post', data);
}

//登录
export function login(data) {
  return request('/login/', 'post', data);
}
// import server from '@/utils/axios.js';

// 获取验证码
// export function getCode(data) {
//   return server.request({
//     url: '/getSms/',
//     method: 'post',
//     data: data
//   });
// }
