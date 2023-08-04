import http from "@/lib/tzAxios";
import { Menu, MenuResp } from "./types";

/**
 * 分页获取菜单列表
 * @param data 参数 type=2 按钮
 */
export const getMenuPage = (data = {}) => {
  const option = {
    url: "/sys/menu/page",
    data: data,
  };
  return http.post<MenuResp>(option);
};

/**
 * 获取菜单列表
 * @param data 参数
 */
export const getMenuList = (data = {}) => {
  const option = {
    url: "/sys/menu/list",
    data: data,
  };
  return http.post<MenuResp>(option);
};

/**
 * 根据id获取菜单信息
 * @param {Menu} data 参数
 */
export const getMenuInfo = (params: unknown) => {
  const option = {
    url: "/sys/menu/info",
    params,
  };
  return http.get<Menu>(option);
};

/**
 * 更新菜单
 * @param {Menu} data 参数
 */
export const updateMenu = (data: Partial<Menu>) => {
  const option = {
    url: "/sys/menu/update",
    data,
  };
  return http.put(option);
};

/**
 * 添加菜单
 * @param {Menu} data 参数
 */
export const addMenu = (data: Partial<Menu>) => {
  const option = {
    url: "/sys/menu/create",
    data,
  };
  return http.post<Menu>(option);
};

/**
 * 删除菜单
 * @param {Menu} data 参数
 */
export const deleteMenu = (params = {}) => {
  const option = {
    url: "/sys/menu/delete",
    params,
  };
  return http.delete(option);
};

/**
 * 批量添加菜单/按钮
 * @param {Menu} data 参数
 */
export const addBatchMenu = (data: Partial<Menu>[]) => {
  const option = {
    url: "/sys/menu/batchCreate",
    data,
  };
  return http.post<Menu>(option);
};

/**
 * 获取基础按钮列表
 * @param {Btn} data 参数
 */
export const getBasicBtnList = (data = {}) => {
  const option = {
    url: "/sys/btn/list",
    data,
  };
  return http.post<MenuResp>(option);
};
