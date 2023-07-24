import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BNavText from '@/components/B/NavText.vue'

describe('nav > nav-text', () => {
  it('has expected default structure', async () => {
    const wrapper = mount(BNavText)

    expect(wrapper.element.tagName).toBe('LI')
    expect(wrapper.classes()).toContain('navbar-text')
    expect(wrapper.text()).toEqual('')
  })

  it('renders default slot content', async () => {
    const wrapper = mount(BNavText, {
      slots: {
        default: 'foobar',
      },
    })

    expect(wrapper.element.tagName).toBe('LI')
    expect(wrapper.classes()).toContain('navbar-text')
    expect(wrapper.text()).toEqual('foobar')
  })
})
