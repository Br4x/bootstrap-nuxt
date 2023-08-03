import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BDropdownForm from '@/components/B/DropdownForm.vue'

describe('dropdown-form', () => {
  it('renders with tag "form"', async () => {
    const wrapper = mount(BDropdownForm)

    expect(wrapper.element.tagName).toBe('LI')

    const form = wrapper.find('form')
    expect(form.element.tagName).toBe('FORM')
  })

  it('default has expected classes', async () => {
    const wrapper = mount(BDropdownForm)

    expect(wrapper.element.tagName).toBe('LI')

    const form = wrapper.find('form')
    expect(form.classes()).toContain('b-dropdown-form')
    expect(form.classes()).not.toContain('was-validated')
    expect(form.classes()).not.toContain('disabled')
  })

  it('should have custom form classes on form', async () => {
    const wrapper = mount(BDropdownForm, {
      propsData: {
        formClass: ['form-class-custom', 'form-class-custom-2'],
      },
    })

    const form = wrapper.find('form')
    expect(form.classes()).toEqual(['b-dropdown-form', 'form-class-custom', 'form-class-custom-2'])
  })

  it('has tabindex on form', async () => {
    const wrapper = mount(BDropdownForm)

    expect(wrapper.element.tagName).toBe('LI')

    const form = wrapper.find('form')
    expect(form.element.tagName).toBe('FORM')
    expect(form.attributes('tabindex')).toBeDefined()
    expect(form.attributes('tabindex')).toEqual('-1')
  })

  it('does not have tabindex on form when disabled', async () => {
    const wrapper = mount(BDropdownForm, {
      propsData: {
        disabled: true,
      },
    })

    expect(wrapper.element.tagName).toBe('LI')

    const form = wrapper.find('form')
    expect(form.element.tagName).toBe('FORM')
    expect(form.attributes('tabindex')).toBeUndefined()
    expect(form.attributes('disabled')).toBeDefined()
    expect(form.classes()).toContain('disabled')
  })

  it('has class "was-validated" when validated=true', async () => {
    const wrapper = mount(BDropdownForm, {
      propsData: { validated: true },
    })

    expect(wrapper.element.tagName).toBe('LI')

    const form = wrapper.find('form')
    expect(form.classes()).toContain('was-validated')
    expect(form.classes()).toContain('b-dropdown-form')
  })

  it('does not have attribute novalidate by default', async () => {
    const wrapper = mount(BDropdownForm)

    expect(wrapper.element.tagName).toBe('LI')

    const form = wrapper.find('form')
    expect(form.attributes('novalidate')).toBeUndefined()
  })

  it('has attribute novalidate when novalidate=true', async () => {
    const wrapper = mount(BDropdownForm, {
      propsData: { novalidate: true },
    })

    expect(wrapper.element.tagName).toBe('LI')

    const form = wrapper.find('form')
    expect(form.attributes('novalidate')).toBeDefined()
  })
})
