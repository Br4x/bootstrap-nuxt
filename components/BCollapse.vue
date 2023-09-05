<script setup lang="ts">
import { useEventListener, useVModel } from '@vueuse/core'
import { BvTriggerableEvent, collapseInjectionKey, getTransitionDelay } from '@/utils'

const props = withDefaults(
  defineProps<{
    // appear?: boolean
    id?: string
    modelValue?: boolean
    tag?: string
    toggle?: boolean
    horizontal?: boolean
    visible?: boolean
    isNav?: boolean
  }>(),
  {
    accordion: undefined,
    id: undefined,
    modelValue: false,
    tag: 'div',
    toggle: false,
    horizontal: false,
    visible: false,
    isNav: false,
  },
)

const emit = defineEmits<{
  'show': [value: BvTriggerableEvent]
  'shown': [value: BvTriggerableEvent]
  'hide': [value: BvTriggerableEvent]
  'hidden': [value: BvTriggerableEvent]
  'hidePrevented': []
  'showPrevented': []
  'update:modelValue': [value: boolean]
}>()

defineOptions({
  inheritAttrs: false,
})

const modelValue = useVModel(props, 'modelValue', emit, { passive: true })

const computedId = useId(() => props.id, 'collapse')

const element = ref<HTMLElement | null>(null)
const isCollapsing = ref(false)
const show = ref(modelValue.value)

function buildTriggerableEvent(type: string,
  opts: Partial<BvTriggerableEvent> = {}): BvTriggerableEvent {
  return new BvTriggerableEvent(type, {
    cancelable: false,
    target: element.value || null,
    relatedTarget: null,
    trigger: null,
    ...opts,
    componentId: computedId.value,
  })
}

function close() {
  modelValue.value = false
}
function open() {
  modelValue.value = true
}
function toggleFn() {
  modelValue.value = !modelValue.value
}

function reveal() {
  show.value = true
  isCollapsing.value = true
  const event = buildTriggerableEvent('show', { cancelable: true })
  emit('show', event)
  if (event.defaultPrevented) {
    emit('showPrevented')
    return
  }
  nextTick(() => {
    if (element.value === null)
      return
    if (props.horizontal)
      element.value.style.width = `${element.value.scrollWidth}px`
    else
      element.value.style.height = `${element.value.scrollHeight}px`

    setTimeout(() => {
      isCollapsing.value = false
      emit('shown', buildTriggerableEvent('shown'))
      if (element.value === null)
        return
      element.value.style.height = ''
      element.value.style.width = ''
    }, getTransitionDelay(element.value))
  })
}

function hide() {
  const event = buildTriggerableEvent('hide', { cancelable: true })
  emit('hide', event)
  if (event.defaultPrevented) {
    emit('hidePrevented')
    return
  }
  if (element.value === null)
    return
  if (props.horizontal)
    element.value.style.width = `${element.value.scrollWidth}px`
  else
    element.value.style.height = `${element.value.scrollHeight}px`

  // element.value.style.height = `${element.value.scrollHeight}px`
  // eslint-disable-next-line no-unused-expressions
  element.value.offsetHeight // force reflow
  isCollapsing.value = true
  nextTick(() => {
    if (element.value === null)
      return
    element.value.style.height = ''
    element.value.style.width = ''
    setTimeout(() => {
      show.value = false
      isCollapsing.value = false
      emit('hidden', buildTriggerableEvent('hidden'))
    }, getTransitionDelay(element.value))
  })
}

watch([modelValue, show], () => {
  if (modelValue.value === true) {
    if (show.value)
      return
    reveal()
    return
  }
  hide()
})

onMounted(() => {
  if (element.value === null)
    return
  if (!modelValue.value && props.toggle) {
    nextTick(() => {
      modelValue.value = true
    })
  }
})

if (props.visible) {
  modelValue.value = true
  show.value = true
}

watch(props.visible, (newval) => {
  newval ? open() : close()
})

useEventListener(element, 'bv-toggle', () => {
  modelValue.value = !modelValue.value
})

defineExpose({
  close,
  open,
  toggle: toggleFn,
  visible: readonly(show),
  isNav: props.isNav,
})

provide(collapseInjectionKey, {
  id: computedId,
  close,
  open,
  toggle: toggleFn,
  visible: readonly(show),
  isNav: readonly(toRef(props, 'isNav')),
})
</script>

<template>
  <slot :id="computedId" name="header" :visible="modelValue" :toggle="toggleFn" :open="open" :close="close" />
  <component
    :is="tag" :id="computedId" ref="element" class="collapse" :class="{
      'show': show,
      'navbar-collapse': props.isNav,
      'collapsing': isCollapsing,
      'closing': show && !modelValue,
      'collapse-horizontal': horizontal,
    }" :is-nav="props.isNav" v-bind="$attrs"
  >
    <slot :visible="modelValue" :toggle="toggle" :open="open" :close="close" />
  </component>
  <slot :id="computedId" name="footer" :visible="modelValue" :toggle="toggleFn" :open="open" :close="close" />
</template>

<style type="scss">
.collapse:not(.show) {
  display: none
}

.collapsing {
  height: 0;
  overflow: hidden;
  transition: height .35s ease
}

@media (prefers-reduced-motion:reduce) {
  .collapsing {
    transition: none
  }
}

.collapsing.collapse-horizontal {
  width: 0;
  height: auto;
  transition: width .35s ease
}

@media (prefers-reduced-motion:reduce) {
  .collapsing.collapse-horizontal {
    transition: none
  }
}
</style>
