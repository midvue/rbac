# 简介 {#introduction}

::: tip
**系统权限设计**几乎是每个 web 系统都需要具备的功能;
而`RBAC`也是权限体系中最常用的策略模型
:::

## 关于 Midway-RBAC {#what}

**Midway RBAC** 是用 nodejs 开发的中后台鉴权系统,或者说是个权限子模块, 是 Midway+ vue3+ casbin +pnpm 的一种落地实践方案。

- **Midway**：是淘宝前端架构团队，基于渐进式理念研发的 Node.js 框架，通过自研的依赖注入容器; 生态好、简单、易用、可靠。[官网地址](https://midwayjs.org/)
- **Vue3**：渐进式 JavaScript 前端框 mvvm 架,vue3 使用函数式编程,`compositon api + tsx`,易学易用，性能出色! [官网地址](https://cn.vuejs.org/)
- **casbin**：Casbin 是一个强大和高效的开放源码访问控制库，它支持各种 访问控制模型 以强制全面执行授权。[官网地址](https://docs.casbin.cn/zh/docs/overview)
- **pnpm**：高性能的,快速的，节省磁盘空间的包管理工具,内置`Monorepos`支持单仓多包,简单易上手! [官网地址](https://pnpm.io/zh/)

## 核心功能{#module}

上面的示例展示了 Midway-Rbac 的几个核心功能：

- **用户管理**：负责对用户账号的创建,编辑,以及角色的绑定
- **菜单管理**：负责对菜单的添加,编辑,路由,图片等属性管理
- **角色管理**：负责对角色的添加,编辑, 对菜单和角色进行授权绑定

**Midway-Rbac** 是一个中后台系统的权限模块，其功能覆盖了大部分权限开发常见的需求,虽然不同系统权限模块是十分多样化的。
可无论再怎么灵活，**Midway-Rbac** 的核心知识在都是通用的。希望你对你有所帮助,也算对 [Midway](https://midwayjs.org/) 生态系统提供细微的力量!
