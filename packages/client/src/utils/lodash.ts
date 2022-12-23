/* eslint-disable  */

/**
 * 防抖函数
 * @param {*} func  函数
 * @param {*} delay  延迟执行毫秒数
 * @returns
 */
export const debounce = (func: Function, delay: number = 200) => {
  let timeout: NodeJS.Timeout;
  return function (this: any) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, arguments);
    }, delay);
  };
};

/**
 * @desc 函数节流
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param type 1 表时间戳版，2 表定时器版
 */
export const throttle = (func: Function, wait: number, type: number) => {
  if (type === 1) {
    var previous = 0;
  } else if (type === 2) {
    var timeout: NodeJS.Timeout | null;
  }
  return function (this: any) {
    const context = this;
    const args = arguments;
    if (type === 1) {
      const now = Date.now();
      if (now - previous > wait) {
        func.apply(context, args);
        previous = now;
      }
    } else if (type === 2) {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null;
          func.apply(context, args);
        }, wait);
      }
    }
  };
};

/**
 * 深拷贝
 * @param {Object} target 要深拷贝的值
 */
export let deepclone = (target: Object | any[]) => {
  if (typeof target !== "object" || target === null) return target;

  let obj;
  if (!Array.isArray) {
    Array.isArray = function (arg): arg is any[] {
      return Object.prototype.toString.call(arg) === "[object Array];";
    };
  }
  if (Array.isArray(target)) {
    obj = [];
  } else {
    obj = {};
  }
  for (let prop in target) {
    if (target.hasOwnProperty(prop)) {
      if (typeof target === "object") {
        obj[prop] = deepclone(target[prop]);
      } else {
        obj[prop] = target[prop];
      }
    }
  }
  return obj;
};
