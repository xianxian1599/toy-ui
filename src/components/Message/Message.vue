<template>
  <Transition
  :name="transitionName"
  @after-leave="destroyComponent"
  @enter="updateHeight"
  >
    <div
      class="toy-message"
      v-show="visible"
      :class="{
        [`toy-message--${type}`]: type,
        isclose: showClose
      }"
      role="alart"
      ref="messageRef"
      :style="cssStyle"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <div class="toy-message__content">
        <slot>
          <RenderVnode :vNode="message" v-if="message" />
        </slot>
      </div>
      <div class="toy-message__close" v-if="showClose">
        <ToyIcon icon="xmark" @click.stop="visible = false" />
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import type { MessageProps } from './types'
import RenderVnode from '../Common/RenderVnode'
import ToyIcon from '../Icon/Icon.vue'
import { onMounted, ref, watch, computed, nextTick } from 'vue'
import { getLastBottomOffset } from './method'
import useEventListener from '../../hooks/useEventListener'

defineOptions({
  name: 'ToyMessage'
})

const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  duration: 3000,
  offset: 20,
  transitionName: 'fade-up'
})

const messageRef = ref<HTMLDivElement>()

// 计算偏移高度，动态设置样式
// height = 本消息的高度
// props.offset：两个消息的间距
// lastOffset：上个实例的下边界 lastBottomOffset
// topOffset：本实例上边界 = 上个实例的下边界lastOffset + 两个消息的间距props.offset
// bottomOffset：本实例下边界 = 本实例上边界topOffset + 本消息高度height
const height = ref(0)
const lastOffset = computed(() => getLastBottomOffset(props.id))
const topOffset = computed(() => lastOffset.value + props.offset)
const bottomOffset = computed(() => topOffset.value + height.value)
const cssStyle = computed(() => ({
  top: topOffset.value + 'px',
  zIndex: props.zIndex
}))

// 响应式控制message是否可见的变量，到期后设置为不可见并销毁
const visible = ref(false)
let timer: any
function startTimer() {
  if (props.duration === 0) return
  timer = setTimeout(() => {
    visible.value = false
  }, props.duration)
}
// 当鼠标在上面时不关闭消息框
function clearTimer() {
  clearTimeout(timer)
}

onMounted(async () => {
  visible.value = true
  startTimer()
  // dom更新完成后获取当前消息实例高度并设置；可以在transition里用生命周期钩子赋值
  // await nextTick()
  // height.value = messageRef.value!.getBoundingClientRect().height
})

// 键盘esc时关闭message
function keydown(e: Event) {
  const event = e as KeyboardEvent
  if (event.code === 'Escape') {
    visible.value = false
  }
}
useEventListener(document, 'keydown', keydown)

// 可以在transition里用生命周期钩子销毁实例，不用watch
// watch(visible, newValue => {
//   if (!newValue) {
//     props.onDestroy()
//   }
// })

function destroyComponent() {
  props.onDestroy()
}
function updateHeight() {
  height.value = messageRef.value!.getBoundingClientRect().height
}

defineExpose({
  // 把本实例的下边界暴露出去供后续元素计算
  bottomOffset,
  visible
})
</script>
