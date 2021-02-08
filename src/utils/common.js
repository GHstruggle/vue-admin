import { getCategory, getCategoryAll } from '../api/news';
import { reactive } from '@vue/composition-api';
import { request } from '@/utils/request.js';
export function common() {
  /**
   *  获取分类
   */
  const categoryItems = reactive({
    items: []
  });
  const getInfoCatigory = () => {
    getCategory({}).then(response => {
      categoryItems.items = response.data.data;
    });
  };
  const getInfoCategoryAll = () => {
    getCategoryAll({}).then(response => {
      categoryItems.items = response.data;
    });
  };
  return {
    getInfoCatigory,
    getInfoCategoryAll,
    categoryItems
  };
}
export function getQiniuToken(data) {
  return request('/uploadImgToken/', 'post', data);
}
