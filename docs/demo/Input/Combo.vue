<script setup>
import { ref } from 'vue'
import ToyInput from '@/components/Input/Input.vue'
import ToyIcon from '@/components/Icon/Icon.vue'
const test = ref('')
</script>
<template>
  <ToyInput v-model="test" placeholder="prepend append">
    <template #prepend>Https://</template>
    <template #append>.com</template>
  </ToyInput>

  <ToyInput v-model="test" placeholder="prefix suffix">
    <template #prefix>
      <ToyIcon icon="fa-user" />
    </template>
    <template #suffix>
      <ToyIcon icon="fa-user" />
    </template>
  </ToyInput>
</template>
