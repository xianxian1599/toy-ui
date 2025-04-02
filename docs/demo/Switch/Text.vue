<script setup>
import { ref } from 'vue'
import ToySwitch from '@/components/Switch/Switch.vue'
const test = ref(false)
</script>
<template>
  <ToySwitch v-model="test" activeText="ON" inactiveText="OFF"/>
</template>
