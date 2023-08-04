import { fileURLToPath, URL } from "url";
import { defineConfig, loadEnv, ConfigEnv } from "vite";
import { useplugins, useDevServer } from "./build";
import { resolve } from "path";
export default ({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd());

  console.log(`************** env: ${mode} ******************`);
  console.log(`************** proxy: ${env.VITE_PROXY} ******************`);

  return defineConfig({
    base: env.VITE_PUBLIC_PATH,
    resolve: {
      extensions: [".jsx", ".js", ".json", ".ts", ".tsx"],
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "~/": `${resolve(__dirname, "src")}/`,
      },
    },
    optimizeDeps: {
      include: ["pinia", "@vueuse/core", "vue", "vue-router"],
    },
    build: {
      target: "chrome65",
      cssTarget: "chrome65",
      chunkSizeWarningLimit: 2000,
      emptyOutDir: true,
      outDir: "../../deploy/client",
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/lib/elementPlus/index.scss" as *;`,
        },
      },
    },
    plugins: useplugins(env, mode),
    server: useDevServer(env, mode),
  });
};
