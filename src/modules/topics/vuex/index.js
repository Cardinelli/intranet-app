import * as firebase from "firebase";

export default {
  namespaced: true,
  state: {
    topics: [],
    topic: {},
    modal: {
      show: false,
      model: {},
    },
    commentModal: {
      topicId: '',
      loading: true,
      show: false,
    }
  },
  actions: {
    getTopics({commit}) {
      let data = [];
      firebase.firestore().collection('topics').get()
        .then(snap => {
          snap.forEach(doc => {
            let dat
            dat = {...doc.data(), id: doc.id, comments: []};
            firebase.firestore().collection('comments').where('topic_id', '==', doc.id).get()
              .then(snapshot => {
                snapshot.forEach(cdoc => {
                  dat.comments.push(cdoc.data())
                })
              }).catch(error => {
              console.log(error, 'errr');
            })
            data.push(dat);
          })
        })
      commit('updateTopics', data);
    },
    getTopic({commit}, payload) {
      firebase.firestore().collection('topics').doc(payload).get()
        .then(snap => {
          let data = {...snap.data(), id: snap.id, comments: []};
          firebase.firestore().collection('comments').where('topic_id', '==', snap.id).get()
            .then(snapshot => {
              snapshot.forEach(cdoc => {
                let commentsDat = {...cdoc.data(), id: cdoc.id, display_name: ''}
                firebase.firestore().collection('users').where('__name__', '==', commentsDat.created_by).get()
                  .then(resp => {
                    resp.forEach(res => {
                      commentsDat.display_name = res.data().name + ' ' + res.data().surname;
                    })
                  })
                data.comments.push(commentsDat);
              })
            }).catch(error => {
            console.log(error, 'errr');
          })
          commit('updateTopic', data)
        })
    },
    showModal({commit}, payload = {}) {
      commit('showModal', payload);
    },
    hideModal({commit}) {
      commit('hideModal');
    },
    showCommentsModal({dispatch, commit}, payload) {
      commit('showCommentsModal', payload);
      dispatch('getTopic', payload.id);
    },
    hideCommentsModal({commit}) {
      commit('hideCommentsModal');
    },
  },
  mutations: {
    updateTopics(state, payload) {
      state.topics = payload;
    },
    updateTopic(state, payload) {
      state.commentModal.loading = true;
      state.topic = payload;
    },
    showModal(state, payload) {
      state.modal.show = true;
      state.modal.model = {...payload};
    },
    hideModal(state) {
      state.modal.show = false;
      state.modal.model = {};
    },
    showCommentsModal(state, payload) {
      state.commentModal.loading = true;
      state.commentModal.topicId = payload.id
      state.commentModal.show = true;
    },
    hideCommentsModal(state) {
      state.commentModal.show = false;
    },
  }
}
