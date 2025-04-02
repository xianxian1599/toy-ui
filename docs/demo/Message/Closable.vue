<script setup>
import { createMessage } from '@/components/Message/method'
import ToyButton from '@/components/Button/Button.vue'
const open = () => {
  createMessage({ message: 'hello world', showClose: true, duration: 0 })
}
</script>
<template>
<div class="basic block">
  <ToyButton @click="open"> 可关闭消息 </ToyButton>
</div>
</template>
