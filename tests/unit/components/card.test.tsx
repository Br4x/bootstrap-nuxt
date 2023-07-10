import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BCard from '@/components/B/Card.vue'

describe('card', () => {
  it('default has expected structure', async () => {
    const wrapper = mount(BCard)

    // Outer div
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('card')

    // Should have one child div.card-body
    expect(wrapper.findAll('.card > .card-body').length).toBe(1)
    expect(wrapper.findAll('.card-body').length).toBe(1)
    expect(wrapper.find('.card-body').element.tagName).toBe('DIV')
    expect(wrapper.find('.card-body').classes()).toContain('card-body')

    // Should have no content by default
    expect(wrapper.text()).toEqual('')
  })

  it('should not contain "card-body" if prop no-body set', async () => {
    const wrapper = mount(BCard, {
      propsData: {
        noBody: true,
      },
    })

    // Outer div
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('card')

    // Should no have a card body
    expect(wrapper.findAll('.card-body').length).toBe(0)
    // Should have no content by default
    expect(wrapper.text()).toEqual('')
  })

  it('renders custom root element when tag prop set', async () => {
    const wrapper = mount(BCard, {
      propsData: {
        tag: 'article',
        noBody: true,
      },
    })

    // Outer div
    expect(wrapper.element.tagName).toBe('ARTICLE')
    expect(wrapper.classes()).toContain('card')
    expect(wrapper.text()).toEqual('')
  })

  it('applies variant classes to root element', async () => {
    const wrapper = mount(BCard, {
      propsData: {
        noBody: true,
        bgVariant: 'info',
        borderVariant: 'danger',
        textVariant: 'dark',
      },
    })

    // Outer div
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('card')
    expect(wrapper.classes()).toContain('bg-info')
    expect(wrapper.classes()).toContain('border-danger')
    expect(wrapper.classes()).toContain('text-dark')
    expect(wrapper.text()).toEqual('')
  })

  it('applies text align class to when align prop set', async () => {
    const wrapper = mount(BCard, {
      propsData: {
        noBody: true,
        align: 'right',
      },
    })

    // Outer div
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('card')
    expect(wrapper.classes()).toContain('text-right')
    expect(wrapper.text()).toEqual('')
  })

  it('should have content from default slot', async () => {
    const wrapperBody = mount(BCard, {
      propsData: {
        noBody: false,
      },
      slots: {
        default: 'foobar',
      },
    })
    const wrapperNoBody = mount(BCard, {
      propsData: {
        noBody: true,
      },
      slots: {
        default: 'foobar',
      },
    })

    // With body
    expect(wrapperBody.element.tagName).toBe('DIV')
    expect(wrapperBody.findAll('.card-body').length).toBe(1)
    expect(wrapperBody.find('.card-body').text()).toBe('foobar')

    // With no body
    expect(wrapperNoBody.element.tagName).toBe('DIV')
    expect(wrapperNoBody.findAll('.card-body').length).toBe(0)
    expect(wrapperNoBody.text()).toBe('foobar')
  })

  it('should have class flex-row when img-left set', async () => {
    const wrapper = mount(BCard, {
      propsData: {
        noBody: true,
        imgLeft: true,
      },
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('card')
    expect(wrapper.classes()).toContain('flex-row')
  })

  it('should have class flex-row-reverse when img-right set', async () => {
    const wrapper = mount(BCard, {
      propsData: {
        noBody: true,
        imgRight: true,
      },
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('card')
    expect(wrapper.classes()).toContain('flex-row-reverse')
  })

  it('should have class flex-row when img-left and img-right set', async () => {
    const wrapper = mount(BCard, {
      propsData: {
        noBody: true,
        imgLeft: true,
        imgRight: true,
      },
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('card')
    expect(wrapper.classes()).toContain('flex-row')
    expect(wrapper.classes()).not.toContain('flex-row-reverse')
  })

  it('should have header and footer when header and footer props are set', async () => {
    const wrapper = mount(BCard, {
      propsData: {
        header: 'foo',
        footer: 'bar',
      },
      slots: {
        default: 'fizzle',
      },
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('card')

    expect(wrapper.findAll('.card-header').length).toBe(1)
    expect(wrapper.find('.card-header').text()).toBe('foo')
    expect(wrapper.findAll('.card-body').length).toBe(1)
    expect(wrapper.find('.card-body').text()).toBe('fizzle')
    expect(wrapper.findAll('.card-footer').length).toBe(1)
    expect(wrapper.find('.card-footer').text()).toBe('bar')

    // Expected order
    expect(wrapper.find('.card-header+.card-body+.card-footer').exists()).toBe(true)
  })

  it('should have img at top', async () => {
    const wrapper = mount(BCard, {
      propsData: {
        imgSrc: '/foo/bar',
        imgAlt: 'foobar',
        imgTop: true,
      },
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('card')

    expect(wrapper.findAll('img').length).toBe(1)
    const $img = wrapper.find('img')
    expect($img.element.tagName).toBe('IMG')
    expect($img.attributes('src')).toBe('/foo/bar')
    expect($img.attributes('alt')).toBe('foobar')
    expect($img.classes()).toContain('card-img-top')

    // Expected order
    expect(wrapper.find('img + .card-body').exists()).toBe(true)
  })

  it('should have img at bottom', async () => {
    const wrapper = mount(BCard, {
      propsData: {
        imgSrc: '/foo/bar',
        imgAlt: 'foobar',
        imgBottom: true,
      },
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('card')

    expect(wrapper.findAll('img').length).toBe(1)
    const $img = wrapper.find('img')
    expect($img.element.tagName).toBe('IMG')
    expect($img.attributes('src')).toBe('/foo/bar')
    expect($img.attributes('alt')).toBe('foobar')
    expect($img.classes()).toContain('card-img-bottom')

    // Expected order
    expect(wrapper.find('.card-body + img').exists()).toBe(true)
  })

  it('should have img overlay', async () => {
    const wrapper = mount(BCard, {
      propsData: {
        imgSrc: '/foo/bar',
        imgAlt: 'foobar',
        overlay: true,
      },
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('card')

    expect(wrapper.findAll('img').length).toBe(1)
    const $img = wrapper.find('img')
    expect($img.element.tagName).toBe('IMG')
    expect($img.attributes('src')).toBe('/foo/bar')
    expect($img.attributes('alt')).toBe('foobar')
    expect($img.classes()).toContain('card-img')

    expect(wrapper.findAll('.card-body').length).toBe(1)
    const $body = wrapper.find('.card-body')
    expect($body.classes()).toContain('card-body')
    expect($body.classes()).toContain('card-img-overlay')

    // Expected order
    expect(wrapper.find('img + .card-body').exists()).toBe(true)
  })
})
