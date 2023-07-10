import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BCardBody from '@/components/B/CardBody.vue'

describe('card-body', () => {
  it('has root element "div"', async () => {
    const wrapper = mount(BCardBody)

    expect(wrapper.element.tagName).toBe('DIV')
  })

  it('has class card-body', async () => {
    const wrapper = mount(BCardBody)

    expect(wrapper.classes()).toContain('card-body')
  })

  it('has custom root element when prop bodyTag is set', async () => {
    const wrapper = mount(BCardBody, {
      context: {
        props: {
          bodyTag: 'article',
        },
      },
    })

    expect(wrapper.element.tagName).toBe('ARTICLE')
    expect(wrapper.classes()).toContain('card-body')
  })

  it('has class bg-info when prop bodyBgVariant=info', async () => {
    const wrapper = mount(BCardBody, {
      context: {
        props: { bodyBgVariant: 'info' },
      },
    })

    expect(wrapper.classes()).toContain('card-body')
    expect(wrapper.classes()).toContain('bg-info')
  })

  it('has class text-info when prop bodyTextVariant=info', async () => {
    const wrapper = mount(BCardBody, {
      context: {
        props: { bodyTextVariant: 'info' },
      },
    })

    expect(wrapper.classes()).toContain('card-body')
    expect(wrapper.classes()).toContain('text-info')
  })

  it('has class border-info when prop bodyBorderVariant=info', async () => {
    const wrapper = mount(BCardBody, {
      context: {
        props: { bodyBorderVariant: 'info' },
      },
    })

    expect(wrapper.classes()).toContain('card-body')
    expect(wrapper.classes()).toContain('border-info')
  })

  it('has all variant classes when all variant props set', async () => {
    const wrapper = mount(BCardBody, {
      context: {
        props: {
          bodyTextVariant: 'info',
          bodyBgVariant: 'danger',
          bodyBorderVariant: 'dark',
        },
      },
    })

    expect(wrapper.classes()).toContain('card-body')
    expect(wrapper.classes()).toContain('text-info')
    expect(wrapper.classes()).toContain('bg-danger')
    expect(wrapper.classes()).toContain('border-dark')
  })

  it('has class "card-img-overlay" when overlay="true"', async () => {
    const wrapper = mount(BCardBody, {
      context: {
        props: {
          overlay: true,
        },
      },
    })

    expect(wrapper.classes()).toContain('card-body')
    expect(wrapper.classes()).toContain('card-img-overlay')
  })

  it('has card-title when title prop is set', async () => {
    const wrapper = mount(BCardBody, {
      context: {
        props: {
          title: 'title',
        },
      },
    })

    expect(wrapper.find('div.card-title')).toBeDefined()
  })

  it('has card-sub-title when sub-title prop is set', async () => {
    const wrapper = mount(BCardBody, {
      context: {
        props: {
          subTitle: 'sub title',
        },
      },
    })

    expect(wrapper.find('div.card-subtitle')).toBeDefined()
  })
})
