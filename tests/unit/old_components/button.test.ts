import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BButton from '@/components/B/Button.vue'

describe('button', () => {
  it('has default structure and classes', async () => {
    const wrapper = mount(BButton)

    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.attributes('type')).toBeDefined()
    expect(wrapper.attributes('type')).toBe('button')
    expect(wrapper.classes()).toContain('btn')
    expect(wrapper.classes()).toContain('btn-secondary')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.attributes('href')).toBeUndefined()
    expect(wrapper.attributes('role')).toBeUndefined()
    expect(wrapper.attributes('disabled')).toBeUndefined()
    expect(wrapper.attributes('aria-disabled')).toBeUndefined()
    expect(wrapper.attributes('aria-pressed')).toBeUndefined()
    expect(wrapper.attributes('autocomplete')).toBeUndefined()
    expect(wrapper.attributes('tabindex')).toBeUndefined()
  })

  it('renders a link when href provided', async () => {
    const wrapper = mount(BButton, {
      propsData: {
        href: '/foo/bar',
      },
    })

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toBeDefined()
    expect(wrapper.attributes('href')).toBe('/foo/bar')
    expect(wrapper.attributes('type')).toBeUndefined()
    expect(wrapper.classes()).toContain('btn')
    expect(wrapper.classes()).toContain('btn-secondary')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.attributes('role')).toBeUndefined()
    expect(wrapper.attributes('disabled')).toBeUndefined()
    expect(wrapper.attributes('aria-disabled')).toBeUndefined()
    expect(wrapper.attributes('aria-pressed')).toBeUndefined()
    expect(wrapper.attributes('autocomplete')).toBeUndefined()
    expect(wrapper.attributes('tabindex')).toBeUndefined()
  })

  it('renders default slot content', async () => {
    const wrapper = mount(BButton, {
      slots: {
        default: '<span>foobar</span>',
      },
    })

    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.attributes('type')).toBeDefined()
    expect(wrapper.attributes('type')).toBe('button')
    expect(wrapper.classes()).toContain('btn')
    expect(wrapper.classes()).toContain('btn-secondary')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.find('span').exists()).toBe(true)
    expect(wrapper.text()).toBe('foobar')
  })

  it('applies variant class', async () => {
    const wrapper = mount(BButton, {
      propsData: {
        variant: 'danger',
      },
    })

    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.attributes('type')).toBeDefined()
    expect(wrapper.attributes('type')).toBe('button')
    expect(wrapper.classes()).toContain('btn')
    expect(wrapper.classes()).toContain('btn-danger')
    expect(wrapper.classes().length).toBe(2)
  })

  it('applies block class', async () => {
    const wrapper = mount(BButton, {
      propsData: {
        block: true,
      },
    })

    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.attributes('type')).toBeDefined()
    expect(wrapper.attributes('type')).toBe('button')
    expect(wrapper.classes()).toContain('btn')
    expect(wrapper.classes()).toContain('btn-secondary')
    expect(wrapper.classes()).toContain('btn-block')
    expect(wrapper.classes().length).toBe(3)
  })

  it('applies rounded-pill class when pill prop set', async () => {
    const wrapper = mount(BButton, {
      propsData: {
        pill: true,
      },
    })

    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.attributes('type')).toBeDefined()
    expect(wrapper.attributes('type')).toBe('button')
    expect(wrapper.classes()).toContain('btn')
    expect(wrapper.classes()).toContain('btn-secondary')
    expect(wrapper.classes()).toContain('rounded-pill')
    expect(wrapper.classes().length).toBe(3)
  })

  it('applies rounded-0 class when squared prop set', async () => {
    const wrapper = mount(BButton, {
      propsData: {
        squared: true,
      },
    })

    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.attributes('type')).toBeDefined()
    expect(wrapper.attributes('type')).toBe('button')
    expect(wrapper.classes()).toContain('btn')
    expect(wrapper.classes()).toContain('btn-secondary')
    expect(wrapper.classes()).toContain('rounded-0')
    expect(wrapper.classes().length).toBe(3)
  })

  it('renders custom root element', async () => {
    const wrapper = mount(BButton, {
      propsData: {
        tag: 'div',
      },
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.attributes('type')).toBeUndefined()
    expect(wrapper.classes()).toContain('btn')
    expect(wrapper.classes()).toContain('btn-secondary')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.attributes('role')).toBe('button')
    expect(wrapper.attributes('aria-disabled')).toBe('false')
    expect(wrapper.attributes('tabindex')).toBe('0')
    expect(wrapper.attributes('disabled')).toBeUndefined()
    expect(wrapper.attributes('aria-pressed')).toBeUndefined()
    expect(wrapper.attributes('autocomplete')).toBeUndefined()
  })

  it('button has attribute disabled when disabled set', async () => {
    const wrapper = mount(BButton, {
      propsData: {
        disabled: true,
      },
    })

    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.attributes('type')).toBe('button')
    expect(wrapper.classes()).toContain('btn')
    expect(wrapper.classes()).toContain('btn-secondary')
    expect(wrapper.classes()).toContain('disabled')
    expect(wrapper.classes().length).toBe(3)
    expect(wrapper.attributes('aria-disabled')).toBeUndefined()
  })

  it('link has attribute aria-disabled when disabled set', async () => {
    const wrapper = mount(BButton, {
      propsData: {
        href: '/foo/bar',
        disabled: true,
      },
    })

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.classes()).toContain('btn')
    expect(wrapper.classes()).toContain('btn-secondary')
    expect(wrapper.classes()).toContain('disabled')
    // Both <b-button> and <b-link> add the class 'disabled'
    // `vue-functional-data-merge` or Vue doesn't appear to de-dup classes
    // expect(wrapper.classes().length).toBe(3)
    // Actually returns 4, as disabled is there twice
    expect(wrapper.attributes('aria-disabled')).toBeDefined()
    expect(wrapper.attributes('aria-disabled')).toBe('true')
    // Shouldn't have a role with href not `#`
    expect(wrapper.attributes('role')).not.toEqual('button')
  })

  it('link with href="#" should have role="button"', async () => {
    const wrapper = mount(BButton, {
      propsData: {
        href: '#',
      },
    })

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.classes()).toContain('btn')
    expect(wrapper.classes()).toContain('btn-secondary')
    expect(wrapper.classes()).not.toContain('disabled')
    expect(wrapper.attributes('role')).toEqual('button')
  })

  it('should emit click event when clicked', async () => {
    let called = 0
    let event = null
    const wrapper = mount(BButton, {
      listeners: {
        click: (e: Event) => {
          event = e
          called++
        },
      },
    })

    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(called).toBe(0)
    expect(event).toEqual(null)
    await wrapper.find('button').trigger('click')
    expect(called).toBe(1)
    expect(event).toBeInstanceOf(MouseEvent)
  })

  it('link with href="#" should treat keydown.space as click', async () => {
    let called = 0
    let event = null
    const wrapper = mount(BButton, {
      propsData: {
        href: '#',
      },
      listeners: {
        click: (e: Event) => {
          event = e
          called++
        },
      },
    })

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.classes()).toContain('btn')
    expect(wrapper.classes()).toContain('btn-secondary')
    expect(wrapper.classes()).not.toContain('disabled')
    expect(wrapper.attributes('role')).toEqual('button')

    expect(called).toBe(0)
    expect(event).toEqual(null)

    // We add keydown.space to make links act like buttons
    await wrapper.find('.btn').trigger('keydown.space')
    expect(called).toBe(1)
    expect(event).toBeInstanceOf(Event)

    // Links treat keydown.enter natively as a click
  })

  it('should not emit click event when clicked and disabled', async () => {
    let called = 0
    const wrapper = mount(BButton, {
      propsData: {
        disabled: true,
      },
      listeners: {
        click: () => {
          called++
        },
      },
    })

    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(called).toBe(0)
    await wrapper.find('button').trigger('click')
    expect(called).toBe(0)
  })

  it('should not have `.active` class and `aria-pressed` when pressed is null', async () => {
    const wrapper = mount(BButton, {
      propsData: {
        pressed: null,
      },
    })

    expect(wrapper.classes()).not.toContain('active')
    expect(wrapper.attributes('aria-pressed')).toBeUndefined()
    await wrapper.find('button').trigger('click')
    expect(wrapper.classes()).not.toContain('active')
    expect(wrapper.attributes('aria-pressed')).toBeUndefined()
    expect(wrapper.attributes('autocomplete')).toBeUndefined()
  })

  it('should not have `.active` class and have `aria-pressed="false"` when pressed is false', async () => {
    const wrapper = mount(BButton, {
      propsData: {
        pressed: false,
      },
    })

    expect(wrapper.classes()).not.toContain('active')
    expect(wrapper.attributes('aria-pressed')).toBeDefined()
    expect(wrapper.attributes('aria-pressed')).toBe('false')
    expect(wrapper.attributes('autocomplete')).toBeDefined()
    expect(wrapper.attributes('autocomplete')).toBe('off')
  })

  it('should have `.active` class and have `aria-pressed="true"` when pressed is true', async () => {
    const wrapper = mount(BButton, {
      propsData: {
        pressed: true,
      },
    })

    expect(wrapper.classes()).toContain('active')
    expect(wrapper.attributes('aria-pressed')).toBeDefined()
    expect(wrapper.attributes('aria-pressed')).toBe('true')
    expect(wrapper.attributes('autocomplete')).toBeDefined()
    expect(wrapper.attributes('autocomplete')).toBe('off')
  })

  it('pressed should have `.focus` class when focused', async () => {
    const wrapper = mount(BButton, {
      propsData: {
        pressed: false,
      },
    })

    expect(wrapper.classes()).not.toContain('focus')
    await wrapper.trigger('focusin')
    expect(wrapper.classes()).toContain('focus')
    await wrapper.trigger('focusout')
    expect(wrapper.classes()).not.toContain('focus')
  })

  it('should update the parent sync value on click and when pressed is not null', async () => {
    let called = 0
    const values: any[] = []
    const wrapper = mount(BButton, {
      propsData: {
        pressed: false,
      },
      listeners: {
        'update:pressed': (value: any) => {
          values.push(value)
          called++
        },
      },
    })

    expect(called).toBe(0)

    await wrapper.find('button').trigger('click')

    expect(called).toBe(1)
    expect(values[0]).toBe(true)
  })
})