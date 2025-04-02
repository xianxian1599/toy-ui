<template>
  <form class="toy-form">
    <slot/>
  </form>
</template>

<script lang='ts' setup>
import { provide } from 'vue';
import type { FormProps, FormItemContext, FormContext, FormValidateFailure, FormInstance } from './types';
import { formContextKey } from './types';
import type { ValidateFieldsError } from 'async-validator'

defineOptions({
  name: 'ToyForm',
})
const props = defineProps<FormProps>()

// 所有表单项的验证规则及相关方法
const fields: FormItemContext[] = []
const addField: FormContext['addField'] = (field) => {
  fields.push(field)
}
const removeField: FormContext['removeField'] = (field) => {
  if (field.prop) {
    fields.splice(fields.indexOf(field), 1)
  }
}
const resetFields = (keys: string[] = []) => {
  const filterArr = keys.length > 0 ? fields.filter(field => keys.includes(field.prop)) : fields
  filterArr.forEach(field => field.resetField())
}
const clearValidate = (keys: string[] = []) => {
  const filterArr = keys.length > 0 ? fields.filter(field => keys.includes(field.prop)) : fields
  filterArr.forEach(field => field.clearValidate())
}

// 使用透传把数据传给表单项
provide(formContextKey, {
  ...props,
  addField,
  removeField
})

// 对所有表单项进行循环验证
const validate = async () => {
  let validationErrors:ValidateFieldsError = {}
  console.log('fields', fields)
  for (const field of fields) {
    try {
      await field.validate('')
    } catch(e) {
      const error = e as FormValidateFailure
      validationErrors = {
        ...validationErrors,
        ...error.fields
      }
    }
  }
  if (Object.keys(validationErrors).length === 0) return true
  return Promise.reject(validationErrors)
}

// 暴露方法
defineExpose<FormInstance>({
  validate,
  resetFields,
  clearValidate,
})

</script>

