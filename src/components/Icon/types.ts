import type { FontAwesomeIconProps } from '@fortawesome/vue-fontawesome'

// 添加两个自定义属性
export interface IconProps extends FontAwesomeIconProps {
  type?: 'primary' | 'success' | 'warning'| 'danger' | 'info'
  color?: string
}
