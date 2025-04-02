// 工具函数，使用render来将VNode节点渲染到dom节点上
// 两个参数：VNode节点和要挂载的容器

import { render, h, shallowReactive } from 'vue'
import type { CreateMessageProps, MessageContext } from './types'
import MessageConstructor from './Message.vue'
import useZIndex from '../../hooks/useZIndex'

// 创建实例数组，注意要响应式，以便在插入新数据后及时更新
const instances: MessageContext[] = shallowReactive([])
let seed = 1

export const createMessage = (props: CreateMessageProps) => {
  const id = `message_${seed++}`
  const container = document.createElement('div')
  const { nextZIndex } = useZIndex()

  // 把销毁vnode节点的方法添加到props上，以便在到期时调用
  const destroy = () => {
    // 删除数组中的实例
    const idx = instances.findIndex(instance => instance.id === id)
    if (idx === -1) return
    instances.splice(idx, 1)
    render(null, container)
  }

  // 手动删除，其实就是手动调整visible的值，visible是通过expose传出来的
  const manualDestroy = () => {
    const instance = instances.find(instance => instance.id === id)
    if (instance) {
      vm.exposed!.visible.value = false
    }
  }

  const newProps = {
    ...props,
    onDestroy: destroy,
    id,
    zIndex: nextZIndex()
  }
  // 创建message实例并挂载
  const vnode = h(MessageConstructor, newProps)
  render(vnode, container)

  // 通过vnode.component.exposed拿到暴露的组件内部实例上的属性并插入到数组中
  const vm = vnode.component!

  // !是非空断言操作符，表示不为null或undefined
  document.body.appendChild(container.firstElementChild!)

  // 把新实例添加到数组中
  const instance = {
    id,
    vnode,
    props: newProps,
    vm,
    destroy: manualDestroy
  }
  instances.push(instance)
  return instance
}

// 暴露拿到最后一个message实例的方法，方便进行位置计算
export const getLastInstance = () => {
  return instances.at(-1)
}

// 暴露拿到上个message下边界的方法，方便进行位置计算
export const getLastBottomOffset = (id: string) => {
  // 查找本实例，如果不存在或者是第一项，说明没有上个实例，直接返回0
  const idx = instances.findIndex(instance => instance.id === id)
  if (idx <= 0) return 0
  // 如果有就返回上个实例的bottomOffset
  else {
    const prev = instances[idx - 1]
    return prev.vm.exposed!.bottomOffset.value
  }
}

// 销毁所有实例
export const closeAll = () => {
  instances.forEach(instance => {
    instance.destroy()
  })
}
