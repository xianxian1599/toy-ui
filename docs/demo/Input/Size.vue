<script setup>
import { ref } from 'vue'
import ToyInput from '@/components/Input/Input.vue'
const test = ref('')
</script>
<template>
  <div class="size-holder">
    <ToyInput v-model="test" placeholder="大的 Input" size="large">
    </ToyInput>
    <ToyInput v-model="test" placeholder="普通的 Input">
    </ToyInput>
    <ToyInput v-model="test" placeholder="小的 Input" size="small">
    </ToyInput>
  </div>
</template>
<style scoped>
.size-holder {
  display: flex;
  align-items: center;
}
</style>
