// 接收解析渲染h节点的中介组件,以Vnode或字符串形式插入下拉栏组件中
import { defineComponent } from 'vue'
const RenderVnode = defineComponent({
  props: {
    vNode: {
      type: [String, Object],
      required: true
    }
  },
  setup(props) {
    return () => props.vNode
  }
})

export default RenderVnode
