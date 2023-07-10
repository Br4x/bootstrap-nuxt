import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BCardTitle from '@/components/B/CardTitle.vue'

describe('card-title', () => {
  it('default has tag "h4"', async () => {
    const wrapper = mount(BCardTitle)

    expect(wrapper.element.tagName).toBe('H4')
  })

  it('default has class "card-title"', async () => {
    const wrapper = mount(BCardTitle)

    expect(wrapper.classes()).toContain('card-title')
  })

  it('renders custom tag', async () => {
    const wrapper = mount(BCardTitle, {
      context: {
        props: { titleTag: 'div' },
      },
    })

    expect(wrapper.element.tagName).toBe('DIV')
  })

  it('has content from default slot', async () => {
    const wrapper = mount(BCardTitle, {
      slots: {
        default: 'bar',
      },
    })

    expect(wrapper.text()).toContain('bar')
  })
})
