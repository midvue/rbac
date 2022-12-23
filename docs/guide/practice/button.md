# 按钮权限

> **按钮权限** 是指用户在页面上可操作的按钮权限,没有该权限,则按钮不展示

### 自定义指令

**代码位置:** @/client/src/directive/permission.ts

- 未匹配到对应 code 移除当前 dom

```js
 mounted(el: HTMLElement, binding) {
    const permitStore = usePermitStore();
    const buttons = permitStore.buttons;
    const parentNode = el.parentNode;
    //没有权限则移除当前dom节点
    if (binding.value && buttons.length !== 0 && !buttons.includes(binding.value)) {
      if (parentNode) {
        parentNode.removeChild(el);
      }
    }
  },
```

### 指令使用

:::tip 注意:
按钮上绑定自定义指令 **v-permission="code"**
注:code 要与接口返回 code 保持一致
:::

```js
<el-button
  type="primary"
  icon="plus"
  onClick={() => handleAdd()}
  v-permission="user:add"
>
  添加用户
</el-button>
```
