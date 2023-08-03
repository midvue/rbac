import type { App, Plugin } from "vue";

export * from "./EmForm";
export * from "./EmTable";

const modules = import.meta.glob<Plugin>("./*/index.ts", { import: "default", eager: true });

const install = (app: App<Element>) => {
  for (const path in modules) {
    modules[path].install?.(app);
  }
};
export default { install };
