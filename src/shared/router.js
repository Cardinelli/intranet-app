import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/modules/auth/Login";
import Home from "@/modules/home/Home";
import {auth} from './firebase'
import Users from "@/modules/users/Users";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: Login,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/users',
      component: Users,
      meta: {
        requiresAuth: true
      }
    }
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
