// 测试文件
import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ToyButton from './Button.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ToyIcon from '../Icon/Icon.vue'

describe('Button.vue', () => {
  // 测试primary
  test('basic button', () => {
    const wrapper = mount(ToyButton, {
      props: {
        type: 'primary'
      },
      slots: {
        default: '按钮'
      }
    })

    // 打印挂载的节点
    console.log(wrapper.html())

    // 测试props是否传参成功生成新的类
    expect(wrapper.get('button').classes()).toContain('toy-button--primary')

    // 测试slot是否传参成功，可以用get或者find来找节点
    // get遇到错误就报错，find会一直找
    expect(wrapper.get('button').text()).toBe('按钮')

    // 测试event
    wrapper.get('button').trigger('click')
    console.log(wrapper.emitted())
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  // 测试disabled
  test('disabled button', () => {
    const wrapper = mount(ToyButton, {
      props: {
        disabled: true
      },
      slots: {
        default: '禁用'
      }
    })
    // 测试disabled属性是否存在
    expect(wrapper.get('button').attributes('disabled')).toBeDefined()
    // 或者可以获取原生节点进行查询
    expect(wrapper.get('button').element.disabled).toBeDefined()

    // 测试event，disabled按钮点击不会触发
    wrapper.get('button').trigger('click')
    console.log(wrapper.emitted())
    expect(wrapper.emitted()).not.toHaveProperty('click')
  })

  // 涉及到第三方库，无需真的引入
  // 只要能判断组件是否存在、属性是否正确就可以了
  // 测试icon
  test('icon', () => {
    const wrapper = mount(ToyButton, {
      props: {
        icon: 'arrow-up'
      },
      slots: {
        default: '带图表的按钮'
      },
      // 假的库，可以模拟生成假组件，在不引入第三方库的情况下测试组件
      global: {
        stubs: ['FontAwesomeIcon']
      }
    })
    console.log(wrapper.html())
    const iconElement = wrapper.findComponent(FontAwesomeIcon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('arrow-up')
  })

  // 测试loading
  test('loading', () => {
    const wrapper = mount(ToyButton, {
      props: {
        loading: true
      },
      slots: {
        default: '加载中按钮'
      },
      global: {
        stubs: ['ToyIcon'] // 直接stub掉二次封装过的组件ToyIcon
      }
    })
    console.log(wrapper.html())
    const iconElement = wrapper.findComponent(ToyIcon)
    expect(iconElement.exists()).toBeTruthy()
    // 加载中按钮应该是disabled
    expect(wrapper.attributes('disabled')).toBeDefined()
  })
})
