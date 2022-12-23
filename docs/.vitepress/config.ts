/**
 * @type {import('vitepress').UserConfig}
 */

import mdItCustomAttrs from "markdown-it-custom-attrs";
import { head } from "./conf/head";
import { sidebar } from "./conf/sidebar";
import { nav } from "./conf/nav";
import { defineConfig } from "vitepress";

export default defineConfig({
  head,
  lang: "zh-CN",
  title: "Midway rbac",
  description: "A Vue 3 UI Framework",
  lastUpdated: true,
  themeConfig: {
    siteTitle: "Midway rbac",
    logo: "/images/logo-link.png",
    nav,
    sidebar,
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2022-present Midway rbac",
    },
  },
  markdown: {
    config: (md) => {
      // use more markdown-it plugins!
      md.use(mdItCustomAttrs, "image", {
        "data-fancybox": "gallery",
      });
    },
  },
});
