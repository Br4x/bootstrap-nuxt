import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BNav from '@/components/B/Nav.vue'

describe('nav', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BNav)

    expect(wrapper.element.tagName).toBe('UL')
    expect(wrapper.classes()).toContain('nav')
    expect(wrapper.text()).toBe('')
  })

  it('renders custom root element when prop tag set', async () => {
    const wrapper = mount(BNav, {
      propsData: {
        tag: 'ol',
      },
    })

    expect(wrapper.element.tagName).toBe('OL')
    expect(wrapper.classes()).toContain('nav')
    expect(wrapper.text()).toBe('')
  })

  it('renders default slot content', async () => {
    const wrapper = mount(BNav, {
      slots: {
        default: 'foobar',
      },
    })

    expect(wrapper.element.tagName).toBe('UL')
    expect(wrapper.classes()).toContain('nav')
    expect(wrapper.text()).toBe('foobar')
  })

  it('applies pill style', async () => {
    const wrapper = mount(BNav, {
      propsData: {
        pills: true,
      },
    })

    expect(wrapper.element.tagName).toBe('UL')
    expect(wrapper.classes()).toContain('nav')
    expect(wrapper.classes()).toContain('nav-pills')
    expect(wrapper.text()).toBe('')
  })

  it('applies tab style', async () => {
    const wrapper = mount(BNav, {
      propsData: {
        tabs: true,
      },
    })

    expect(wrapper.element.tagName).toBe('UL')
    expect(wrapper.classes()).toContain('nav')
    expect(wrapper.classes()).toContain('nav-tabs')
    expect(wrapper.text()).toBe('')
  })

  it('applies vertical style', async () => {
    const wrapper = mount(BNav, {
      propsData: {
        vertical: true,
      },
    })

    expect(wrapper.element.tagName).toBe('UL')
    expect(wrapper.classes()).toContain('nav')
    expect(wrapper.classes()).toContain('flex-column')
    expect(wrapper.text()).toBe('')
  })

  it('applies justify style when justified', async () => {
    const wrapper = mount(BNav, {
      propsData: {
        justified: true,
      },
    })

    expect(wrapper.element.tagName).toBe('UL')
    expect(wrapper.classes()).toContain('nav')
    expect(wrapper.classes()).toContain('nav-justified')
    expect(wrapper.text()).toBe('')
  })

  it('doesn\'t apply justify style when vertical', async () => {
    const wrapper = mount(BNav, {
      propsData: {
        justified: true,
        vertical: true,
      },
    })

    expect(wrapper.element.tagName).toBe('UL')
    expect(wrapper.classes()).toContain('nav')
    expect(wrapper.classes()).toContain('flex-column')
    expect(wrapper.text()).toBe('')
  })

  it('applies fill style style when fill set', async () => {
    const wrapper = mount(BNav, {
      propsData: {
        fill: true,
      },
    })

    expect(wrapper.element.tagName).toBe('UL')
    expect(wrapper.classes()).toContain('nav')
    expect(wrapper.classes()).toContain('nav-fill')
    expect(wrapper.text()).toBe('')
  })

  it('doesn\'t apply fill style when vertical', async () => {
    const wrapper = mount(BNav, {
      propsData: {
        fill: true,
        vertical: true,
      },
    })

    expect(wrapper.element.tagName).toBe('UL')
    expect(wrapper.classes()).toContain('nav')
    expect(wrapper.classes()).toContain('flex-column')
    expect(wrapper.text()).toBe('')
  })

  it('applies alignment correctly', async () => {
    const wrapper = mount(BNav, {
      propsData: {
        align: 'center',
      },
    })

    expect(wrapper.element.tagName).toBe('UL')
    expect(wrapper.classes()).toContain('nav')
    expect(wrapper.classes()).toContain('justify-content-center')
    expect(wrapper.text()).toBe('')
  })

  it('doesn\'t apply alignment when vertical', async () => {
    const wrapper = mount(BNav, {
      propsData: {
        align: 'center',
        vertical: true,
      },
    })

    expect(wrapper.element.tagName).toBe('UL')
    expect(wrapper.classes()).toContain('nav')
    expect(wrapper.classes()).toContain('flex-column')
    expect(wrapper.text()).toBe('')
  })

  it('applies small style', async () => {
    const wrapper = mount(BNav, {
      propsData: {
        small: true,
      },
    })

    expect(wrapper.element.tagName).toBe('UL')
    expect(wrapper.classes()).toContain('nav')
    expect(wrapper.classes()).toContain('small')
    expect(wrapper.text()).toBe('')
  })

  it('applies card-header-tabs class when tabs and card-header props set', async () => {
    const wrapper = mount(BNav, {
      propsData: {
        tabs: true,
        cardHeader: true,
      },
    })

    expect(wrapper.element.tagName).toBe('UL')
    expect(wrapper.classes()).toContain('nav')
    expect(wrapper.classes()).toContain('nav-tabs')
    expect(wrapper.classes()).toContain('card-header-tabs')
    expect(wrapper.text()).toBe('')
  })

  it('applies card-header-pills class when pills and card-header props set', async () => {
    const wrapper = mount(BNav, {
      propsData: {
        pills: true,
        cardHeader: true,
      },
    })

    expect(wrapper.element.tagName).toBe('UL')
    expect(wrapper.classes()).toContain('nav')
    expect(wrapper.classes()).toContain('nav-pills')
    expect(wrapper.classes()).toContain('card-header-pills')
    expect(wrapper.text()).toBe('')
  })
})
