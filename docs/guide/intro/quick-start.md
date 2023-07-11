# 快速上手 {#quick-start}

## 线上体验 {#try-online}

- 线上 Demo， [点击预览](https:xxx)。

- github 地址 [点击进入](https://jsfiddle.net/yyx990803/2ke1ab0z/)。

- 码云地址 [点击进入](https://vite.new/vue)。

:::tip 前提准备

- 熟悉命令行
- 操作系统：支持 macOS，Linux，Windows
- 已安装 16.0 或更高版本的 LTS 版本 [Node.js](https://nodejs.org/)
  :::

## 本地开发 {#get-clone}

1. 克隆 git 仓库 ,默认使用 dev 分支

```sh
  git clone http:xxxx
```

2. 进入`vscode`打开项目,用`pnpm`安装依赖

:::tip
**Midway RBAC** 使用 pnpm Monorepo 一体化结构搭建的项目,需要安装 pnpm
:::

```shell
# 先安装pnpm(存在就忽略)
 npm install -g pnpm
# 安装依赖
 pnpm install
```

3. 启动项目

```shell
 # 同时启动midway服务端和vue3客户端
 pnpm dev

 # 或者分别单独启动
 pnpm dev:client
 pnpm dev:server

```

## 示例

<div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">cd</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#888;">your-project-name</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">git clone http:xxxx</span></span>
<span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">pnpm install</span></span>
<span class="line"><span style="color:var(--vt-c-green);">&gt; </span><span style="color:#A6ACCD;">pnpm dev</span></span>
<span class="line"></span></code></pre></div>
