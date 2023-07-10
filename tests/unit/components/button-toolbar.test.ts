import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import BButtonToolbar from '@/components/B/ButtonToolbar.vue'
import BButtonGroup from '@/components/B/ButtonGroup.vue'
import BButton from '@/components/B/Button.vue'

describe('button-toolbar', () => {
  it('toolbar root should be "div"', async () => {
    const wrapper = mount(BButtonToolbar)
    expect(wrapper.element.tagName).toBe('DIV')
  })

  it('toolbar should contain base class', async () => {
    const wrapper = mount(BButtonToolbar)
    expect(wrapper.classes()).toContain('btn-toolbar')
  })

  it('toolbar should not have class "justify-content-between"', async () => {
    const wrapper = mount(BButtonToolbar)
    expect(wrapper.classes()).not.toContain('justify-content-between')
  })

  it('toolbar should have role', async () => {
    const wrapper = mount(BButtonToolbar)
    expect(wrapper.attributes('role')).toBe('toolbar')
  })

  it('toolbar should not have tabindex by default', async () => {
    const wrapper = mount(BButtonToolbar)
    expect(wrapper.attributes('tabindex')).toBeUndefined()
  })

  it('toolbar should have class "justify-content-between" when justify set', async () => {
    const wrapper = mount(BButtonToolbar, {
      propsData: {
        justify: true,
      },
    })
    expect(wrapper.classes()).toContain('justify-content-between')
    expect(wrapper.classes()).toContain('btn-toolbar')
  })

  it('toolbar should have tabindex when key-nav set', async () => {
    const wrapper = mount(BButtonToolbar, {
      propsData: {
        keyNav: true,
      },
    })
    expect(wrapper.attributes('tabindex')).toBeDefined()
    expect(wrapper.attributes('tabindex')).toBe('0')
    expect(wrapper.element.tabIndex).toBe(0)
  })

  // These tests are wrapped in a new describe to limit the scope of the getBCR Mock
  describe('keyboard navigation', () => {
    const origGetBCR = Element.prototype.getBoundingClientRect

    beforeEach(() => {
      // Mock `getBoundingClientRect()` so that the `isVisible(el)` test returns `true`
      // In our test below, all pagination buttons would normally be visible
      Element.prototype.getBoundingClientRect = vi.fn(() => ({
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

    // Test App for keynav
    const App = {
      render(h) {
        return h(BButtonToolbar, { props: { keyNav: true } }, [
          h(BButtonGroup, [h(BButton, 'a'), h(BButton, 'b')]),
          h(BButtonGroup, [h(BButton, { props: { disabled: true } }, 'c'), h(BButton, 'd')]),
          h(BButtonGroup, [h(BButton, 'e'), h(BButton, 'f')]),
        ])
      },
    }

    it('has correct structure', async () => {
      const wrapper = mount(App, {
        attachTo: document.body,
      })

      await wrapper.vm.$nextTick()

      expect(wrapper.find('div.btn-toolbar').exists()).toBe(true)
      expect(wrapper.attributes('tabindex')).toBe('0')

      const $groups = wrapper.findAllComponents(BButtonGroup)
      expect($groups).toBeDefined()
      expect($groups.length).toBe(3)

      const $btns = wrapper.findAll('button')
      expect($btns).toBeDefined()
      expect($btns.length).toBe(6)
      expect($btns.at(0)?.element.matches('button[tabindex="-1"')).toBe(true)
      expect($btns.at(1)?.element.matches('button[tabindex="-1"')).toBe(true)
      expect($btns.at(2)?.element.matches('button[tabindex="-1"')).toBe(false) // Disabled button
      expect($btns.at(3)?.element.matches('button[tabindex="-1"')).toBe(true)
      expect($btns.at(4)?.element.matches('button[tabindex="-1"')).toBe(true)
      expect($btns.at(5)?.element.matches('button[tabindex="-1"')).toBe(true)
    })

    it('focuses first button when tabbed into', async () => {
      const wrapper = mount(App, {
        attachTo: document.body,
      })

      await wrapper.vm.$nextTick()

      expect(wrapper.find('div.btn-toolbar').exists()).toBe(true)
      expect(wrapper.attributes('tabindex')).toBe('0')

      const $btns = wrapper.findAll('button')
      expect($btns).toBeDefined()
      expect($btns.length).toBe(6)

      expect(document.activeElement).not.toBe(wrapper.element)
      expect(document.activeElement).not.toBe($btns.at(0)?.element)

      await wrapper.trigger('focusin')
      expect(document.activeElement).toBe($btns.at(0)?.element)
    })

    it('keyboard navigation works', async () => {
      const wrapper = mount(App, {
        attachTo: document.body,
      })

      await wrapper.vm.$nextTick()

      expect(wrapper.find('div.btn-toolbar').exists()).toBe(true)
      expect(wrapper.attributes('tabindex')).toBe('0')

      const $btns = wrapper.findAll('button')
      expect($btns).toBeDefined()
      expect($btns.length).toBe(6)

      // Focus first button
      $btns.at(0)?.element.focus()
      expect(document.activeElement).toBe($btns.at(0)?.element)

      // Cursor right
      await $btns.at(0)?.trigger('keydown.right')
      expect(document.activeElement).toBe($btns.at(1)?.element)

      // Cursor right (skips disabled button)
      await $btns.at(1)?.trigger('keydown.right')
      expect(document.activeElement).toBe($btns.at(3)?.element)

      // Cursor shift-right (focuses last button)
      await $btns.at(1)?.trigger('keydown.right', { shiftKey: true })
      expect(document.activeElement).toBe($btns.at(5)?.element)

      // Cursor left
      await $btns.at(5)?.trigger('keydown.left')
      expect(document.activeElement).toBe($btns.at(4)?.element)

      // Cursor shift left (focuses first button)
      await $btns.at(5)?.trigger('keydown.left', { shiftKey: true })
      expect(document.activeElement).toBe($btns.at(0)?.element)
    })
  })
})
