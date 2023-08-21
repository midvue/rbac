import { App } from "vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useRouterGuard } from "./guard";
export { generateAsyncRoutes, parseLocalRoutes } from "./useAsyncMenu";

const constRoutes: EmRouteRaw[] = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
  },
];

export const router = createRouter({
  //  History 模式
  history: createWebHistory(),
  routes: [...constRoutes] as RouteRecordRaw[],
});

export function useRouter(app: App<Element>) {
  app.use(router);
  useRouterGuard(router);
}

// reset router
export const resetRouter = () => {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    // const whiteRoutes = ["/login"];
    // if (name && !whiteRoutes.includes(name as string)) {
    //   router.hasRoute(name) && router.removeRoute(name);
    // }
  });
};
