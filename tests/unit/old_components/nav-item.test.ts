import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import BNavItem from '@/components/B/NavItem.vue'
import BLink from '@/components/B/Link.vue'

describe('nav-item', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BNavItem)

    expect(wrapper.element.tagName).toBe('LI')
    expect(wrapper.classes()).toContain('nav-item')

    const link = wrapper.find('a')
    expect(link).toBeDefined()
    expect(link.findComponent(BLink).exists()).toBe(true)
    expect(link.element.tagName).toBe('A')
    expect(link.classes()).toContain('nav-link')
    expect(link.attributes('href')).toBeDefined()
    expect(link.attributes('href')).toBe('#')
    expect(link.attributes('role')).toBeUndefined()
  })

  it('has attrs on link when link-attrs set', async () => {
    const wrapper = mount(BNavItem, {
      context: {
        props: {
          linkAttrs: { role: 'tab' },
        },
      },
    })

    expect(wrapper.attributes('role')).toBeUndefined()

    const link = wrapper.find('a')
    expect(link).toBeDefined()
    expect(link.findComponent(BLink).exists()).toBe(true)
    expect(link.element.tagName).toBe('A')
    expect(link.attributes('role')).toBeDefined()
    expect(link.attributes('role')).toBe('tab')
  })

  it('has custom classes on link when link-classes set', async () => {
    const wrapper = mount(BNavItem, {
      context: {
        props: {
          linkClasses: ['foo', { bar: true }],
        },
      },
    })

    const link = wrapper.find('a')
    expect(link).toBeDefined()
    expect(link.findComponent(BLink).exists()).toBe(true)
    expect(link.element.tagName).toBe('A')
    expect(link.classes()).toContain('foo')
    expect(link.classes()).toContain('bar')
    expect(link.classes()).toContain('nav-link')
  })

  it('has class "disabled" on link when disabled set', async () => {
    const wrapper = mount(BNavItem, {
      context: {
        props: { disabled: true },
      },
    })

    const link = wrapper.find('a')
    expect(link).toBeDefined()
    expect(link.findComponent(BLink).exists()).toBe(true)
    expect(link.element.tagName).toBe('A')
    expect(link.classes()).toContain('disabled')
  })

  it('emits click event when clicked', async () => {
    const spy = vi.fn()
    const wrapper = mount(BNavItem, {
      context: {
        on: { click: spy },
      },
    })

    expect(spy).not.toHaveBeenCalled()
    await wrapper.trigger('click')
    expect(spy).not.toHaveBeenCalled()

    const link = wrapper.find('a')
    expect(link).toBeDefined()
    expect(link.findComponent(BLink).exists()).toBe(true)
    expect(link.element.tagName).toBe('A')
    await link.trigger('click')
    expect(spy).toHaveBeenCalled()
  })

  it('does not emit a click event when clicked and disabled', async () => {
    const spy = vi.fn()
    const wrapper = mount(BNavItem, {
      context: {
        props: { disabled: true },
        on: { click: spy },
      },
    })

    expect(spy).not.toHaveBeenCalled()
    await wrapper.trigger('click')
    expect(spy).not.toHaveBeenCalled()

    const link = wrapper.find('a')
    expect(link).toBeDefined()
    expect(link.findComponent(BLink).exists()).toBe(true)
    expect(link.element.tagName).toBe('A')
    await link.trigger('click')
    expect(spy).not.toHaveBeenCalled()
  })
})
