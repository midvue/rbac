import { loginReq, UserInfo } from "@/api/user/types";
import { getInfo, login, logout } from "@/api/user/userApi";
import { resetRouter } from "@/router";
import { store } from "@/store";
import { getUserInfo, removeToken, removeUserInfo, setToken, setUserInfo } from "@/utils/storage";
import { defineStore } from "pinia";

interface userStore {
  userInfo: Partial<UserInfo> | null;
  username: string;
  token?: string;
}

export const useUserStore = defineStore({
  id: "app-user",
  state: (): userStore => ({
    userInfo: getUserInfo() || {},
    username: "vite",
    // token
    token: undefined,
  }),
  getters: {},
  actions: {
    /**
     * @description: 根据账户密码获取token
     */
    async getToken(loginReq: loginReq) {
      const res = await login(loginReq);
      if (res && res.data) {
        setToken(res.data.token);
        return await this.getInfo();
      } else {
        return res;
      }
    },
    // 根据token获取用户信息
    async getInfo() {
      return getInfo().then((res) => {
        const { data, code, msg } = res;
        this.userInfo = data;
        setUserInfo(data);
        return { msg, code };
      });
    },

    async logout() {
      return true;
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
