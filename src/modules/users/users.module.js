import router from "../../shared/router";
import Users from "@/modules/users/Users";

let {routes} = router.options;
const route = routes.find(r => r.path === '/');
route.children.push({path: '', component: Users, meta: {guest: true}});
route.children.push({
  path: 'users',
  name: 'users',
  component: Users,
  alias: '/users',
  meta: {
    guest: true
  }
});
router.addRoutes([route]);
