import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BFormText from '@/components/B/FormText.vue'

describe('form > form-text', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BFormText)

    expect(wrapper.element.tagName).toBe('SMALL')
    expect(wrapper.classes()).toContain('form-text')
    expect(wrapper.classes()).toContain('text-muted')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.text()).toEqual('')
  })

  it('renders default slot content', async () => {
    const wrapper = mount(BFormText, {
      slots: {
        default: 'foobar',
      },
    })

    expect(wrapper.element.tagName).toBe('SMALL')
    expect(wrapper.classes()).toContain('form-text')
    expect(wrapper.classes()).toContain('text-muted')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.text()).toEqual('foobar')
  })

  it('renders custom root element when prop tag set', async () => {
    const wrapper = mount(BFormText, {
      propsData: {
        tag: 'p',
      },
    })

    expect(wrapper.element.tagName).toBe('P')
    expect(wrapper.classes()).toContain('form-text')
    expect(wrapper.classes()).toContain('text-muted')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.text()).toEqual('')
  })

  it('has user supplied ID', async () => {
    const wrapper = mount(BFormText, {
      propsData: {
        id: 'foo',
      },
    })

    expect(wrapper.element.tagName).toBe('SMALL')
    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.attributes('id')).toEqual('foo')
  })

  it('does not have class form-text when prop inline set', async () => {
    const wrapper = mount(BFormText, {
      propsData: {
        inline: true,
      },
    })

    expect(wrapper.element.tagName).toBe('SMALL')
    expect(wrapper.classes()).not.toContain('form-text')
    expect(wrapper.classes()).toContain('text-muted')
    expect(wrapper.classes().length).toBe(1)
  })

  it('has variant class applied when prop text-variant is set', async () => {
    const wrapper = mount(BFormText, {
      propsData: {
        textVariant: 'info',
      },
    })

    expect(wrapper.element.tagName).toBe('SMALL')
    expect(wrapper.classes()).toContain('form-text')
    expect(wrapper.classes()).toContain('text-info')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.text()).toEqual('')
  })
})
