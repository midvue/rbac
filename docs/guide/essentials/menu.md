# 菜单管理

`菜单管理`其实也是`路由管理`,因为菜单的操作其实就是控制路由的跳转,而且除了左边菜单栏还有隐藏的路由页面需要配置管理

## 菜单表怎么设计

1. 看前端框架配置, 比如我们使用 vue 框架,vue-router 的本地路由配置是这样的,
   所以我们的数据库表设计的时候,也就是需要配置这些字段

```js
/*--- router.js -----*/
{
 path: "/sysMgr",
 component: Layout,
 meta: { icon: "user", title: "用户中心" },
 children: [
   {
     path: "menuMg",
     name: "menuMg",
     component: () => import("@/views/sysMgr/menuMg/list/index.vue"),
     meta: {
       title: "菜单管理",
     },
   },
 ],
};

```

::: tip
系统中的**用户会很多,但是角色就那么几个**,所以把权限绑定给角色,就不用给每个用户再单独授权了
:::
