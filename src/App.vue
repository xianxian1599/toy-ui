<script setup lang="ts">
import { ref, onMounted, h } from 'vue'
import ToyButton from './components/Button/Button.vue'
import type { ButtonInstance } from './components/Button/types'
import ToyCollapse from './components/Collapse/Collapse.vue'
import ToyCollapseItem from './components/Collapse/CollapseItem.vue'
import ToyIcon from './components/Icon/Icon.vue'
import ToyAlert from './components/Alert/Alert.vue'
import { createPopper } from '@popperjs/core'
import type { Instance, Options } from '@popperjs/core'
import ToyTooltip from './components/Tooltip/Tooltip.vue'
import type { TooltipInstance } from './components/Tooltip/types'
import ToyDropDown from './components/Dropdown/Dropdown.vue'
import type { MenuOption } from './components/Dropdown/types'
import ToyMessage from './components/Message/Message.vue'
import { createMessage } from './components/Message/method'


// 获取并打印button的dom节点实例
const buttonRef = ref<ButtonInstance | null>(null)

// 测试popper组件，在img触发
const overlyNode = ref<HTMLElement>()
const triggerNode = ref<HTMLElement>()
let poperInstance: Instance | null = null

onMounted(() => {
  const instance1 = createMessage({ message: 'hello world', duration: 0, showClose: true })
  createMessage({ message: 'hello world again', duration: 0, type: 'success', showClose: true })
  createMessage({ message: 'hello world three', duration: 0, type: 'danger', showClose: true })

  if (buttonRef.value) {
    console.log(buttonRef.value.ref)
  }
  if (overlyNode.value && triggerNode.value) {
    poperInstance = createPopper(triggerNode.value, overlyNode.value, { placement: 'right' })
  }
  setTimeout(() => {
    openedValue.value = ['a', 'b']
    size.value = '2xl'
    poperInstance?.setOptions({ placement: 'bottom' })
    trigger.value = 'hover'
    instance1.destroy()
  }, 2000)
})

// 测试collapse组件
const openedValue = ref(['a'])

// 测试icon
const size = ref<any>('3x')

// 测试tooltip
const trigger = ref('click')
// 设置绑定到浮窗的实例节点和开关浮窗的手动事件
const tooltipRef = ref<TooltipInstance | null>(null)
const open = () => {
  tooltipRef.value?.show()
}
const close = () => {
  tooltipRef.value?.hide()
}
// 测试浮窗中popper的属性
const options1: Partial<Options> = {
  // placement: 'right-end',
  // strategy: 'fixed'
}

// 测试dropdown
const options: MenuOption[] = [
  { key: 1, label: h('b', 'this is bold') },
  { key: 2, label: 'item2', disabled: true },
  { key: 3, label: 'item3', divided: true },
  { key: 4, label: 'item4' }
]
const inlineConsole = (...args: any) => {
  console.log(...args)
}

</script>

<template>
  <header>
    <!-- 测试popper -->
    <img
      alt="Vue logo"
      class="logo"
      src="./assets/logo.svg"
      width="125"
      height="125"
      ref="triggerNode"
    />
    <div ref="overlyNode"><h1>hello tooltip</h1></div>

    <!-- 测试tooltip -->
    <ToyTooltip
      placement="right"
      trigger="click"
      ref="tooltipRef"
      :open-delay="1000"
      :close-delay="1000"
      :popper-options="options1"
    >
      <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
      <template #content>
        <h1>Hello</h1>
      </template>
    </ToyTooltip>

    <!-- 测试dropdown -->
    <ToyDropDown
    placement="bottom"
    :menu-options="options"
    trigger="click"
    @visible-change="e => inlineConsole('visible change', e)"
    @select="e => inlineConsole('select', e)"
    >
      <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
      <template #content>
        <h1>Hello</h1>
      </template>
    </ToyDropDown>
  </header>

  <!-- icon展示 -->
  <ToyIcon icon="arrow-up" :size="size" type="danger" spin color="#0e7a0d" />
  <main>
    <!-- button展示 -->
    <toy-button @click="open">点击打开浮窗</toy-button>
    <toy-button @click="close">点击关闭浮窗</toy-button>
    <ToyButton ref="buttonRef">Test Button</ToyButton>
    <toy-button round>Round Button</toy-button>
    <ToyButton plain>Plain Button</ToyButton>
    <ToyButton round>Round Button</ToyButton>
    <ToyButton circle>Toy</ToyButton>
    <ToyButton disabled>Disabled Button</ToyButton><br /><br />
    <ToyButton type="primary">Primary</ToyButton>
    <ToyButton type="success">Success</ToyButton>
    <ToyButton type="info">Info</ToyButton>
    <ToyButton type="warning">Warning</ToyButton>
    <ToyButton type="danger">Danger</ToyButton><br /><br />
    <ToyButton type="primary" plain>Primary</ToyButton>
    <ToyButton type="success" plain>Success</ToyButton>
    <ToyButton type="info" plain>Info</ToyButton>
    <ToyButton type="warning" plain>Warning</ToyButton>
    <ToyButton type="danger" plain>Danger</ToyButton><br /><br />
    <ToyButton size="large">Large</ToyButton>
    <ToyButton size="small">Small</ToyButton><br /><br />
    <ToyButton size="large" loading>Loading</ToyButton>
    <ToyButton size="large" icon="arrow-up">Icon</ToyButton><br /><br />

    <!-- collapse展示 -->
    <ToyCollapse v-model="openedValue" accordion>
      <ToyCollapseItem name="a" title="Title A">
        <h1>headline title</h1>
        <div>this is content a aaa</div>
      </ToyCollapseItem>
      <ToyCollapseItem name="b" title="Title B">
        <div>this is bbbbb test</div>
      </ToyCollapseItem>
      <ToyCollapseItem name="c" title="Disabled Title" disabled>
        <div>this is cccc test</div>
      </ToyCollapseItem>
    </ToyCollapse>
    {{ openedValue }}

    <!-- alart展示 -->
    <!-- <ToyAlert
      center
      show-icon
      type="success"
      title="Success Alert"
      description="Success Description"
    /><br /><br />
    <ToyAlert
      show-icon
      type="warning"
      title="Warning Alert"
      description="Warning Description"
    /><br /><br />
    <ToyAlert
      show-icon
      type="info"
      title="Info Alert"
      description="Info Description"
    /><br /><br />
    <ToyAlert
      show-icon
      type="danger"
      title="Error Alert"
      description="Error Description"
      :closable="false"
    /><br /><br /> -->
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
