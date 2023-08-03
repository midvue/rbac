import { ExtractPropTypes, type PropType } from "vue";
import type { FormItem } from "./types";

export const formProps = {
  items: {
    type: Array as PropType<FormItem[]>,
    default: () => [],
  },
  model: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({}),
  },
  labelWidth: {
    type: String,
    default: "100px",
  },
};

export type FormProps = ExtractPropTypes<typeof formProps>;
