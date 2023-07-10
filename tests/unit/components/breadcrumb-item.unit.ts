import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BreadcrumbItem from '@/components/B/BreadcrumbItem.vue'

describe('breadcrumb-item', () => {
  it('has default classes and structure', async () => {
    const wrapper = mount(BreadcrumbItem)

    expect(wrapper.element.tagName).toBe('LI')
    expect(wrapper.classes()).toContain('breadcrumb-item')
    expect(wrapper.classes()).not.toContain('active')
    expect(wrapper.classes().length).toBe(1)
  })

  it('has class active when prop active is set', async () => {
    const wrapper = mount(BreadcrumbItem, {
      propsData: {
        active: true,
      },
    })

    expect(wrapper.element.tagName).toBe('LI')
    expect(wrapper.classes()).toContain('active')
    expect(wrapper.classes()).toContain('breadcrumb-item')
    expect(wrapper.classes().length).toBe(2)
  })

  it('has link as child', async () => {
    const wrapper = mount(BreadcrumbItem)

    expect(wrapper.element.tagName).toBe('LI')
    expect(wrapper.find('a').exists()).toBe(true)
    expect(wrapper.find('a').attributes('href')).toBe('#')
  })

  it('has link as child and href', async () => {
    const wrapper = mount(BreadcrumbItem, {
      propsData: {
        href: '/foo/bar',
      },
    })

    expect(wrapper.element.tagName).toBe('LI')
    expect(wrapper.find('a').exists()).toBe(true)
    expect(wrapper.find('a').attributes('href')).toBe('/foo/bar')
  })

  it('has child span and class active when prop active is set', async () => {
    const wrapper = mount(BreadcrumbItem, {
      propsData: {
        active: true,
      },
    })

    expect(wrapper.element.tagName).toBe('LI')
    expect(wrapper.classes()).toContain('active')
    expect(wrapper.classes()).toContain('breadcrumb-item')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.find('span').exists()).toBe(true)
  })

  it('has child text content from prop text', async () => {
    const wrapper = mount(BreadcrumbItem, {
      propsData: {
        active: true,
        text: 'foobar',
      },
    })

    expect(wrapper.element.tagName).toBe('LI')
    expect(wrapper.classes()).toContain('active')
    expect(wrapper.classes()).toContain('breadcrumb-item')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.text()).toBe('foobar')
  })

  it('has child text content from prop html', async () => {
    const wrapper = mount(BreadcrumbItem, {
      propsData: {
        active: true,
        html: 'foobar',
      },
    })

    expect(wrapper.element.tagName).toBe('LI')
    expect(wrapper.classes()).toContain('active')
    expect(wrapper.classes()).toContain('breadcrumb-item')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.text()).toBe('foobar')
  })

  it('has child text content from default slot', async () => {
    const wrapper = mount(BreadcrumbItem, {
      propsData: {
        active: true,
      },
      slots: {
        default: 'foobar',
      },
    })

    expect(wrapper.element.tagName).toBe('LI')
    expect(wrapper.classes()).toContain('active')
    expect(wrapper.classes()).toContain('breadcrumb-item')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.text()).toBe('foobar')
  })
})
