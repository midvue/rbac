import Layout from "@/layout/index.vue";

export default {
  path: "/sysMgr",
  component: Layout,
  meta: { icon: "user", title: "用户中心" },
  redirect: "/sysMgr/userMg",
  children: [
    {
      path: "userMg",
      name: "userMg",
      component: () => import("@/views/sysMgr/userMg/list/index.vue"),
      meta: {
        title: "用户管理",
      },
    },
    {
      path: "roleMg",
      name: "roleMg",
      component: () => import("@/views/sysMgr/roleMg/list/index.vue"),
      meta: {
        title: "角色管理",
      },
    },
    {
      path: "menuMg",
      name: "menuMg",
      component: () => import("@/views/sysMgr/menuMg/list/index.vue"),
      meta: {
        title: "菜单管理",
      },
    },
    {
      path: "btnMg",
      name: "btnMg",
      component: () => import("@/views/sysMgr/btnMg/list/index.vue"),
      meta: {
        title: "基础按钮管理",
      },
    },
  ],
};
