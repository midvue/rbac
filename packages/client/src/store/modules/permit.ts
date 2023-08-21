import { getMenusByRole } from "@/api/user/userApi";
import { generateAsyncRoutes, router } from "@/router";
import { store } from "@/store";
import { getUserInfo } from "@/utils";
import { defineStore } from "pinia";

interface IPermitStore {
  asyncRouters: EmRouteRaw[];
  menuBtnMap: Record<string, Record<string, EmRouteRaw>>;
}

export const usePermitStore = defineStore({
  id: "tz-permit",
  state: () => {
    return {
      // 动态路由生成的菜单
      asyncRouters: [],
      menuBtnMap: {},
    } as IPermitStore;
  },

  actions: {
    // 获取异步路由菜单
    async getAsyncRoutes() {
      const roleIds = getUserInfo()?.roles.map((role) => role.roleId);
      const list = await getMenusByRole({ roleIds }).then((res) => res.data.list);
      const { menuTree, menuBtnMap } = generateAsyncRoutes(list, router);
      this.menuBtnMap = menuBtnMap;
      this.asyncRouters = menuTree;
      return menuTree;
    },
  },
});

export function usePermitStoreHook() {
  return usePermitStore(store);
}
