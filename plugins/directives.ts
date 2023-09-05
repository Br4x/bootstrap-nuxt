import type { DirectiveBinding } from 'vue'
import {
  bind,
  resolveActiveStatus,
  resolveContent,
  resolveDirectiveProps,
  unbind,
} from '../utils/floatingUi'

import { RX_HASH, RX_HASH_ID, RX_SPACE_SPLIT } from '@/constants/regex'
import { getAttr, isTag } from '@/utils'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('b-tooltip', {
    mounted(el, binding) {
      const isActive = resolveActiveStatus(binding.value)
      if (!isActive)
        return

      const text = resolveContent(binding.value, el)

      if (!text.content && !text.title)
        return

      el.$__state = ref({
        ...resolveDirectiveProps(binding, el),
        title: text.title ?? text.content ?? '',
        tooltip: isActive,
      })
      bind(el, binding)
    },
    updated(el, binding) {
      const isActive = resolveActiveStatus(binding.value)
      if (!isActive)
        return

      const text = resolveContent(binding.value, el)

      if (!text.content && !text.title)
        return

      if (!el.$__state)
        return
      el.$__state.value = {
        ...resolveDirectiveProps(binding, el),
        title: text.title ?? text.content ?? '',
        tooltip: isActive,
      }
    },
    beforeUnmount(el) {
      unbind(el)
    },
  })

  const setTheme = (el: HTMLElement, value: string): void => el.setAttribute('data-bs-theme', value)

  nuxtApp.vueApp.directive('b-color-mode', {
    mounted(el, binding: DirectiveBinding): void {
      setTheme(el, binding.value)
    },
    updated(el, binding: DirectiveBinding): void {
      setTheme(el, binding.value)
    },
  })

  nuxtApp.vueApp.directive('b-popover', {
    mounted(el, binding) {
      const isActive = resolveActiveStatus(binding.value)
      if (!isActive)
        return

      const text = resolveContent(binding.value, el)

      if (!text.content && !text.title)
        return

      el.$__state = ref({
        ...resolveDirectiveProps(binding, el),
        ...text,
      })
      bind(el, binding)
    },
    updated(el, binding) {
      const isActive = resolveActiveStatus(binding.value)
      if (!isActive)
        return

      const text = resolveContent(binding.value, el)

      if (!text.content && !text.title)
        return

      if (!el.$__state)
        return
      el.$__state.value = {
        ...resolveDirectiveProps(binding, el),
        ...text,
      }
    },
    beforeUnmount(el) {
      unbind(el)
    },
  })

  function getTargets(binding: DirectiveBinding<string>, el: HTMLElement) {
    const { modifiers, arg, value } = binding
    // Any modifiers are considered target Ids
    const targets = Object.keys(modifiers || {})

    // If value is a string, split out individual targets (if space delimited)
    const localValue = typeof value === 'string' ? value.split(RX_SPACE_SPLIT) : value

    // Support target Id as link href (`href="#id"`)
    if (isTag(el.tagName, 'a')) {
      const href = getAttr(el, 'href') || ''
      if (RX_HASH_ID.test(href))
        targets.push(href.replace(RX_HASH, ''))
    }

    // Add Id from `arg` (if provided), and support value
    // as a single string Id or an array of string Ids
    // If `value` is not an array or string, then it gets filtered out
    Array.prototype.concat
      .apply([], [arg, localValue])
      .forEach(t => typeof t === 'string' && targets.push(t))

    // Return only unique and truthy target Ids
    return targets.filter((t, index, arr) => t && arr.indexOf(t) === index)
  }

  function toggle(binding: DirectiveBinding<string>, el: HTMLElement) {
    const targetIds = getTargets(binding, el)
    targetIds.forEach((targetId) => {
      const target = document.getElementById(targetId)

      if (target !== null)
        target.dispatchEvent(new Event('bv-toggle'))
    })
    setTimeout(() => checkVisibility(binding, el), 50)
  }

  function checkVisibility(binding: DirectiveBinding<string>, el: HTMLElement) {
    const targetIds = getTargets(binding, el)
    let visible = false
    targetIds.forEach((targetId) => {
      const target = document.getElementById(targetId)

      if (target?.classList.contains('show'))
        visible = true

      if (target?.classList.contains('closing'))
        visible = false
    })
    el.setAttribute('aria-expanded', visible ? 'true' : 'false')
  }

  interface WithToggle extends HTMLElement {
    __toggle: () => void
  }

  nuxtApp.vueApp.directive('b-toogle', {
    mounted(el: WithToggle, binding: DirectiveBinding<string>): void {
      el.__toggle = () => toggle(binding, el)
      el.addEventListener('click', el.__toggle)
      checkVisibility(binding, el)
      el.setAttribute('aria-controls', getTargets(binding, el).join(' '))
    },
    unmounted(el: WithToggle): void {
      el.removeEventListener('click', el.__toggle)
      el.removeAttribute('aria-controls')
      el.removeAttribute('aria-expanded')
    },
  })

  nuxtApp.vueApp.directive('b-modal', {
    mounted(el: WithToggle, binding: DirectiveBinding<string>): void {
      el.__toggle = () => toggle(binding, el)
      el.addEventListener('click', el.__toggle)
      checkVisibility(binding, el)
      el.setAttribute('aria-controls', getTargets(binding, el).join(' '))
    },
    unmounted(el: WithToggle): void {
      el.removeEventListener('click', el.__toggle)
      el.removeAttribute('aria-controls')
      el.removeAttribute('aria-expanded')
    },
  })
})
