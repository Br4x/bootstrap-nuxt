import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BCardGroup from '@/components/B/CardGroup.vue'

describe('card-group', () => {
  it('has root element "div"', async () => {
    const wrapper = mount(BCardGroup)

    expect(wrapper.element.tagName).toBe('DIV')
  })

  it('has class card-group', async () => {
    const wrapper = mount(BCardGroup)

    expect(wrapper.classes()).toContain('card-group')
  })

  it('has custom root element when prop tag is set', async () => {
    const wrapper = mount(BCardGroup, {
      context: {
        props: {
          tag: 'article',
        },
      },
    })

    expect(wrapper.element.tagName).toBe('ARTICLE')
    expect(wrapper.classes()).toContain('card-group')
  })

  it('has class card-deck when prop deck=true', async () => {
    const wrapper = mount(BCardGroup, {
      context: {
        props: { deck: true },
      },
    })

    expect(wrapper.classes()).toContain('card-deck')
  })

  it('has class card-columns when prop columns=true', async () => {
    const wrapper = mount(BCardGroup, {
      context: {
        props: { columns: true },
      },
    })

    expect(wrapper.classes()).toContain('card-columns')
  })

  it('accepts custom classes', async () => {
    const wrapper = mount(BCardGroup, {
      context: {
        class: ['foobar'],
      },
    })

    expect(wrapper.classes()).toContain('card-group')
    expect(wrapper.classes()).toContain('foobar')
  })
})
