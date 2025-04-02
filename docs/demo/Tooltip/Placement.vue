<script setup>
import ToyTooltip from '@/components/Tooltip/Tooltip.vue'
import ToyButton from '@/components/Button/Button.vue'
</script>
<template>
<div class="basic block">
  <ToyTooltip
    content="hello tooltip"
    placement="top-start"
  >
    <ToyButton> top-start </ToyButton>
  </ToyTooltip>

  <ToyTooltip
    content="hello tooltip"
    placement="bottom-start"
  >
    <ToyButton> bottom-start </ToyButton>
  </ToyTooltip>

  <ToyTooltip
    content="hello tooltip"
    placement="left-start"
  >
    <ToyButton> left-start </ToyButton>
  </ToyTooltip>

  <ToyTooltip
    content="hello tooltip"
    placement="right-start"
  >
    <ToyButton> right-start </ToyButton>
  </ToyTooltip>
</div>
</template>
<style scoped>
.toy-button {
  margin-right: 20px;
}
</style>
