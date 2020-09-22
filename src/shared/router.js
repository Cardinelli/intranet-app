import Vue from 'vue'
import VueRouter from 'vue-router'
import {auth} from './firebase'
import AuthLayout from "@/core/components/layout/AuthLayout/AuthLayout";
import DefaultLayout from "@/core/components/layout/DefaultLayout/DefaultLayout";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/auth',
      redirect: '/login',
      component: AuthLayout,
      children: []
    },
    {
      path: '/',
      redirect: '/home',
      component: DefaultLayout,
      children: [],
    },
  ]
})


router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  if (requiresAuth && !auth.currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router;
