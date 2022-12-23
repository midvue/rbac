import type { ProxyOptions, ServerOptions } from "vite";

export const useDevServer = (env: Record<string, unknown>, mode: string) => {
  const isProd = env.VITE_NODE_ENV === "production";
  if (isProd) return undefined;
  const option: ServerOptions = {
    host: "0.0.0.0",
    port: env.VITE_PORT as number,
    proxy: {} as Record<string, string | ProxyOptions>,
  };

  const proxyConf = env.VITE_PROXY ? JSON.parse(env.VITE_PROXY as string) : {};

  Object.keys(proxyConf).forEach((key) => {
    const reg = new RegExp(`^\\` + key);
    const proxy = {
      target: proxyConf[key].target,
      changeOrigin: true,
      rewrite: (path: string) => {
        const _path = path.replace(reg, proxyConf[key].rewrite);
        return _path;
      },
    } as ProxyOptions;

    if (option && option.proxy) {
      option.proxy[key] = proxy;
    }
  });

  return option;
};
