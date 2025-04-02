import { mount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, test, vi, afterEach } from 'vitest'
import { beforeEach } from 'vitest'
import ToyButton from '../Button/Button.vue'
import ToyDropdown from './Dropdown.vue'

describe('test::toy-dropdown', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    vi.useFakeTimers()
    const menuOptions = [
      {
        label: 'option1',
        key: 1,
        disabled: true
      },
      {
        label: 'option2',
        key: 2
      }
    ]

    wrapper = mount(
      () => (
        <div>
          <div class="outer-btn"></div>
          <ToyDropdown menuOptions={menuOptions} trigger="click">
            <ToyButton>click</ToyButton>
          </ToyDropdown>
        </div>
      ),
      {
        attachTo: document.body,
        global: {
          stubs: {
            Icon: true,
            transition: false,
            Transition: false
          }
        }
      }
    )
  })

  test('dropdown menu should visible when click', async () => {
    const btn = wrapper.get('.toy-button')
    expect(wrapper.find('.toy-dropdown__menu').exists()).toBeFalsy()
    await btn.trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.toy-dropdown__menu').exists()).toBeTruthy()
    // 测试菜单选项
    const options = wrapper.findAll('.toy-dropdown__item')
    console.log(options)
    expect(options).toHaveLength(2)
    expect(options[0].text()).toBe('option1')
    expect(options[0].classes()).toContain('is-disabled')
  })

  // 清理
  afterEach(() => {
    wrapper.unmount()
  })
})
