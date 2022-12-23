# 简介 {#introduction}

::: tip
**系统权限设计**几乎是每个 web 系统都需要具备的功能;
 而`RBAC`也是权限体系中最常用的策略模型
:::

## 关于 Midway-RBAC {#what}

**Midway RBAC** 是用 nodejs 开发的中后台鉴权系统,或者说是个权限子模块, 是 Midway+ vue3+ casbin +pnpm 的一种落地实践方案。

- **Midway**：是淘宝前端架构团队，基于渐进式理念研发的 Node.js 框架，通过自研的依赖注入容器; 生态好、简单、易用、可靠。[官网地址](https://midwayjs.org/)

- **Vue3**：渐进式JavaScript前端框mvvm架,vue3使用函数式编程,`compositon api + tsx`,易学易用，性能出色! [官网地址](https://cn.vuejs.org/)

- **casbin**：Casbin 是一个强大和高效的开放源码访问控制库，它支持各种 访问控制模型 以强制全面执行授权。[官网地址](https://docs.casbin.cn/zh/docs/overview)

- **pnpm**：高性能的,快速的，节省磁盘空间的包管理工具,内置`Monorepos`支持单仓多包,简单易上手! [官网地址](https://pnpm.io/zh/)

使用 pnpm Monorepo 一体化的信息搭建的结果,供大家参考,希望 Midway 的 RBAC 的方案

上面的示例展示了 Midway-Rbac 的两个核心功能：

- **声明式渲染**：Midway-Rbac 基于标准 HTML 拓展了一套模板语法，使得我们可以声明式地描述最终输出的 HTML 和 JavaScript 状态之间的关系。

- **响应性**：Midway-Rbac 会自动跟踪 JavaScript 状态变化并在改变发生时响应式地更新 DOM。

你可能已经有了些疑问——先别急，后面的文档中我们会详细介绍每一个细节。现在，请继续看下去，以确保你对 Midway-Rbac 作为一个框架到底提供了什么有一个宏观的了解。

## 渐进式框架 {#the-progressive-framework}

Midway-Rbac 是一个框架，也是一个生态。其功能覆盖了大部分前端开发常见的需求。但 Web 世界是十分多样化的，不同的开发者在 Web 上构建的东西可能在形式和规模上会有很大的不同。考虑到这一点，Midway-Rbac 的设计非常注重灵活性和“可以被逐步集成”这个特点。根据你的需求场景，你可以用不同的方式使用 Midway-Rbac：

- 无需构建步骤，渐进式增强静态的 HTML
- 在任何页面中作为 Web Components 嵌入
- 单页应用 (SPA)
- 全栈 / 服务端渲染 (SSR)
- Jamstack / 静态站点生成 (SSG)
- 开发桌面端、移动端、WebGL，甚至是命令行终端中的界面

如果你是初学者，可能会觉得这些概念有些复杂。别担心！理解教程和指南的内容只需要具备基础的 HTML 和 JavaScript 知识。你即使不是这些方面的专家，也能够跟上。

如果你是有经验的开发者，希望了解如何以最合适的方式在项目中引入 Midway-Rbac，或者是对上述的这些概念感到好奇，我们在[使用 Midway-Rbac 的多种方式](/guide/extras/ways-of-using-Midway-Rbac)中讨论了有关它们的更多细节。

无论再怎么灵活，Midway-Rbac 的核心知识在所有这些用例中都是通用的。即使你现在只是一个初学者，随着你的不断成长，到未来有能力实现更复杂的项目时，这一路上获得的知识依然会适用。如果你已经是一个老手，你可以根据实际场景来选择使用 Midway-Rbac 的最佳方式，在各种场景下都可以保持同样的开发效率。这就是为什么我们将 Midway-Rbac 称为“渐进式框架”：它是一个可以与你共同成长、适应你不同需求的框架。

## 单文件组件 {#single-file-components}

在大多数启用了构建工具的 Midway-Rbac 项目中，我们可以使用一种类似 HTML 格式的文件来书写 Midway-Rbac 组件，它被称为**单文件组件** (也被称为 `*.Midway-Rbac` 文件，英文 Single-File Components，缩写为 **SFC**)。顾名思义，Midway-Rbac 的单文件组件会将一个组件的逻辑 (JavaScript)，模板 (HTML) 和样式 (CSS) 封装在同一个文件里。下面我们将用单文件组件的格式重写上面的计数器示例：

单文件组件是 Midway-Rbac 的标志性功能。如果你的用例需要进行构建，我们推荐用它来编写 Midway-Rbac 组件。你可以在后续相关章节里了解更多关于[单文件组件的用法及用途](/guide/scaling-up/sfc)。但你暂时只需要知道 Midway-Rbac 会帮忙处理所有这些构建工具的配置就好。

## API 风格 {#api-styles}

Midway-Rbac 的组件可以按两种不同的风格书写：**选项式 API** 和**组合式 API**。

### 选项式 API (Options API) {#options-api}

使用选项式 API，我们可以用包含多个选项的对象来描述组件的逻辑，例如 `data`、`methods` 和 `mounted`。选项所定义的属性都会暴露在函数内部的 `this` 上，它会指向当前的组件实例。

[在演练场中尝试一下](https://sfc.Midway-Rbacjs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLy8gcmVhY3RpdmUgc3RhdGVcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY291bnQ6IDBcbiAgICB9XG4gIH0sXG5cbiAgLy8gZnVuY3Rpb25zIHRoYXQgbXV0YXRlIHN0YXRlIGFuZCB0cmlnZ2VyIHVwZGF0ZXNcbiAgbWV0aG9kczoge1xuICAgIGluY3JlbWVudCgpIHtcbiAgICAgIHRoaXMuY291bnQrK1xuICAgIH1cbiAgfSxcblxuICAvLyBsaWZlY3ljbGUgaG9va3NcbiAgbW91bnRlZCgpIHtcbiAgICBjb25zb2xlLmxvZyhgVGhlIGluaXRpYWwgY291bnQgaXMgJHt0aGlzLmNvdW50fS5gKVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImluY3JlbWVudFwiPkNvdW50IGlzOiB7eyBjb3VudCB9fTwvYnV0dG9uPlxuPC90ZW1wbGF0ZT4ifQ==)

### 组合式 API (Composition API) {#composition-api}

通过组合式 API，我们可以使用导入的 API 函数来描述组件逻辑。在单文件组件中，组合式 API 通常会与 [`<script setup>`](/api/sfc-script-setup) 搭配使用。这个 `setup` attribute 是一个标识，告诉 Midway-Rbac 需要在编译时进行一些处理，让我们可以更简洁地使用组合式 API。比如，`<script setup>` 中的导入和顶层变量/函数都能够在模板中直接使用。

下面是使用了组合式 API 与 `<script setup>` 改造后和上面的模板完全一样的组件：

[在演练场中尝试一下](https://sfc.Midway-Rbacjs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgb25Nb3VudGVkIH0gZnJvbSAndnVlJ1xuXG4vLyByZWFjdGl2ZSBzdGF0ZVxuY29uc3QgY291bnQgPSByZWYoMClcblxuLy8gZnVuY3Rpb25zIHRoYXQgbXV0YXRlIHN0YXRlIGFuZCB0cmlnZ2VyIHVwZGF0ZXNcbmZ1bmN0aW9uIGluY3JlbWVudCgpIHtcbiAgY291bnQudmFsdWUrK1xufVxuXG4vLyBsaWZlY3ljbGUgaG9va3Ncbm9uTW91bnRlZCgoKSA9PiB7XG4gIGNvbnNvbGUubG9nKGBUaGUgaW5pdGlhbCBjb3VudCBpcyAke2NvdW50LnZhbHVlfS5gKVxufSlcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxidXR0b24gQGNsaWNrPVwiaW5jcmVtZW50XCI+Q291bnQgaXM6IHt7IGNvdW50IH19PC9idXR0b24+XG48L3RlbXBsYXRlPiJ9)

### 该选哪一个？{#which-one-to-choose}

两种 API 风格都能够覆盖大部分的应用场景。它们只是同一个底层系统所提供的两套不同的接口。实际上，选项式 API 是在组合式 API 的基础上实现的！关于 Midway-Rbac 的基础概念和知识在它们之间都是通用的。

选项式 API 以“组件实例”的概念为中心 (即上述例子中的 `this`)，对于有面向对象语言背景的用户来说，这通常与基于类的心智模型更为一致。同时，它将响应性相关的细节抽象出来，并强制按照选项来组织代码，从而对初学者而言更为友好。

组合式 API 的核心思想是直接在函数作用域内定义响应式状态变量，并将从多个函数中得到的状态组合起来处理复杂问题。这种形式更加自由，也需要你对 Midway-Rbac 的响应式系统有更深的理解才能高效使用。相应的，它的灵活性也使得组织和重用逻辑的模式变得更加强大。

在[组合式 API FAQ](/guide/extras/composition-api-faq) 章节中，你可以了解更多关于这两种 API 风格的对比以及组合式 API 所带来的潜在收益。

如果你是使用 Midway-Rbac 的新手，这里是我们的大致建议：

- 在学习的过程中，推荐采用更易于自己理解的风格。再强调一下，大部分的核心概念在这两种风格之间都是通用的。熟悉了一种风格以后，你也能够很快地理解另一种风格。

- 在生产项目中：

  - 当你不需要使用构建工具，或者打算主要在低复杂度的场景中使用 Midway-Rbac，例如渐进增强的应用场景，推荐采用选项式 API。

  - 当你打算用 Midway-Rbac 构建完整的单页应用，推荐采用组合式 API + 单文件组件。

在学习阶段，你不必只固守一种风格。在接下来的文档中我们会为你提供一系列两种风格的代码供你参考，你可以随时通过左上角的 **API 风格偏好**来做切换。
