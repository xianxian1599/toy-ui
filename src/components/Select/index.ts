import type { App } from 'vue'
import ToySelect from '@/components/Select/Select.vue'

ToySelect.install = (app: App) => {
  app.component(ToySelect.name!, ToySelect)
}

export default ToySelect

export * from './types'
