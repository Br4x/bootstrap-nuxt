import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BCardText from '@/components/B/CardText.vue'

describe('card-text', () => {
  it('has root element "p"', async () => {
    const wrapper = mount(BCardText)

    expect(wrapper.element.tagName).toBe('P')
  })

  it('has class card-text', async () => {
    const wrapper = mount(BCardText)

    expect(wrapper.classes()).toContain('card-text')
  })

  it('has custom root element "div" when prop text-tag=div', async () => {
    const wrapper = mount(BCardText, {
      context: {
        props: {
          textTag: 'div',
        },
      },
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('card-text')
  })

  it('accepts custom classes', async () => {
    const wrapper = mount(BCardText, {
      context: {
        class: ['foobar'],
      },
    })

    expect(wrapper.classes()).toContain('card-text')
    expect(wrapper.classes()).toContain('foobar')
  })
})
