import type { App } from 'vue'
import ToyForm from '@/components/Form/Form.vue'
import ToyFormItem from '@/components/Form/FormItem.vue'
ToyForm.install = (app: App) => {
  app.component(ToyForm.name!, ToyForm)
}
ToyFormItem.install = (app: App) => {
  app.component(ToyFormItem.name!, ToyFormItem)
}
export default ToyForm
export {
  ToyFormItem
}
export * from './types'
