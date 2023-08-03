import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BFormValidFeedback from '@/components/B/FormValidFeedback.vue'

describe('form-valid-feedback', () => {
  it('default should have tag div', async () => {
    const wrapper = mount(BFormValidFeedback)

    expect(wrapper.element.tagName).toBe('DIV')
  })

  it('default should contain base class', async () => {
    const wrapper = mount(BFormValidFeedback)

    expect(wrapper.classes()).toContain('valid-feedback')
  })

  it('default should not have class d-block', async () => {
    const wrapper = mount(BFormValidFeedback)

    expect(wrapper.classes()).not.toContain('d-block')
  })

  it('default should not have class valid-tooltip', async () => {
    const wrapper = mount(BFormValidFeedback)

    expect(wrapper.classes()).not.toContain('valid-tooltip')
  })

  it('default should not have id', async () => {
    const wrapper = mount(BFormValidFeedback)

    expect(wrapper.attributes('id')).toBeUndefined()
  })

  it('default should have user supplied id', async () => {
    const wrapper = mount(BFormValidFeedback, {
      context: {
        props: {
          id: 'foobar',
        },
      },
    })

    expect(wrapper.attributes('id')).toBe('foobar')
  })

  it('should have tag small when tag=small', async () => {
    const wrapper = mount(BFormValidFeedback, {
      context: {
        props: {
          tag: 'small',
        },
      },
    })

    expect(wrapper.element.tagName).toBe('SMALL')
  })

  it('should contain class d-block when force-show is set', async () => {
    const wrapper = mount(BFormValidFeedback, {
      context: {
        props: {
          forceShow: true,
        },
      },
    })

    expect(wrapper.classes()).toContain('d-block')
  })

  it('should contain class d-block when state is true', async () => {
    const wrapper = mount(BFormValidFeedback, {
      context: {
        props: {
          state: true,
        },
      },
    })

    expect(wrapper.classes()).toContain('d-block')
  })

  it('should not contain class d-block when state is false', async () => {
    const wrapper = mount(BFormValidFeedback, {
      context: {
        props: {
          state: false,
        },
      },
    })

    expect(wrapper.classes()).not.toContain('d-block')
  })

  it('should contain class d-block when force-show is true and state is false', async () => {
    const wrapper = mount(BFormValidFeedback, {
      context: {
        props: {
          forceShow: true,
          state: false,
        },
      },
    })

    expect(wrapper.classes()).toContain('d-block')
  })

  it('should contain class valid-tooltip when tooltip is set', async () => {
    const wrapper = mount(BFormValidFeedback, {
      context: {
        props: {
          tooltip: true,
        },
      },
    })

    expect(wrapper.classes()).toContain('valid-tooltip')
  })

  it('should not contain class valid-feedback when tooltip is set', async () => {
    const wrapper = mount(BFormValidFeedback, {
      context: {
        props: {
          tooltip: true,
        },
      },
    })

    expect(wrapper.classes()).not.toContain('valid-feedback')
  })
})
