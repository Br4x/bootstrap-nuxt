import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Badge from '@/components/B/Badge.vue'

describe('badge', () => {
  it('should have base classes', async () => {
    const wrapper = mount(Badge)

    expect(wrapper.element.tagName).toBe('SPAN')
    expect(wrapper.classes()).toContain('badge')
    expect(wrapper.classes()).toContain('badge-secondary')
    expect(wrapper.classes()).not.toContain('badge-pill')
    expect(wrapper.classes()).not.toContain('active')
    expect(wrapper.classes()).not.toContain('disabled')
    expect(wrapper.attributes('href')).toBeUndefined()
  })

  it('should have default slot content', async () => {
    const wrapper = mount(Badge, {
      slots: {
        default: 'foobar',
      },
    })

    expect(wrapper.element.tagName).toBe('SPAN')
    expect(wrapper.text()).toBe('foobar')
    expect(wrapper.classes()).toContain('badge')
    expect(wrapper.classes()).toContain('badge-secondary')
    expect(wrapper.classes()).not.toContain('badge-pill')
    expect(wrapper.classes()).not.toContain('active')
    expect(wrapper.classes()).not.toContain('disabled')
    expect(wrapper.attributes('href')).toBeUndefined()
  })

  it('should apply variant class', async () => {
    const wrapper = mount(Badge, {
      propsData: {
        variant: 'danger',
      },
    })

    expect(wrapper.element.tagName).toBe('SPAN')
    expect(wrapper.classes()).toContain('badge-danger')
    expect(wrapper.classes()).toContain('badge')
    expect(wrapper.classes()).not.toContain('badge-pill')
    expect(wrapper.classes()).not.toContain('active')
    expect(wrapper.classes()).not.toContain('disabled')
  })

  it('should apply pill class', async () => {
    const wrapper = mount(Badge, {
      propsData: {
        pill: true,
      },
    })

    expect(wrapper.element.tagName).toBe('SPAN')
    expect(wrapper.classes()).toContain('badge-pill')
    expect(wrapper.classes()).toContain('badge')
    expect(wrapper.classes()).toContain('badge-secondary')
    expect(wrapper.classes()).not.toContain('active')
    expect(wrapper.classes()).not.toContain('disabled')
  })

  it('should have active class when prop active set', async () => {
    const wrapper = mount(Badge, {
      propsData: {
        active: true,
      },
    })

    expect(wrapper.element.tagName).toBe('SPAN')
    expect(wrapper.classes()).toContain('active')
    expect(wrapper.classes()).toContain('badge-secondary')
    expect(wrapper.classes()).toContain('badge')
    expect(wrapper.classes()).not.toContain('badge-pill')
    expect(wrapper.classes()).not.toContain('disabled')
  })

  it('should have disabled class when prop disabled set', async () => {
    const wrapper = mount(Badge, {
      propsData: {
        disabled: true,
      },
    })

    expect(wrapper.element.tagName).toBe('SPAN')
    expect(wrapper.classes()).toContain('disabled')
    expect(wrapper.classes()).toContain('badge-secondary')
    expect(wrapper.classes()).toContain('badge')
    expect(wrapper.classes()).not.toContain('badge-pill')
    expect(wrapper.classes()).not.toContain('active')
  })

  it('renders custom root element', async () => {
    const wrapper = mount(Badge, {
      propsData: {
        tag: 'small',
      },
    })

    expect(wrapper.element.tagName).toBe('SMALL')
    expect(wrapper.classes()).toContain('badge')
    expect(wrapper.classes()).toContain('badge-secondary')
    expect(wrapper.classes()).not.toContain('badge-pill')
    expect(wrapper.classes()).not.toContain('active')
    expect(wrapper.classes()).not.toContain('disabled')
  })

  it('renders link when href provided', async () => {
    const wrapper = mount(Badge, {
      propsData: {
        href: '/foo/bar',
      },
    })

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toBeDefined()
    expect(wrapper.attributes('href')).toBe('/foo/bar')
    expect(wrapper.classes()).toContain('badge')
    expect(wrapper.classes()).toContain('badge-secondary')
    expect(wrapper.classes()).not.toContain('badge-pill')
    expect(wrapper.classes()).not.toContain('active')
    expect(wrapper.classes()).not.toContain('disabled')
  })
})
