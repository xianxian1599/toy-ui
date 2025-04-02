<!-- 内部包裹checkbox，用dom模拟对应外貌的组件 -->
<template>
  <div
    class="toy-switch"
    :class="{
      [`toy-switch--${size}`]: size,
      'is-disabled': disabled,
      'is-checked': checked
    }"
    @click="switchValue"
  >
    <!-- 前面的小框 -->
    <input
      class="toy-switch__input"
      type="checkbox"
      role="switch"
      :name="name"
      :disabled="disabled"
      ref="input"
      @keydown.enter="switchValue"
    />
    <!-- 切换按钮 -->
    <div class="toy-switch__core">
      <div class="toy-switch__core-inner">
        <span v-if="activeText || inactiveText" class="toy-switch__core-inner-text">
          {{ checked ? activeText : inactiveText }}
        </span>
      </div>
      <div class="toy-switch__core-action"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import type { SwitchProps, SwitchEmits } from './types'

defineOptions({
  name: 'ToySwitch',
  inheritAttrs: false
})
const props = withDefaults(defineProps<SwitchProps>(), {
  activeValue: true,
  inactiveValue: false,
})
const emits = defineEmits<SwitchEmits>()

const innerValue = defineModel<SwitchProps['modelValue']>({ required: true })
const input = ref<HTMLInputElement>()

// 选中状态，要实时更新这个异步变量
const checked = computed(() => innerValue.value === props.activeValue)
const switchValue = () => {
  if (props.disabled) return
  const newValue = checked.value ? props.inactiveValue : props.activeValue
  innerValue.value = newValue
  emits('change', newValue)
}

onMounted(() => {
  input.value!.checked = checked.value
})
watch(checked, newValue => {
  input.value!.checked = newValue
})
</script>
