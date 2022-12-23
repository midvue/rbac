import http from "@/lib/tzAxios";
import type { Role, RoleMenuPermit, RoleResp } from "./types";

/**
 * 分页获取角色列表
 * @param data 参数
 */
export const getRoleList = (data = {}) => {
  const option = {
    url: "/sys/role/page",
    data: data,
  };
  return http.post<RoleResp>(option);
};

/**
 * 添加角色
 * @param {Role} data 参数
 */
export const addRole = (data: Partial<Role>) => {
  const option = {
    url: "/sys/role/create",
    data,
  };
  return http.post<Role>(option);
};

/**
 * 更新角色
 * @param {Role} data 参数
 */
export const updateRole = (data: Partial<Role>) => {
  const option = {
    url: "/sys/role/update",
    data,
  };
  return http.put(option);
};

/**
 * 删除角色
 * @param {Role} data 参数
 */
export const deleteRole = (data = {}) => {
  const option = {
    url: "/sys/role/delete",
    params: data,
  };
  return http.delete(option);
};

/**
 * 根据id获取角色信息
 * @param {Role} data 参数
 */

export const getRoleInfo = (params = {}) => {
  const option = {
    url: "/sys/role/info/",
    params,
  };
  return http.get<Role>(option);
};

/**
 * 更新角色状态
 * @param {Role} data 参数
 */
export const updateRoleStatus = (data: Partial<Role>) => {
  const option = {
    url: "/sys/role/updateStatus",
    params: data,
  };
  return http.put(option);
};

/**
 * 根据id获取角色权限信息
 * @param {Role} data 参数
 */

export const getRoleMenuPermit = (params = {}) => {
  const option = {
    url: "/sys/role/roleMenuPermit",
    params,
  };
  return http.get<RoleMenuPermit>(option);
};

/**
 * 更新角色权限
 */
export const updateMenuPermit = (data: unknown) => {
  const option = {
    url: "/sys/role/updateMenuPermit",
    data,
  };
  return http.put(option);
};
