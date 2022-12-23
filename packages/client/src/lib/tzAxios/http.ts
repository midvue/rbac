import { getCookie } from "@/utils/cookie";
import axios, { AxiosRequestConfig } from "axios";
import { router } from "@/router";
import { getToken } from "@/utils/storage";
import { ElMessage } from "element-plus";

// const dev = process.env.NODE_ENV !== "production";
const Message = ElMessage;

const http = axios.create({
  timeout: 10000,
});
type RequestConfig = Required<AxiosRequestConfig>;
// 请求拦截拦截器
http.interceptors.request.use(
  (config) => {
    const token = getToken() || getCookie() || "";
    // 是否有局部的basicToken
    const basicToken = config.headers?.Authorization;
    if (token && !basicToken) {
      (config as RequestConfig).headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// respone拦截
http.interceptors.response.use(
  (response) => {
    const res = response.data;
    res.headers = response.headers;
    /*     if (dev) {
      console.log(res);
    } */
    if (res.code && res.code !== 0) {
      res.message && Message.error(res.message);
      return Promise.reject(res);
    } else {
      return res;
    }
  },
  (error) => {
    const data = error?.response?.data;
    if (!data) {
      if (error.message.includes("timeout of")) {
        Message.error(error.config.url + "---请求超时");
      }
      return Promise.reject(error);
    }
    switch (error.response.status) {
      case 401:
        Message.error("401 登录状态失效 " + data.msg);
        router.push({ path: "/login" });
        break;
      case 403:
        Message.error(error.response.data.message || "403异常");
        break;
      case 404:
        Message.error(error.response.data.message || "404异常");
        break;
      case 422:
        Message.error("请求参数错误");
        break;
      case 426:
        Message.error(error.response.data.msg || "请求参数错误");
        break;
      case 428:
        Message.error(error.response.data.msg || "无效的身份");
        break;
      case 500: {
        Message.error(error.response.data.message || "服务器错误");
        break;
      }
      default:
        Message.error(error.response.data.msg || "未知的情况");
        break;
    }
    return Promise.reject(error);
  }
);

export default http;
