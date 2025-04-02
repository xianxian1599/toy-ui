import Theme from 'vitepress/theme'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { ElementPlusContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'
import '@/styles/index.scss'
import './custom.scss'

library.add(fas)

export default  {
  ...Theme,
  enhanceApp({ app }) {
    app.component('demo-preview', ElementPlusContainer)
  }
}
