// webpack 创建一个以svg 目录为上下文的require函数
import Vue from 'vue';
import SvgIcon from 'components/SvgIcon/index.vue';
// 注册svg 组件
Vue.component('svg-icon', SvgIcon);
const req = require.context('./svg', false, /\.svg$/);
// keys() 会获取所有svg 文件
const requireAll = requireContext => {
  return requireContext.keys().map(requireContext);
};
requireAll(req);
