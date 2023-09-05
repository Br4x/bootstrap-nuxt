<script setup lang="ts">
import { type RendererElement } from 'vue'
import { onKeyStroke, useEventListener, useFocus, useVModel } from '@vueuse/core'
import { BvTriggerableEvent, isEmptySlot } from '@/utils'

import type { ButtonVariant } from '~/types/ButtonVariant'
import type { ClassValue } from '~/types/ClassValue'
import type { ColorVariant } from '~/types/ColorVariant'
import type { Size } from '~/types/Size'

const props = withDefaults(
  defineProps<{
    bodyBgVariant?: ColorVariant | null
    bodyClass?: ClassValue
    bodyTextVariant?: ColorVariant | null
    busy?: boolean
    lazy?: boolean
    buttonSize?: Size
    cancelDisabled?: boolean
    cancelTitle?: string
    cancelVariant?: ButtonVariant | null
    centered?: boolean
    contentClass?: ClassValue
    dialogClass?: ClassValue
    footerBgVariant?: ColorVariant | null
    footerBorderVariant?: ColorVariant | null
    footerClass?: ClassValue
    footerTextVariant?: ColorVariant | null
    fullscreen?: boolean | string
    headerBgVariant?: ColorVariant | null
    headerBorderVariant?: ColorVariant | null
    headerClass?: ClassValue
    headerCloseLabel?: string
    headerCloseWhite?: boolean
    headerTextVariant?: ColorVariant | null
    hideBackdrop?: boolean
    hideFooter?: boolean
    hideHeader?: boolean
    hideHeaderClose?: boolean
    id?: string
    modalClass?: ClassValue
    modelValue?: boolean
    noCloseOnBackdrop?: boolean
    noCloseOnEsc?: boolean
    noFade?: boolean
    autoFocus?: boolean
    okDisabled?: boolean
    okOnly?: boolean
    okTitle?: string
    okVariant?: ButtonVariant | null
    scrollable?: boolean
    show?: boolean
    size?: Size | 'xl'
    title?: string
    titleClass?: ClassValue
    titleSrOnly?: boolean
    titleTag?: string
    autoFocusButton?: 'ok' | 'cancel' | 'close'
    teleportDisabled?: boolean
    teleportTo?: string | RendererElement | null | undefined
    bodyScrolling?: boolean
    backdropVariant?: ColorVariant | null
  }>(),
  {
    backdropVariant: undefined,
    bodyBgVariant: null,
    bodyClass: undefined,
    bodyTextVariant: null,
    contentClass: undefined,
    headerTextVariant: null,
    dialogClass: undefined,
    headerBgVariant: null,
    headerBorderVariant: null,
    headerClass: undefined,
    footerBgVariant: null,
    footerBorderVariant: null,
    footerClass: undefined,
    footerTextVariant: null,
    autoFocusButton: undefined,
    titleClass: undefined,
    title: undefined,
    size: 'md',
    modalClass: undefined,
    id: undefined,
    busy: false,
    lazy: false,
    buttonSize: 'md',
    cancelDisabled: false,
    cancelTitle: 'Cancel',
    cancelVariant: 'secondary',
    centered: false,
    fullscreen: false,
    headerCloseLabel: 'Close',
    headerCloseWhite: false,
    hideBackdrop: false,
    hideFooter: false,
    hideHeader: false,
    hideHeaderClose: false,
    modelValue: false,
    noCloseOnBackdrop: false,
    noCloseOnEsc: false,
    noFade: false,
    autoFocus: true,
    okDisabled: false,
    okOnly: false,
    okTitle: 'Ok',
    okVariant: 'primary',
    scrollable: false,
    show: false,
    titleSrOnly: false,
    titleTag: 'h5',
    teleportDisabled: false,
    teleportTo: 'body',
    bodyScrolling: false,
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
  'ok': [value: BvTriggerableEvent]
  'cancel': [value: BvTriggerableEvent]
  'close': [value: BvTriggerableEvent]
}>()

defineOptions({
  inheritAttrs: false,
})

const slots = useSlots()

const computedId = useId(() => props.id, 'modal')

const modelValue = useVModel(props, 'modelValue', emit)

const element = ref<HTMLElement | null>(null)
const okButton = ref<HTMLElement | null>(null)
const cancelButton = ref<HTMLElement | null>(null)
const closeButton = ref<HTMLElement | null>(null)
const isActive = ref(modelValue.value)
const lazyLoadCompleted = ref(false)

onKeyStroke(
  'Escape',
  () => {
    hide('esc')
  },
  { target: element },
)

useSafeScrollLock(modelValue, props.bodyScrolling)

const { focused: modalFocus } = useFocus(element, {
  initialValue: modelValue.value && props.autoFocusButton === undefined,
})
const { focused: okButtonFocus } = useFocus(okButton, {
  initialValue: modelValue.value && props.autoFocusButton === 'ok',
})
const { focused: cancelButtonFocus } = useFocus(cancelButton, {
  initialValue: modelValue.value && props.autoFocusButton === 'cancel',
})
const { focused: closeButtonFocus } = useFocus(closeButton, {
  initialValue: modelValue.value && props.autoFocusButton === 'close',
})

const lazyShowing = computed(
  () =>
    props.lazy === false
    || (props.lazy === true && lazyLoadCompleted.value === true)
    || (props.lazy === true && modelValue.value === true),
)

const computedBackdropVariant = computed(() =>
  props.backdropVariant !== undefined
    ? props.backdropVariant
    : props.hideBackdrop
      ? 'transparent'
      : 'dark',
)

const hasHeaderCloseSlot = computed(() => !isEmptySlot(slots['header-close']))

const disableCancel = computed<boolean>(() => props.cancelDisabled || props.busy)
const disableOk = computed<boolean>(() => props.okDisabled || props.busy)

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

  if (trigger === 'ok')
    emit(trigger, event)

  if (trigger === 'cancel')
    emit(trigger, event)

  if (trigger === 'close')
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

// TODO: If a show is prevented, it will briefly show the animation. This is a bug
// I'm not sure how to wait for the event to be determined. Before showing
function showFn() {
  const event = buildTriggerableEvent('show', { cancelable: true })
  emit('show', event)
  if (event.defaultPrevented) {
    modelValue.value = false
    emit('showPrevented')
    return
  }
  modelValue.value = true
}

function pickFocusItem() {
  if (props.autoFocus === false)
    return
  props.autoFocusButton === 'ok'
    ? (okButtonFocus.value = true)
    : props.autoFocusButton === 'close'
      ? (closeButtonFocus.value = true)
      : props.autoFocusButton === 'cancel'
        ? (cancelButtonFocus.value = true)
        : (modalFocus.value = true)
}

const onBeforeEnter = () => showFn()
function onAfterEnter() {
  isActive.value = true
  pickFocusItem()
  emit('shown', buildTriggerableEvent('shown'))
  if (props.lazy === true)
    lazyLoadCompleted.value = true
}
function onLeave() {
  isActive.value = false
}
function onAfterLeave() {
  emit('hidden', buildTriggerableEvent('hidden'))
  if (props.lazy === true)
    lazyLoadCompleted.value = false
}

useModalManager(isActive)

useEventListener(element, 'bv-toggle', () => {
  modelValue.value ? hide() : showFn()
})

defineExpose({
  hide,
  show: showFn,
})
</script>

<template>
  <Teleport :to="teleportTo" :disabled="teleportDisabled">
    <BTransition
      :no-fade="true"
      :trans-props="{ enterToClass: 'show' }"
      @before-enter="onBeforeEnter"
      @after-enter="onAfterEnter"
      @leave="onLeave"
      @after-leave="onAfterLeave"
    >
      <div
        v-show="modelValue"
        :id="computedId"
        ref="element"
        class="modal"
        :class="[
          modalClass,
          {
            fade: !noFade,
            show: isActive,
          },
        ]"
        role="dialog"
        :aria-labelledby="`${computedId}-label`"
        :aria-describedby="`${computedId}-body`"
        tabindex="-1"
        v-bind="$attrs"
      >
        <div
          class="modal-dialog" :class="[
            dialogClass,
            {
              'modal-fullscreen': fullscreen === true,
              [`modal-fullscreen-${fullscreen}-down`]: typeof fullscreen === 'string',
              [`modal-${size}`]: size !== 'md',
              'modal-dialog-centered': centered,
              'modal-dialog-scrollable': scrollable,
            },
          ]"
        >
          <div v-if="lazyShowing" class="modal-content" :class="contentClass">
            <div
              v-if="!hideHeader" class="modal-header" :class="[
                headerClass,
                {
                  [`bg-${headerBgVariant}`]: headerBgVariant !== null,
                  [`border-${headerBorderVariant}`]: headerBorderVariant !== null,
                  [`text-${headerTextVariant}`]: headerTextVariant !== null,
                },
              ]"
            >
              <slot name="header">
                <component
                  :is="titleTag"
                  :id="`${computedId}-label`"
                  class="modal-title"
                  :class="[
                    titleClass,
                    {
                      'visually-hidden': titleSrOnly,
                    },
                  ]"
                >
                  <slot name="title">
                    {{ title }}
                  </slot>
                </component>
                <template v-if="!hideHeaderClose">
                  <button v-if="hasHeaderCloseSlot" type="button" @click="hide('close')">
                    <slot name="header-close" />
                  </button>
                  <BCloseButton
                    v-else
                    ref="closeButton"
                    :aria-label="headerCloseLabel"
                    :white="headerCloseWhite"
                    @click="hide('close')"
                  />
                </template>
              </slot>
            </div>
            <div
              :id="`${computedId}-body`" class="modal-body" :class="[
                bodyClass,
                {
                  [`bg-${bodyBgVariant}`]: bodyBgVariant !== null,
                  [`text-${bodyTextVariant}`]: bodyTextVariant !== null,
                },
              ]"
            >
              <slot />
            </div>
            <div
              v-if="!hideFooter" class="modal-footer" :class="[
                footerClass,
                {
                  [`bg-${footerBgVariant}`]: footerBgVariant !== null,
                  [`border-${footerBorderVariant}`]: footerBorderVariant !== null,
                  [`text-${footerTextVariant}`]: footerTextVariant !== null,
                },
              ]"
            >
              <slot name="footer">
                <slot name="cancel">
                  <BButton
                    v-if="!okOnly"
                    ref="cancelButton"
                    :disabled="disableCancel"
                    :size="buttonSize"
                    :variant="cancelVariant"
                    @click="hide('cancel')"
                  >
                    {{ cancelTitle }}
                  </BButton>
                </slot>
                <slot name="ok">
                  <BButton
                    ref="okButton"
                    :disabled="disableOk"
                    :size="buttonSize"
                    :variant="okVariant"
                    @click="hide('ok')"
                  >
                    {{ okTitle }}
                  </BButton>
                </slot>
              </slot>
            </div>
          </div>
        </div>
        <slot name="backdrop">
          <BOverlay
            :variant="computedBackdropVariant"
            :show="modelValue"

            no-spinner no-wrap fixed
            blur="0px"
            @click="hide('backdrop')"
          />
        </slot>
      </div>
    </BTransition>
  </Teleport>
</template>

<style lang="scss" scoped>
.modal {
  display: block;
}
.modal-dialog {
  z-index: 1051;
}
</style>
