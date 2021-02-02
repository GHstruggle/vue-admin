import { request } from '@/utils/request.js';
/**-------------------------信息管理---------------------------------------------- */
/**
 *  新增
 */
export function addInfo(data) {
  return request('/news/add/', 'post', data);
}
/**
 * 删除
 */
export function DeleteInfo(data) {
  return request('/news/deleteInfo/', 'post', data);
}
/**
 *  编辑信息
 */
export function EditInfo(data) {
  return request('/news/editInfo/', 'post', data);
}
/**
 *  获取信息列表
 */
export function getList(data) {
  return request('/news/getList/', 'post', data);
}

/**----------------------------信息分类-----------------------------------------
 *  添加一级分类
 */
export function addFirstCategory(data) {
  return request('/news/addFirstCategory/', 'post', data);
}
/**
 *  添加子级分类
 */
export function addChildrenCategory(data) {
  return request('/news/addChildrenCategory/', 'post', data);
}
/**
 *  获取信息列表 有子级分类
 */
export function getCategoryAll(data) {
  return request('/news/getCategoryAll/', 'post', data);
}
/**
 *  获取信息列表 无子级分类
 */
export function getCategory(data) {
  return request('/news/getCategory/', 'post', data);
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
