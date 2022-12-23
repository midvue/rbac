import { AxiosRequestConfig, AxiosResponseHeaders } from "axios";
import type { Method } from "axios";

export interface TzAxiosRequestConfig<T = any> extends AxiosRequestConfig<T> {
  url: string
}

interface TzResponseHeaders {
  "content-encoding": string,
  "content-type": string,
  "cache-control": string,
  "expires": string,
  "date": string,
  "transfer-encoding": string,
  "vary": string,
  "connection": string,
  "Pragma": string,
  "content-disposition": string,
  "last-Modified": string
}

export interface TzResponsePromise<T = any> {
  code: number,
  data: T,
  msg?: string,
  success?: string,
  notSuccess?: string,
  headers: Partial<TzResponseHeaders> & AxiosResponseHeaders;
}

export type TzAxiosPromise<T = any> = Promise<TzResponsePromise<T>>

export type TzMethod = Method
