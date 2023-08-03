import { ComponentPublicInstance } from "vue";
import type { FormProps } from "./props";
import type { FormItemRule } from "element-plus";

export type FormExpose = {
  clearValidate: () => void;
  validate: (name?: string | string[] | undefined) => Promise<void>;
  resetFields: () => Record<string, unknown>;
  scrollToField: (name: string, options?: boolean | ScrollIntoViewOptions | undefined) => void;
  validateField: (name?: string | string[] | undefined) => void;
};

export type FormInstance = ComponentPublicInstance<FormProps, FormExpose>;

type ItemRule = FormItemRule | FormItemRule[];

interface ItemAttr extends Record<string, any> {
  rules?: ItemRule;
}

export interface FormItem {
  /**
   * 字段名
   */
  field?: string;
  label: string;
  show?: () => boolean;
  attrs?: ItemAttr;
  render: (cell?: Record<string, any>, index?: number) => JSX.Element | string | null;
  rules?: ItemRule;
}

export declare namespace EmFormType {
  type Instance = FormInstance;
  type Items = Array<FormItem>;
}
