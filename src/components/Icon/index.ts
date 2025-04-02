import type { App } from 'vue'
import ToyIcon from '@/components/Icon/Icon.vue'

ToyIcon.install = (app: App) => {
  app.component(ToyIcon.name!, ToyIcon)
}

export default ToyIcon

export * from './types'
