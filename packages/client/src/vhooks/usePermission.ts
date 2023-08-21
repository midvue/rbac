import { usePermitStore } from "@/store/modules/permit";
import { useRoute } from "vue-router";

/**
 * 按钮权限控制，返回是否有权限和按钮信息
 * @param permitKey 按钮权限key
 */
export const usePermission = (permitKey: string) => {
  const path = useRoute().path;
  const btnMap = usePermitStore().menuBtnMap[path];
  const btn = btnMap?.[permitKey];
  return [!!btn, btn] as const;
};

/**
 * 按钮权限控制，返回是否有权限
 * @param permitKey 按钮权限key
 */
export const vPermission = (permitKey: string) => {
  const path = useRoute().path;
  const btnMap = usePermitStore().menuBtnMap[path];
  const btn = btnMap?.[permitKey];
  return !!btn;
};
