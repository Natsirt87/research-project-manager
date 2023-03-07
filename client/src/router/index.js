import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/", redirect: "/projects"
    },
    {
      path: "/projects",
      name: "projects",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/ProjectsView.vue"),
    },
    {
      path: "/researchers",
      name: "researchers",
      component: () => import("../views/ResearchersView.vue")
    },
    {
      path: "/projects/:id",
      name: "singleProject",
      component: () => import("../views/SingleProjectView.vue")
    },
    {
      path: "/researchers/:id",
      name: "singleResearcher",
      component: () => import("../views/SingleResearcherView.vue")
    }
  ],
});

export default router;
