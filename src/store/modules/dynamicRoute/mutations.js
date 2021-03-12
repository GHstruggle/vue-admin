import { SET_ROLES, SET_ADDROUTERS } from './mutationg-type';
export default {
  [SET_ROLES](state, val) {
    state.roles = val;
  },
  [SET_ADDROUTERS](state, router) {
    state.addRouters = router;
    state.allRouters = state.allRouters.concat(router);
  },
  SET_BUTTONPERM(state, btn) {
    state.buttonPerm = btn;
  }
};
