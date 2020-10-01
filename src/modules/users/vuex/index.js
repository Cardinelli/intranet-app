import * as firebase from "firebase";

export default {
  namespaced: true,
  state: {
    users: [],
    modal: {
      show: false,
      model: {
        email: '',
        password: '',
      },
    }
  },
  actions: {
    async getUsersList({commit}) {
      let data = [];
      await firebase.firestore().collection('users').get()
        .then(snap => {
          snap.forEach(doc => {
            data.push(doc.data())
          })
        })
      commit('updateUsers', data);
    },
    showModal({commit}, payload = {}) {
      commit('showModal', payload);
    },
    hideModal({commit}) {
      commit('hideModal');
    },
  },
  mutations: {
    updateUsers(state, payload) {
      state.users = payload;
    },
    showModal(state, payload) {
      state.modal.show = true;
      state.modal.model = payload;
    },
    hideModal(state) {
      state.modal.show = false;
      state.modal.model = {};
    },
  }
}
