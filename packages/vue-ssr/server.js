import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import express from "express";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

console.log(fileURLToPath(import.meta.url));
const resolve = (p) => path.resolve(__dirname, p);

const createServer = async () => {
  // 创建node服务
  const app = express();

  /**
   * @官方解释
   * 以中间件模式创建vite应用，这将禁用vite自身的HTML服务逻辑
   * 并让上级服务器接管
   */
  const vite = await require("vite").createServer({
    server: {
      middlewareMode: true,
    },
    appType: "custom",
  });
  app.use(vite.middlewares);

  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      // 读取index.html
      let template = fs.readFileSync(resolve("index.html"), "utf-8");
      // 应用vite html转换，会注入vite HMR
      template = await vite.transformIndexHtml(url, template);

      // 加载服务端入口
      const render = (await vite.ssrLoadModule("/src/entry-server.js")).render;
      const [appHtml, piniaState] = await render(url);

      // 替换处理过后的模版
      const html = template
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace(`<!--pinia-state-->`, piniaState);
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (error) {
      vite?.ssrFixStacktrace(error);
      next(e);
    }
  });

  // 监听5100端口
  app.listen(5100);
};

createServer();
