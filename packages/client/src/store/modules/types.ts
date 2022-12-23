/**
 * Enum 布局类型
 * @readonly
 * @enum {string}
 */
export enum DEVICE_TYPE {
  /** pc端布局 */
  PC = "pc",
  /** 移动端布局 */
  MOBILE = "moblie",
}
export interface tagviewStore {
  cacheViews: string[];
  tagViews: EmRouteRaw[];
}
