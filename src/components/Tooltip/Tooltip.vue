<template>
  <div class="toy-tooltip" ref="popperContainerNode" v-on="outerEvents">
    <!-- 触发节点 -->
    <div class="top-tooltip__trigger" ref="triggerNode" v-on="events">
      <slot />
    </div>
    <!-- 显示节点 -->
    <Transition :name="transition">
      <div class="toy-tooltip__popper" ref="popperNode" v-if="isOpen">
        <slot name="content">{{ content }}</slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, reactive, onUnmounted, computed } from 'vue'
import type { TooltipProps, TooltipEmits, TooltipInstance } from './types'
import { createPopper, type Instance } from '@popperjs/core'
import useClickOutside from '../../hooks/useClickOutside'
import { debounce } from 'lodash-es'

defineOptions({
  name: 'ToyTooltip'
})
const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
  trigger: 'hover',
  transition: 'fade',
  openDelay: 0,
  closeDelay: 0
})
const emit = defineEmits<TooltipEmits>()

// 两个节点分别是展示节点和触发节点和根节点
const popperNode = ref<HTMLElement>()
const triggerNode = ref<HTMLElement>()
const popperContainerNode = ref<HTMLElement>()

// 点击和鼠标移入两种事件的处理函数
const isOpen = ref(false)
let openTimes = 0
let closeTimes = 0
const open = () => {
  openTimes++
  console.log('open times', openTimes)
  isOpen.value = true
  emit('visible-change', isOpen.value)
}
const close = () => {
  closeTimes++
  console.log('colse times', closeTimes)
  isOpen.value = false
  emit('visible-change', isOpen.value)
}
// 节流处理
const openDebounce = debounce(open, props.openDelay)
const closeDebounce = debounce(close, props.closeDelay)
const openFinal = () => {
  closeDebounce.cancel() // 多次调用最终是open时,防止close被触发
  openDebounce()
}
const closeFinal = () => {
  openDebounce.cancel() // 多次调用最终是close时,防止open被触发
  closeDebounce()
}
const togglePopper = () => {
  if (isOpen.value) {
    closeFinal()
  } else {
    openFinal()
  }
}

// 点击浮窗外部时，关闭浮窗
useClickOutside(popperContainerNode, () => {
  if (props.trigger === 'click' && isOpen.value && !props.manual) {
    closeFinal()
  }
  if(isOpen.value) {
    emit('click-outside', isOpen.value)
  }
})

// 由父组件传来的trigger动态决定响应式事件对象的内容，包括触发方式和执行函数，并将事件对象绑定到v-on
let events: Record<string, any> = reactive({})
let outerEvents: Record<string, any> = reactive({})
const attachEvents = () => {
  if (props.trigger === 'hover') {
    events['mouseenter'] = openFinal
    // 防止鼠标在浮窗上时浮窗消失
    outerEvents['mouseleave'] = closeFinal
  } else if (props.trigger === 'click') {
    events['click'] = togglePopper
  }
}

// 当触发方式不是手动时，才绑定事件
if (!props.manual) {
  attachEvents()
}

// 当触发方式发生修改时，重新绑定事件
watch(
  () => props.trigger,
  (newTrigger, oldTrigger) => {
    if (newTrigger !== oldTrigger && !props.manual) {
      events = {}
      outerEvents = {}
      attachEvents()
    }
  }
)

// 监听触发方式是否为手动
watch(
  () => props.manual,
  isManual => {
    if (isManual) {
      events = {}
      outerEvents = {}
    } else {
      attachEvents()
    }
  }
)

// 使用watch来创建实例或销毁实例实现浮窗的出现或消失
let popperInstance: null | Instance = null
watch(
  isOpen,
  newValue => {
    if (newValue) {
      if (triggerNode.value && popperNode.value) {
        popperInstance = createPopper(triggerNode.value, popperNode.value, popperOptions.value)
      } else {
        popperInstance?.destroy()
      }
    }
  },
  { flush: 'post' }
)

// 手动触发事件绑定暴露实例接口
defineExpose<TooltipInstance>({
  show: openFinal,
  hide: closeFinal
})

onUnmounted(() => {
  popperInstance?.destroy()
})

// popper的一些属性,优先级高
const popperOptions = computed(() => {
  return {
    placement: props.placement,
    ...props.popperOptions,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 9]
        }
      }
    ],
    ...props.popperOptions
  }
})
</script>
