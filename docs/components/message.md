---
title: Message | Toy-UI
description: Message 组件的文档
---

# Message 消息提示
常用于主动操作后的反馈提示。

## 基础用法
从顶部出现，3 秒后自动消失。 注册了一个 `createMessage` 方法用于调用。 Message 可以接收一个字符串或一个 VNode 作为参数，它会被显示为正文内容。

<preview path="../demo/Message/Basic.vue" title="基础用法" description="Message 基础用法"></preview>


## 不同状态
用来显示「成功、警告、消息、错误」类的操作反馈。设置 `type` 字段可以定义不同的状态，默认为info。

<preview path="../demo/Message/Type.vue" title="不同状态" description="Message 不同状态"></preview>


## 可关闭的消息提示
可以添加关闭按钮。

默认的 Message 是不可以被人工关闭的。 如果你需要手动关闭功能，你可以把 `showClose` 设置为 `true` ，Message 拥有可控的 `duration`， 默认的关闭时间为 3000 毫秒，当把这个属性的值设置为0便表示该消息不会被自动关闭。

<preview path="../demo/Message/Closable.vue" title="可关闭的消息提示" description="Message 可关闭的消息提示"></preview>


## 手动关闭所有实例
可以调用 message 模块提供了一个 `closeAll()` 手动关闭所有实例。

<preview path="../demo/Message/Close.vue" title="手动关闭所有实例" description="Message 手动关闭所有实例"></preview>
