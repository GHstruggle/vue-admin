import { request } from '@/utils/request.js';
/**
 *  添加一级分类
 */
export function addFirstCategory(data) {
  return request('/news/addFirstCategory/', 'post', data);
}

/**
 *  获取信息列表
 */
export function getInfoList(data) {
  return request('/news/getCategoryAll/', 'post', data);
}
/**
 *  删除分类
 */
export function deleteCategory(data) {
  return request('/news/deleteCategory/', 'post', data);
}
/**
 *  修改分类
 */
export function editCategory(data) {
  return request('/news/editCategory/', 'post', data);
}
