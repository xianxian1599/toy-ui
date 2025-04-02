<script setup>
import ToyButton from '@/components/Button/Button.vue'
</script>
<template>
<div class="disabled block">
  <ToyButton disabled> hello </ToyButton>
  <ToyButton type="primary" disabled> Primary </ToyButton>
  <ToyButton type="success" disabled> Success </ToyButton>
  <ToyButton type="warning" disabled> Warning </ToyButton>
  <ToyButton type="danger" disabled> Danger </ToyButton>
  <ToyButton type="info" disabled> Info </ToyButton>
</div>

<div class="disabled-plain block">
  <ToyButton plain disabled> hello </ToyButton>
  <ToyButton type="primary" plain disabled> Primary </ToyButton>
  <ToyButton type="success" plain disabled> Success </ToyButton>
  <ToyButton type="warning" plain disabled> Warning </ToyButton>
  <ToyButton type="danger" plain disabled> Danger </ToyButton>
  <ToyButton type="info" plain disabled> Info </ToyButton>
</div>
</template>
