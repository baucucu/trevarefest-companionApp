
import { createStore } from 'framework7/lite';

const store = createStore({
  state: {
    user: {}
  },
  getters: {
    user({ state }) {
      return state.user;
    }
  },
  actions: {
    setUser({ state }, user) {
      state.user = user;
    },
  },
})
export default store;
