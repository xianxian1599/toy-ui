<script setup>
import { ref } from 'vue'
import ToyInput from '@/components/Input/Input.vue'
const test = ref('some text')
</script>
<template>
  <ToyInput v-model="test" disabled />
</template>
