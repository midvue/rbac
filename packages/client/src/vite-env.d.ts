/// <reference types="vite/client" />
/// <reference types="vue/macros-global" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_FIXED_HEADER: boolean;
  readonly VITE_APP_HIDDEN_SIDE_BAR: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
