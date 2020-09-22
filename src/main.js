import Vue from 'vue'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import App from './App.vue'
import router from "./shared/router";
import {auth} from './shared/firebase'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

let app
auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App),
    }).$mount('#app')
  }
})


