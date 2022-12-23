export interface ICol {
  id?: string;
  prop?: string;
  type: string;
  label: string;
  realWidth: number;
  width: string | number;
  minWidth: string | number;
  sortable: boolean | string;
  resizable: boolean;
  columnKey: string;
  rawColumnKey: string;
  align?: string;
  headerAlign: string;
  showTooltipWhenOverflow?: boolean;
  showOverflowTooltip?: boolean;
  fixed: boolean | string;
  render?: (scoped: any) => JSX.Element | string;
  renderHeader?: (scoped: any) => JSX.Element | string;
}

interface btn {
  title: string;
  type: string;
  size?: "small" | "default" | "large";
  icon?: string;
  click?: (scoped: any) => void;
  permission: string;
}

export type IAction = {
  buttons: Array<btn>;
  width: number;
  num: number;
  fixed: string;
};

export type IPagination = {
  currentPage: number;
  pageSize: number;
  pageSizes: number[];
  total: number;
};
