export interface BtnResp {
  count: number;
  list: Btn[];
}
export interface Btn {
  id: number;
  name: string;
  code: string;
  icon: string;
  orderNum: number;
  remark: string;
  creatorid: string;
  createtime: string;
  updatorid: string;
  updatetime: string;
}

export interface BtnListState {
  listLoading: boolean;
  btnList: Btn[];
  searcForm: Partial<Btn>;
  pagination: {
    current: number;
    size: number;
    total: number;
  };
  getSearchList?: () => void;
}

export type OpenDialogFunc = (form?: Partial<Btn>) => void;
