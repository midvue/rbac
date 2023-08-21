import { defineStore } from "pinia";
import { store } from "..";
import { tagviewStore } from "./types";

const upperFirst = (val: string) => {
  return val.slice(0, 1).toUpperCase() + val.slice(1);
};

export const useTagViewsStore = defineStore({
  id: "tz-tag-view",
  state: (): tagviewStore => ({
    tagViews: [],
    cacheViews: [],
  }),
  getters: {
    getTagViews(): EmRouteRaw[] {
      return this.tagViews;
    },
  },
  actions: {
    addView(route: EmRouteRaw) {
      const hasAdd = this.tagViews.some((item) => item.fullPath === route.fullPath);

      if (!hasAdd) {
        if (route.meta?.keepAlive) {
          const name = upperFirst(route.name as string);
          this.cacheViews.push(name);
        }
        this.tagViews.push(route);
      }
    },

    delAllViews() {
      this.cacheViews = [];
      this.tagViews = [];
      return Promise.resolve(this.tagViews);
    },

    async delView(route: EmRouteRaw) {
      const index = this.tagViews.findIndex((item) => item.fullPath === route.fullPath);
      const name = upperFirst(route.name as string);
      const cacheIndex = this.cacheViews.indexOf(name);
      if (cacheIndex > -1) {
        this.cacheViews.splice(cacheIndex, 1);
      }
      await this.tagViews.splice(index, 1);
      return Promise.resolve(this.tagViews);
    },
  },
});

export function useTagViewsStoreHook() {
  return useTagViewsStore(store);
}
