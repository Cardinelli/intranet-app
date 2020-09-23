export default {
  namespaced: true,
  state: {
    currentUser: null,
    loaded: false,
  },
  mutations: {
    setUser(state, payload) {
      state.currentUser = payload.user;
    }
  },
  actions: {
    saveLoggedInUser({commit}, payload) {
      commit('setUser', payload);
    }
  },

}
