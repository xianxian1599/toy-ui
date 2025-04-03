# 安装

```bash
npm i @xianzi/toy-ui --save
```

# 使用

## 全局使用

```js
// 引入所有组件
import ToyUI from '@xianzi/toy-ui'
// 引入样式
import '@xianzi/toy-ui/dist/style.css'

import App from './App.vue'
// 全局使用
createApp(App).use(ToyUI).mount('#app')
```

```vue
<template>
  <toy-button>我是 ToyButton</toy-button>
</template>
```

## 按需引入

本组件库提供了基于 ES Module 的开箱即用的 Tree Shaking 功能。

```js
<template>
  <Button>我是 VkButton</Button>
</template>
<script>
import { Button } from '@xianzi/toy-ui'
  export default {
    components: { Button },
}
</script>
```
