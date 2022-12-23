import { getMenusByRole } from "@/api/user/userApi";
import { generateAsyncRoutes } from "@/router";
import { store } from "@/store";
import { getUserInfo } from "@/utils";
import { defineStore } from "pinia";

interface IPermitStore {
  asyncRouters: EmRouteRaw[];
  cacheViews: string[];
  wholeMenus: EmRouteRaw[];
  buttons: string[];
}

export const usePermitStore = defineStore({
  id: "tz-permit",
  state: () => {
    return {
      // 动态路由生成的菜单
      asyncRouters: [],
      // 整体路由生成的菜单（静态、动态）
      wholeMenus: [],
      // 深拷贝一个菜单树，与导航菜单不突出
      menusTree: [],
      buttons: [],
      // 缓存页面keepAlive
      cacheViews: [],
    } as IPermitStore;
  },

  actions: {
    // 获取异步路由菜单
    async getAsyncRoutes() {
      const roleIds = getUserInfo()?.roles.map((role) => role.roleId);
      const list = await getMenusByRole({ roleIds }).then((res) => res.data.list);
      const { _routes, buttons } = generateAsyncRoutes(list);
      this.buttons = buttons;
      this.asyncRouters = _routes;
      return _routes;
    },

    // 清空缓存页面
    clearAllCachePage() {
      this.cacheViews = [];
    },
  },
});

export function usePermitStoreHook() {
  return usePermitStore(store);
}
