<template>
  <!-- 由父组件动态传入的类型们决定按钮的样式 -->
  <button
    ref="_ref"
    class="toy-button"
    :class="{
      [`toy-button--${type}`]: type,
      [`toy-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled
    }"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
  >
    <!-- 给按钮添加图标 -->
    <ToyIcon icon="spinner" spin v-if="loading" />
    <ToyIcon v-if="icon" :icon="icon" />
    <span><slot /></span>
  </button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { ButtonProps } from './types'
import ToyIcon from '../Icon/Icon.vue'

// 组件的导出名称
defineOptions({ name: 'ToyButton' })

// 定义 props 类型，父传子的数据，作为该组件的属性；添加默认原生属性button
withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button'
})

// 暴露组件实例
const _ref = ref<HTMLButtonElement>()
defineExpose({
  ref: _ref
})
</script>
