<template>
  <Transition name="toy-alert-fade">
    <div
      class="toy-alert"
      v-if="visible"
      :class="{
        [`toy-alert__${type}`]: type,
        [`toy-alert__${effect}`]: effect
      }"
    >
      <div class="toy-alert__content">
        {{ content }}
        <span>
          <slot />
        </span>
      </div>
      <div class="toy-alert__close" v-if="closable" @click.stop="visible = false">
        <ToyIcon :icon="'xmark'" />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ToyIcon from '../Icon/Icon.vue'
import type { AlertProps, AlertEmits, AlertInstance } from './types'

defineOptions({
  name: 'ToyAlert'
})
const props = withDefaults(defineProps<AlertProps>(), {
  effect: 'light',
  closable: true,
  type: 'info'
})
const emit = defineEmits<AlertEmits>()

const visible = ref(true)
const content = computed(() => props.content || '')

const hideAlert = () => {
  visible.value = false
  emit('close')
}

// 暴露方法
defineExpose<AlertInstance>({
  hide: hideAlert
})
</script>
