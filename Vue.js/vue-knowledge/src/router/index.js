import Vue from "vue";
import Router from "vue-router";
import Home from "@/pages/home/Home";
import VueRouter from "@/pages/vue_router/VueRouter";
import ComponentsDynamicAsync from "@/pages/vue_components/components-dynamic-async/components-dynamic-async";

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/vue-router",
    name: "VueRouter",
    component: VueRouter
  },
  {
    path: "/components-dynamic-async",
    name: "components-dynamic-async",
    component: ComponentsDynamicAsync
  }
];

export default new Router({
  routes
});
