<script setup>
import ToyTooltip from '@/components/Tooltip/Tooltip.vue'
import ToyButton from '@/components/Button/Button.vue'
</script>
<template>
<div class="basic block">
  <ToyTooltip
    content="hello tooltip"
    trigger="click"
  >
    <ToyButton> 点击激活 Tooltip </ToyButton>
  </ToyTooltip>
</div>
</template>
