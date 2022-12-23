import type { HeadConfig } from "vitepress";
export const head: HeadConfig[] = [
  [
    "link",
    {
      rel: "icon",
      href: "https://wei-design.github.io/web-vue/images/logo-link.png",
      type: "image",
    },
  ],
  [
    "meta",
    {
      name: "theme-color",
      content: "#ffffff",
    },
  ],
  ["meta", { rel: "referrer", href: `same-origin` }],
  [
    "meta",
    {
      name: "keywords",
      content: `vue3 , nodejs rbac ,midway rbac, rabc, rbac怎么设计 , nodejs rbac权限系统`,
    },
  ],
  [
    "meta",
    {
      name: "description",
      content: `一个完整的nodejs rbca权限系统,使用 midway + vue3 + casbin + pnpm`,
    },
  ],
  ["meta", { name: "author", content: `ppzfly` }],
  [
    "link",
    {
      rel: "stylesheet",
      href: "https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.min.css",
    },
  ],
  [
    "script",
    {
      src: "https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.umd.min.js",
    },
  ],
];
