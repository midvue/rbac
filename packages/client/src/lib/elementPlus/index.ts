import {
  ElAside,
  ElButton,
  ElCascader,
  ElCheckbox,
  ElConfigProvider,
  ElContainer,
  ElDialog,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElForm,
  ElFormItem,
  ElInput,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElOption,
  ElPagination,
  ElRadio,
  ElRadioButton,
  ElRadioGroup,
  ElScrollbar,
  ElSelect,
  ElSubMenu,
  ElSwitch,
  ElTable,
  ElTableColumn,
  ElTreeV2,
  ElLoading,
  ElMessage,
  ElInputNumber,
} from "element-plus";
import { App } from "vue";

/**
 * 全局按需注入ElementPlus
 * @param app vue 对象
 */
export const useElementPlus = (app: App) => {
  app.use(ElMessage).use(ElLoading);
  app
    .use(ElAside)
    .use(ElButton)
    .use(ElCascader)
    .use(ElCheckbox)
    .use(ElConfigProvider)
    .use(ElContainer)
    .use(ElDialog)
    .use(ElDropdown)
    .use(ElDropdownItem)
    .use(ElDropdownMenu)
    .use(ElForm)
    .use(ElFormItem)
    .use(ElInput)
    .use(ElMain)
    .use(ElMenu)
    .use(ElMenuItem)
    .use(ElOption)
    .use(ElPagination)
    .use(ElRadio)
    .use(ElRadioButton)
    .use(ElRadioGroup)
    .use(ElScrollbar)
    .use(ElSelect)
    .use(ElSubMenu)
    .use(ElSwitch)
    .use(ElTable)
    .use(ElTableColumn)
    .use(ElTreeV2)
    .use(ElInputNumber);
};
