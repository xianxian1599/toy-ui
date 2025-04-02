<script setup>
import { reactive, ref } from 'vue'
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import ToyForm from '@/components/Form/Form.vue'
import ToyFormItem from '@/components/Form/FormItem.vue'
import ToyInput from '@/components/Input/Input.vue'
import ToyButton from '@/components/Button/Button.vue'

const formRef = ref()
const model = reactive({
  email: '123',
  password: '',
  confirmPwd: ''
})
const rules = {
  email: [{ type: 'email', required: true, trigger: 'blur' }],
  password: [{ type: 'string', required: true, trigger: 'blur', min: 3, max: 5 }],
  confirmPwd: [
    { type: 'string', required: true, trigger: 'blur' },
    {
      validator: (rule, value) => value === model.password,
      trigger: 'blur',
      message: '两个密码必须相同'
    }
  ]
}

const submit = async () => {
  try {
    await formRef.value.validate()
    console.log('passed!')
  } catch (e) {
    console.log('the error', e)
  }
}
const reset = () => {
  formRef.value.resetFields()
}
</script>

<template>
  <div>
  <ToyForm :model="model" :rules="rules" ref="formRef">
    <ToyFormItem label="the email" prop="email">
      <ToyInput v-model="model.email"/>
    </ToyFormItem>
    <ToyFormItem label="the password" prop="password">
      <ToyInput type="password" v-model="model.password" />
    </ToyFormItem>
    <ToyFormItem prop="confirmPwd" label="confirm password">
      <ToyInput v-model="model.confirmPwd" type="password" />
    </ToyFormItem>
    <div :style="{textAlign: 'center'}">
      <ToyButton type="primary" @click.prevent="submit">Submit</ToyButton>
      <ToyButton @click.prevent="reset">Reset</ToyButton>
    </div>
  </ToyForm>
</div>
</template>

<style></style>
