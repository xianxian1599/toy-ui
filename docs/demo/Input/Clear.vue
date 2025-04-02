<script setup>
import { ref } from 'vue'
import ToyInput from '@/components/Input/Input.vue'
const test = ref('')
</script>
<template>
  <ToyInput v-model="test" clearable placeholder="输入字符以后可以点击清空"/>
</template>
