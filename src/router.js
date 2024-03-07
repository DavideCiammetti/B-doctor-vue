import { createRouter, createWebHistory } from "vue-router";

import HomePage from "./pages/HomePage.vue";
import AdvancedSearchPage from "./pages/AdvancedSearchPage.vue";
import SearchNotFound from "../src/components/advancedSearchComponents/SearchNotFound.vue";
import DoctorDetail from "./pages/DoctorDetail.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/ricerca-avanzata",
      name: "AdvancedSearch",
      component: AdvancedSearchPage,
    },
    {
      path: "/notFound",
      name: "NotFound",
      component: SearchNotFound,
    },
    {
      path: "/doctors/:slug",
      name: "doctor-detail",
      component: DoctorDetail,
    },
  ],
});
export { router };
