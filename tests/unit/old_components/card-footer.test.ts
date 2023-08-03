import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BCardFooter from '@/components/B/CardFooter.vue'

describe('card-footer', () => {
  it('has root element "div"', async () => {
    const wrapper = mount(BCardFooter)

    expect(wrapper.element.tagName).toBe('DIV')
  })

  it('has class card-header', async () => {
    const wrapper = mount(BCardFooter)

    expect(wrapper.classes()).toContain('card-footer')
  })

  it('has custom root element when prop footerTag is set', async () => {
    const wrapper = mount(BCardFooter, {
      context: {
        props: {
          footerTag: 'footer',
        },
      },
    })

    expect(wrapper.element.tagName).toBe('FOOTER')
    expect(wrapper.classes()).toContain('card-footer')
  })

  it('has class bg-info when prop footerBgVariant=info', async () => {
    const wrapper = mount(BCardFooter, {
      context: {
        props: { footerBgVariant: 'info' },
      },
    })

    expect(wrapper.classes()).toContain('card-footer')
    expect(wrapper.classes()).toContain('bg-info')
  })

  it('has class text-info when prop footerTextVariant=info', async () => {
    const wrapper = mount(BCardFooter, {
      context: {
        props: { footerTextVariant: 'info' },
      },
    })

    expect(wrapper.classes()).toContain('card-footer')
    expect(wrapper.classes()).toContain('text-info')
  })

  it('has class border-info when prop footerBorderVariant=info', async () => {
    const wrapper = mount(BCardFooter, {
      context: {
        props: { footerBorderVariant: 'info' },
      },
    })

    expect(wrapper.classes()).toContain('card-footer')
    expect(wrapper.classes()).toContain('border-info')
  })

  it('has all variant classes when all variant props set', async () => {
    const wrapper = mount(BCardFooter, {
      context: {
        props: {
          footerTextVariant: 'info',
          footerBgVariant: 'danger',
          footerBorderVariant: 'dark',
        },
      },
    })

    expect(wrapper.classes()).toContain('card-footer')
    expect(wrapper.classes()).toContain('text-info')
    expect(wrapper.classes()).toContain('bg-danger')
    expect(wrapper.classes()).toContain('border-dark')
  })
})
