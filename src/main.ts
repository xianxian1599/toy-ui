import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import App from './App.vue'
import './styles/index.scss'

library.add(fas)

createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
