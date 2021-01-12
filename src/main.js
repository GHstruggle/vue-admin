import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueCompositionApi from '@vue/composition-api';
import '@/icons/index.js';
import '@/router/routerGuard.js';
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueCompositionApi);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
