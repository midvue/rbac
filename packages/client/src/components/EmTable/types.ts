import type { ComponentPublicInstance, VNode } from "vue";
import type { IProps } from "./props";

export type RowScoped<T = Record<string, any>> = { row: T; $index: number };

export interface ICol<T = any> {
  id?: string;
  prop?: string;
  type?: string;
  label: string;
  width?: string | number;
  fixed?: boolean | string;
  realWidth?: number;
  minWidth?: string | number;
  sortable?: boolean | string;
  resizable?: boolean;
  columnKey?: string;
  rawColumnKey?: string;
  align?: string;
  headerAlign?: string;
  showTooltipWhenOverflow?: boolean;
  showOverflowTooltip?: boolean;
  render?: (scoped: RowScoped<T>) => JSX.Element | string | null | VNode;
  renderHeader?: (scoped: RowScoped<T>) => JSX.Element | string | null | VNode;
}

export type Cols<T = any> = Array<ICol<T>>;

interface Btn<T> {
  title: string;
  type: string;
  size?: "small" | "default" | "large";
  icon?: string;
  click?: (scoped: RowScoped<T>) => void;
  permission?: string;
}

export type IAction<T = any> = {
  buttons: Array<Btn<T>>;
  width: number;
  num?: number;
  fixed?: string;
};

export type IPagination = {
  currentPage: number;
  pageSize: number;
  pageSizes: number[];
  total: number;
};

type IRow = Record<string, any>;

export type FormExpose = {
  getSelectionRows: () => void;
  setCurrentRow: (row: IRow) => void;
  toggleRowSelection: (row: IRow, selected: boolean) => void;
  clearSort: () => Promise<void>;
  clearFilter: (columnKeys: string[]) => void;
  doLayout: () => void;
  sort: (prop: string, order: string) => void;
  scrollTo: (options: ScrollToOptions | number, yCoord?: number) => void;
  setScrollTop: (top?: string | number | undefined) => void;
  setScrollLeft: (left?: string | number | undefined) => void;
};

export type Instance = ComponentPublicInstance<IProps, FormExpose>;
