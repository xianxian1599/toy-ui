import type { App } from 'vue'
import ToyCollapse from '@/components/Collapse/Collapse.vue'
import ToyCollapseItem from '@/components/Collapse/CollapseItem.vue'
ToyCollapse.install = (app: App) => {
  app.component(ToyCollapse.name!, ToyCollapse)
}
ToyCollapseItem.install = (app: App) => {
  app.component(ToyCollapseItem.name!, ToyCollapseItem)
}
export default ToyCollapse
export {
  ToyCollapseItem
}
export * from './types'
