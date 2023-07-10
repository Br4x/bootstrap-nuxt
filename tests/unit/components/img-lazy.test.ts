import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BImgLazy from '@/components/B/ImgLazy.vue'

const src = 'https://picsum.photos/1024/400/?image=41'

describe('img-lazy', () => {
  it('has root element "img"', async () => {
    const wrapper = mount(BImgLazy, {
      attachTo: document.body,
      propsData: {
        src,
      },
    })
    expect(wrapper.element.tagName).toBe('IMG')
  })

  it('is initially shown show prop is set', async () => {
    const wrapper = mount(BImgLazy, {
      attachTo: document.body,
      propsData: {
        src,
        show: true,
      },
    })
    expect(wrapper.element.tagName).toBe('IMG')

    expect(wrapper.attributes('src')).toBeDefined()
    expect(wrapper.attributes('src')).toBe(src)
  })

  it('shows when IntersectionObserver not supported', async () => {
    const wrapper = mount(BImgLazy, {
      attachTo: document.body,
      propsData: {
        src,
        show: false,
      },
    })

    expect(wrapper.element.tagName).toBe('IMG')

    await wrapper.vm.$nextTick()
    await new Promise(resolve => requestAnimationFrame(resolve))
    await wrapper.vm.$nextTick()
    await new Promise(resolve => requestAnimationFrame(resolve))
    await wrapper.vm.$nextTick()
    await new Promise(resolve => requestAnimationFrame(resolve))

    expect(wrapper.vm.isShown).toBe(true)

    // It appears that vue-test-utils does not run unbind when the directive is
    // removed from the element. Only when the component is destroyed... unlike Vue
    // Our directive instance should not exist
    // let observer = wrapper.element.__bv__visibility_observer
    // expect(observer).toBeUndefined()

    expect(wrapper.attributes('src')).toBeDefined()
    expect(wrapper.attributes('src')).toContain(src)

    await wrapper.setProps({
      show: true,
    })
    await wrapper.vm.$nextTick()
    await new Promise(resolve => requestAnimationFrame(resolve))
    await wrapper.vm.$nextTick()
    await new Promise(resolve => requestAnimationFrame(resolve))

    expect(wrapper.attributes('src')).toBe(src)
    expect(wrapper.vm.isShown).toBe(true)

    // Our directive instance should not exist
    // observer = wrapper.element.__bv__visibility_observer
    // expect(observer).toBeUndefined()

    await wrapper.setProps({
      show: false,
    })
    await wrapper.vm.$nextTick()
    await new Promise(resolve => requestAnimationFrame(resolve))
    await wrapper.vm.$nextTick()
    await new Promise(resolve => requestAnimationFrame(resolve))

    expect(wrapper.attributes('src')).toContain(src)

    // Our directive instance should not exist
    // observer = wrapper.element.__bv__visibility_observer
    // expect(observer).toBeUndefined()
  })
})
