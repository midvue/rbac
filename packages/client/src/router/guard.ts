import { usePermitStoreHook } from "@/store/modules/permit";
import { getToken } from "@/utils";
import { Router } from "vue-router";

export const useRouterGuard = (router: Router) => {
  const whiteRoutes = ["/login"];
  router.beforeEach(async (to, from, next) => {
    const white = whiteRoutes.includes(to.path);
    if (white || getToken()) {
      const permitStore = usePermitStoreHook();
      if (white || permitStore.asyncRouters.length > 0) {
        next();
      } else {
        try {
          await permitStore.getAsyncRoutes();
          next({ ...to, replace: true });
        } catch (error) {
          next("/login");
        }
      }
    } else {
      next("/login");
    }
  });

  router.afterEach((to) => {});
};
