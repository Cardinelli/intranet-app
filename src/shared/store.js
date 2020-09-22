import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'


Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    authError: null,
    loading: false,
    user: null
  },
  getters: {
    user: state => {
      return state.user;
    },
    loading: state => {
      return state.loading;
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    setLoading(state, payload) {
      state.loading = payload
    },
    setError(state, payload) {
      state.authError = payload
    }
  },
  actions: {
    actionLogin({commit}, payload) {
      commit('setLoading', true);
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false);
            const newUser = {
              id: user.user.uid
            };
            commit('setUser', newUser);
          }
        ).catch(error => {
          commit('setLoading', false);
          commit('setError', error);
      })
    }
  }





})
