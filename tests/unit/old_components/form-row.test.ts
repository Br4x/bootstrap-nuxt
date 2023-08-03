import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BFormRow from '@/components/B/FormRow.vue'

describe('layout > form-row', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BFormRow)

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('form-row')
    expect(wrapper.text()).toEqual('')
  })

  it('custom root element when prop tag set', async () => {
    const wrapper = mount(BFormRow, {
      propsData: {
        tag: 'span',
      },
    })

    expect(wrapper.element.tagName).toBe('SPAN')
    expect(wrapper.classes()).toContain('form-row')
    expect(wrapper.text()).toEqual('')
  })

  it('renders default slot content', async () => {
    const wrapper = mount(BFormRow, {
      slots: {
        default: 'foobar',
      },
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('form-row')
    expect(wrapper.text()).toEqual('foobar')
  })
})
