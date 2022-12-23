/**
 * axios二次封装,处理了一些公共参数,token,key加密相关处理
 * 可根据自己个人习惯,删除修改
 */

import http from "./http";
import config from "./config";
import { copyObject } from "./utils";
import type { TzAxiosPromise, TzAxiosRequestConfig } from "./type";

/**
 * 参数转化,主要处理公共参数,md5等验签加密
 * @param {TzAxiosRequestConfig} params  加密前的对象
 * @returns {TzAxiosRequestConfig} 加密后的数据
 */
const paramsConvert = (params: TzAxiosRequestConfig) => {
  return copyObject(params, config.defaultParams());
};

/**
 * httpClient发送axios请求
 * @param {Object} option  //参数
 */
const httpClient = (option: TzAxiosRequestConfig) => {
  option.data = paramsConvert(option.data);
  option.baseURL = config.baseUrl;
  option.headers = Object.assign({}, config.defaultHeaders(), option.headers);
  return http(option);
};

export const getUrl = (url: string): string => {
  const regex2 = /\{(.+?)\}/g; // {} 大括号及内容
  const reg2 = /[^{}]*\{(.*)\}[^}]*/; // 匹配{}
  if (regex2.test(url)) {
    const domainName = url.match(regex2)?.[0].replace(reg2, "$1") || "";
    url = url.replace(regex2, config.domain[domainName]);
  }
  return url;
};

// 这里只是简单粗暴封装,可以自行抽离
const tzAxiosInstance = {
  /**
   * get请求
   * @param {TzAxiosRequestConfig} option 参数
   * @returns {TzAxiosRequestConfig<T>} 返回值
   */
  get: <T>(option: TzAxiosRequestConfig): TzAxiosPromise<T> => {
    option.url = getUrl(option.url);
    option.method = "get";
    return httpClient(option) as unknown as TzAxiosPromise;
  },

  /**
   * delete请求
   * @param {TzAxiosRequestConfig} option 参数
   * @returns {TzAxiosRequestConfig<T>} 返回值
   */
  delete: <T>(option: TzAxiosRequestConfig): TzAxiosPromise<T> => {
    option.url = getUrl(option.url);
    option.method = "delete";
    return httpClient(option) as unknown as TzAxiosPromise;
  },

  /**
   * post请求
   * @param {TzAxiosRequestConfig} option 参数
   * @returns {TzAxiosRequestConfig<T>} 返回值
   */
  post: <T>(option: TzAxiosRequestConfig): TzAxiosPromise<T> => {
    option.url = getUrl(option.url);
    option.method = "post";
    return httpClient(option) as unknown as TzAxiosPromise;
  },
  /**
   * put请求,参数默认在body中
   * @param {TzAxiosRequestConfig} option 参数
   * @returns {TzAxiosRequestConfig<T>} 返回值
   */
  put: <T>(option: TzAxiosRequestConfig): TzAxiosPromise<T> => {
    option.url = getUrl(option.url);
    option.method = "put";
    return httpClient(option) as unknown as TzAxiosPromise;
  },

  /**
   * 文件上传默认使用表单上传
   * @param {string} url  api路由
   * @param {Object} params 参数
   */
  upload: <T>(url: string, params: any): TzAxiosPromise<T> => {
    const param = new FormData();
    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        param.append(key, params[key]);
      }
    }
    const option = {} as TzAxiosRequestConfig;
    option.data = params;
    option.url = getUrl(url);
    option.method = "put";
    return httpClient(option) as unknown as TzAxiosPromise;
  },
};
export default tzAxiosInstance;
