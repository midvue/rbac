import { defineStore } from "pinia";
import { store } from "..";
interface SettingStore {
  title: string;
  fixedHeader: boolean;
  hiddenSideBar: boolean;
}
export const useSettingStore = defineStore({
  id: "tz-setting",
  state: (): SettingStore => {
    return {
      title: import.meta.env.VITE_APP_TITLE,
      fixedHeader: import.meta.env.VITE_APP_FIXED_HEADER,
      hiddenSideBar: import.meta.env.VITE_APP_HIDDEN_SIDE_BAR,
    };
  },
  getters: {
    getTitle(): string {
      return this.title;
    },
    getFixedHeader(): boolean {
      return this.fixedHeader;
    },
    getHiddenSideBar(): boolean {
      return this.hiddenSideBar;
    },
  },
  actions: {
    // @ts-ignore
    CHANGE_SETTING({ key, value }) {
      // eslint-disable-next-line no-prototype-builtins
      if (this.hasOwnProperty(key)) {
        //  this[key] = value;
      }
    },
    // @ts-ignore
    changeSetting(data) {
      this.CHANGE_SETTING(data);
    },
  },
});

export function useSettingStoreHook() {
  return useSettingStore(store);
}
