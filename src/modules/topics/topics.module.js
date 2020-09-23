import router from "../../shared/router";
import Topics from "@/modules/topics/Topics";

let {routes} = router.options;
const route = routes.find(r => r.path === '/');
route.children.push({path: '', component: Topics, meta: {guest: true}});
route.children.push({
  path: 'topics',
  name: 'topics',
  component: Topics,
  alias: '/topics',
  meta: {
    guest: true
  }
});
router.addRoutes([route]);
