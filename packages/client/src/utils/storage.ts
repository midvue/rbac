import { UserInfo } from "@/api/user/types";

const USER_ID_KEY = "tz_userId"; // uid
const TOKEN_KEY = "tz_token"; // token
const USER_INFO_KEY = "tz_user_info"; // 用户信息
const PERMISSION_KEY = "tz_permission"; // 用户信息

interface Storage {
  [key: string]: any;
}
type StorageType = Storage | string;

// 设置UserToken
export function setToken(token: string) {
  set(TOKEN_KEY, token);
}

// 设置UserId
export function setUserId(id: string) {
  set(USER_ID_KEY, id);
}

// 设置userInfo
export function setUserInfo(userInfo: StorageType) {
  set(USER_INFO_KEY, userInfo);
}

// 设置权限 Permission
export function setPermission(data: StorageType) {
  return set(PERMISSION_KEY, data);
}

/* *************************** get ********************************** */

/**
 * 获取Token
 */
export function getToken() {
  return get(TOKEN_KEY) as string | null;
}

// 获取 USER_ID
export function getUserId() {
  return get(USER_ID_KEY) as string | null;
}

// 获取 USER_Info
export function getUserInfo() {
  return get(USER_INFO_KEY) as UserInfo | null;
}
// 获取权限 Permission
export function getPermission() {
  return get(PERMISSION_KEY) as Record<string, any> | null;
}

/* ****************************** remove ******************************* */

// 删除token
export function removeToken() {
  remove(TOKEN_KEY);
}

// 删除UID
export function removeUserId() {
  remove(USER_ID_KEY);
}

// 删除UINFO
export function removeUserInfo() {
  remove(USER_INFO_KEY);
}

/* ****************************** 包装方法 ******************************* */

export function set(key: string, content: StorageType) {
  // @ts-ignore
  if (!content && content !== 0) return;
  if (typeof content === "object") {
    content = JSON.stringify(content);
  }
  localStorage.setItem(key, content);
}

export function get(key: string): null | string | Record<string, any> {
  const info = localStorage.getItem(key);
  if (!info) return info;
  try {
    return JSON.parse(info);
  } catch (error) {
    return info;
  }
}
export function remove(key: string) {
  localStorage.removeItem(key);
}
export function clear() {
  localStorage.clear();
}

export default {
  setToken,
  getToken,
  removeToken,
  setUserId,
  getUserId,
  removeUserId,
  setUserInfo,
  getUserInfo,
  removeUserInfo,
  setPermission,
  getPermission,
  set,
  get,
  remove,
  clear,
};
