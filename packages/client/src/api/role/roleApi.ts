import http from "@/lib/tzAxios";
import type { Role } from "./types";

/**
 * 获取角色列表
 * @param data 参数
 */
export const getRoleList = () => {
  const option = {
    url: "/sys/role/list",
  };
  return http.get<Role[]>(option);
};
