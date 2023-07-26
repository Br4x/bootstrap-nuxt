import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BFormInvalidFeedback from '@/components/B/FormInvalidFeedback.vue'

describe('form-invalid-feedback', () => {
  it('default should have tag div', async () => {
    const wrapper = mount(BFormInvalidFeedback)

    expect(wrapper.element.tagName).toBe('DIV')
  })

  it('default should contain base class', async () => {
    const wrapper = mount(BFormInvalidFeedback)

    expect(wrapper.classes()).toContain('invalid-feedback')
  })

  it('default should not have class d-block', async () => {
    const wrapper = mount(BFormInvalidFeedback)

    expect(wrapper.classes()).not.toContain('d-block')
  })

  it('default should not have class invalid-tooltip', async () => {
    const wrapper = mount(BFormInvalidFeedback)

    expect(wrapper.classes()).not.toContain('invalid-tooltip')
  })

  it('default should not have id', async () => {
    const wrapper = mount(BFormInvalidFeedback)

    expect(wrapper.attributes('id')).toBeUndefined()
  })

  it('default should have user supplied id', async () => {
    const wrapper = mount(BFormInvalidFeedback, {
      context: {
        props: {
          id: 'foobar',
        },
      },
    })

    expect(wrapper.attributes('id')).toBe('foobar')
  })

  it('should have tag small when tag=small', async () => {
    const wrapper = mount(BFormInvalidFeedback, {
      context: {
        props: {
          tag: 'small',
        },
      },
    })

    expect(wrapper.element.tagName).toBe('SMALL')
  })

  it('should contain class d-block when force-show is set', async () => {
    const wrapper = mount(BFormInvalidFeedback, {
      context: {
        props: {
          forceShow: true,
        },
      },
    })

    expect(wrapper.classes()).toContain('d-block')
  })

  it('should contain class d-block when state is false', async () => {
    const wrapper = mount(BFormInvalidFeedback, {
      context: {
        props: {
          state: false,
        },
      },
    })

    expect(wrapper.classes()).toContain('d-block')
  })

  it('should not contain class d-block when state is true', async () => {
    const wrapper = mount(BFormInvalidFeedback, {
      context: {
        props: {
          state: true,
        },
      },
    })

    expect(wrapper.classes()).not.toContain('d-block')
  })

  it('should contain class d-block when force-show is true and state is true', async () => {
    const wrapper = mount(BFormInvalidFeedback, {
      context: {
        props: {
          forceShow: true,
          state: true,
        },
      },
    })

    expect(wrapper.classes()).toContain('d-block')
  })

  it('should contain class invalid-tooltip when tooltip is set', async () => {
    const wrapper = mount(BFormInvalidFeedback, {
      context: {
        props: {
          tooltip: true,
        },
      },
    })

    expect(wrapper.classes()).toContain('invalid-tooltip')
  })

  it('should not contain class invalid-feedback when tooltip is set', async () => {
    const wrapper = mount(BFormInvalidFeedback, {
      context: {
        props: {
          tooltip: true,
        },
      },
    })

    expect(wrapper.classes()).not.toContain('invalid-feedback')
  })

  it('should have children in the default slot when supplied', async () => {
    const wrapper = mount(BFormInvalidFeedback, {
      context: {
        children: ['foo', '<span>bar</span>'],
      },
    })

    expect(wrapper.text()).toContain('foo')
    expect(wrapper.text()).toContain('bar')
  })
})
