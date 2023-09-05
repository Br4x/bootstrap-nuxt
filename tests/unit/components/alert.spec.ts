import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import BCloseButton from '@/components/BCloseButton.vue'
import BButton from '@/components/BButton.vue'
import BTransition from '@/components/BTransition.vue'
import BAlert from '@/components/BAlert.vue'

describe('alert', () => {
  enableAutoUnmount(afterEach)

  it('has BTransition', () => {
    const wrapper = mount(BAlert)
    const $transition = wrapper.findComponent(BTransition)
    expect($transition.exists()).toBe(true)
  })

  it('gives prop fade to btransition of true by default', () => {
    const wrapper = mount(BAlert)
    const $transition = wrapper.getComponent(BTransition)
    expect($transition.props('noFade')).toBe(true)
  })

  it('when prop fade is true, gives BTransition false', () => {
    const wrapper = mount(BAlert, {
      props: { fade: true },
    })
    const $transition = wrapper.getComponent(BTransition)
    expect($transition.props('noFade')).toBe(false)
  })

  it('BTransition is given static transProps object', () => {
    const wrapper = mount(BAlert)
    const $transition = wrapper.getComponent(BTransition)
    expect($transition.props('transProps')).toEqual({ enterToClass: 'show' })
  })

  it('there is not a nested div by default', () => {
    const wrapper = mount(BAlert)
    const $div = wrapper.find('div')
    expect($div.exists()).toBe(false)
  })

  it('there is a nested div when modelValue true', () => {
    const wrapper = mount(BAlert, {
      props: { modelValue: true },
    })
    const $div = wrapper.find('div')
    expect($div.exists()).toBe(true)
  })

  it('there is a nested div when modelValue number > 0', () => {
    const wrapper = mount(BAlert, {
      props: { modelValue: 5 },
    })
    const $div = wrapper.find('div')
    expect($div.exists()).toBe(true)
  })

  it('nested div has static class alert', () => {
    const wrapper = mount(BAlert, {
      props: { modelValue: true },
    })
    const $div = wrapper.get('div')
    expect($div.classes()).toContain('alert')
  })

  it('nested div has static attr role alert', () => {
    const wrapper = mount(BAlert, {
      props: { modelValue: true },
    })
    const $div = wrapper.get('div')
    expect($div.attributes('role')).toBe('alert')
  })

  it('nested div has static attr aria-live polite', () => {
    const wrapper = mount(BAlert, {
      props: { modelValue: true },
    })
    const $div = wrapper.get('div')
    expect($div.attributes('aria-live')).toBe('polite')
  })

  it('nested div has static attr aria-atomic true', () => {
    const wrapper = mount(BAlert, {
      props: { modelValue: true },
    })
    const $div = wrapper.get('div')
    expect($div.attributes('aria-atomic')).toBe('true')
  })

  it('nested div has class alert-info by default', () => {
    const wrapper = mount(BAlert, {
      props: { modelValue: true },
    })
    const $div = wrapper.get('div')
    expect($div.classes()).toContain('alert-info')
  })

  it('nested div has class alert-{type} when prop variant', () => {
    const wrapper = mount(BAlert, {
      props: { modelValue: true, variant: 'danger' },
    })
    const $div = wrapper.get('div')
    expect($div.classes()).toContain('alert-danger')
  })

  it('nested div has class alert-dismissible when prop dismissible', () => {
    const wrapper = mount(BAlert, {
      props: { modelValue: true, dismissible: true },
    })
    const $div = wrapper.get('div')
    expect($div.classes()).toContain('alert-dismissible')
  })

  it('nested div does not have class alert-dismissible when not prop dismissible', () => {
    const wrapper = mount(BAlert, {
      props: { modelValue: true, dismissible: false },
    })
    const $div = wrapper.get('div')
    expect($div.classes()).not.toContain('alert-dismissible')
  })

  it('nested div renders default slot', () => {
    const wrapper = mount(BAlert, {
      props: { modelValue: true },
      slots: { default: 'foobar' },
    })
    expect(wrapper.text()).toBe('foobar')
  })

  it('nested div has BCloseButton by default when prop dismissible', () => {
    const wrapper = mount(BAlert, {
      props: { modelValue: true, dismissible: true },
    })
    const $div = wrapper.get('div')
    const $bclosebutton = $div.findComponent(BCloseButton)
    expect($bclosebutton.exists()).toBe(true)
  })

  it('nested div does not have BCloseButton when not prop dismissible', () => {
    const wrapper = mount(BAlert, {
      props: { modelValue: true, dismissible: false },
    })
    const $div = wrapper.get('div')
    const $bclosebutton = $div.findComponent(BCloseButton)
    expect($bclosebutton.exists()).toBe(false)
  })

  it('nested div does not have BCloseButton when prop dismissible but also slot close', () => {
    const wrapper = mount(BAlert, {
      props: { modelValue: true, dismissible: true },
      slots: { close: 'foobar' },
    })
    const $div = wrapper.get('div')
    const $bclosebutton = $div.findComponent(BCloseButton)
    expect($bclosebutton.exists()).toBe(false)
  })

  it('nested div does not have BCloseButton when prop dismissible but also prop closeContent', () => {
    const wrapper = mount(BAlert, {
      props: { modelValue: true, dismissible: true, closeContent: 'foobar' },
    })
    const $div = wrapper.get('div')
    const $bclosebutton = $div.findComponent(BCloseButton)
    expect($bclosebutton.exists()).toBe(false)
  })

  it('nested div has BButton when prop dismissible but also prop closeContent', () => {
    const wrapper = mount(BAlert, {
      props: { modelValue: true, dismissible: true, closeContent: 'foobar' },
    })
    const $div = wrapper.get('div')
    const $bbutton = $div.findComponent(BButton)
    expect($bbutton.exists()).toBe(true)
  })

  it('nested div has BButton when prop dismissible but also slot close', () => {
    const wrapper = mount(BAlert, {
      props: { modelValue: true, dismissible: true },
      slots: { close: 'foobar' },
    })
    const $div = wrapper.get('div')
    const $bbutton = $div.findComponent(BButton)
    expect($bbutton.exists()).toBe(true)
  })

  it('nested div does not have BButton when prop dismissible and nothing else', () => {
    const wrapper = mount(BAlert, {
      props: { modelValue: true, dismissible: true },
    })
    const $div = wrapper.get('div')
    const $bbutton = $div.findComponent(BButton)
    expect($bbutton.exists()).toBe(false)
  })

  it('nested div BButton has static attr type to be button', () => {
    const wrapper = mount(BAlert, {
      props: { modelValue: true, dismissible: true, closeContent: 'foobar' },
    })
    const $div = wrapper.get('div')
    const $bbutton = $div.getComponent(BButton)
    expect($bbutton.attributes('type')).toBe('button')
  })

  it('nested div BButton renders prop closeContent', () => {
    const wrapper = mount(BAlert, {
      props: { modelValue: true, dismissible: true, closeContent: 'foobar' },
    })
    const $div = wrapper.get('div')
    const $bbutton = $div.getComponent(BButton)
    expect($bbutton.text()).toBe('foobar')
  })

  it('nested div BButton renders slot close', () => {
    const wrapper = mount(BAlert, {
      props: { modelValue: true, dismissible: true },
      slots: { close: 'foobar' },
    })
    const $div = wrapper.get('div')
    const $bbutton = $div.getComponent(BButton)
    expect($bbutton.text()).toBe('foobar')
  })

  it('nested div BButton renders slot over props', () => {
    const wrapper = mount(BAlert, {
      props: { modelValue: true, dismissible: true, closeContent: 'props' },
      slots: { close: 'slots' },
    })
    const $div = wrapper.get('div')
    const $bbutton = $div.getComponent(BButton)
    expect($bbutton.text()).toBe('slots')
  })

  it('nested div BCloseButton has aria-label to be Close by default', () => {
    const wrapper = mount(BAlert, {
      props: { modelValue: true, dismissible: true },
    })
    const $div = wrapper.get('div')
    const $bclosebutton = $div.getComponent(BCloseButton)
    expect($bclosebutton.attributes('aria-label')).toBe('Close')
  })

  it('nested div BCloseButton has aria-label to be prop dismissLabel', () => {
    const wrapper = mount(BAlert, {
      props: { modelValue: true, dismissible: true, dismissLabel: 'foobar' },
    })
    const $div = wrapper.get('div')
    const $bclosebutton = $div.getComponent(BCloseButton)
    expect($bclosebutton.attributes('aria-label')).toBe('foobar')
  })

  // BCloseButton variant
  it('nested div BCloseButton emits update:modelValue when clicked when modelValue boolean', async () => {
    const wrapper = mount(BAlert, {
      props: { modelValue: true, dismissible: true },
    })
    const $div = wrapper.get('div')
    const $bclosebutton = $div.getComponent(BCloseButton)
    await $bclosebutton.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
  })

  it('nested div BCloseButton clicked update:modelValue emits arg false when modelValue boolean', async () => {
    const wrapper = mount(BAlert, {
      props: { modelValue: true, dismissible: true },
    })
    const $div = wrapper.get('div')
    const $bclosebutton = $div.getComponent(BCloseButton)
    await $bclosebutton.trigger('click')
    const emitted = wrapper.emitted('update:modelValue') ?? []
    expect(emitted[0][0]).toBe(false)
  })

  it('nested div BCloseButton emits update:modelValue when clicked when modelValue number > 0', async () => {
    const wrapper = mount(BAlert, {
      props: { modelValue: 5, dismissible: true },
    })
    const $div = wrapper.get('div')
    const $bclosebutton = $div.getComponent(BCloseButton)
    await $bclosebutton.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
  })

  it('nested div BCloseButton clicked update:modelValue emits arg 0 when modelValue number > 0', async () => {
    const wrapper = mount(BAlert, {
      props: { modelValue: 5, dismissible: true },
    })
    const $div = wrapper.get('div')
    const $bclosebutton = $div.getComponent(BCloseButton)
    await $bclosebutton.trigger('click')
    const emitted = wrapper.emitted('update:modelValue') ?? []
    expect(emitted[0][0]).toBe(0)
  })

  it('nested div BCloseButton clicked emits closed', async () => {
    const wrapper = mount(BAlert, {
      props: { modelValue: 5, dismissible: true },
    })
    const $div = wrapper.get('div')
    const $bclosebutton = $div.getComponent(BCloseButton)
    await $bclosebutton.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('closed')
  })
  // BButton variant
  it('nested div BButton emits update:modelValue when clicked when modelValue boolean', async () => {
    const wrapper = mount(BAlert, {
      props: { modelValue: true, dismissible: true, closeContent: 'foobar' },
    })
    const $div = wrapper.get('div')
    const $bbutton = $div.getComponent(BButton)
    await $bbutton.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
  })

  it('nested div BButton clicked update:modelValue emits arg false when modelValue boolean', async () => {
    const wrapper = mount(BAlert, {
      props: { modelValue: true, dismissible: true, closeContent: 'foobar' },
    })
    const $div = wrapper.get('div')
    const $bbutton = $div.getComponent(BButton)
    await $bbutton.trigger('click')
    const emitted = wrapper.emitted('update:modelValue') ?? []
    expect(emitted[0][0]).toBe(false)
  })

  it('nested div BButton emits update:modelValue when clicked when modelValue number > 0', async () => {
    const wrapper = mount(BAlert, {
      props: { modelValue: 5, dismissible: true, closeContent: 'foobar' },
    })
    const $div = wrapper.get('div')
    const $bbutton = $div.getComponent(BButton)
    await $bbutton.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
  })

  it('nested div BButton clicked update:modelValue emits arg 0 when modelValue number > 0', async () => {
    const wrapper = mount(BAlert, {
      props: { modelValue: 5, dismissible: true, closeContent: 'foobar' },
    })
    const $div = wrapper.get('div')
    const $bbutton = $div.getComponent(BButton)
    await $bbutton.trigger('click')
    const emitted = wrapper.emitted('update:modelValue') ?? []
    expect(emitted[0][0]).toBe(0)
  })

  it('nested div BButton clicked emits closed', async () => {
    const wrapper = mount(BAlert, {
      props: { modelValue: 5, dismissible: true, closeContent: 'foobar' },
    })
    const $div = wrapper.get('div')
    const $bbutton = $div.getComponent(BButton)
    await $bbutton.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('closed')
  })

  // TODO try to test countdown items
})
