import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BDropdownHeader from '@/components/B/DropdownHeader.vue'

describe('dropdown > dropdown-header', () => {
  it('works', async () => {
    const wrapper = mount(BDropdownHeader)

    expect(wrapper.element.tagName).toBe('LI')

    const header = wrapper.find('header')
    expect(header.element.tagName).toBe('HEADER')
    expect(header.classes()).toContain('dropdown-header')

    expect(header.attributes('id')).toBeUndefined()
    expect(header.text()).toEqual('')
  })

  it('renders custom header element when prop tag set', async () => {
    const wrapper = mount(BDropdownHeader, {
      context: {
        props: { tag: 'h2' },
      },
    })

    expect(wrapper.element.tagName).toBe('LI')

    const header = wrapper.find('h2')
    expect(header.element.tagName).toBe('H2')
    expect(header.classes()).toContain('dropdown-header')

    expect(header.attributes('id')).toBeUndefined()
    expect(header.text()).toEqual('')
  })

  it('user supplied id when prop id set', async () => {
    const wrapper = mount(BDropdownHeader, {
      context: {
        props: { id: 'foo' },
      },
    })

    expect(wrapper.element.tagName).toBe('LI')

    const header = wrapper.find('header')
    expect(header.element.tagName).toBe('HEADER')
    expect(header.classes()).toContain('dropdown-header')

    expect(header.attributes('id')).toBeDefined()
    expect(header.attributes('id')).toEqual('foo')
  })

  it('renders default slot content', async () => {
    const wrapper = mount(BDropdownHeader, {
      slots: { default: 'foobar' },
    })

    expect(wrapper.element.tagName).toBe('LI')

    const header = wrapper.find('header')
    expect(header.element.tagName).toBe('HEADER')
    expect(header.classes()).toContain('dropdown-header')

    expect(header.text()).toEqual('foobar')
  })
})
