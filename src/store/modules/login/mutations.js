import { SET_TOKEN, SET_USERNAME } from './mutations-type';
export default {
  [SET_TOKEN](state, value) {
    state.to_ken = value;
  },
  [SET_USERNAME](state, value) {
    state.user_name = value;
  }
};
