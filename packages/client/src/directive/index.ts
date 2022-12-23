import { App } from "vue";
import permission from "./permission";

export const userDirective = (app: App) => {
  app.directive("permission", permission);
};
