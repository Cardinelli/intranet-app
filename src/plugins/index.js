import Vue from 'vue';
import Vuex from 'vuex';
import global from './vuex/modules/global'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    global
  }
})

export {
  store,
  Vuex
}
