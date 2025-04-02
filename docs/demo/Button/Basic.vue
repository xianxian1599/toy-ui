<script setup>
import ToyButton from '@/components/Button/Button.vue'
import Icon from '@/components/Icon/Icon.vue'
</script>
<template>
<div class="basic block">
  <ToyButton> hello </ToyButton>
  <ToyButton type="primary"> Primary </ToyButton>
  <ToyButton type="success"> Success </ToyButton>
  <ToyButton type="warning"> Warning </ToyButton>
  <ToyButton type="danger"> Danger </ToyButton>
  <ToyButton type="info"> Info </ToyButton>
</div>

<div class="plain block">
  <ToyButton plain> hello </ToyButton>
  <ToyButton type="primary" plain> Primary </ToyButton>
  <ToyButton type="success" plain> Success </ToyButton>
  <ToyButton type="warning" plain> Warning </ToyButton>
  <ToyButton type="danger" plain> Danger </ToyButton>
  <ToyButton type="info" plain> Info </ToyButton>
</div>

<div class="round block">
  <ToyButton round> hello </ToyButton>
  <ToyButton type="primary" round> Primary </ToyButton>
  <ToyButton type="success" round> Success </ToyButton>
  <ToyButton type="warning" round> Warning </ToyButton>
  <ToyButton type="danger" round> Danger </ToyButton>
  <ToyButton type="info" round> Info </ToyButton>
</div>

<div class="circle block">
  <ToyButton circle> <Icon icon="star" /> </ToyButton>
  <ToyButton type="primary" circle>   <Icon icon="star" /> </ToyButton>
  <ToyButton type="success" circle> <Icon icon="star" /> </ToyButton>
  <ToyButton type="warning" circle> <Icon icon="star" /> </ToyButton>
  <ToyButton type="danger" circle> <Icon icon="star" /> </ToyButton>
  <ToyButton type="info" circle> <Icon icon="star" /> </ToyButton>
</div>
</template>
<style>
.block {
  margin-bottom: 10px;
}
</style>
