import type { App } from "vue";
import EmTable from "./EmTable/index.vue";

export const useComponent = (app: App) => {
  app.component(EmTable.name, EmTable);
};
