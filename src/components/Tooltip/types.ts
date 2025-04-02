import type { Placement, Options } from '@popperjs/core'

export interface TooltipProps {
  content?: string
  trigger?: 'hover' | 'click'
  placement?: Placement
  manual?: boolean // 是否手动触发
  popperOptions?: Partial<Options> // popperjs配置
  transition?: string
  openDelay?: number
  closeDelay?: number
}

export interface TooltipEmits {
  (e: 'visible-change', value: boolean): void,
  (e: 'click-outside', value: boolean): void
}

// 触发方式为手动时暴露的实例方法
export interface TooltipInstance {
  show: () => void
  hide: () => void
}
