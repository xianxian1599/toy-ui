<script setup>
import { ref } from 'vue'
import ToySelect from '@/components/Select/Select.vue'
const test = ref('')
const options2 = [
  { label: 'hello', value: '1' },
  { label: 'xyz', value: '2' },
  { label: 'testing', value: '3' },
  { label: 'check', value: '4', disabled: true }
]
</script>
<template>
  <ToySelect v-model="test" placeholder="基础选择器，请选择" :options="options2" />
  <span>{{test}}</span>
</template>
