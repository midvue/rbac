import type { App } from "vue";
import EmForm from "./index.vue";

export type { EmFormType } from "./types";

EmForm.install = (app: App) => {
  if (EmForm.installed) return;
  app.component(EmForm.name, EmForm);
};
export { EmForm };
export default EmForm;
