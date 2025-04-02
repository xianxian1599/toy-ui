<template>
  <i
    class="toy-icon"
    :class="{ [`toy-icon--${type}`]: type }"
    :style="customStyles"
    v-bind="$attrs"
  >
  <!-- attrs用来关闭属性透传，防止父节点应该透传的属性穿不进来 -->
    <font-awesome-icon v-bind="filteredProps" />
  </i>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type { IconProps } from './types'
import { omit } from 'lodash-es'

defineOptions({
  name: 'ToyIcon',
  inheritAttrs: false // 防止父组件透传属性
})
const props = defineProps<IconProps>()
// 把自定义属性过滤，响应式属性要使用计算属性进行计算来达到实时更新的效果
const filteredProps = computed(() => omit(props, ['type', 'color']))

// 用户自定义颜色，作为内联属性覆盖其他颜色
const customStyles = computed(() => {
  return props.color ? { color: props.color } : {}
})
</script>
