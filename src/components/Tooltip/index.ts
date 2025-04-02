import type { App } from 'vue'
import ToyTooltip from '@/components/Tooltip/Tooltip.vue'

ToyTooltip.install = (app: App) => {
  app.component(ToyTooltip.name!, ToyTooltip)
}

export default ToyTooltip

export * from './types'
