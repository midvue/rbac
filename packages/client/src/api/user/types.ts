/**
 * 登陆response
 */
export interface LoginResp {
  token: string;
  refreshToken: string;
  expiresIn: string;
}

/**
 * 登陆req
 */
export interface loginReq {
  account: string;
  password: string;
}

/**
 * 权限信息
 */

export interface Role {
  roleId: number;
  roleName: string;
}

/**
 * 登陆信息
 */
export interface UserInfo {
  id: number;
  account: string;
  nickname: string;
  state: number;
  phone: string;
  gender: number;
  remark: string;
  roles: Role[];
}

export interface Menu extends EmRouteRaw {
  id: number;
  code: string;
  name: string;
  pid: number;
  url: string;
  type: number;
  icon: string;
  orderNum: number;
  keepAlive: boolean;
  isShow: boolean;
  createTime: string;
  updateTime: string;
  children?: Menu[];
  pids?: number[];
}
