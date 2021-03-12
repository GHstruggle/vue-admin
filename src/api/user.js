import { request } from '@/utils/request.js';
/**
 *  获取用户信息
 */
export function getUserList(data) {
  return request(data.url, data.method || 'post', data.data || {});
}

/**
 *  用户添加
 */
export function addUser(data) {
  return request('/user/add/', 'post', data);
}
/**
 *  用户编辑
 */
export function userEdit(data) {
  return request('/user/edit/', 'post', data);
}
/**
 * 获取省份
 */
export function getCityPicker(data) {
  return request('/cityPicker/', 'post', data);
}
/**
 * 获取角色
 */
export function getRole(data = {}) {
  return request('/role/', 'post', data);
}
/**
 * 删除用户
 */
export function deleteUser(data) {
  return request('/user/delete/', 'post', data);
}
/**
 *  用户启用/禁用
 */
export function actives(data) {
  return request('/user/actives/', 'post', data);
}
/**
 * 按钮权限
 */
export function getPermButton(data = {}) {
  return request('/permButton/', 'post', data);
}
