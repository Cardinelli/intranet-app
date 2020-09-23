import * as firebase from "firebase";

export default {
  namespaced: true,
  state: {
    users: [],
  },
  actions: {
    getUsersList({commit}) {
      firebase.firestore().collection('users').get()
        .then(snap => {
          let data = [];
          let datum = {};
          snap.forEach(doc => {
            datum = doc.data()
          })
          data.push(datum);
          commit('updateUsers', data);
        })
    }
  },
  mutations: {
    updateUsers(state, payload) {
      state.users = payload;
    }
  }
}
