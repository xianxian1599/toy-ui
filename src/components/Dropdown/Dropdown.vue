<!-- 下拉菜单,根据tooltip二次开发 -->
<template>
  <div>
    <ToyTooltip
      :trigger="trigger"
      :placement="placement"
      :popper-options="popperOptions"
      :close-delay="closeDelay"
      :open-delay="openDelay"
      @visible-change="visibleChange"
      ref="tooltipRef"
    >
      <slot />
      <template #content>
        <ul class="toy-dropdown__menu">
          <template v-for="item in menuOptions" :key="item.key">
            <li v-if="item.divided" role="separator" class="divided-placeholder" />
            <li
              class="toy-dropdown__item"
              @click="itemClick(item)"
              :class="{ 'is-disabled': item.disabled, 'is-divided': item.divided }"
              :id="`item-${item.key}`"
            >
              <!-- 不能直接显示VNode节点,要借助 RenderVnode组件进行渲染 -->
              <RenderVnode :vNode="item.label" />
            </li>
          </template>
        </ul>
      </template>
    </ToyTooltip>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { Ref } from 'vue'
import ToyTooltip from '../Tooltip/Tooltip.vue'
import type { DropdownProps, DropdownEmits, DropdownInstance, MenuOption } from './types'
import type { TooltipInstance } from '../Tooltip/types'
import RenderVnode from '../Common/RenderVnode'

defineOptions({
  name: 'ToyDropdown'
})

const props = withDefaults(defineProps<DropdownProps>(), { hideAfterClick: true })
const emit = defineEmits<DropdownEmits>()
const tooltipRef = ref() as Ref<TooltipInstance>
const visibleChange = (e: boolean) => {
  emit('visible-change', e)
}
const itemClick = (e: MenuOption) => {
  if (e.disabled) {
    return
  }
  emit('select', e)
  if (props.hideAfterClick) {
    tooltipRef.value?.hide()
  }
}

defineExpose<DropdownInstance>({
  show: () => tooltipRef.value?.show(),
  hide: () => tooltipRef.value?.hide()
})
</script>
