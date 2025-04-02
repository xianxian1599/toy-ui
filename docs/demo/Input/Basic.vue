<script setup>
import { ref } from 'vue'
import ToyInput from '@/components/Input/Input.vue'
const test = ref('')
</script>
<template>
  <ToyInput v-model="test" placeholder="基础文本框，请输入" />
  <span>{{test}}</span>
</template>
