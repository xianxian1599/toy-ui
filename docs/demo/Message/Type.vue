<script setup>
import { createMessage } from '@/components/Message/method'
import ToyButton from '@/components/Button/Button.vue'
const open = (type) => {
  createMessage({ message: 'hello world', type })
}
</script>
<template>
<div class="basic block">
  <ToyButton @click="open('success')"> Success </ToyButton>
  <ToyButton @click="open('info')"> Info </ToyButton>
  <ToyButton @click="open('warning')"> warning </ToyButton>
  <ToyButton @click="open('danger')"> Danger </ToyButton>
</div>
</template>
