import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/modules/auth/Login";
import Home from "@/modules/home/Home";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: Login,
      children: []
    },
    {
      path: '/',
      component: Home,
      children: []
    }
  ]
})

export default router;
