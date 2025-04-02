<script setup>
import { ref } from 'vue'
import ToySwitch from '@/components/Switch/Switch.vue'
const test = ref(true)
</script>
<template>
  <ToySwitch v-model="test" />
</template>
