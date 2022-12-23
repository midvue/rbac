import "virtual:svg-icons-register";
import { App } from "vue";
import SvgIcon from "./SvgIcon.vue";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export default {
  install(app: App) {
    app.component("SvgIcon", SvgIcon);
    //element icon
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
};



