<script setup>
import ToyAlert from '@/components/Alert/Alert.vue'
</script>
<template>
<div class="basic block">
  <ToyAlert type="success" :closable="false">without close</ToyAlert>
</div>
</template>
