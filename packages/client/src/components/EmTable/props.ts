import { ExtractPropTypes, PropType } from "vue";
import { IAction, ICol, IPagination } from "./types";

export const props = {
  cols: {
    type: Array as PropType<ICol[]>,
    default: () => [],
  },
  action: {
    type: Object as PropType<IAction>,
    default: () => ({
      buttons: [],
      width: 0,
      num: 4,
      fixed: "right",
    }),
  },
  pagination: {
    type: Object as PropType<IPagination>,
    default: () => ({
      currentPage: 0,
      pageSize: 20,
      pageSizes: [20, 50, 100, 200],
      total: 0,
    }),
  },
  onPageChange: {
    type: Function as PropType<(current: number, size: number) => void>,
  },
};

export type IProps = ExtractPropTypes<typeof props>;
