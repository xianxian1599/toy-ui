<template>
  <div
    class="toy-input"
    :class="{
      [`toy-input--${type}`]: type,
      [`toy-input--${size}`]: size,
      'is-disabled': disabled,
      'is-prepend': $slots.prepend,
      'is-append': $slots.append,
      'is-prefix': $slots.prefix,
      'is-suffix': $slots.suffix,
      'is-focus': isFocus
    }"
  >
    <!-- input -->
    <template v-if="type !== 'textarea'">
      <!-- prepend slot -->
      <div v-if="$slots.prepend" class="toy-input__prepend">
        <slot name="prepend" />
      </div>
      <div class="toy-input__wrapper">
        <!-- prefix slot -->
        <span v-if="$slots.prefix" class="toy-input__prefix">
          <slot name="prefix" />
        </span>
        <input
          class="toy-input__inner"
          v-model="innerValue"
          v-bind="attrs"
          ref="inputRef"
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          :disabled="disabled"
          :placeholder="placeholder"
          :readonly="readonly"
          :autocomplete="autocomplete"
          :autofocus="autofocus"
          :form="form"
          @input="handleInput"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <!-- suffix slot -->
        <span v-if="$slots.suffix || showClear || showPasswordArea" class="toy-input__suffix" @click="keepFocus">
          <slot name="suffix" />
          <!-- 一键清空图标 -->
          <ToyIcon
            icon="circle-xmark"
            v-if="showClear"
            class="toy-input__clear"
            @click="clear"
            @mousedown.prevent=" NOOP"
          />
          <!-- 密码隐藏图标 -->
          <ToyIcon
            icon="eye"
            v-if="showPasswordArea && passwordVisible"
            class="toy-input__password"
            @click="togglePasswordVisible"
          />
          <!-- 密码显示图标 -->
          <ToyIcon
            icon="eye-slash"
            v-if="showPasswordArea && !passwordVisible"
            class="toy-input__password"
            @click="togglePasswordVisible"
          />
        </span>
      </div>
      <!-- append slot -->
      <div v-if="$slots.append" class="toy-input__append">
        <slot name="append" />
      </div>
    </template>
    <!-- textarea -->
    <template v-else>
      <textarea
        class="toy-textarea__wrapper"
        v-model="innerValue"
        v-bind="attrs"
        ref="InputRef"
        :disabled="disabled"
        :placeholder="placeholder"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :autofocus="autofocus"
        :form="form"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      >
      </textarea>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed, nextTick, useAttrs, inject } from 'vue'
import type { InputProps, InputEmits } from './types'
import ToyIcon from '../Icon/Icon.vue'
import type { Ref } from 'vue'
import { formItemContextKey} from '../Form/types'

// 用于作为表单项时自动验证
const formItemContext = inject(formItemContextKey)
const runValidation = (trigger?: string) => {
  formItemContext?.validate(trigger).catch((e) => console.log(e.errors))
}

defineOptions({
  name: 'ToyInput',
  inheritAttrs: false // 把原生input属性继承关闭掉
})
const attrs = useAttrs()

// 暴露出实例，使用户拿到dom节点
const inputRef = ref() as Ref<HTMLInputElement>
defineExpose({
  ref: inputRef
})

const props = withDefaults(defineProps<InputProps>(), { type: 'text', autocomplete: 'off' })
const emits = defineEmits<InputEmits>()

// 用defineModel代替v-model部分
const innerValue = defineModel<InputProps['modelValue']>({ required: true })
// const innerValue = ref(props.modelValue)
// watch(() => props.modelValue, (newValue) => {
//   innerValue.value = newValue
// })

// innerValue的响应式更新是异步的，因此要使用 DOM 事件中的实时值或者等待异步
const handleInput = (e: Event) => {
  //   emits('update:modelValue', innerValue.value)
  const newValue = (e.target as HTMLInputElement).value
  emits('input', newValue)
  runValidation('input')
}

const handleChange = async () => {
  await nextTick()
  emits('change', innerValue.value)
  runValidation('change')
}

const isFocus = ref(false)
const passwordVisible = ref(false)

// 是否显示一键清空按钮
const showClear = computed(
  () =>
    props.clearable &&
    !props.disabled &&
    !!innerValue.value && // 转换成boolean值
    isFocus.value
)

// 是否显示密码隐藏
const showPasswordArea = computed(() =>
  props.showPassword &&
  !props.disabled &&
  !!innerValue.value
)

const handleFocus = (e: FocusEvent) => {
  isFocus.value = true
  emits('focus', e)
}
const handleBlur = (e: FocusEvent) => {
  isFocus.value = false
  emits('blur', e)
  runValidation('blur')
}

const clear = () => {
  innerValue.value = ''
  emits('clear')
  emits('input', '')
  emits('change', '')
}

const togglePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value
}

// 点击眼睛时保持聚焦状态
const keepFocus = async () => {
  await nextTick()
  inputRef.value.focus()
}

// 空函数
const NOOP = () => {}
</script>
