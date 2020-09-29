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
      topicId: '',
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
          let dat
          snap.forEach(doc => {
            dat = {...doc.data(), id: doc.id, commentCount: 0};
            firebase.firestore().collection('comments').where('topic_id', '==', doc.id).get()
              .then(snapshot => {
                dat.commentCount = snapshot.docs.length
              })
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
    showCommentsModal({dispatch, state, commit}, payload) {
      commit('showCommentsModal', payload);
      dispatch('getComments', state.commentModal.topicId);
    },
    hideCommentsModal({commit}) {
      commit('hideCommentsModal');
    },
    getComments({commit, state}, payload) {
      let param
      payload ? param = payload : param = state.commentModal.topicId
      let data = [];
      firebase.firestore().collection('comments').where('topic_id', '==', param).get()
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
      commit('updateComments', data)
    }
  },
  mutations: {
    updateTopics(state, payload) {
      state.topics = payload;
    },
    updateComments(state, payload) {
      state.commentModal.comments = payload;
    },
    updateCommentsCount(state, payload) {
      state.commentModal.count = payload;
    },
    showModal(state) {
      state.modal.show = true;
    },
    hideModal(state) {
      state.modal.show = false;
    },
    showCommentsModal(state, payload) {
      state.commentModal.topicId = payload
      state.commentModal.show = true;
    },
    hideCommentsModal(state) {
      state.commentModal.show = false;
    },
  }
}
