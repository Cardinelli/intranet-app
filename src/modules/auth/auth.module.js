import router from "../../shared/router";
import Login from './Login.vue';


let {routes} = router.options;
const route = routes.find(r => r.path === '/auth');
route.children.push({path: '', component: Login, meta: {guest: true}});
route.children.push({
  path: 'login',
  name: 'login',
  component: Login,
  alias: '/login',
  meta: {
    guest: true
  }
});
router.addRoutes([route]);
