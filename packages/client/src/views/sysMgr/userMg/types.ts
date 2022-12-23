export interface UserResp {
  count: number;
  list: User[];
}
export interface User {
  id: number;
  account: string;
  nickname: string;
  state: number;
  phone: string;
  gender: number;
  remark: string;
  password: string;
  roleIds: number[];
  creatorid: number;
  roleName?: string;
  roleId?: string;
}

interface Role {
  id: number;
  name: string;
  pid: number;
}

export interface UserListState {
  listLoading: boolean;
  userList: User[];
  searcForm: Partial<User>;
  pagination: {
    current: number;
    size: number;
    total: number;
  };
  getSearchList?: () => void;
  roleList: Role[];
}

export type OpenDialogFunc = (isAdd: boolean, form?: Partial<User>) => void;
