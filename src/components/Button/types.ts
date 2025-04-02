// 在此文件辅助的ts类型
export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type ButtonSize = 'large' | 'small'
// 原生按钮类型
export type NativeType = 'button' |'submit' |'reset'

// 导出组件的属性们
export interface ButtonProps {
  type?: ButtonType // 不同的样式
  size?: ButtonSize // 不同的大小
  plain?: boolean // 是否朴素展示
  round?: boolean // 是否圆角
  circle?: boolean // 是否圆形
  disabled?: boolean // 是否禁用
  nativeType?: NativeType // 原生按钮类型
  autofocus?: boolean // 是否自动聚焦
  icon?: string // 图标
  loading?: boolean // 是否正在加载
}

// 导出组件的实例接口
export interface ButtonInstance {
  ref: HTMLButtonElement
}
