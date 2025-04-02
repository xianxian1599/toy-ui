<script setup>
import ToyTooltip from '@/components/Tooltip/Tooltip.vue'
import ToyButton from '@/components/Button/Button.vue'
</script>
<template>
<div class="basic block">
  <ToyTooltip
    trigger="click"
  >
    <ToyButton> 复杂 HTML 结构的Tooltip </ToyButton>
    <template #content>
      <h3> this is the title</h3>
      <p> this is the content </p>
    </template>
  </ToyTooltip>
</div>
</template>
