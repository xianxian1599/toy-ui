import type { InjectionKey, Ref } from 'vue'

export type NameType = string | number

export interface CollapseItemProps {
  name: NameType
  title?: string
  disabled?: boolean
}

// 由于子组件是用slot展示信息，所以使用依赖注入CollapseContext完成父子组件之间的通信
export interface CollapseContext {
  activeNames: Ref<NameType[]>
  handleItemClick: (name: NameType) => void
}

// 使组件支持v-model，实现方法看文档
export interface CollapseProps {
  modelValue: NameType[] // 属性名称是固定的modelValue
  accordion?: boolean // 手风琴
}
export interface CollapseEmits {
  // 使用defineModel后，不需要传入update:modelValue，直接使用即可
  // (e: 'update:modelValue', vals: NameType[]): void; // 事件名也是固定的
  (e: 'change', vals: NameType[]): void // 点击触发的事件
}

export const collapseContextKey: InjectionKey<CollapseContext> = Symbol('collapseContextKey')
