import * as firebase from "firebase";

export default {
  namespaced: true,
  state: {
    topics: [],
    modal: {
      show: false,
      object: null,
    },
    commentModal: {
      show: false,
      object: null
    }
  },
  actions: {
    getTopics({commit}) {
      let data = [];
      firebase.firestore().collection('topics').get()
        .then(snap => {
          snap.forEach(doc => {
            data.push(doc.data());
          })
        })
      commit('updateTopics', data);
    },
    showModal({commit}) {
      commit('showModal');
    },
    hideModal({commit}) {
      commit('hideModal');
    },
    showCommentsModal({commit}) {
      commit('showCommentsModal')
    },
    hideCommentsModal({commit}) {
      commit('hideCommentsModal');
    },
  },
  mutations: {
    updateTopics(state, payload) {
      state.topics = payload;
    },
    showModal(state) {
      state.modal.show = true;
    },
    hideModal(state) {
      state.modal.show = false;
    },
    showCommentsModal(state) {
      state.commentModal.show = true;
    },
    hideCommentsModal(state) {
      state.commentModal.show = false;
    },
  }
}
