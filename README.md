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

使用 pnpm Monorepo 一体化的信息搭建的结果,供大家参考,希望 Midway 的 RBAC 的方案

# 快速上手 {#quick-start}

## 线上体验 {#try-online}

- 线上 Demo， [点击预览](https:xxx)。

- github 地址 [点击进入](https://github.com/midvue/rbac.git)。

- 码云地址 [点击进入](https://github.com/midvue/rbac.git)。

:::tip 前提准备

- 熟悉命令行
- 操作系统：支持 macOS，Linux，Windows
- 已安装 16.0 或更高版本的 LTS 版本 [Node.js](https://nodejs.org/)
  :::

## 拉取代码 {#get-clone}

1. 克隆 git 仓库 ,默认使用 dev 分支

```sh
  git clone http:xxxx
```

2. 进入`vscode`打开项目,用`pnpm`安装依赖

```shell
#pnpm monorepo,这里用pnpm
 pnpm install
```
