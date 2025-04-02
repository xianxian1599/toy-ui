import { describe, test, expect, vi, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'
import type { VueWrapper, DOMWrapper } from '@vue/test-utils'
import ToyCollapse from './Collapse.vue'
import ToyCollapseItem from './CollapseItem.vue'
const onChange = vi.fn()
let wrapper: VueWrapper
let headers: DOMWrapper<Element>[], contents: DOMWrapper<Element>[]
let firstContent: DOMWrapper<Element>, secondContent: DOMWrapper<Element>, disabledContent: DOMWrapper<Element>,
  firstHeader: DOMWrapper<Element>, secondHeader: DOMWrapper<Element>, disabledHeader: DOMWrapper<Element>

describe('Collapse.vue', () => {
  // 钩子，在所有测试用例之前执行一次
  beforeAll(() => {
    wrapper = mount(() =>
      <ToyCollapse modelValue={['a']} onChange={onChange}>
        <ToyCollapseItem name="a" title="title a">
          content a
        </ToyCollapseItem>
        <ToyCollapseItem name="b" title="title b">
          content b
        </ToyCollapseItem>
        <ToyCollapseItem name="c" title="title c" disabled>
          content c
        </ToyCollapseItem>
      </ToyCollapse>
    , {
      global: {
        stubs: ['ToyIcon']
      },
      attachTo: document.body
    })
    headers = wrapper.findAll('.toy-collapse-item__header')
    contents = wrapper.findAll('.toy-collapse-item__wrapper')
    firstHeader = headers[0]
    secondHeader = headers[1]
    disabledHeader = headers[2]
    firstContent = contents[0]
    secondContent = contents[1]
    disabledContent = contents[2]
  })
  test('测试基础结构以及对应文本', () => {
    // 长度
    expect(headers.length).toBe(3)
    expect(contents.length).toBe(3)
    //文本
    expect(firstHeader.text()).toBe('title a')
    // 内容
    expect(firstContent.isVisible()).toBeTruthy()
    expect(secondContent.isVisible()).toBeFalsy()
    expect(firstContent.text()).toBe('content a')

  })
  test('点击标题展开/关闭内容', async () => {
    // 行为
    await firstHeader.trigger('click')
    expect(firstContent.isVisible()).toBeFalsy()
    await secondHeader.trigger('click')
    expect(secondContent.isVisible()).toBeTruthy()
  })
  test('发送正确的事件', () => {
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenCalledWith([])
    expect(onChange).toHaveBeenLastCalledWith(['b'])
  })
  test('disabled 的内容应该没有反应', async () => {
    onChange.mockClear()
    expect(disabledHeader.classes()).toContain('is-disabled')
    await disabledHeader.trigger('click')
    expect(disabledContent.isVisible()).toBeFalsy()
    expect(onChange).not.toHaveBeenCalled()
  })
  test('手风琴模式', async () => {
    wrapper = mount(() =>
      <ToyCollapse modelValue={['a']} onChange={onChange} accordion>
        <ToyCollapseItem name="a" title="title a">
          content a
        </ToyCollapseItem>
        <ToyCollapseItem name="b" title="title b">
          content b
        </ToyCollapseItem>
        <ToyCollapseItem name="c" title="title c" disabled>
          content c
        </ToyCollapseItem>
      </ToyCollapse>
    , {
      global: {
        stubs: ['ToyIcon']
      },
      attachTo: document.body
    })
    const accordionHeaders = wrapper.findAll('.toy-collapse-item__header')
    const accordionContents = wrapper.findAll('.toy-collapse-item__wrapper')

    // 场景1: 初始状态验证
    expect(accordionContents[0].isVisible()).toBeTruthy()  // a 展开
    expect(accordionContents[1].isVisible()).toBeFalsy()   // b 折叠
    expect(accordionContents[2].isVisible()).toBeFalsy()   // c 折叠

    // 场景2: 点击第二个可操作项
    await accordionHeaders[1].trigger('click')
    expect(accordionContents[0].isVisible()).toBeFalsy()   // a 关闭
    expect(accordionContents[1].isVisible()).toBeTruthy()  // b 展开
    expect(onChange).toHaveBeenLastCalledWith(['b'])       // 正确事件

    // 场景3: 再次点击已展开项
    await accordionHeaders[1].trigger('click')
    expect(accordionContents[1].isVisible()).toBeFalsy()   // b 关闭
    expect(onChange).toHaveBeenLastCalledWith([''])          // 空数组

    // 场景4: 点击禁用项
    await accordionHeaders[2].trigger('click')
    expect(accordionContents[2].isVisible()).toBeFalsy()   // 保持关闭
    expect(onChange).not.toHaveBeenLastCalledWith(expect.arrayContaining(['c']))

    // 场景5: 切换不同项
    await accordionHeaders[0].trigger('click')  // 打开a
    await accordionHeaders[1].trigger('click')  // 应该关闭a，打开b
    expect(accordionContents[0].isVisible()).toBeFalsy()
    expect(accordionContents[1].isVisible()).toBeTruthy()
    expect(onChange).toHaveBeenLastCalledWith(['b'])
  })
})
