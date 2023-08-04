/**
 * 防抖函数
 * @param {Function} func  函数
 * @param {Number} delay  延迟执行毫秒数
 * @returns
 */
export const debounce = (func: Function, delay = 200) => {
  let timeout: number;
  return function (this: any, ...args: any) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

/**
 * @desc 函数节流
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param type 1 表时间戳版，2 表定时器版
 */
export const throttle = (func: Function, wait: number, type: 1 | 2 = 1) => {
  let previous = 0;
  let timeout: number | null;
  return function (this: any, ...args: any) {
    if (type === 1) {
      const now = Date.now();
      if (now - previous > wait) {
        func.apply(this, args);
        previous = now;
      }
    } else if (type === 2) {
      if (!timeout) {
        timeout = setTimeout(() => {
          clearTimeout(timeout as number);
          timeout = null;
          func.apply(this, args);
        }, wait);
      }
    }
  };
};

/**
 * 深拷贝
 * @param {T} target 要深拷贝的值
 */
export const deepclone = <T = any>(target: T): T => {
  if (typeof target !== "object" || target === null) return target;

  const obj = (Array.isArray(target) ? [] : {}) as T;
  for (const prop in target) {
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

/**
 * 删除对象中的某些键值对
 * @param obj  源对象
 * @param fields 需要删除的字段数组
 * @returns
 */
export function omit<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  fields: K[]
): Omit<T, K> {
  return fields.reduce((result, key) => {
    const { [key]: _, ...rest } = result;
    return rest as T;
  }, obj);
}

/**
 * 保留对象中的某些键值对,返回一个新对象
 * @param obj  源对象
 * @param fields 需要保留的字段数组
 * @returns
 */
export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result: any = {};
  for (const key of keys) {
    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key];
    }
  }
  return result;
}
