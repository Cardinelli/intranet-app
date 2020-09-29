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
      comments: [],
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
            let dat = {...doc.data(), id: doc.id};
            data.push(dat);
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
    showCommentsModal({commit}, payload) {
      let data = [];
      firebase.firestore().collection('comments').where('topic_id', '==', payload).get()
        .then(response => {
          response.forEach(doc => {
            let dat = {...doc.data(), id: doc.id};
            firebase.firestore().collection('users').where('__name__', '==', dat.created_by).get()
              .then(resp => {
                resp.forEach(res => {
                  dat.created_by = res.data().name + ' ' + res.data().surname;
                })
              })
            data.push(dat);
          })
        })
      commit('showCommentsModal', data)
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
    showCommentsModal(state, payload) {
      state.commentModal.comments = payload;
      state.commentModal.show = true;
    },
    hideCommentsModal(state) {
      state.commentModal.show = false;
    },
  }
}
