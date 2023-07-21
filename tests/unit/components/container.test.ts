import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BContainer from '@/components/B/Container.vue'

describe('layout > container', () => {
  it('should have expected default structure', async () => {
    const wrapper = mount(BContainer)

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('container')
    expect(wrapper.text()).toEqual('')
  })

  it('renders custom root element when prop tag set', async () => {
    const wrapper = mount(BContainer, {
      propsData: {
        tag: 'section',
      },
    })

    expect(wrapper.element.tagName).toBe('SECTION')
    expect(wrapper.classes()).toContain('container')
    expect(wrapper.text()).toEqual('')
  })

  it('should have container-fluid class when prop fluid set', async () => {
    const wrapper = mount(BContainer, {
      propsData: {
        fluid: true,
      },
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('container-fluid')
    expect(wrapper.text()).toEqual('')
  })

  it('should have container-md class when prop fluid="md"', async () => {
    const wrapper = mount(BContainer, {
      propsData: {
        fluid: 'md',
      },
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('container-md')
    expect(wrapper.text()).toEqual('')
  })

  it('has content from default slot', async () => {
    const wrapper = mount(BContainer, {
      slots: {
        default: 'foobar',
      },
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('container')
    expect(wrapper.text()).toEqual('foobar')
  })
})
