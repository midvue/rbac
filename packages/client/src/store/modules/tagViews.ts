import { defineStore } from "pinia";
import { store } from "..";
import { tagviewStore } from "./types";

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
          this.cacheViews.push(route.name as string);
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
      const index = this.tagViews.findIndex((item, i) => item.fullPath === route.fullPath);
      this.cacheViews.splice(index, 1);
      await this.tagViews.splice(index, 1);
      return Promise.resolve(this.tagViews);
    },
  },
});

export function useTagViewsStoreHook() {
  return useTagViewsStore(store);
}
