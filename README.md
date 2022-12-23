# 打印组件的使用与案例

## 一、参考工具

http://hiprint.io/demo
https://h5.luban-h5.com/#/work-manager/list
fastReport 软件

## 二、功能

### 页面设置

- 页面大小：默认 A4, 支持自定义
- 页眉：每页循环固定头部，可以拖拽页眉线改变位置
- 页脚：每页循环固定头部，可以拖拽页脚线改变位置
- 页码：[pageNo]/[pageCount] ，pageNo：页码， pageCount：分页总数，支持文本框填入或在页面设置配置
- 背景设置：支持上传图片，套打（页面展示背景，打印不展示背景）
- 打印方向：横向与纵向
- 默认字体与英文字体：设置后，所有拖拽组件若未配置则采用默认字体，某些模板需要数字与英文显示非宋体

### 拖拽组件

- 横线
- 竖线
- 文本框：支持二元表达式
- 表格：支持布局
- 图片：支持上传或写参数

### 基础功能

- 样式修改
- 表达式
- 表格布局
  - 数据循环
  - 重复表头
  - 总结行
  - 添加行
  - 添加列
  - 循环合并
  - 每页固定条数
  - 单元格属性设置：支持审核等参数

### 高级功能

- excel 导出
- word 导出

## 三、案例分析

## 疑难杂症

- xlxs 详解 https://segmentfault.com/a/1190000022772664
- xlxs 插入图片 https://github.com/SheetJS/sheetjs/pull/509 ,
- xml office 开放文档 http://officeopenxml.com/drwOverview.php
- Office Open XML 的测量单位 https://blog.lindexi.com/post/Office-Open-XML-%E7%9A%84%E6%B5%8B%E9%87%8F%E5%8D%95%E4%BD%8D.html
- js 代码编辑 https://blog.csdn.net/qq564280420/article/details/122410778

## 四、记录

2022/1/16 01. 表格点击/区域选择--高亮， -- ok 02. （取消）合并单元格（行与列） -- ok 03. 赋值 -- ok 04. 合并行有 bug -- ok 05. 合并区域拖拽后，再去拖拽第一列，宽度突然变小--ok 06. 边框拖拽的挪出去--参照大掌柜--ok 07. js-xlxs 图片--ok， 默认值--ok， 颜色--ok， 换行--ok ---换成 exceljs 08. 图片样式 -- ok

2022/2/18 01. 操作界面优化

- 页面设置：

  - 支持导出文件类型设置 默认全选
  - 后台数据返回处理，js 写入 https://codemirror.net/doc/manual.html#usage

- 表格布局：

  - 边框拖拽支持在外面设置--参照大掌柜 ---ok
  - 数据生成,
    - 数据循环模式,高度自适应 ------- 重点解决--ok
    - 打印分页 --- ok
    - 总结行, 跟随表格计算--ok
    - 对外账单 循环时超出计算 -- ok

2.  生成 word 文档样式兼容

- 图片--ok, 背景图片--ok, 表格样式--ok
- 高度自适应
- 页眉, 页脚 -- ok
- 单元格合并--ok
- <br> si_tzwl 模板 兼容 --ok
- 页码样式
- 固定行
- 总结行
- 嵌入系统 --重点解决

3.  bug:

- 新增删除, 修复 tableLayout 的行拖拽 bug， 会出现 null 情况 --ok
- tableLayout 总会出现 w, 导致拖拽时 拖拽列与表格宽度不一致 -- ok, 在数据生成时删除 w 和 h

20220316

- cell_expand: 换行失效 -- ok
- tableLayout: 换行失效 .replace(/\n/g, "\<br>") --ok

20220321

- 凭证模板：pageNo/page 的灵活运用 --ok
- 拖拽面板 固定表格高度 --ok，设置 max-height
- 分离 js-word
- render: 自适应高度
- bug: 合并单元格 添加属性，其余单元格会增加该属性
- 表格换行撑高布局

- 封装 v-permission 指令,已配置当前所有页面按钮权限 --ok
- 修复 menu/list 根据 pid 查询按钮列表 --ok

20221028

- 封装 v-permission 指令,已配置当前所有页面按钮权限 --ok
- 修复 menu/list 根据 pid 查询按钮列表 --ok
