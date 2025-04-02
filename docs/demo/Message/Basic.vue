<script setup>
import { h } from 'vue'
import { createMessage } from '@/components/Message/method'
import ToyButton from '@/components/Button/Button.vue'
const open = () => {
  createMessage({ message: 'hello world' })
}
const open2 = () => {
  createMessage({ message: h('b', 'this is bold') })
}
</script>
<template>
<div class="basic block">
  <ToyButton type="primary" @click="open"> 创建一条消息 </ToyButton>
  <ToyButton  @click="open2"> 创建支持 VNode 的消息 </ToyButton>
</div>
</template>
