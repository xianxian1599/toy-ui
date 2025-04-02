import type { App } from 'vue'
import ToyDropdown from '@/components/Dropdown/Dropdown.vue'

ToyDropdown.install = (app: App) => {
  app.component(ToyDropdown.name!, ToyDropdown)
}

export default ToyDropdown

export * from './types'
