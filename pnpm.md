# pnpm语法

```
// 子项目初始化npm
cd server
pnpm init

//在pnpm-workspace.yaml添加server
//添加依赖包到server, 与子项目的package.json name一致
pnpm add koa -D --filter server

//根目录添加依赖包
pnpm add xxx -D -W
```
