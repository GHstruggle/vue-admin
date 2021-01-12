import { MENU_STATUS } from './mutations-types';
import { setStorageSess } from '../../../utils/storage';
/**
 *  包含多个由actions触发去更新状态的方法对象，
 *  此方法可修改state数据
 */
export default {
  /**
   *  改方法改变菜单导航的展开收起
   */
  [MENU_STATUS](state) {
    state.isCollapse = !state.isCollapse;
    /**
     *  状态存储本地，防止每次刷新会丢失状态
     */
    setStorageSess('isCollapse', state.isCollapse);
  }
};
