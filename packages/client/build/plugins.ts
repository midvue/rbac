import path from "path";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import ElementPlus from "unplugin-element-plus/vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import viteCompression from "vite-plugin-compression";
import legacy from "@vitejs/plugin-legacy";
export const useplugins = (env: Record<string, string>, mode: string) => {
  const isProd = env.VITE_NODE_ENV === "production";
  const plugins = [
    vue({ reactivityTransform: true }),
    vueJsx(),
    AutoImport({
      include: [/\.vue$/, /\.[tj]sx$/, /\.[tj]s$/],
      imports: [
        {
          "@/utils": [["*", "util"]],
          "@/lib/msgBox": [["EmMessageBox", "$EmMsgBox"]],
          "element-plus": [["ElMessage", "$EmMsg"]],
        },
      ],
      dts: "types/auto-import.d.ts",
      eslintrc: {
        enabled: true,
      },
    }),
    ElementPlus({
      useSource: true,
    }),
    // Components({
    //   resolvers: [ElementPlusResolver({ importStyle: "sass", directives: true })],
    //   include: [/\.vue$/, /\.vue\?vue/, /\.[tj]sx$/, /\.[tj]s$/],
    //   dts: "types/components.d.ts",
    // }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/icons/svg")],
    }),
    legacy({
      targets: "Chrome 65",
      modernPolyfills: ["es.promise.finally", "es.array.at", "es.global-this", "es/string/at"],
    }),
  ];

  if (isProd) {
    // compression 压缩
    plugins.push(viteCompression());
  }
  return plugins;
};
