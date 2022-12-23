import { Menu } from "@/api/user/types";
import { App } from "vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useRouterGuard } from "./guard";
import Layout from "@/layout/index.vue";

const components = import.meta.glob("../views/**/*.vue");

const constRoutes: EmRouteRaw[] = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
  },
];

const errorRouter: RouteRecordRaw[] = [
  {
    path: "/redirect",
    component: () => import("@/views/redirect.vue"),
  },
  { path: "/:catchAll(.*)*", name: "noFind", redirect: "/404" },
  {
    path: "/404",
    component: () => import("@/views/404.vue"),
  },
];

const parseLocalRoutes = () => {
  const _routes = [] as EmRouteRaw[];
  const modules: Record<string, any> = import.meta.glob("../views/**/router.ts", { eager: true });
  for (const path in modules) {
    _routes.push(modules[path].default);
  }
  const firstRoute = {
    path: "/",
    redirect: _routes[0].path,
  };
  _routes.unshift(firstRoute);
  return _routes;
};

export const routes = parseLocalRoutes();

//单个menu结构转router
const menuToRoute = (menu: Partial<Menu>) => {
  const code = menu.code;
  menu.path = menu.pid === 0 ? `/${code}` : code;
  menu.component = menu.url === "Layout" ? Layout : components[`../views${menu.url}`];
  menu.meta = {
    title: menu.name,
    icon: menu.icon,
    keepAlive: menu.keepAlive,
  };
  menu.hidden = !menu.isShow;

  const toUpperName = code!.slice(0, 1).toUpperCase() + code!.slice(1);
  menu.name = toUpperName;

  delete menu.isShow;
  delete menu.pid;
  delete menu.type;
};

//菜单转成异步路由
export const generateAsyncRoutes = (list: Menu[] = []) => {
  const buttons: string[] = [];
  const _routes = list.filter((menu) => {
    //把按钮权限加入到buttons
    if (menu.type === 2) {
      buttons.push(menu.code);
    }

    //循环寻找当前menu的 直接children
    const children = list.filter((child) => {
      if (menu.id === child.pid && child.type !== 2) {
        menuToRoute(child);
        return true;
      }
      return false;
    });

    //存在就赋值
    if (children.length > 0) {
      menu.children = children;
      menu.redirect = `/${menu.code}/${children[0].path}`;
    }

    //当pid===0,代表是1级路由
    if (menu.pid === 0) {
      menuToRoute(menu);
      router.addRoute(menu as RouteRecordRaw);
      return true;
    }
    return false;
  });

  //添加第一个路由重定向
  const firstRoute = {
    path: "/",
    redirect: _routes[0].path,
  } as RouteRecordRaw;

  router.addRoute(firstRoute);
  errorRouter.forEach((item) => router.addRoute(item));
  return { buttons, _routes };
};

export const router = createRouter({
  //  History 模式
  history: createWebHistory(),
  routes: [...constRoutes] as RouteRecordRaw[],
});

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

// config router
export function useRouter(app: App<Element>) {
  app.use(router);
  useRouterGuard(router);
}
