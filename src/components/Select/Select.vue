<!-- Input+Tooltip -->
<template>
  <div
    class="toy-select"
    :class="{ 'is-disaled': disabled }"
    @click="toggleDropdown"
    @mouseenter="states.mouseHover = true"
    @mouseleave="states.mouseHover = false"
  >
    <ToyTooltip
      placement="bottom-start"
      ref="tooltipRef"
      :popperOptions="popperOptions"
      @click-outside="controlDropdown(false)"
      manual
    >
      <ToyInput
        v-model="states.inputValue"
        ref="inputRef"
        :disabled="disabled"
        :placeholder="filteredPlaceholder"
        :readonly="!filterable || !isDropdownShow"
        @input="debounceFilter"
        @keydown="handleKeydown"
      >
      <template #suffix>
        <ToyIcon
          icon="circle-xmark"
          v-if="showClearIcon"
          class="toy-input__clear"
          @click.stop="onClear"
        />

        <ToyIcon
          v-else
          icon="angle-up"
          class="header-angle"
          :class="{ 'is-active': isDropdownShow }"
        />
      </template>
      </ToyInput>
      <template #content>
        <div class="toy-select__loading" v-if="states.loading"><ToyIcon icon="spinner" spin /></div>
        <div class="toy-select__nodata" v-else-if="filterable && filteredOptions.length === 0">no matching data</div>
        <ul class="toy-select__menu">
          <template v-for="(item, index) in filteredOptions" :key="index">
            <li
              class="toy-select__menu-item"
              :class="{
                'is-disabled': item.disabled,
                'is-selected': states.selectedOption?.value === item.value,
                'is-highlighted': states.highlightIndex === index
              }"
              :id="`select-item-${item.value}`"
              @click.stop="selectItem(item)"
            >
              <!-- 自定义选项样式 -->
              <RenderVnode :vNode="renderLabel ? renderLabel(item) : item.label" />
            </li>
          </template>
        </ul>
      </template>
    </ToyTooltip>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import type { Ref } from 'vue'
import type { SelectProps, SelectEmits, SelectOption, SelectStates } from './types'
import ToyTooltip from '../Tooltip/Tooltip.vue'
import type { TooltipInstance } from '../Tooltip/types'
import ToyInput from '../Input/Input.vue'
import type { InputInstance } from '../Input/types'
import ToyIcon from '../Icon/Icon.vue'
import RenderVnode from '../Common/RenderVnode'
import { isFunction, debounce, filter } from 'lodash-es'

defineOptions({
  name: 'ToySelect'
})
const props = withDefaults(defineProps<SelectProps>(), {
  options: () => []
})
const emits = defineEmits<SelectEmits>()
const tooltipRef = ref() as Ref<TooltipInstance>
const inputRef = ref() as Ref<InputInstance>

// 筛选后的选项
const filteredOptions = ref(props.options)
watch(() => props.options, (newValue) => {
  filteredOptions.value = newValue
})
const generateFilterOptions = async (searchValue: string) => {
  if(!props.filterable) return
  // 如果有自定义方法就用自定义方法，没有就用默认方法
  if(props.filterMethod && isFunction(props.filterMethod)) {
    filteredOptions.value = props.filterMethod(searchValue)
  } else if(props.remote && props.remoteMethod && isFunction(props.remoteMethod)) {
    states.loading = true
    try {
      filteredOptions.value = await props.remoteMethod(searchValue)
    } catch (error) {
      console.error(error)
    } finally {
      states.loading = false
    }
  }
  else {
    filteredOptions.value = props.options?.filter(option => option.label.includes(searchValue))
  }
  states.highlightIndex = -1
}
const onFilter = () => {
  generateFilterOptions(states.inputValue)
}
// 远程搜索防抖
const timeout = computed(() => props.remote ? 300 : 0)
const debounceFilter = debounce(onFilter, timeout.value)
// 输入框提示语
const filteredPlaceholder = computed(() => {
  return (props.filterable && states.selectedOption && isDropdownShow.value)
  ? states.selectedOption?.label : props.placeholder
})

// 输入自动匹配
const findOption = (value: string) => {
  const option = props.options?.find(option => option.value === value)
  return option ? option : null
}
const initialOption = findOption(props.modelValue)
const states = reactive<SelectStates>({
  inputValue: initialOption ? initialOption.label : '',
  selectedOption: initialOption,
  mouseHover: false,
  loading: false,
  highlightIndex: -1
})
watch(()=> props.modelValue, (newValue) => {
  states.selectedOption = findOption(newValue)
})

// 下拉栏打开状态
const isDropdownShow = ref(false)
const controlDropdown = (show: boolean) => {
  if (show) {
    // filter模式，且之前选择过值，再次点击会清空输入框
    if(props.filterable && states.selectedOption) {
      states.inputValue = ''
    }
    // 进行一次默认选项的生成
    if(props.filterable) {
      generateFilterOptions(states.inputValue)
    }
    tooltipRef.value.show()
  } else {
    tooltipRef.value.hide()
    // blur 时候将之前的值回灌回input中
    if(props.filterable) {
      states.inputValue = states.selectedOption ? states.selectedOption.label : ''
    }
    states.highlightIndex = -1
  }
  isDropdownShow.value = show
  emits('visible-change', show)
}
const toggleDropdown = () => {
  if (props.disabled) return
  if (isDropdownShow.value) {
    controlDropdown(false)
  } else {
    controlDropdown(true)
  }
}

// 选项选择
const selectItem = (e: SelectOption) => {
  if (e.disabled) return
  states.inputValue = e.label
  states.selectedOption = e
  emits('change', e.value)
  controlDropdown(false)
  inputRef.value.ref.focus()
}

// 使选项宽度和输入框一致
const popperOptions: any = {
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 9]
      }
    },
    {
      name: 'sameWidth',
      enabled: true,
      fn: ({ state }: { state: any }) => {
        state.styles.popper.width = `${state.rects.reference.width}px`
      },
      phase: 'beforeWrite',
      requires: ['computeStyles']
    }
  ]
}

// 一键清空图标
const showClearIcon = computed(() => {
  // 要是hover状态
  // props.clearable为true
  // 必须已经选了选项
  // input值不能为空
  return props.clearable &&
    states.selectedOption &&
    states.mouseHover &&
    states.inputValue.trim() !== ''
})
const onClear = () => {
  states.selectedOption = null
  states.inputValue = ''
  emits('clear')
  emits('change', '')
}

// 键盘操作
const handleKeydown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'Enter':
      if(!isDropdownShow.value) {
        toggleDropdown()
      } else {
        if(states.highlightIndex !== -1 && filteredOptions.value[states.highlightIndex]) {
          selectItem(filteredOptions.value[states.highlightIndex])
        }
        else {
          controlDropdown(false)
        }
      }
      break

    case 'Escape':
      if(isDropdownShow.value) {
        controlDropdown(false)
      }
      break

    case 'ArrowUp':
      e.preventDefault()
      if(filteredOptions.value.length > 0) {
        if(states.highlightIndex === -1 || states.highlightIndex === 0) {
          states.highlightIndex = filteredOptions.value.length - 1
        } else states.highlightIndex--
      }
      break

    case 'ArrowDown':
      e.preventDefault()
      if(filteredOptions.value.length > 0) {
        if(states.highlightIndex === -1 || states.highlightIndex === filteredOptions.value.length - 1) {
          states.highlightIndex = 0
        } else states.highlightIndex++
      }
      break

    default:
      break
  }
}
</script>
