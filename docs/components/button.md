---
title: Button | Toy-UI
description: Button 组件的文档
---

# Button 按钮
常用的操作按钮

## 基础用法
使用 `type`、`plain`、`round` 和 `circle` 来定义按钮的样式。

<preview path="../demo/Button/Basic.vue" title="基础用法" description="Button 组件的基础用法"></preview>


## 禁用状态
通过 **disabled** 属性定义按钮是否被禁用

<preview path="../demo/Button/Disabled.vue" title="禁用按钮" description="Button 禁用按钮"></preview>


## 图标按钮
使用 `icon` 属性来定义按钮的图标。图标名称请看 fontawesome 官网 https://fontawesome.com/icons

<preview path="../demo/Button/Icon.vue" title="图标按钮" description="Button 图标按钮"></preview>


## 加载状态按钮
通过 **loading** 属性定义按钮是否处于加载状态。

<preview path="../demo/Button/Loading.vue" title="加载状态按钮" description="Button 加载状态按钮"></preview>


## 按钮尺寸
通过设置 `size` 属性为 `small` | `large` 来调整图标的大小。

<preview path="../demo/Button/Size.vue" title="按钮尺寸" description="Button 按钮尺寸"></preview>


### Button Attributes

| Name              | Description                                                             | Type                                                                            | Default |
| ----------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------- |
| size              | button size                                                             | `enum` - `'large'\| 'small'`                                                    | —       |
| type              | button type                                                             | `enum` - `'primary'\| 'success'\| 'warning'\| 'danger'\| 'info'`                | —       |
| plain             | determine whether it's a plain button                                   | `boolean`                                                                       | false   |
| round             | determine whether it's a round button                                   | `boolean`                                                                       | false   |
| circle            | determine whether it's a circle button                                  | `boolean`                                                                       | false   |
| loading           | determine whether it's loading                                          | `boolean`                                                                       | false   |
| disabled          | disable the button                                                      | `boolean`                                                                       | false   |
| icon              | icon component                                                          | `string`                                                                        | —       |
| autofocus         | same as native button's `autofocus`                                     | `boolean`                                                                       | false   |
| native-type       | same as native button's `type`                                          | `enum` - `'button'\| 'submit'\| 'reset'`                                        | button  |
