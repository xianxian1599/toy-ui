import { describe, test, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ToyTooltip from './Tooltip.vue'

vi.mock('@popperjs/core') // 把popper库模拟掉
const onVisibleChange = vi.fn()
describe('Tooltip.vue', () => {
  beforeEach(() => {
    vi.useFakeTimers() // 模拟定时器
  })
  test('basic tooltip', async () => {
    const wrapper = mount(() =>
    <div>
      <div id="outside"></div>
      <ToyTooltip content="hello tooltip" trigger='click' onVisibleChange={onVisibleChange}>
        <button id="trigger">Trigger</button>
      </ToyTooltip>
    </div>
    , {
      attachTo: document.body
    })
    // 静态测试
    const triggerArea = wrapper.find('#trigger')
    expect(triggerArea.exists()).toBeTruthy()
    expect(wrapper.find('.toy-tooltip__popper').exists()).toBeFalsy()
    console.log('before', wrapper.html())
    // 测试点击行为
    triggerArea.trigger('click')
    await vi.runAllTimers() // 模拟定时器运行完毕
    expect(wrapper.find('.toy-tooltip__popper').exists()).toBeTruthy()
    expect(wrapper.get('.toy-tooltip__popper').text()).toBe('hello tooltip')
    expect(onVisibleChange).toHaveBeenCalledWith(true)
    console.log('after', wrapper.html())
    // 测试点击外部关掉浮窗 用outside模拟外部环境
    wrapper.get('#outside').trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.toy-tooltip__popper').exists()).toBeFalsy()
    expect(onVisibleChange).toHaveBeenLastCalledWith(false)
  })
})
