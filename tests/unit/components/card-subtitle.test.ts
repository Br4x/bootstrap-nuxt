import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BCardSubTitle from '@/components/B/CardSubtitle.vue'

describe('card-sub-title', () => {
  it('default has tag "h6"', async () => {
    const wrapper = mount(BCardSubTitle)

    expect(wrapper.element.tagName).toBe('H6')
  })

  it('default has class "card-subtitle" and "text-muted"', async () => {
    const wrapper = mount(BCardSubTitle)

    expect(wrapper.classes()).toContain('card-subtitle')
    expect(wrapper.classes()).toContain('text-muted')
  })

  it('renders custom tag', async () => {
    const wrapper = mount(BCardSubTitle, {
      context: {
        props: { subTitleTag: 'div' },
      },
    })

    expect(wrapper.element.tagName).toBe('DIV')
  })

  it('accepts subTitleTextVariant value', async () => {
    const wrapper = mount(BCardSubTitle, {
      context: {
        props: { subTitleTextVariant: 'info' },
      },
    })

    expect(wrapper.classes()).toContain('card-subtitle')
    expect(wrapper.classes()).toContain('text-info')
  })

  it('has content from default slot', async () => {
    const wrapper = mount(BCardSubTitle, {
      slots: {
        default: 'foobar',
      },
    })

    expect(wrapper.text()).toContain('foobar')
  })
})
