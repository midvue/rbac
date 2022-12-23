import { Menu } from "../menuMg/types";

export interface RoleResp {
  count: number;
  list: Role[];
}
export interface Role {
  id: number;
  code: string;
  name: string;
  pid: number;
  order: number;
  status: number;
  remark: string;
  createTime: string;
  updateTime: string;
}

export interface RoleListState {
  listLoading: boolean;
  roleList: Role[];
  searcForm: Partial<Role>;
  pagination: {
    current: number;
    size: number;
    total: number;
  };
  getSearchList?: () => void;
}

export interface RoleMenuPermit {
  list: Menu[];
  menuIds: number[];
}

export type OpenDialogFunc = (isAdd: boolean, form?: Partial<Role>) => void;

export type OpenPerrDialogFunc = (form: Partial<Role>) => void;
