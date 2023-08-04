import http from "@/lib/tzAxios";
import { Btn, BtnResp } from "./types";

/**
 * 获取按钮列表
 * @param data 参数
 */
export const getBtnList = (data = {}) => {
  const option = {
    url: "/sys/btn/page",
    data: data,
  };
  return http.post<BtnResp>(option);
};

/**
 * 添加按钮
 * @param {Btn} data 参数
 */
export const addBtn = (data: Partial<Btn>) => {
  const option = {
    url: "/sys/btn/create",
    data,
  };
  return http.post<Btn>(option);
};

/**
 * 更新按钮
 * @param {Btn} data 参数
 */
export const updateBtn = (data: Partial<Btn>) => {
  const option = {
    url: "/sys/btn/update",
    data,
  };
  return http.put(option);
};

/**
 * 删除按钮
 * @param {Btn} data 参数
 */
export const deleteBtn = (data = {}) => {
  const option = {
    url: "/sys/btn/delete/",
    params: data,
  };
  return http.delete(option);
};
