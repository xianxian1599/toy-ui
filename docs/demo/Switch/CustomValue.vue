<script setup>
import { ref } from 'vue'
import ToySwitch from '@/components/Switch/Switch.vue'
const test = ref('right')
</script>
<template>
  <ToySwitch v-model="test" activeValue="right" inactiveValue="wrong"/>
  <h4>model-value: {{test}}</h4>
</template>
