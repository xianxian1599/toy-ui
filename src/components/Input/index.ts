import type { App } from 'vue'
import ToyInput from '@/components/Input/Input.vue'

ToyInput.install = (app: App) => {
  app.component(ToyInput.name!, ToyInput)
}

export default ToyInput

export * from './types'
