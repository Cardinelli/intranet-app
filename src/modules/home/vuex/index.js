import * as firebase from "firebase";

export default {
  namespaced: true,
  state: {
    activeUsers: 0,
    comments: 0,
    topicsCount: 0,
    latestTopic: {}
  },
  actions: {
    initializeDashboardData({commit}) {
      firebase.firestore().collection('topics').get()
        .then(snapshot => {
          commit('updateDashboardData', {topics: snapshot.docs.length});
        }).catch(error => {
        console.log(error);
      })
      firebase.firestore().collection('comments').get()
        .then(snapshot => {
          commit('updateDashboardData', {comments: snapshot.docs.length});
        }).catch(error => {
        console.log(error);
      })
      firebase.firestore().collection('users').get()
        .then(snapshot => {
          commit('updateDashboardData', {users: snapshot.docs.length});
        }).catch(error => {
        console.log(error);
      })
      firebase.firestore().collection('topics').limitToLast(1).orderBy('created_at').get()
        .then(snapshot => {
          let dat
          snapshot.forEach(doc => {
            dat = {...doc.data(), id: doc.id};
            commit('updateDashboardData', {latestTopic: dat})
          })
        })
    }
  },
  mutations: {
    updateDashboardData(state, dashboardObject) {
      if (dashboardObject.comments) {
        state.comments = dashboardObject.comments;
      } else if (dashboardObject.topics) {
        state.topicsCount = dashboardObject.topics;
      } else if (dashboardObject.users) {
        state.activeUsers = dashboardObject.users;
      } else if (dashboardObject.latestTopic) {
        state.latestTopic = dashboardObject.latestTopic;
      }
    },
  }
}
