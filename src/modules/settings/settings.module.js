import router from "../../shared/router";
import Settings from "@/modules/settings/Settings";

let {routes} = router.options;
const route = routes.find(r => r.path === '/');
route.children.push({path: '', component: Settings, meta: {guest: true}});
route.children.push({
  path: 'settings',
  name: 'settings',
  component: Settings,
  alias: '/settings',
  meta: {
    guest: true
  }
});
router.addRoutes([route]);
