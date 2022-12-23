# 路由权限

> **路由权限** 用户菜单通过权限配置,动态路由生成

> **动态路由** 主要通过 router.addRoute() 和 router.removeRoute()两个函数实现。[官网地址](https://router.vuejs.org/zh/guide/advanced/dynamic-routing.html)

##### 步骤:

1. 角色权限页面分配菜单权限
2. 用户登录获取权限,将 router 组装到 permissionStore 中
3. 添加动态路由权限
4. 渲染左侧菜单
5. 浏览器直接输入地址,没权限时跳转到 404 页面

##### 获取用户路由权限

代码位置: @/client/src/store/permit

```js
    // 获取异步路由菜单
    async getAsyncRoutes() {
      const roleIds = getUserInfo()?.roles.map((role) => role.roleId);
      const list = await getMenusByRole({ roleIds }).then((res) => res.data.list);
      const { _routes, buttons } = generateAsyncRoutes(list);
      this.buttons = buttons;
      this.asyncRouters = _routes;
      return _routes;
    },
```

##### 添加动态路由

代码位置: @/client/src/router

```js
export const routes = parseLocalRoutes();

//单个menu结构转router
const menuToRoute = (menu: Partial<Menu>) => {
  const code = menu.code;
  menu.path = menu.pid === 0 ? `/${code}` : code;
  menu.component = menu.url === "Layout" ? Layout : components[`../views${menu.url}`];
  menu.meta = {
    title: menu.name,
    icon: menu.icon,
    keepAlive: menu.keepAlive,
  };
  menu.hidden = !menu.isShow;

  const toUpperName = code!.slice(0, 1).toUpperCase() + code!.slice(1);
  menu.name = toUpperName;

  delete menu.isShow;
  delete menu.pid;
  delete menu.type;
};

//菜单转成异步路由
export const generateAsyncRoutes = (list: Menu[] = []) => {
  const buttons: string[] = [];
  const _routes = list.filter((menu) => {
    //把按钮权限加入到buttons
    if (menu.type === 2) {
      buttons.push(menu.code);
    }

    //循环寻找当前menu的 直接children
    const children = list.filter((child) => {
      if (menu.id === child.pid && child.type !== 2) {
        menuToRoute(child);
        return true;
      }
      return false;
    });

    //存在就赋值
    if (children.length > 0) {
      menu.children = children;
      menu.redirect = `/${menu.code}/${children[0].path}`;
    }

    //当pid===0,代表是1级路由
    if (menu.pid === 0) {
      menuToRoute(menu);
      router.addRoute(menu as RouteRecordRaw);
      return true;
    }
    return false;
  });

  //添加第一个路由重定向
  const firstRoute = {
    path: "/",
    redirect: _routes[0].path,
  } as RouteRecordRaw;

  router.addRoute(firstRoute);
  errorRouter.forEach((item) => router.addRoute(item));
  return { buttons, _routes };
};

```
