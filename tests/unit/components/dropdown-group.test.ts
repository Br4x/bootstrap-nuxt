import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BDropdownGroup from '@/components/B/DropdownGroup.vue'

describe('dropdown > dropdown-header', () => {
  it('works', async () => {
    const wrapper = mount(BDropdownGroup)

    expect(wrapper.element.tagName).toBe('LI')
    expect(wrapper.classes().length).toBe(0)

    const header = wrapper.find('header')
    expect(header.exists()).toBe(false)

    const ul = wrapper.find('ul')
    expect(ul).toBeDefined()
    expect(ul.element.tagName).toBe('UL')
    expect(ul.classes()).toContain('list-unstyled')
    expect(ul.classes().length).toBe(1)
    expect(ul.attributes('id')).toBeUndefined()

    expect(wrapper.text()).toEqual('')
  })

  it('renders header element when prop header set', async () => {
    const wrapper = mount(BDropdownGroup, {
      context: {
        props: { header: 'foobar' },
      },
    })

    expect(wrapper.element.tagName).toBe('LI')

    const header = wrapper.find('header')
    expect(header.element.tagName).toBe('HEADER')
    expect(header.classes()).toContain('dropdown-header')

    expect(header.attributes('id')).toBeUndefined()
    expect(header.text()).toEqual('foobar')
  })

  it('renders custom header element when prop header-tag set', async () => {
    const wrapper = mount(BDropdownGroup, {
      context: {
        props: {
          header: 'foobar',
          headerTag: 'h6',
        },
      },
    })

    expect(wrapper.element.tagName).toBe('LI')

    const header = wrapper.find('.dropdown-header')
    expect(header.element.tagName).toBe('H6')

    expect(header.text()).toEqual('foobar')
  })

  it('user supplied id when prop id set', async () => {
    const wrapper = mount(BDropdownGroup, {
      context: {
        props: { id: 'foo' },
      },
    })

    expect(wrapper.element.tagName).toBe('LI')

    const ul = wrapper.find('ul')
    expect(ul.attributes('id')).toBeDefined()
    expect(ul.attributes('id')).toEqual('foo')
  })

  it('renders default slot content', async () => {
    const wrapper = mount(BDropdownGroup, {
      slots: { default: '<li>foobar</li>' },
    })

    expect(wrapper.element.tagName).toBe('LI')

    const ul = wrapper.find('ul')
    expect(ul.element.tagName).toBe('UL')
    expect(ul.text()).toEqual('foobar')
  })
})
