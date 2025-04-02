<template>
  <div
    class="toy-collapse-item"
    :class="{
      'is-disabled': disabled
    }"
  >
    <div
      class="toy-collapse-item__header"
      :class="{
        'is-active': isActive,
        'is-disabled': disabled
      }"
      :id="`item-header-${name}`"
      @click="handleClick"
    >
      <slot name="title">{{ title }}</slot>
      <!-- 展开收起图标 -->
      <ToyIcon icon="angle-right" class="header-angle" />
    </div>
    <!-- 使用内置的treansition实现动画效果 -->
    <Transition name="slide" v-on="transitionEvents">
      <div class="toy-collapse-item__wrapper" v-show="isActive">
        <div class="toy-collapse-item__content" :id="`item-content-${name}`">
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { inject, computed } from 'vue'
import type { CollapseItemProps } from './types'
import { collapseContextKey } from './types'
import ToyIcon from '../Icon/Icon.vue'

defineOptions({ name: 'ToyCollapseItem' })

// 拿到当前数组项
const props = defineProps<CollapseItemProps>()
// 通过inject拿到父组件的存储激活项的数组和点击事件
const collapseContext = inject(collapseContextKey)
const isActive = computed(() => collapseContext?.activeNames.value.includes(props.name))
const handleClick = () => {
  if (props.disabled) return
  collapseContext?.handleItemClick(props.name)
}

// 使用钩子在特定阶段精确控制动画样式
const transitionEvents: Record<string, (el: HTMLElement) => void> = {
  beforeEnter(el) {
    el.style.height = '0px'
    el.style.overflow = 'hidden'
  },
  enter(el) {
    el.style.height = `${el.scrollHeight}px`
  },
  afterEnter(el) {
    el.style.height = ''
    el.style.overflow = ''
  },
  beforeLeave(el) {
    el.style.height = `${el.scrollHeight}px`
    el.style.overflow = 'hidden'
  },
  leave(el) {
    el.style.height = '0px'
  },
  afterLeave(el) {
    el.style.height = ''
    el.style.overflow = ''
  }
}
</script>

<style scoped></style>
