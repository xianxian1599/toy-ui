import type { App } from 'vue'
import ToyButton from './Button.vue'


ToyButton.install = (app: App) => {
  app.component(ToyButton.name!, ToyButton)
}

export default ToyButton

export * from './types'
