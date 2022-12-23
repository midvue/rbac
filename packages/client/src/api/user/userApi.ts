import http from "@/lib/tzAxios";
import { LoginResp, Menu, UserInfo } from "./types";

/**
 * 登陆接口
 * @param data 登陆参数
 */
export const login = (data = {}) => {
  const option = {
    url: "sys/auth/token",
    data,
  };
  return http.post<LoginResp>(option);
};

/**
 * 获取用户信息
 */
export const getInfo = (params = {}) => {
  const option = {
    url: "/sys/user/info",
    params,
  };
  return http.get<UserInfo>(option);
};

/**
 * 获取用户的权限
 */
export const getMenusByRole = (data: unknown) => {
  const option = {
    url: "/sys/menu/listByRole",
    data,
  };
  return http.post<{ list: Menu[] }>(option);
};

/**
 * 退出登录
 * @param data 登陆参数
 */
export const logout = (data = {}) => {
  const option = {
    url: "/sys/auth/logout",
    data,
  };
  return http.post(option);
};
