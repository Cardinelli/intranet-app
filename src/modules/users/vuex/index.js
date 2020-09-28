import * as firebase from "firebase";

export default {
  namespaced: true,
  state: {
    users: [],
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

    }
  },
  mutations: {
    updateUsers(state, payload) {
      state.users = payload;
    }
  }
}
