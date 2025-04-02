import type { App } from 'vue'
import ToyMessage from '@/components/Message/Message.vue'
import { createMessage, closeAll } from '@/components/Message/method'
ToyMessage.install = (app: App) => {
  app.component(ToyMessage.name!, ToyMessage)
}

export default ToyMessage
export {
  createMessage,
  closeAll
}
export * from './types'
