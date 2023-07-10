<script setup>
import { useCurrentElement } from '@vueuse/core'

const props = defineProps({
  justify: Boolean,
  keyNav: Boolean,
})

const { attemptFocus, contains, isVisible, selectAll } = useUtils()

const items = ref([])
const $el = useCurrentElement()

onMounted(() => {
  if (props.keyNav)
    getItems()
})

function getItems() {
  const itemElements = selectAll([
    '.btn:not(.disabled):not([disabled]):not(.dropdown-item)',
    '.form-control:not(.disabled):not([disabled])',
    'select:not(.disabled):not([disabled])',
    'input[type="checkbox"]:not(.disabled)',
    'input[type="radio"]:not(.disabled)',
  ].join(','), $el.value)
  itemElements.forEach((item) => {
    item.tabIndex = -1
  })
  items.value = itemElements.filter(el => isVisible(el))
}

function focusFirst() {
  const firstItem = items.value[0]
  attemptFocus(firstItem)
}

function focusPrev(event) {
  const index = items.value.indexOf(event.target)
  if (index > -1) {
    const prevItems = items.value.slice(0, index).reverse()
    attemptFocus(prevItems[0])
  }
}

function focusNext(event) {
  const index = items.value.indexOf(event.target)
  if (index > -1) {
    const nextItems = items.value.slice(index + 1)
    attemptFocus(nextItems[0])
  }
}

function focusLast() {
  const lastItem = items.value.reverse()[0]
  attemptFocus(lastItem)
}

function onFocusin(event) {
  if (event.target === $el.value && !contains($el.value, event.relatedTarget)) {
    event.stopPropagation()
    focusFirst()
  }
}

function onKeydown(event) {
  const { keyCode, shiftKey } = event
  if (keyCode === CODE_UP || keyCode === CODE_LEFT) {
    event.stopPropagation()
    shiftKey ? focusFirst() : focusPrev(event)
  }
  else if (keyCode === CODE_DOWN || keyCode === CODE_RIGHT) {
    event.stopPropagation()
    shiftKey ? focusLast() : focusNext(event)
  }
}
</script>

<template>
  <div
    class="btn-toolbar flex flex-wrap justify-start"
    :class="{ 'justify-content-between justify-between': justify }"
    role="toolbar"
    :tabindex="keyNav ? '0' : null"
    @focusin="onFocusin"
    @keydown="onKeydown"
  >
    <slot />
  </div>
</template>
