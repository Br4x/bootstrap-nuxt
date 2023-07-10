import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import AvatarGroup from '@/components/B/AvatarGroup.vue'

describe('avatar-group', () => {
  it('should have expected default structure', async () => {
    const wrapper = mount(AvatarGroup)

    expect(wrapper.vm).toBeDefined()
    await wrapper.vm.$nextTick()

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('b-avatar-group')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.attributes('role')).toEqual('group')
  })

  it('should render custom root element when prop tag is set', async () => {
    const wrapper = mount(AvatarGroup, {
      propsData: {
        tag: 'article',
      },
    })

    expect(wrapper.vm).toBeDefined()
    await wrapper.vm.$nextTick()

    expect(wrapper.element.tagName).toBe('ARTICLE')
    expect(wrapper.classes()).toContain('b-avatar-group')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.attributes('role')).toEqual('group')
  })

  it('should render content from default slot', async () => {
    const wrapper = mount(AvatarGroup, {
      slots: {
        default: '<span>FOOBAR</span>',
      },
    })

    expect(wrapper.vm).toBeDefined()
    await wrapper.vm.$nextTick()

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('b-avatar-group')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.attributes('role')).toEqual('group')

    expect(wrapper.text()).toEqual('FOOBAR')
    expect(wrapper.find('span').exists()).toBe(true)
  })

  it('overlap props work', async () => {
    const wrapper = mount(AvatarGroup, {
      propsData: {
        overlap: 0.65,
      },
    })

    expect(wrapper.vm).toBeDefined()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.overlap).toBe(0.65)
    expect(wrapper.vm.overlapScale).toBe(0.325)
  })
})
