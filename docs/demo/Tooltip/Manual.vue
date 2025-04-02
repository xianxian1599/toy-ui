<script setup>
import { ref } from 'vue'
import ToyTooltip from '@/components/Tooltip/Tooltip.vue'
import ToyButton from '@/components/Button/Button.vue'

const tooltipRef = ref()
const open = () => {
  tooltipRef.value?.show()
}
const close = () => {
  tooltipRef.value?.hide()
}
</script>
<template>
<div class="basic block">
  <ToyTooltip
    content="hello tooltip"
    ref="tooltipRef"
    manual
  >
    <ToyButton> 手动容器 </ToyButton>
  </ToyTooltip>

  <br/><br/>
  <ToyButton type="primary" @click="open"> 点击手动触发显示 </ToyButton>
  <ToyButton type="danger" @click="close"> 点击手动触发隐藏 </ToyButton>
</div>
</template>
