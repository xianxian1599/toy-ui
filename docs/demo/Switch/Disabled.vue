<script setup>
import { ref } from 'vue'
import ToySwitch from '@/components/Switch/Switch.vue'
const test = ref(false)
const test2 = ref(false)
</script>
<template>
  正常：<ToySwitch v-model="test" /> <br/>
  禁用：<ToySwitch v-model="test2" disabled/>
</template>
