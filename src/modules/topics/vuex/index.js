import * as firebase from "firebase";

export default {
  namespaced: true,
  state: {
    topics: [],
  },
  actions: {
    getTopics({commit}) {
      firebase.firestore().collection('topics').get()
        .then(snap => {
          let data = [];
          let datum = {};
          snap.forEach(doc => {
            datum = doc.data()
          })
          data.push(datum);
          commit('updateTopics', data);
        })
    }
  },
  mutations: {
    updateTopics(state, payload) {
      state.topics = payload;
    }
  }
}
