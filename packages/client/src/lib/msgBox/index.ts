import { ElMessageBox, ElMessageBoxOptions, MessageBoxData } from "element-plus";
import { isObject, isString } from "@/utils";
import { App, h, VNode } from "vue";

type MsgBoxType = "success" | "warning" | "info" | "error";

const confirmConfig: Record<MsgBoxType, any> = {
  success: {
    title: "成功提示",
    showConfirmButton: true,
    type: "success",
    confirmButtonText: "确定",
    cancelButtonText: "取消",
  },
  error: {
    title: "错误提示",
    showConfirmButton: true,
    type: "error",
    confirmButtonText: "确定",
    cancelButtonText: "取消",
  },
  warning: {
    title: "操作提示",
    showCancelButton: true,
    type: "warning",
    confirmButtonText: "确定",
    cancelButtonText: "取消",
  },
  info: {
    title: "信息提示",
    showCancelButton: true,
    type: "info",
    confirmButtonText: "确定",
    cancelButtonText: "取消",
  },
};

export interface EmMessageBoxOptions extends Partial<ElMessageBoxOptions> {
  render?(): VNode;
  maxHeight?: string;
}

function setElMessageBox(message: string, options: EmMessageBoxOptions) {
  const { render, maxHeight = "240px" } = options;
  delete options.render;
  delete options.maxHeight;
  return ElMessageBox({
    message: h("div", {}, [
      h("div", {
        class: "mt10",
        style: { maxHeight: maxHeight, overflowY: "auto" },
        innerHTML: message,
      }),
      render?.(),
    ]),
    ...options,
  });
}

// 合并参数
const mergeOption = (
  msgOptions: EmMessageBoxOptions,
  titleOrOption?: string | EmMessageBoxOptions,
  options?: EmMessageBoxOptions
) => {
  // if typeof titleOrOption is string
  if (isString(titleOrOption)) {
    msgOptions.title = titleOrOption;
    Object.assign(msgOptions, options);
  }
  if (isObject(titleOrOption)) {
    Object.assign(msgOptions, titleOrOption);
  }
};

export declare type MessageBoxTypedFn = (
  message: string,
  titleOrOption?: string | EmMessageBoxOptions,
  options?: EmMessageBoxOptions
) => Promise<MessageBoxData>;
export interface IEmMessageBox {
  (
    message: string,
    titleOrOption?: string | EmMessageBoxOptions,
    options?: EmMessageBoxOptions
  ): Promise<MessageBoxData>;
  success: MessageBoxTypedFn;
  warning: MessageBoxTypedFn;
  info: MessageBoxTypedFn;
  error: MessageBoxTypedFn;
  prompt: (
    message: string,
    title?: string,
    options?: EmMessageBoxOptions
  ) => Promise<MessageBoxData>;
}

/**
 * EmMessageBox 构造函数
 * @param message 消息内容
 * @param titleOrOption titile 或者 option
 * @param options  option
 */
export const EmMessageBox: IEmMessageBox = (
  message: string,
  titleOrOption?: string | EmMessageBoxOptions,
  options?: EmMessageBoxOptions
) => {
  const msgOptions = Object.assign(
    { draggable: true },
    confirmConfig.warning
  ) as EmMessageBoxOptions;
  mergeOption(msgOptions, titleOrOption, options);
  return setElMessageBox(message, msgOptions);
};

/**
 * EmMessageBox.success()
 */
EmMessageBox.success = function (
  message: string,
  titleOrOption?: string | EmMessageBoxOptions,
  options?: EmMessageBoxOptions
) {
  const msgOptions = Object.assign(
    { closeOnClickModal: false, draggable: true },
    confirmConfig.success
  ) as EmMessageBoxOptions;
  mergeOption(msgOptions, titleOrOption, options);
  return setElMessageBox(message, msgOptions);
};

/**
 * EmMessageBox.warning()
 */
EmMessageBox.warning = function (
  message: string,
  titleOrOption?: string | EmMessageBoxOptions,
  options?: EmMessageBoxOptions
) {
  const msgOptions = Object.assign(
    { closeOnClickModal: false },
    confirmConfig.warning
  ) as EmMessageBoxOptions;
  mergeOption(msgOptions, titleOrOption, options);
  return setElMessageBox(message, msgOptions);
};

/**
 * EmMessageBox.info()
 */
EmMessageBox.info = function (
  message: string,
  titleOrOption?: string | EmMessageBoxOptions,
  options?: EmMessageBoxOptions
) {
  const msgOptions = Object.assign(
    { closeOnClickModal: false },
    confirmConfig.info
  ) as EmMessageBoxOptions;
  mergeOption(msgOptions, titleOrOption, options);
  return setElMessageBox(message, msgOptions);
};

/**
 * EmMessageBox.error()
 */
EmMessageBox.error = function (
  message: string,
  titleOrOption?: string | EmMessageBoxOptions,
  options?: EmMessageBoxOptions
) {
  const msgOptions = Object.assign(
    { closeOnClickModal: false },
    confirmConfig.error
  ) as EmMessageBoxOptions;
  mergeOption(msgOptions, titleOrOption, options);
  return setElMessageBox(message, msgOptions);
};

/**
 * EmMessageBox.prompt()
 */
EmMessageBox.prompt = function (message: string, title?: string, options?: EmMessageBoxOptions) {
  const msgOptions = Object.assign(
    { closeOnClickModal: false },
    confirmConfig.info
  ) as EmMessageBoxOptions;
  mergeOption(msgOptions, options);
  return ElMessageBox.prompt(message, title, msgOptions);
};

export default {
  install(app: App) {
    //app.config.globalProperties.$msgbox = EmMessageBox;
  },
};
