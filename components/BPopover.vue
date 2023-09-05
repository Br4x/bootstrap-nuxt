<script setup lang="ts">
import {
  type Alignment,
  type Middleware,
  type Placement as OriginalPlacement,
  type Strategy,
  arrow as arrowMiddleware,
  autoPlacement,
  autoUpdate,
  flip,
  hide as hideMiddleware,
  inline as inlineMiddleware,
  offset as offsetMiddleware,
  shift,
  useFloating,
} from '@floating-ui/vue'
import { onClickOutside, useMouseInElement, useToNumber } from '@vueuse/core'
import { type CSSProperties } from 'vue'
import { DefaultAllowlist, sanitizeHtml } from '../utils/sanitizer'
import {
  BvTriggerableEvent,
  IS_BROWSER,
  getTransitionDelay,
  resolveBootstrapPlacement,
} from '../utils'

import RenderComponentOrSkip from './RenderComponentOrSkip.vue'

import type { BPopoverPlacement } from '~/types/BPopoverPlacement'
import type { ClassValue } from '~/types/ClassValue'
import type { ColorVariant } from '~/types/ColorVariant'

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    container?: string | ComponentPublicInstance<HTMLElement> | HTMLElement | undefined
    target?:
    | (() => HTMLElement | VNode)
    | string
    | ComponentPublicInstance<HTMLElement>
    | HTMLSpanElement
    | HTMLElement
    | null
    reference?:
    | (() => HTMLElement | VNode)
    | string
    | ComponentPublicInstance<HTMLElement>
    | HTMLSpanElement
    | HTMLElement
    | null
    content?: string
    id?: string
    title?: string
    delay?:
    | number
    | {
      show: number
      hide: number
    }
    click?: boolean
    manual?: boolean
    variant?: ColorVariant | null
    offset?: number | string | null
    customClass?: ClassValue
    placement?: BPopoverPlacement
    strategy?: Strategy
    floatingMiddleware?: Middleware[]
    noFlip?: boolean
    noShift?: boolean
    noFade?: boolean
    noAutoClose?: boolean
    hide?: boolean
    realtime?: boolean
    inline?: boolean
    tooltip?: boolean
    html?: boolean
  }>(),
  {
    floatingMiddleware: undefined,
    title: undefined,
    id: undefined,
    content: undefined,
    modelValue: false,
    container: undefined,
    customClass: '',
    placement: 'top',
    strategy: 'absolute',
    delay: () => ({ show: 100, hide: 300 }),
    click: false,
    manual: false,
    variant: null,
    offset: null,
    noFlip: false,
    noShift: false,
    noFade: false,
    noAutoClose: false,
    hide: true,
    realtime: false,
    inline: false,
    tooltip: false,
    html: false,
    reference: null,
    target: null,
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

const showState = ref(props.modelValue)
const showStateInternal = ref(props.modelValue)
watchEffect(() => {
  emit('update:modelValue', showState.value)
})

watch(showState, () => {
  if (props.modelValue === showState.value)
    return
  props.modelValue ? show() : hideFn(new Event('update:modelValue'))
})

const computedId = useId(() => props.id, 'popover')

const hidden = ref(false)

const element = ref<HTMLElement | null>(null)
const targetTrigger = ref<HTMLElement | null>(null)
const arrow = ref<HTMLElement | null>(null)
const trigger = ref<HTMLElement | null>(null)
const placeholder = ref<HTMLElement | null>(null)

function cleanElementProp(target:
| (() => HTMLElement | VNode)
| string
| ComponentPublicInstance<HTMLElement>
| HTMLElement
| undefined): HTMLElement | string | undefined {
  if (typeof target === 'string')
    return target

  if (target instanceof HTMLElement)
    return target

  if (typeof target === 'function') {
    return (target() as ComponentPublicInstance<HTMLElement>).$el
      ? (target() as ComponentPublicInstance<HTMLElement>).$el
      : target()
  }
  if (typeof target !== 'undefined')
    return (target as ComponentPublicInstance<HTMLElement>).$el as HTMLElement
  return undefined
}

function getElement(element: HTMLElement | string | undefined): HTMLElement | undefined {
  if (!element)
    return undefined
  if (typeof element === 'string') {
    const idElement = document.getElementById(element)
    return idElement || undefined
  }
  return element
}

const sanitizedTitle = computed(() =>
  props.title ? sanitizeHtml(props.title, DefaultAllowlist) : '',
)

const sanitizedContent = computed(() =>
  props.content ? sanitizeHtml(props.content, DefaultAllowlist) : '',
)
const isAutoPlacement = computed(() => props.placement.startsWith('auto'))
const offsetNumber = useToNumber(computed(() => props.offset ?? NaN))

const floatingMiddleware = computed<Middleware[]>(() => {
  if (props.floatingMiddleware !== undefined)
    return props.floatingMiddleware

  const off = props.offset !== null ? offsetNumber.value : props.tooltip ? 0 : 10
  const arr: Middleware[] = [offsetMiddleware(off)]
  if (props.noFlip === false && !isAutoPlacement.value)
    arr.push(flip())

  if (isAutoPlacement.value) {
    arr.push(
      autoPlacement({
        alignment: (props.placement.split('-')[1] as Alignment) || undefined,
      }),
    )
  }
  if (props.noShift === false)
    arr.push(shift())

  if (props.hide === true)
    arr.push(hideMiddleware({ padding: 10 }))

  if (props.inline === true)
    arr.push(inlineMiddleware())

  arr.push(arrowMiddleware({ element: arrow, padding: 10 }))
  return arr
})

const placementRef = computed(() =>
  isAutoPlacement.value ? undefined : (props.placement as OriginalPlacement),
)

const { x, y, strategy, middlewareData, placement, update } = useFloating(targetTrigger, element, {
  placement: placementRef,
  middleware: floatingMiddleware,
  strategy: toRef(props, 'strategy'),
  whileElementsMounted: (...args) => {
    const cleanup = autoUpdate(...args, { animationFrame: props.realtime })
    // Important! Always return the cleanup function.
    return cleanup
  },
})

const arrowStyle = ref<CSSProperties>({ position: 'absolute' })

watch(middlewareData, () => {
  if (props.hide === true) {
    if (middlewareData.value.hide?.referenceHidden)
      hidden.value = true
    else
      hidden.value = false
  }
  if (middlewareData.value.arrow) {
    const { x, y } = middlewareData.value.arrow
    arrowStyle.value = {
      position: 'absolute',
      top: y ? `${y}px` : '',
      left: x ? `${x}px` : '',
    }
  }
})

const computedClasses = computed(() => {
  const type = props.tooltip ? 'tooltip' : 'popover'
  return [
    type,
    `b-${type}`,
    {
      [`b-${type}-${props.variant}`]: props.variant !== null,
      'show': showState.value && !hidden.value,
      'pe-none': !showState.value,
      'fade': !props.noFade,
      'd-none': !showState.value && props.noFade,
      [`${props.customClass}`]: props.customClass !== undefined,
      [`bs-${type}-${resolveBootstrapPlacement(placement.value)}`]: placement.value !== undefined,
    },
  ]
})

const { isOutside } = useMouseInElement(element)
const { isOutside: triggerIsOutside } = useMouseInElement(trigger)

function toggle(e: Event) {
  const event = e ?? new Event('click')
  showState.value ? hideFn(event) : show()
}

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

function show() {
  const event = buildTriggerableEvent('show', { cancelable: true })
  emit('show', event)
  if (event.defaultPrevented) {
    emit('showPrevented')
    return
  }
  showStateInternal.value = true
  nextTick(() => {
    update()
    setTimeout(
      () => {
        update()
        showState.value = true
        nextTick(() => {
          emit('shown', buildTriggerableEvent('shown'))
        })
      },
      typeof props.delay === 'number' ? props.delay : props.delay?.show || 0,
    )
  })
}

function hideFn(e: Event) {
  const event = buildTriggerableEvent('hide', { cancelable: true })
  emit('hide', event)
  if (event.defaultPrevented) {
    emit('hidePrevented')
    return
  }
  const delay = typeof props.delay === 'number' ? props.delay : props.delay?.hide || 100
  setTimeout(() => {
    if (
      e?.type === 'click'
      || (e?.type === 'update:modelValue' && props.manual)
      || (isOutside.value
        && triggerIsOutside.value
        && !element.value?.contains(document?.activeElement))
    ) {
      showState.value = false
      nextTick(() => {
        setTimeout(
          () => {
            showStateInternal.value = false
          },
          element.value ? getTransitionDelay(element.value) : 150,
        )
        emit('hidden', buildTriggerableEvent('hidden'))
      })
    }
    else {
      setTimeout(() => {
        hideFn(e)
      }, delay)
    }
  }, delay)
}

defineExpose({
  hideFn,
  show,
  toggle,
})

function bind() {
  // TODO: is this the best way to bind the events?
  // we place a span and get the next element sibling fo rthe listeners
  if (props.target) {
    const elem = getElement(cleanElementProp(props.target))
    if (elem)
      trigger.value = elem

    else

      console.warn('Target element not found', props.target)
  }
  else {
    trigger.value = placeholder.value?.nextElementSibling as HTMLElement
  }
  if (props.reference) {
    const elem = getElement(cleanElementProp(props.reference))
    if (elem)
      targetTrigger.value = elem

    else

      console.warn('Reference element not found', props.reference)
  }
  else {
    targetTrigger.value = trigger.value
  }
  if (!trigger.value || props.manual)
    return

  if (!IS_BROWSER)
    return
  props.click && trigger.value.addEventListener('click', toggle)
  !props.click && trigger.value.addEventListener('pointerenter', show)
  !props.click && trigger.value.addEventListener('pointerleave', hideFn)
  !props.click && trigger.value.addEventListener('focus', show)
  !props.click && trigger.value.addEventListener('blur', hideFn)
}

function unbind() {
  if (trigger.value) {
    trigger.value.removeEventListener('click', toggle)
    trigger.value.removeEventListener('pointerenter', show)
    trigger.value.removeEventListener('pointerleave', hideFn)
    trigger.value.removeEventListener('focus', show)
    trigger.value.removeEventListener('blur', hideFn)
  }
}

onClickOutside(
  element,
  () => {
    if (showState.value && props.click && !props.noAutoClose && !props.manual)
      hideFn(new Event('clickOutside'))
  },
  { ignore: [trigger] },
)

watch([() => props.click, () => props.target, () => props.reference], () => {
  unbind()
  bind()
})

onMounted(bind)

onBeforeUnmount(unbind)
</script>

<template>
  <span ref="placeholder" />
  <slot name="target" :show="show" :hide="hideFn" :toggle="toggle" :show-state="showState" />
  <!-- TODO: fix this clunky solution when https://github.com/vuejs/core/issues/6152 is fixed -->
  <RenderComponentOrSkip tag="Teleport" :to="container" :skip="!container">
    <div
      v-if="showStateInternal"
      :id="id"
      v-bind="$attrs"
      ref="element"
      :class="computedClasses"
      role="tooltip"
      tabindex="-1"
      :style="{
        position: strategy,
        top: `${y}px`,
        left: `${x}px`,
        width: 'max-content',
      }"
    >
      <div
        ref="arrow"
        :class="`${tooltip ? 'tooltip' : 'popover'}-arrow`"
        :style="arrowStyle"
        data-popper-arrow
      />
      <template v-if="title || $slots.title">
        <div v-if="!html" :class="tooltip ? 'tooltip-inner' : 'popover-header'">
          <slot name="title">
            {{ title }}
          </slot>
        </div>
        <div
          v-else
          :class="tooltip ? 'tooltip-inner' : 'popover-header'"
          v-html="sanitizedTitle"
        />
      </template>
      <template v-if="(tooltip && !$slots.title && !title) || !tooltip">
        <div v-if="!html" :class="tooltip ? 'tooltip-inner' : 'popover-body'">
          <slot>
            {{ content }}
          </slot>
        </div>
        <div
          v-else
          :class="tooltip ? 'tooltip-inner' : 'popover-body'"
          v-html="sanitizedContent"
        />
      </template>
    </div>
  </RenderComponentOrSkip>
</template>
