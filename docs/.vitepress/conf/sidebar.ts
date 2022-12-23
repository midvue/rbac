export let sidebar = [
  {
    text: "介绍",
    collapsible: true,
    items: [
      { text: "简介", link: "/guide/intro/index" },
      { text: "快速开始", link: "/guide/intro/quick-start" },
    ],
  },
  {
    text: "基础",
    collapsible: true,
    items: [
      { text: "什么是RBAC", link: "/guide/essentials/what-is-rbac" },
      { text: "角色管理", link: "/guide/essentials/role" },
      { text: "账号管理", link: "/guide/essentials/user" },
      { text: "菜单管理", link: "/guide/essentials/menu" },
    ],
  },

  {
    text: "进阶",
    collapsible: true,
    items: [
      { text: "角色继承", link: "/guide/advance/role-extend" },
      { text: "权限分配", link: "/guide/advance/per-allocate" },
      { text: "数据权限", link: "/guide/advance/data-permission" },
    ],
  },

  {
    text: "实践",
    collapsible: true,
    items: [
      { text: "路由权限", link: "/guide/practice/route" },
      { text: "按钮权限", link: "/guide/practice/button" },
    ],
  },
];
