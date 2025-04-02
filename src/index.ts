import type { App } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import ToyButton from '@/components/Button'
import ToyCollapse, { ToyCollapseItem } from '@/components/Collapse'
import ToyDropdown from '@/components/Dropdown'
import ToyForm, { ToyFormItem } from '@/components/Form'
import ToyIcon from '@/components/Icon'
import ToyMessage, { createMessage, closeAll as closeMessageAll } from '@/components/Message'
import ToyInput from '@/components/Input'
import ToySelect from '@/components/Select'
import ToySwitch from '@/components/Switch'
import ToyTooltip from '@/components/Tooltip'
import './styles/index.scss'

library.add(fas)

const components = [
  ToyButton,
  ToyCollapse,
  ToyCollapseItem,
  ToyDropdown,
  ToyForm,
  ToyFormItem,
  ToyIcon,
  ToyMessage,
  ToyInput,
  ToySelect,
  ToySwitch,
  ToyTooltip
]

const install = (app: App) => {
  components.forEach(compoment => {
    app.component(compoment.name!, compoment)
  })
}

export {
  install,
  ToyButton,
  ToyCollapse,
  ToyCollapseItem,
  ToyDropdown,
  ToyForm,
  ToyFormItem,
  ToyIcon,
  ToyMessage,
  ToyInput,
  ToySelect,
  ToySwitch,
  ToyTooltip,
  createMessage,
  closeMessageAll
}


export default {
  install
}
