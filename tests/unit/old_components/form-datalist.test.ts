import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BFormDatalist from '@/components/B/FormDatalist.vue'

describe('form-datalist', () => {
  it('has root element datalist', async () => {
    const wrapper = mount(BFormDatalist, {
      propsData: {
        id: 'test-list',
      },
    })
    expect(wrapper.element.tagName).toBe('DATALIST')
  })

  it('has user supplied ID', async () => {
    const wrapper = mount(BFormDatalist, {
      propsData: {
        id: 'test-list',
      },
    })
    expect(wrapper.attributes('id')).toBe('test-list')
  })

  it('has no option elements by default', async () => {
    const wrapper = mount(BFormDatalist, {
      propsData: {
        id: 'test-list',
      },
    })
    expect(wrapper.findAll('option').length).toBe(0)
  })

  it('has options when options set', async () => {
    const wrapper = mount(BFormDatalist, {
      propsData: {
        id: 'test-list',
        options: ['one', 'two'],
      },
    })
    const $options = wrapper.findAll('option')

    expect($options.length).toBe(2)

    expect($options.at(0).text()).toBe('one')
    expect($options.at(1).text()).toBe('two')

    expect($options.at(0).attributes('value')).toBe('one')
    expect($options.at(1).attributes('value')).toBe('two')
  })
})
