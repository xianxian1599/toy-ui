import type { App } from 'vue'
import ToySwitch from '@/components/Switch/Switch.vue'

ToySwitch.install = (app: App) => {
  app.component(ToySwitch.name!, ToySwitch)
}

export default ToySwitch

export * from './types'
