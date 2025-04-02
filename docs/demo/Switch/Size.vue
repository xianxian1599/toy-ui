<script setup>
import { ref } from 'vue'
import ToySwitch from '@/components/Switch/Switch.vue'
const test = ref(false)
</script>
<template>
  <div class="switch-size-container">
    <ToySwitch v-model="test" size="large"/>
    <ToySwitch v-model="test"/>
    <Switch v-model="test" size="small"/>
  </div>
</template>
<style scoped>
.switch-size-container {
  display: flex;
  align-items: center;
  .toy-switch {
    margin-right: 10px;
  }
}
</style>
