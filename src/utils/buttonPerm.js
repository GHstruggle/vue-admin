import store from '@/store/index';
export function buttonPerm(parmas) {
  // console.log(store.getters['dynamicRoute/buttonPerm']);
  return store.getters['dynamicRoute/buttonPerm'].includes(parmas);
}
