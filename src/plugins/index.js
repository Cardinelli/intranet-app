import Vue from 'vue';
import Vuex from 'vuex';
import global from './vuex/modules/global'
import users from './../modules/users/vuex/index'
import topics from './../modules/topics/vuex/index'
import dashboard from './../modules/home/vuex/index'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    global, users, topics, dashboard
  }
})

export {
  store,
  Vuex
}
