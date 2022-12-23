import http from "@/lib/tzAxios";
import { User, UserResp } from "./types";

/**
 * 获取用户列表
 * @param data 参数
 */
export const getUserList = (data = {}) => {
  const option = {
    url: "/sys/user/page",
    data: data,
  };
  return http.post<UserResp>(option);
};

/**
 * 添加用户
 * @param {User} data 参数
 */
export const addUser = (data: Partial<User>) => {
  const option = {
    url: "/sys/user/create",
    data,
  };
  return http.post<User>(option);
};

/**
 * 更新用户
 * @param {User} data 参数
 */
export const updateUser = (data: Partial<User>) => {
  const option = {
    url: "/sys/user/update",
    data,
  };
  return http.put(option);
};

/**
 * 删除用户
 * @param {User} data 参数
 */
export const deleteUser = (data = {}) => {
  const option = {
    url: "/sys/user/delete/",
    params: data,
  };
  return http.delete(option);
};
