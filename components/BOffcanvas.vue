<script setup lang="ts">
import { type RendererElement } from 'vue'
import { onKeyStroke, useEventListener, useFocus, useVModel } from '@vueuse/core'

import { BvTriggerableEvent, isEmptySlot } from '@/utils'

import type { ClassValue } from '~/types/ClassValue'
import type { ColorVariant } from '~/types/ColorVariant'

const props = withDefaults(
  defineProps<{
    dismissLabel?: string
    modelValue?: boolean
    bodyScrolling?: boolean
    backdrop?: boolean
    noCloseOnBackdrop?: boolean
    noCloseOnEsc?: boolean
    // TODO standardize this. Create a dedicated type
    // Then in components that use individual props (BImg)
    // Make them just use prop placement
    placement?: 'top' | 'bottom' | 'start' | 'end'
    title?: string
    noHeaderClose?: boolean
    noHeader?: boolean
    lazy?: boolean
    id?: string
    noFocus?: boolean
    backdropVariant?: ColorVariant | null
    headerClass?: ClassValue
    bodyClass?: ClassValue
    footerClass?: ClassValue
    teleportDisabled?: boolean
    teleportTo?: string | RendererElement | null | undefined
    // TODO responsive doesn't work
    // responsive?: Breakpoint
  }>(),
  {
    dismissLabel: 'Close',
    id: undefined,
    title: undefined,
    modelValue: false,
    backdropVariant: 'dark',
    noFocus: false,
    bodyScrolling: false,
    noCloseOnBackdrop: false,
    noCloseOnEsc: false,
    backdrop: true,
    lazy: false,
    placement: 'start',
    noHeaderClose: false,
    noHeader: false,
    headerClass: undefined,
    bodyClass: undefined,
    footerClass: undefined,
    teleportDisabled: false,
    teleportTo: 'body',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'show': [value: BvTriggerableEvent]
  'shown': [value: BvTriggerableEvent]
  'hide': [value: BvTriggerableEvent]
  'hidden': [value: BvTriggerableEvent]
  'hidePrevented': []
  'showPrevented': []
  'esc': [value: BvTriggerableEvent]
  'close': [value: BvTriggerableEvent]
}>()

// TODO once the responsive stuff may be implemented correctly,
// What needs to occur is a fixing of the "body scrolling".
// If the offcanvas is on the screen on a large screen, body scrolling is not disabled
// Even though the modelValue is true
// When it's a small screen and close, it works, as normal,
// But then when it opens up on a small screen, it must disable again
// This is implemented on Layout.vue, but is not officially supported.

defineOptions({
  inheritAttrs: false,
})

const slots = useSlots()

const modelValue = useVModel(props, 'modelValue', emit, { passive: true })

const computedId = useId(() => props.id, 'offcanvas')
useSafeScrollLock(modelValue, props.bodyScrolling)

const element = ref<HTMLElement | null>(null)

onKeyStroke(
  'Escape',
  () => {
    hide('esc')
  },
  { target: element },
)

const { focused } = useFocus(element, {
  initialValue: modelValue.value && props.noFocus === false,
})

const isActive = ref(modelValue.value)
const lazyLoadCompleted = ref(false)

const lazyShowing = computed(
  () =>
    props.lazy === false
    || (props.lazy === true && lazyLoadCompleted.value === true)
    || (props.lazy === true && modelValue.value === true),
)

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

function hide(trigger = '') {
  const event = buildTriggerableEvent('hide', { cancelable: trigger !== '', trigger })

  if (trigger === 'close')
    emit(trigger, event)

  if (trigger === 'esc')
    emit(trigger, event)

  emit('hide', event)

  if (
    event.defaultPrevented
    || (trigger === 'backdrop' && props.noCloseOnBackdrop)
    || (trigger === 'esc' && props.noCloseOnEsc)
  ) {
    emit('hidePrevented')
    return
  }
  modelValue.value = false
}

function show() {
  const event = buildTriggerableEvent('show', { cancelable: true })
  emit('show', event)
  if (event.defaultPrevented) {
    modelValue.value = false
    emit('showPrevented')
    return
  }
  modelValue.value = true
}

function focus() {
  nextTick(() => {
    if (props.noFocus === false)
      focused.value = true
  })
}

const OnBeforeEnter = () => show()
function OnAfterEnter() {
  isActive.value = true
  focus()
  emit('shown', buildTriggerableEvent('shown'))
  if (props.lazy === true)
    lazyLoadCompleted.value = true
}
function onLeave() {
  isActive.value = false
}
function OnAfterLeave() {
  emit('hidden', buildTriggerableEvent('hidden'))
  if (props.lazy === true)
    lazyLoadCompleted.value = false
}
useEventListener(element, 'bv-toggle', () => {
  modelValue.value ? hide() : show()
})

defineExpose({
  hide,
  show,
})
</script>

<template>
  <Teleport :to="teleportTo" :disabled="teleportDisabled">
    <BTransition
      :no-fade="true"
      :trans-props="{
        enterToClass: 'showing',
        enterFromClass: '',
        leaveToClass: 'hiding show',
        leaveFromClass: 'show',
      }"
      @before-enter="OnBeforeEnter"
      @after-enter="OnAfterEnter"
      @leave="onLeave"
      @after-leave="OnAfterLeave"
    >
      <div
        v-show="modelValue"
        :id="computedId"
        ref="element"
        aria-modal="true"
        role="dialog"
        class="offcanvas" :class="[
          `offcanvas-${placement}`,
          {
            show: modelValue && isActive === true,
          },
        ]"
        tabindex="-1"
        :aria-labelledby="`${computedId}-offcanvas-label`"
        data-bs-backdrop="false"
        v-bind="$attrs"
      >
        <template v-if="lazyShowing">
          <div v-if="!noHeader" class="offcanvas-header" :class="headerClass">
            <slot name="header" :visible="modelValue" :placement="placement" :hide="hide">
              <h5 :id="`${computedId}-offcanvas-label`" class="offcanvas-title">
                <slot name="title">
                  {{ title }}
                </slot>
              </h5>
              <BCloseButton
                v-if="!noHeaderClose"
                class="text-reset"
                :aria-label="dismissLabel"
                @click="hide('close')"
              />
            </slot>
          </div>
          <div class="offcanvas-body" :class="bodyClass">
            <slot />
          </div>
          <div v-if="!isEmptySlot(slots.footer)" :class="footerClass">
            <slot name="footer" :visible="modelValue" :placement="placement" :hide="hide" />
          </div>
        </template>
      </div>
    </BTransition>
    <slot name="backdrop">
      <BOverlay
        :variant="backdropVariant"
        :show="backdrop === true && modelValue === true"

        no-wrap no-spinner fixed
        @click="hide('backdrop')"
      />
    </slot>
  </Teleport>
</template>
