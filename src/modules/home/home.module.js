import router from "../../shared/router";
import Home from "../home/Home";

let {routes} = router.options;
const route = routes.find(r => r.path === '/');
route.children.push({path: '', component: Home, meta: {guest: true}});
route.children.push({
  path: 'home',
  name: 'home',
  component: Home,
  alias: '/home',
  meta: {
    guest: true
  }
});
router.addRoutes([route]);
