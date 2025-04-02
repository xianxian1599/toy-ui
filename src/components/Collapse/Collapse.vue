<template>
  <div class="toy-collapse">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { ref, provide, watch } from 'vue'
import type { NameType, CollapseProps, CollapseEmits } from './types'
import { collapseContextKey } from './types'
defineOptions({ name: 'ToyCollapse' })

// 使组件支持v-model双向绑定
const props = defineProps<CollapseProps>()
const emits = defineEmits<CollapseEmits>()

// 用数组存储展开的列表项的name
// 使用defineModel，自动绑定v-model
// const activeNames = ref<NameType[]>(props.modelValue)
const activeNames = defineModel<NameType[]>({ required: true })

// 处理异步modelValue的问题
// watch(
//   () => props.modelValue,
//   () => {
//     activeNames.value = props.modelValue
//   }
// )

// 点击列表项触发的事件，控制展开、v-model事件
const handleItemClick = (item: NameType) => {
  // 转换成真正的数组再操作，避免v-model出现响应式互相引用问题在测试文件里报错
  // let _activeNames = [...activeNames.value]
  // 手风琴逻辑，如果点击的是唯一展开的项，清空整个激活数组，否则更新激活数组为点击项
  // if (props.accordion) {
  //   _activeNames = [activeNames.value[0] === item ? '' : item]
  //   activeNames.value = _activeNames
  // } else {
  //   const index = _activeNames.indexOf(item)
  //   if (index > -1) {
  //     // 存在，删除数组中对应的一项，收起
  //     _activeNames.splice(index, 1)
  //   } else {
  //     // 不存在，插入对应的name，展开
  //     _activeNames.push(item)
  //   }
  //   activeNames.value = _activeNames
  // }

  const index = activeNames?.value.indexOf(item)
  if (index > -1) {
    activeNames.value.splice(index, 1)
  } else {
    activeNames.value.push(item)
  }

  // 发射v-model所需的事件
  // 使用defineModel，自动绑定v-model
  // emits('update:modelValue', activeNames.value)
  emits('change', activeNames.value)
}

// 把激活数组和控制函数透传到子组件中
provide(collapseContextKey, {
  activeNames,
  handleItemClick
})

// 手风琴模式，只能展开一个，给用户提示
if (props.accordion && activeNames.value.length > 1) {
  console.warn('手风琴模式下，只能展开一个')
}
</script>
