---
title: Dropdown | Toy-UI
description: Dropdown 组件的文档
---

# Dropdown 下拉菜单
将动作或菜单折叠到下拉菜单中。

## 基础用法
悬停在下拉菜单上以展开更多操作。

<preview path="../demo/Dropdown/Basic.vue" title="基础用法" description="Dropdown 基础用法"></preview>


## 触发方式
可以配置点击激活或者悬停激活。
将 `trigger` 属性设置为 `click` 即可， 默认为 hover。

<preview path="../demo/Dropdown/Trigger.vue" title="触发方式" description="Dropdown 触发方式"></preview>


## 手动打开关闭
将 `manual` 属性设置为 `true` 即可， 然后可以使用实例上面的 `show` 和 `hide` 方法打开关闭下拉菜单。

<preview path="../demo/Dropdown/Manual.vue" title="手动打开关闭" description="Dropdown 手动打开关闭"></preview>