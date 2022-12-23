import { defineStore } from "pinia";
import { store } from "..";
import { DEVICE_TYPE } from "./types";

interface AppStore {
  sidebar: {
    opened: boolean,
    withoutAnimation: boolean,
    isClickHamburger: boolean
  },
  device: DEVICE_TYPE;
}

export const useAppStore = defineStore({
  id: "tz-app",
  state: (): AppStore => ({
    sidebar: {
      opened: true,
      withoutAnimation: false,
      isClickHamburger: false,
    },
    device: DEVICE_TYPE.PC,
  }),
  getters: {
    getSidebarStatus(): boolean {
      return this.sidebar.opened;
    },
    getDevice(): DEVICE_TYPE {
      return this.device;
    },
  },
  actions: {
    async toggleSideBar() {
      this.sidebar.opened = !this.sidebar.opened;
      // this.sidebar.withoutAnimation = true;
    },
    closeSideBar() {
      this.sidebar.opened = false;
    },

    toggleDevice(device: DEVICE_TYPE) {
      this.device = device;
    },
  },
});

export function useAppStoreHook() {
  return useAppStore(store);
}
