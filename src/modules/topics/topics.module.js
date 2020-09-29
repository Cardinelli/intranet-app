import router from "../../shared/router";
import Topics from "@/modules/topics/Topics";
import TopicsView from "@/modules/topics/views/TopicsView";

let {routes} = router.options;
const route = routes.find(r => r.path === '/');


let tmpRoutes = [{
  path: 'topics',
  name: 'topics',
  component: Topics,
  meta: {
    requiresAuth: true
  }
}, {
  path: 'topics/view/:id',
  name: 'topics.view',
  component: TopicsView,
  redirect: 'topics/view/:id/details',
  meta: {
    requiresAuth: true
  },
  children: [
    {
      path: 'view',
      name: 'topics.view',
      component: TopicsView
    }
  ]
}];

tmpRoutes.forEach((obj) => {
  route.children.push(obj);
})

// route.children.push({path: '', component: Topics, meta: {guest: true}});


// route.children.push({
//   path: 'topics',
//   name: 'topics',
//   component: Topics,
//   alias: '/topics',
//   meta: {
//     guest: true
//   }
// });

router.addRoutes([route]);
