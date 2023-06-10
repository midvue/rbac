import { renderToString } from "vue/server-renderer";
import { createApp } from "./main";

export async function render(url, manifest) {
  const { app, router, pinia } = createApp();

  router.push(url);
  await router.isReady();

  const ctx = {};
  const html = await renderToString(app, ctx);
  return [html, JSON.stringify(pinia.state.value)];
}
