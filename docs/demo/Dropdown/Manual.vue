<script setup>
import { h, ref } from 'vue'
import ToyDropdown from '@/components/Dropdown/Dropdown.vue'
import ToyButton from '@/components/Button/Button.vue'
const options = [
  { key: 1, label: h('b', 'this is bold') },
  { key: 2, label: 'item2', disabled: true },
  { key: 3, label: 'item3', divided: true },
  { key: 4, label: 'item4' }
]
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
  <ToyDropdown
    placement="bottom"
    :menu-options="options"
    trigger="click"
    manual
    ref="tooltipRef"
  >
    <ToyButton> 菜单容器 </ToyButton>
  </ToyDropdown>
  <br/><br/>
  <ToyButton type="primary" @click="open"> 点击手动触发显示 </ToyButton>
  <ToyButton type="danger" @click="close"> 点击手动触发隐藏 </ToyButton>
</div>
</template>
