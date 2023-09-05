import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import BCloseButton from '@/components/BCloseButton.vue'
import BOverlay from '@/components/BOverlay.vue'
import BOffcanvas from '@/components/BOffcanvas.vue'

describe('offcanvas', () => {
  enableAutoUnmount(afterEach)

  // TODO afaik these tests are not finished

  beforeEach(() => {
    const el = document.createElement('div')
    el.id = 'body-teleports'
    document.body.appendChild(el)
  })

  afterEach(() => {
    const el = document.getElementById('body-teleports')
    if (el)
      document.body.removeChild(el)
  })

  it('has body teleports element set by teleportTo property', () => {
    const wrapper = mount(BOffcanvas, {
      props: {
        teleportTo: '#body-teleports',
        modelValue: true,
      },
    })
    expect(wrapper.exists()).toBe(true)
    expect(document.getElementById('body-teleports')?.querySelector('.offcanvas')).not.toBe(null)
  })

  it('has static class offcanvas', () => {
    const wrapper = mount(BOffcanvas, {
      props: {
        modelValue: true,
      },
      global: {
        stubs: ['b-overlay'],
      },
    })
    const offcanvas = wrapper.find('.offcanvas')
    expect(offcanvas.exists()).toBe(true)
  })

  it('has tabindex -1', () => {
    const wrapper = mount(BOffcanvas)
    const offcanvas = wrapper.get('.offcanvas')
    expect(offcanvas.attributes('tabindex')).toBe('-1')
  })

  it('has aria-labelledby offcanvasLabel', () => {
    const wrapper = mount(BOffcanvas)
    const offcanvas = wrapper.get('.offcanvas')
    expect(offcanvas.attributes('aria-labelledby')).toBe('offcanvasLabel')
  })

  it('has offcanvas-{type} when prop placement', () => {
    const wrapper = mount(BOffcanvas)
    const offcanvas = wrapper.get('.offcanvas')
    expect(offcanvas.classes()).toContain('offcanvas-start')
  })

  it('has offcanvas-{type} when prop placement not default', () => {
    const wrapper = mount(BOffcanvas, {
      props: { placement: 'top' },
    })
    const offcanvas = wrapper.get('.offcanvas')
    expect(offcanvas.classes()).toContain('offcanvas-top')
  })

  it('backdrop component exists', async () => {
    const wrapper = mount(BOffcanvas, {
      props: {
        modelValue: true,
        backdrop: false,
      },
    })

    const $overlay = wrapper.findComponent(BOverlay)
    expect($overlay.exists()).toBe(true)
  })

  it('has backdrop', async () => {
    const wrapper = mount(BOffcanvas, {
      props: {
        modelValue: true,
        backdrop: false,
      },
    })

    const $overlay = wrapper.getComponent(BOverlay)

    let $div = $overlay.find('div.b-overlay')

    expect($div.exists()).toBe(false)

    await wrapper.setProps({ backdrop: true })

    $div = $overlay.find('div.b-overlay')

    expect($div.exists()).toBe(true)
  })

  it(' offcanvas-header exists', () => {
    const wrapper = mount(BOffcanvas)
    const offcanvas = wrapper.get('.offcanvas')
    const $header = offcanvas.find('.offcanvas-header')
    expect($header.exists()).toBe(true)
  })

  it('first child div has child h5 with static class offcanvas-title', () => {
    const wrapper = mount(BOffcanvas)
    const [, $div] = wrapper.findAll('div')
    const $h5 = $div.get('h5')
    expect($h5.classes()).toContain('offcanvas-title')
  })

  it('first child div has child h5 has id offcanvasLabel', () => {
    const wrapper = mount(BOffcanvas)
    const [, $div] = wrapper.findAll('div')
    const $h5 = $div.get('h5')
    expect($h5.attributes('id')).toContain('offcanvasLabel')
  })

  it('first child div has child h5 that has slot title', () => {
    const wrapper = mount(BOffcanvas, {
      slots: { title: 'foobar' },
    })
    const [, $div] = wrapper.findAll('div')
    const $h5 = $div.get('h5')
    expect($h5.text()).toBe('foobar')
  })

  it('first child div has child h5 that has prop title', () => {
    const wrapper = mount(BOffcanvas, {
      props: { title: 'foobar' },
    })
    const [, $div] = wrapper.findAll('div')
    const $h5 = $div.get('h5')
    expect($h5.text()).toBe('foobar')
  })

  it('first child div has child BCloseButton', () => {
    const wrapper = mount(BOffcanvas)
    const [, $div] = wrapper.findAll('div')
    const $closebutton = $div.findComponent(BCloseButton)
    expect($closebutton.exists()).toBe(true)
  })

  it('first child div child BCloseButton has prop type to be button', () => {
    const wrapper = mount(BOffcanvas)
    const [, $div] = wrapper.findAll('div')
    const $closebutton = $div.getComponent(BCloseButton)
    expect($closebutton.props('type')).toBe('button')
  })

  it('first child div child BCloseButton has prop ariaLabel to be default close', () => {
    const wrapper = mount(BOffcanvas)
    const [, $div] = wrapper.findAll('div')
    const $closebutton = $div.getComponent(BCloseButton)
    expect($closebutton.props('ariaLabel')).toBe('Close')
  })

  it('first child div child BCloseButton has prop ariaLabel to be prop dismissLabel', () => {
    const wrapper = mount(BOffcanvas, {
      props: { dismissLabel: 'foobar' },
    })
    const [, $div] = wrapper.findAll('div')
    const $closebutton = $div.getComponent(BCloseButton)
    expect($closebutton.props('ariaLabel')).toBe('foobar')
  })

  it('first child div child BCloseButton has static class text-reset', () => {
    const wrapper = mount(BOffcanvas)
    const [, $div] = wrapper.findAll('div')
    const $closebutton = $div.getComponent(BCloseButton)
    expect($closebutton.classes()).toContain('text-reset')
  })

  it('second child div has static class offcanvas-body', () => {
    const wrapper = mount(BOffcanvas)
    const offcanvas = wrapper.find('.offcanvas')
    const [, $body] = offcanvas.findAll('div')
    expect($body.classes()).toContain('offcanvas-body')
  })

  it('second child div renders default slot', () => {
    const wrapper = mount(BOffcanvas, {
      slots: { default: 'foobar' },
    })
    const offcanvas = wrapper.find('.offcanvas')
    const [, $body] = offcanvas.findAll('div')
    expect($body.text()).toBe('foobar')
  })
})
