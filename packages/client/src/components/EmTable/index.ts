import type { App } from "vue";
import EmTable from "./index.vue";
export * as EmTableType from "./types";

EmTable.install = (app: App) => {
  if (EmTable.installed) return;
  app.component(EmTable.name, EmTable);
};
export { EmTable };
export default EmTable;
