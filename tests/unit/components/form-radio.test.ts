import { mount } from '@vue/test-utils'

import { describe, expect, it } from 'vitest'
import BFormRadio from '@/components/B/FormRadio.vue'

describe('form-radio', () => {
  /* Custom radio structure, class and attributes tests */

  it('default has structure <div><input><label></label></div>', async () => {
    const wrapper = mount(BFormRadio, {
      propsData: {
        checked: '',
        value: 'a',
      },
      slots: {
        default: 'foobar',
      },
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('DIV')
    const children = wrapper.element.children
    expect(children.length).toEqual(2)
    expect(children[0].tagName).toEqual('INPUT')
    expect(children[1].tagName).toEqual('LABEL')
  })

  it('default has wrapper class custom-control and custom-radio', async () => {
    const wrapper = mount(BFormRadio, {
      propsData: {
        checked: '',
        value: 'a',
      },
      slots: {
        default: 'foobar',
      },
    })
    expect(wrapper.classes().length).toEqual(2)
    expect(wrapper.classes()).toContain('custom-control')
    expect(wrapper.classes()).toContain('custom-radio')
  })

  it('default has input type radio', async () => {
    const wrapper = mount(BFormRadio, {
      propsData: {
        checked: '',
        value: 'a',
      },
      slots: {
        default: 'foobar',
      },
    })
    const input = wrapper.find('input')
    expect(input.attributes('type')).toBeDefined()
    expect(input.attributes('type')).toEqual('radio')
  })

  it('default has input class custom-control-input', async () => {
    const wrapper = mount(BFormRadio, {
      propsData: {
        checked: '',
        value: 'a',
      },
      slots: {
        default: 'foobar',
      },
    })
    const input = wrapper.find('input')
    expect(input.classes().length).toEqual(1)
    expect(input.classes()).toContain('custom-control-input')
  })

  it('default has label class custom-control-label', async () => {
    const wrapper = mount(BFormRadio, {
      propsData: {
        checked: '',
        value: 'a',
      },
      slots: {
        default: 'foobar',
      },
    })
    const input = wrapper.find('label')
    expect(input.classes().length).toEqual(1)
    expect(input.classes()).toContain('custom-control-label')
  })

  it('has default slot content in label', async () => {
    const wrapper = mount(BFormRadio, {
      propsData: {
        checked: '',
        value: 'a',
      },
      slots: {
        default: 'foobar',
      },
    })
    const label = wrapper.find('label')
    expect(label.text()).toEqual('foobar')
  })

  it('default has no disabled attribute on input', async () => {
    const wrapper = mount(BFormRadio, {
      propsData: {
        checked: '',
        value: 'a',
      },
      slots: {
        default: 'foobar',
      },
    })
    const input = wrapper.find('input')
    expect(input.attributes('disabled')).toBeUndefined()
  })

  it('has disabled attribute on input when prop disabled set', async () => {
    const wrapper = mount(BFormRadio, {
      propsData: {
        checked: '',
        value: 'a',
        disabled: true,
      },
      slots: {
        default: 'foobar',
      },
    })
    const input = wrapper.find('input')
    expect(input.attributes('disabled')).toBeDefined()
  })

  it('default has no required attribute on input', async () => {
    const wrapper = mount(BFormRadio, {
      propsData: {
        checked: '',
        value: 'a',
      },
      slots: {
        default: 'foobar',
      },
    })
    const input = wrapper.find('input')
    expect(input.attributes('required')).toBeUndefined()
  })

  it('does not have required attribute on input when prop required set and name prop not provided', async () => {
    const wrapper = mount(BFormRadio, {
      propsData: {
        checked: '',
        value: 'a',
        required: true,
      },
      slots: {
        default: 'foobar',
      },
    })
    const input = wrapper.find('input')
    expect(input.attributes('required')).toBeUndefined()
  })

  it('has required attribute on input when prop required and name set', async () => {
    const wrapper = mount(BFormRadio, {
      propsData: {
        checked: '',
        value: 'a',
        name: 'test',
        required: true,
      },
      slots: {
        default: 'foobar',
      },
    })
    const input = wrapper.find('input')
    expect(input.attributes('required')).toBeDefined()
  })

  it('default has no name attribute on input', async () => {
    const wrapper = mount(BFormRadio, {
      propsData: {
        checked: '',
        value: 'a',
      },
      slots: {
        default: 'foobar',
      },
    })
    const input = wrapper.find('input')
    expect(input.attributes('name')).toBeUndefined()
  })

  it('has name attribute on input when name prop set', async () => {
    const wrapper = mount(BFormRadio, {
      propsData: {
        checked: '',
        value: 'a',
        name: 'test',
      },
      slots: {
        default: 'foobar',
      },
    })
    const input = wrapper.find('input')
    expect(input.attributes('name')).toBeDefined()
    expect(input.attributes('name')).toEqual('test')
  })

  it('default has no form attribute on input', async () => {
    const wrapper = mount(BFormRadio, {
      propsData: {
        checked: '',
        value: 'a',
      },
      slots: {
        default: 'foobar',
      },
    })
    const input = wrapper.find('input')
    expect(input.attributes('form')).toBeUndefined()
  })

  it('has form attribute on input when form prop set', async () => {
    const wrapper = mount(BFormRadio, {
      propsData: {
        checked: '',
        value: 'a',
        form: 'test',
      },
      slots: {
        default: 'foobar',
      },
    })
    const input = wrapper.find('input')
    expect(input.attributes('form')).toBeDefined()
    expect(input.attributes('form')).toEqual('test')
  })

  it('has custom attributes transferred to input element', async () => {
    const wrapper = mount(BFormRadio, {
      propsData: {
        id: 'foo',
        foo: 'bar',
      },
    })
    const input = wrapper.find('input')
    expect(input.attributes('foo')).toBeDefined()
    expect(input.attributes('foo')).toEqual('bar')
  })

  it('default has class custom-control-inline when prop inline=true', async () => {
    const wrapper = mount(BFormRadio, {
      propsData: {
        checked: '',
        value: 'a',
        inline: true,
      },
      slots: {
        default: 'foobar',
      },
    })
    expect(wrapper.classes().length).toEqual(3)
    expect(wrapper.classes()).toContain('custom-radio')
    expect(wrapper.classes()).toContain('custom-control')
    expect(wrapper.classes()).toContain('custom-control-inline')
  })

  it('default has no input validation classes by default', async () => {
    const wrapper = mount(BFormRadio, {
      propsData: {
        checked: '',
        value: 'a',
      },
      slots: {
        default: 'foobar',
      },
    })
    const input = wrapper.find('input')
    expect(input).toBeDefined()
    expect(input.classes()).not.toContain('is-invalid')
    expect(input.classes()).not.toContain('is-valid')
  })

  it('default has no input validation classes when state=null', async () => {
    const wrapper = mount(BFormRadio, {
      propsData: {
        state: null,
        checked: '',
        value: 'a',
      },
      slots: {
        default: 'foobar',
      },
    })
    const input = wrapper.find('input')
    expect(input).toBeDefined()
    expect(input.classes()).not.toContain('is-invalid')
    expect(input.classes()).not.toContain('is-valid')
  })

  it('default has input validation class is-valid when state=true', async () => {
    const wrapper = mount(BFormRadio, {
      propsData: {
        state: true,
        checked: '',
        value: 'a',
      },
      slots: {
        default: 'foobar',
      },
    })
    const input = wrapper.find('input')
    expect(input).toBeDefined()
    expect(input.classes()).not.toContain('is-invalid')
    expect(input.classes()).toContain('is-valid')
  })

  it('default has input validation class is-invalid when state=false', async () => {
    const wrapper = mount(BFormRadio, {
      propsData: {
        state: false,
        checked: '',
        value: 'a',
      },
      slots: {
        default: 'foobar',
      },
    })
    const input = wrapper.find('input')
    expect(input).toBeDefined()
    expect(input.classes()).toContain('is-invalid')
    expect(input.classes()).not.toContain('is-valid')
  })

  // --- Plain styling ---

  it('plain has structure <div><input><label></label></div>', async () => {
    const wrapper = mount(BFormRadio, {
      propsData: {
        plain: true,
        checked: '',
        value: 'a',
      },
      slots: {
        default: 'foobar',
      },
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('DIV')
    const children = wrapper.element.children
    expect(children.length).toEqual(2)
    expect(children[0].tagName).toEqual('INPUT')
    expect(children[1].tagName).toEqual('LABEL')
  })

  it('plain has wrapper class form-check', async () => {
    const wrapper = mount(BFormRadio, {
      propsData: {
        plain: true,
        checked: '',
        value: 'a',
      },
      slots: {
        default: 'foobar',
      },
    })
    expect(wrapper.classes().length).toEqual(1)
    expect(wrapper.classes()).toContain('form-check')
  })

  it('plain has input type radio', async () => {
    const wrapper = mount(BFormRadio, {
      propsData: {
        plain: true,
        checked: '',
        value: 'a',
      },
      slots: {
        default: 'foobar',
      },
    })
    const input = wrapper.find('input')
    expect(input.attributes('type')).toBeDefined()
    expect(input.attributes('type')).toEqual('radio')
  })

  it('plain has input class form-check-input', async () => {
    const wrapper = mount(BFormRadio, {
      propsData: {
        plain: true,
        checked: '',
        value: 'a',
      },
      slots: {
        default: 'foobar',
      },
    })
    const input = wrapper.find('input')
    expect(input.classes().length).toEqual(1)
    expect(input.classes()).toContain('form-check-input')
  })

  it('plain has label class form-check-label', async () => {
    const wrapper = mount(BFormRadio, {
      propsData: {
        plain: true,
        checked: '',
        value: 'a',
      },
      slots: {
        default: 'foobar',
      },
    })
    const input = wrapper.find('label')
    expect(input.classes().length).toEqual(1)
    expect(input.classes()).toContain('form-check-label')
  })

  it('plain has default slot content in label', async () => {
    const wrapper = mount(BFormRadio, {
      propsData: {
        plain: true,
        checked: '',
        value: 'a',
      },
      slots: {
        default: 'foobar',
      },
    })
    const label = wrapper.find('label')
    expect(label.text()).toEqual('foobar')
  })

  it('plain has no input validation classes by default', async () => {
    const wrapper = mount(BFormRadio, {
      propsData: {
        plain: true,
        checked: '',
        value: 'a',
      },
      slots: {
        default: 'foobar',
      },
    })
    const input = wrapper.find('input')
    expect(input).toBeDefined()
    expect(input.classes()).not.toContain('is-invalid')
    expect(input.classes()).not.toContain('is-valid')
  })

  it('plain has no input validation classes when state=null', async () => {
    const wrapper = mount(BFormRadio, {
      propsData: {
        state: null,
        plain: true,
        checked: '',
        value: 'a',
      },
      slots: {
        default: 'foobar',
      },
    })
    const input = wrapper.find('input')
    expect(input).toBeDefined()
    expect(input.classes()).not.toContain('is-invalid')
    expect(input.classes()).not.toContain('is-valid')
  })

  it('plain has input validation class is-valid when state=true', async () => {
    const wrapper = mount(BFormRadio, {
      propsData: {
        state: true,
        plain: true,
        checked: '',
        value: 'a',
      },
      slots: {
        default: 'foobar',
      },
    })
    const input = wrapper.find('input')
    expect(input).toBeDefined()
    expect(input.classes()).not.toContain('is-invalid')
    expect(input.classes()).toContain('is-valid')
  })

  it('plain has input validation class is-invalid when state=false', async () => {
    const wrapper = mount(BFormRadio, {
      propsData: {
        state: false,
        plain: true,
        checked: '',
        value: 'a',
      },
      slots: {
        default: 'foobar',
      },
    })
    const input = wrapper.find('input')
    expect(input).toBeDefined()
    expect(input.classes()).toContain('is-invalid')
    expect(input.classes()).not.toContain('is-valid')
  })

  // --- Button styling - stand-alone mode ---

  it('stand-alone button has structure <div><label><input></label></div>', async () => {
    const wrapper = mount(BFormRadio, {
      propsData: {
        button: true,
        checked: '',
        value: 'a',
      },
      slots: {
        default: 'foobar',
      },
    })
    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('DIV')
    const label = wrapper.element.children
    expect(label.length).toEqual(1)
    expect(label[0].tagName).toEqual('LABEL')
    const input = label[0].children
    expect(input.length).toEqual(1)
    expect(input[0].tagName).toEqual('INPUT')
  })

  it('stand-alone button has wrapper classes btn-group-toggle and d-inline-block', async () => {
    const wrapper = mount(BFormRadio, {
      propsData: {
        button: true,
        checked: '',
        value: 'a',
      },
      slots: {
        default: 'foobar',
      },
    })
    expect(wrapper.classes().length).toEqual(2)
    expect(wrapper.classes()).toContain('btn-group-toggle')
    expect(wrapper.classes()).toContain('d-inline-block')
  })

  it('stand-alone button has label classes btn and btn-secondary when unchecked', async () => {
    const wrapper = mount(BFormRadio, {
      propsData: {
        button: true,
        checked: '',
        value: 'a',
      },
      slots: {
        default: 'foobar',
      },
    })
    const label = wrapper.find('label')
    expect(label).toBeDefined()
    expect(label.classes().length).toEqual(2)
    expect(label.classes()).not.toContain('active')
    expect(label.classes()).not.toContain('focus')
    expect(label.classes()).toContain('btn')
    expect(label.classes()).toContain('btn-secondary')
  })

  it('stand-alone button has label classes btn, btn-secondary and active when checked by default', async () => {
    const wrapper = mount(BFormRadio, {
      propsData: {
        button: true,
        checked: 'a',
        value: 'a',
      },
      slots: {
        default: 'foobar',
      },
    })
    const label = wrapper.find('label')
    expect(label).toBeDefined()
    expect(label.classes().length).toEqual(3)
    expect(label.classes()).not.toContain('focus')
    expect(label.classes()).toContain('btn')
    expect(label.classes()).toContain('btn-secondary')
    expect(label.classes()).toContain('active')
  })

  it('stand-alone button has label class active when clicked (checked)', async () => {
    const wrapper = mount(BFormRadio, {
      propsData: {
        button: true,
        checked: '',
        value: 'a',
      },
      slots: {
        default: 'foobar',
      },
    })
    const label = wrapper.find('label')
    expect(label).toBeDefined()
    const input = wrapper.find('input')
    expect(input).toBeDefined()
    expect(label.classes().length).toEqual(2)
    expect(label.classes()).not.toContain('focus')
    expect(label.classes()).not.toContain('active')
    expect(label.classes()).toContain('btn')
    expect(label.classes()).toContain('btn-secondary')
    await input.setChecked(true)
    expect(label.classes().length).toEqual(3)
    expect(label.classes()).toContain('active')
    expect(label.classes()).toContain('btn')
    expect(label.classes()).toContain('btn-secondary')
  })

  it('stand-alone button has label class focus when input focused', async () => {
    const wrapper = mount(BFormRadio, {
      attachTo: document.body,
      propsData: {
        button: true,
        checked: '',
        value: 'a',
      },
      slots: {
        default: 'foobar',
      },
    })

    const label = wrapper.find('label')
    expect(label).toBeDefined()

    const input = wrapper.find('input')
    expect(label.classes().length).toEqual(2)
    expect(label.classes()).not.toContain('focus')
    expect(label.classes()).not.toContain('active')
    expect(label.classes()).toContain('btn')
    expect(label.classes()).toContain('btn-secondary')
    expect(input).toBeDefined()

    await input.trigger('focus')
    expect(label.classes().length).toEqual(3)
    expect(label.classes()).toContain('focus')

    await input.trigger('blur')
    expect(label.classes().length).toEqual(2)
    expect(label.classes()).not.toContain('focus')
  })

  it('stand-alone button has label btn-primary when prop btn-variant set to primary', async () => {
    const wrapper = mount(BFormRadio, {
      propsData: {
        button: true,
        buttonVariant: 'primary',
        checked: '',
        value: 'a',
      },
      slots: {
        default: 'foobar',
      },
    })
    const label = wrapper.find('label')
    expect(label).toBeDefined()
    expect(label.classes().length).toEqual(2)
    expect(label.classes()).not.toContain('focus')
    expect(label.classes()).not.toContain('active')
    expect(label.classes()).not.toContain('btn-secondary')
    expect(label.classes()).toContain('btn')
    expect(label.classes()).toContain('btn-primary')
  })

  // --- Functionality testing ---

  it('default has internal localChecked="" when prop checked=""', async () => {
    const wrapper = mount(BFormRadio, {
      propsData: {
        checked: '',
        value: 'a',
      },
      slots: {
        default: 'foobar',
      },
    })
    expect(wrapper.vm).toBeDefined()
    expect(wrapper.vm.localChecked).toBeDefined()
    expect(wrapper.vm.localChecked).toBe('')
  })

  it('default has internal localChecked set to value when checked=value', async () => {
    const wrapper = mount(BFormRadio, {
      propsData: {
        value: 'bar',
        checked: 'bar',
      },
      slots: {
        default: 'foobar',
      },
    })
    expect(wrapper.vm).toBeDefined()
    expect(wrapper.vm.localChecked).toBeDefined()
    expect(wrapper.vm.localChecked).toEqual('bar')
  })

  it('default has internal localChecked set to value when checked changed to value', async () => {
    const wrapper = mount(BFormRadio, {
      propsData: {
        checked: '',
        value: 'bar',
      },
      slots: {
        default: 'foobar',
      },
    })
    expect(wrapper.vm).toBeDefined()
    expect(wrapper.vm.localChecked).toBeDefined()
    expect(wrapper.vm.localChecked).toBe('')
    await wrapper.setProps({
      checked: 'bar',
    })
    expect(wrapper.vm.localChecked).toEqual('bar')
    expect(wrapper.emitted('input')).toBeDefined()
    const last = wrapper.emitted('input').length - 1
    expect(wrapper.emitted('input')[last]).toBeDefined()
    expect(wrapper.emitted('input')[last][0]).toEqual('bar')
  })

  it('emits a change event when clicked', async () => {
    const wrapper = mount(BFormRadio, {
      attachTo: document.body,
      propsData: {
        checked: '',
        value: 'bar',
      },
      slots: {
        default: 'foobar',
      },
    })

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.vm.localChecked).toBeDefined()
    expect(wrapper.vm.localChecked).toBe('')
    expect(wrapper.emitted('change')).toBeUndefined()

    const input = wrapper.find('input')
    expect(input).toBeDefined()

    await input.trigger('click')
    expect(wrapper.emitted('change')).toBeDefined()
    expect(wrapper.emitted('change').length).toBe(1)
    expect(wrapper.emitted('change')[0][0]).toEqual('bar')
  })

  it('works when value is an object', async () => {
    const wrapper = mount(BFormRadio, {
      attachTo: document.body,
      propsData: {
        value: { bar: 1, baz: 2 },
        checked: '',
      },
      slots: {
        default: 'foobar',
      },
    })

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.vm.localChecked).toBeDefined()
    expect(wrapper.vm.localChecked).toEqual('')

    const input = wrapper.find('input')
    expect(input).toBeDefined()

    await input.trigger('click')
    expect(wrapper.vm.localChecked).toEqual({ bar: 1, baz: 2 })
  })

  it('focus() and blur() methods work', async () => {
    const wrapper = mount(BFormRadio, {
      attachTo: document.body,
      propsData: {
        checked: false,
      },
      slots: {
        default: 'foobar',
      },
    })
    expect(wrapper.vm).toBeDefined()

    const input = wrapper.find('input')
    expect(input).toBeDefined()
    expect(document).toBeDefined()

    expect(wrapper.vm.focus).toBeDefined()
    expect(typeof wrapper.vm.focus).toBe('function')
    expect(wrapper.vm.blur).toBeDefined()
    expect(typeof wrapper.vm.blur).toBe('function')

    expect(input.element).not.toBe(document.activeElement)

    wrapper.vm.focus()
    await wrapper.vm.$nextTick()
    expect(input.element).toBe(document.activeElement)

    wrapper.vm.blur()
    await wrapper.vm.$nextTick()
    expect(input.element).not.toBe(document.activeElement)
  })

  // These tests are wrapped in a new describe to limit the scope of the getBCR Mock
  describe('prop `autofocus`', () => {
    const origGetBCR = Element.prototype.getBoundingClientRect

    beforeEach(() => {
      // Mock `getBoundingClientRect()` so that the `isVisible(el)` test returns `true`
      // In our test below, all pagination buttons would normally be visible
      Element.prototype.getBoundingClientRect = jest.fn(() => ({
        width: 24,
        height: 24,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }))
    })

    afterEach(() => {
      // Restore prototype
      Element.prototype.getBoundingClientRect = origGetBCR
    })

    it('works when true', async () => {
      const wrapper = mount(BFormRadio, {
        attachTo: document.body,
        propsData: {
          checked: false,
          autofocus: true,
        },
        slots: {
          default: 'foobar',
        },
      })
      expect(wrapper.vm).toBeDefined()
      await wrapper.vm.$nextTick()
      await new Promise(resolve => requestAnimationFrame(resolve))

      const input = wrapper.find('input')
      expect(input.exists()).toBe(true)
      expect(document).toBeDefined()
      expect(document.activeElement).toBe(input.element)
    })

    it('does not autofocus by default', async () => {
      const wrapper = mount(BFormRadio, {
        attachTo: document.body,
        propsData: {
          checked: false,
        },
        slots: {
          default: 'foobar',
        },
      })
      expect(wrapper.vm).toBeDefined()
      await wrapper.vm.$nextTick()
      await new Promise(resolve => requestAnimationFrame(resolve))

      const input = wrapper.find('input')
      expect(input.exists()).toBe(true)
      expect(document).toBeDefined()
      expect(document.activeElement).not.toBe(input.element)
    })
  })
})