<script setup>
import { ref } from 'vue'
import ToyCollapse from '@/components/Collapse/Collapse.vue'
import ToyCollapseItem from '@/components/Collapse/CollapseItem.vue'
const openedValue = ref(['a'])
</script>
<template>
<div class="basic block">
  <ToyCollapse v-model="openedValue">
    <ToyCollapseItem name="a" title="Title A">
      <h1>headline title</h1>
      <div> this is content a aaa </div>
    </ToyCollapseItem>
    <ToyCollapseItem name="b" title="Title B">
      <div> this is bbbbb test </div>
    </ToyCollapseItem>
    <ToyCollapseItem name="c" title="Disabled Title" disabled>
      <div> this is cccc test </div>
    </ToyCollapseItem>
  </ToyCollapse>
</div>
</template>
