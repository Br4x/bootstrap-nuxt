import { RouterLinkStub, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Breadcrumb from '@/components/B/Breadcrumb.vue'

describe('breadcrumb', () => {
  it('should have expected default structure', async () => {
    const wrapper = mount(Breadcrumb, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
          NuxtLink: RouterLinkStub,
        },
      },
    })

    expect(wrapper.element.tagName).toBe('OL')
    expect(wrapper.classes()).toContain('breadcrumb')
    expect(wrapper.text()).toBe('')
  })

  it('should render default slot when no items provided', async () => {
    const wrapper = mount(Breadcrumb, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
          NuxtLink: RouterLinkStub,
        },
      },
      slots: {
        default: 'foobar',
      },
    })

    expect(wrapper.element.tagName).toBe('OL')
    expect(wrapper.classes()).toContain('breadcrumb')
    expect(wrapper.text()).toBe('foobar')
  })

  it('should accept items', () => {
    const wrapper = mount(Breadcrumb, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
          NuxtLink: RouterLinkStub,
        },
      },
      propsData: {
        items: [
          { text: 'Home', href: '/' },
          { text: 'Admin', to: '/admin', active: false },
          { html: '<b>Manage</b>', href: '/admin/manage' },
          // Test with non object
          'Library',
        ],
      },
    })
    console.log(wrapper.html())

    expect(wrapper.element.tagName).toBe('OL')
    expect(wrapper.classes()).toContain('breadcrumb')
    expect(wrapper.findAll('li').length).toBe(4)
    expect(wrapper.findAll('li.breadcrumb-item').length).toBe(4)
    const $lis = wrapper.findAll('li')

    // HREF testing
    expect($lis.at(0)?.find('a').exists()).toBe(true)
    expect($lis.at(0)?.find('a').attributes('href')).toBe('/')
    expect($lis.at(0)?.text()).toBe('Home')

    expect($lis.at(1)?.find('a').exists()).toBe(true)
    expect($lis.at(1)?.find('a').attributes('href')).toBe('/admin')
    expect($lis.at(1)?.text()).toBe('Admin')

    expect($lis.at(2)?.find('a').exists()).toBe(true)
    expect($lis.at(2)?.find('a').attributes('href')).toBe('/admin/manage')
    expect($lis.at(2)?.text()).toBe('Manage')

    // Last item should have active state
    expect($lis.at(3)?.classes()).toContain('active')
    expect($lis.at(3)?.find('span').exists()).toBe(true)
    expect($lis.at(3)?.text()).toBe('Library')
  })

  it('should apply active class to active item', async () => {
    const wrapper = mount(Breadcrumb, {
      stubs: {
        RouterLink: RouterLinkStub,
        NuxtLink: RouterLinkStub,
      },
      propsData: {
        items: [
          { text: 'Home', href: '/' },
          { text: 'Admin', to: '/admin', active: true },
          { html: '<b>Manage</b>', href: '/admin/manage' },
          { text: 'Library', href: '/admin/manage/library' },
        ],
      },
    })

    expect(wrapper.element.tagName).toBe('OL')
    expect(wrapper.classes()).toContain('breadcrumb')
    expect(wrapper.findAll('li').length).toBe(4)
    expect(wrapper.findAll('li.breadcrumb-item').length).toBe(4)
    const $lis = wrapper.findAll('li')

    // HREF testing
    expect($lis.at(0)?.find('a').exists()).toBe(true)
    expect($lis.at(0)?.find('a').attributes('href')).toBe('/')
    expect($lis.at(0)?.text()).toBe('Home')

    // This one should be a span/active
    expect($lis.at(1)?.find('span').exists()).toBe(true)
    expect($lis.at(1)?.classes()).toContain('active')
    expect($lis.at(1)?.text()).toBe('Admin')

    expect($lis.at(2)?.find('a').exists()).toBe(true)
    expect($lis.at(2)?.find('a').attributes('href')).toBe('/admin/manage')
    expect($lis.at(2)?.text()).toBe('Manage')

    // Last item should have active state
    expect($lis.at(3)?.classes()).not.toContain('active')
    expect($lis.at(3)?.find('a').exists()).toBe(true)
    expect($lis.at(3)?.find('a').attributes('href')).toBe('/admin/manage/library')
    expect($lis.at(3)?.text()).toBe('Library')
  })
})
