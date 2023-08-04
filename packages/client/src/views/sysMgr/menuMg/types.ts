export interface MenuResp {
  count: number;
  list: Menu[];
}
export interface Menu {
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
  permissions: [];
  disabled?: boolean;
}

export interface MenuListState {
  listLoading: boolean;
  menuList: Menu[];
  currNodes: Partial<Menu>[];
  currBtns: Menu[];
  menuTree: Partial<Menu>[];
}

export type OpenDialogFunc = (form?: Partial<Menu>) => void;
