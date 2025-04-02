<script setup>
import { h } from 'vue'
import ToyDropdown from '@/components/Dropdown/Dropdown.vue'
import ToyButton from '@/components/Button/Button.vue'
const options = [
  { key: 1, label: h('b', 'this is bold') },
  { key: 2, label: 'item2', disabled: true },
  { key: 3, label: 'item3', divided: true },
  { key: 4, label: 'item4' }
]
</script>
<template>
<div class="basic block">
  <ToyDropdown
    placement="bottom"
    :menu-options="options"
    trigger="click"
  >
  <ToyButton type="primary"> 点击触发下拉菜单 </ToyButton>
  </ToyDropdown>
</div>
</template>
