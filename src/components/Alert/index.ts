import type { App } from 'vue'
import ToyAlert from './Alert.vue'

ToyAlert.install = (app: App) => {
  app.component(ToyAlert.name!, ToyAlert)
}

export default ToyAlert

export * from './types'
