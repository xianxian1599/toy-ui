<template>
  <div
    class="toy-form-item"
    :class="{
      'is-error': validateStatus.state === 'error',
      'is-success': validateStatus.state === 'success',
      'is-loading': validateStatus.loading,
      'is-required': isRequired
    }"
  >
    <label class="toy-form-item__label">
      <!-- 作用域插槽 -->
      <slot name="label" :label="label">
        {{ label }}
      </slot>
    </label>
    <div class="toy-form-item__contet">
      <slot :validate="validate" />
      <!-- 显示错误信息 -->
      <div class="toy-form-item__error-msg" v-if="validateStatus.state === 'error'">
        {{validateStatus.errorMessage}}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, reactive, provide, onMounted, onUnmounted } from 'vue'
import type { FormItemProps, FormValidateFailure, FormItemContext, ValidateStatusProp, FormItemInstance } from './types'
import { formContextKey, formItemContextKey } from './types'
import { isNil } from 'lodash-es'
import Schema from 'async-validator'

defineOptions({
  name: 'ToyFormItem'
})
const props = defineProps<FormItemProps>()

// 使用透传拿到form的属性
const formContext = inject(formContextKey)

// 具体表单项的值
const innerValue = computed(() => {
  const model = formContext?.model
  // 如果form中存在该表单项的属性，则返回该属性的值
  if (model && props.prop && !isNil(model[props.prop])) {
    return model[props.prop]
  } else {
    return null
  }
})

// 表单项的校验规则
const itemRules = computed(() => {
  const rules = formContext?.rules
  // 如果form中存在该表单项属性的规则，则返回该属性的校验规则
  if (rules && props.prop && rules[props.prop]) {
    return rules[props.prop]
  } else {
    return []
  }
})

// 拿到具体表单项验证所需的规则
const getTriggeredRules = (trigger?: string) => {
  const rules = itemRules.value
  if (rules) {
    return rules.filter(rule => {
      if (!rule.trigger || !trigger) return true
      return rule.trigger && rule.trigger === trigger
    })
  } else {
    return []
  }
}

const isRequired = computed(() => {
  return itemRules.value.some(rule => rule.required)
})

// 使用第三方库进行表单验证
const validate = async (trigger?: string) => {
  const modelName = props.prop
  const triggeredRules = getTriggeredRules(trigger)
  if (triggeredRules.length === 0) {
    return true
  }
  if (modelName) {
    const validator = new Schema({
      [modelName]: triggeredRules
    })
    validateStatus.loading = true
    return validator.validate({ [modelName]: innerValue.value })
      .then(() => {
        validateStatus.state = 'success'
      })
      .catch((e: FormValidateFailure) => {
        const { errors } = e
        validateStatus.state = 'error'
        validateStatus.errorMessage = (errors && errors.length > 0) ? errors[0].message || '' : ''
        console.log(e.errors)
        return Promise.reject(e)
      })
      .finally(() => {
        validateStatus.loading = false
      })
  }
}

// 验证状态的数据
const validateStatus: ValidateStatusProp = reactive({
  state: 'init',
  errorMessage: '',
  loading: false
})

let initialValue: any = null
onMounted(() => {
  if (props.prop) {
    formContext?.addField(context)
    initialValue = innerValue.value
  }
})
onUnmounted(() => {
  formContext?.removeField(context)
})

// 清除和重置验证状态
const clearValidate = () => {
  validateStatus.state = 'init'
  validateStatus.errorMessage = ''
  validateStatus.loading = false
}
const resetField = () => {
  clearValidate()
  const model = formContext?.model
  if (model && props.prop && !isNil(model[props.prop])) {
    model[props.prop] = initialValue
  }
}

// 使用透传向下提供验证方法，使表单项下面的input等组件能够自动验证
const context: FormItemContext = {
  prop: props.prop || '',
  validate,
  clearValidate,
  resetField
}
provide(formItemContextKey, context)

// 暴露方法
defineExpose<FormItemInstance>({
  validateStatus,
  validate,
  resetField,
  clearValidate
})
</script>
