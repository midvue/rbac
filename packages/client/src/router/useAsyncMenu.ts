import type { Menu } from "@/api/user/types";
import Layout from "@/layout/index.vue";
import { EnumMenuType } from "@/views/sysMgr/constant";
import type { RouteRecordRaw, Router } from "vue-router";

const components = import.meta.glob("../views/**/*.vue");

const errorRouter: RouteRecordRaw[] = [
  {
    path: "/redirect",
    component: () => import("@/views/redirect.vue"),
  },
  // { path: "/:catchAll(.*)*", name: "noFind", redirect: "/404" },
  // {
  //   path: "/404",
  //   component: () => import("@/views/404.vue"),
  // },
];

export const parseLocalRoutes = () => {
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
  const { code, icon, keepAlive, pid, isShow, children = [] } = menu;
  const path = pid === 0 ? `/${code}` : code;
  const component = menu.url === "Layout" ? Layout : components[`../views${menu.url}`];
  return {
    id: menu.id,
    path,
    name: path,
    component,
    meta: {
      title: menu.name,
      icon,
      keepAlive: !!keepAlive,
    },
    hidden: !isShow,
    children,
  } as Menu;
};

/**
 * 一位数组转成树形结构
 * @param _menus 一位菜单数组
 * @returns menutree
 */
const convertToMenuTree = (_menus: Menu[] = []) => {
  const menuTree: Menu[] = [];
  const menuMap = {} as Record<string, Menu>;
  const menuBtnMap = {} as Record<string, Record<string, Menu>>;

  const menus: Menu[] = [];
  // 将一维数组转换成以id为键的对象map
  _menus.forEach((item) => {
    if (item.type === EnumMenuType.MENU) {
      menuMap[item.id] = menuToRoute(item);
      menus.push(item);
    } else {
      if (!menuBtnMap[item.pid]) {
        menuBtnMap[item.pid] = {};
      }
      const { code, name, icon, id } = item;
      menuBtnMap[item.pid][item.code] = { code, name, icon, id } as Menu;
    }
  });

  // 构建菜单树
  menus.forEach((item) => {
    if (item.pid) {
      const parent = menuMap[item.pid];
      if (parent) {
        const menu = menuMap[item.id];
        parent.children!.push(menu);
        // 设置第一个子菜单为重定向
        if (!parent.redirect) {
          parent.redirect = `${parent.path}/${menu.path}`;
        }
      }
    } else {
      menuTree.push(menuMap[item.id]);
    }
  });

  return [menuTree, menuBtnMap] as const;
};

/**
 * 遍历 menuTree并转换按钮权限结构
 * @param menuTree {Menu} 菜单树
 * @param pid 父id
 * @returns
 */
const traverseMenuTree = (
  menuTree: Menu[],
  menuBtnMap: Record<string, Record<string, Menu>>,
  path = ""
) => {
  menuTree.forEach((menuItem) => {
    const key = path ? `${path}/${menuItem.path}` : `${menuItem.path}`;
    if (menuBtnMap[menuItem.id]) {
      menuBtnMap[key] = menuBtnMap[menuItem.id];
      delete menuBtnMap[menuItem.id];
    }
    if (menuItem.children?.length) {
      traverseMenuTree(menuItem.children, menuBtnMap, key);
    }
    delete menuItem.component;
  });
};

//菜单转成异步路由
export const generateAsyncRoutes = (list: Menu[] = [], router: Router) => {
  const [menuTree, menuBtnMap] = convertToMenuTree(list);
  //添加/根路由
  const firstRoute = {
    path: "/",
    redirect: menuTree[0].path,
  } as RouteRecordRaw;
  router.addRoute(firstRoute);

  //添加菜单路由
  menuTree.forEach((menu) => router.addRoute(menu as RouteRecordRaw));

  //添加重定向，catch路由
  errorRouter.forEach((item) => router.addRoute(item));

  //遍历菜单树，将按钮权限结构转换成以path为键的对象map
  //非纯函数，会修改原对象menuTree，menuBtnMap
  traverseMenuTree(menuTree, menuBtnMap);

  return { menuTree, menuBtnMap };
};
