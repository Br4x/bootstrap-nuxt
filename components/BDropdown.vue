<script setup lang="ts">
import {
  type Middleware,
  type Strategy,
  autoUpdate,
  flip,
  offset as floatingOffset,
  shift,
  useFloating,
} from '@floating-ui/vue'
import { onClickOutside, onKeyStroke, useToNumber, useVModel } from '@vueuse/core'
import type { RouteLocationRaw } from 'vue-router'
import { BvEvent, dropdownInjectionKey, resolveFloatingPlacement } from '@/utils'

import type { ButtonType } from '~/types/ButtonType'
import type { ButtonVariant } from '~/types/ButtonVariant'
import type { ClassValue } from '~/types/ClassValue'
import type { Size } from '~/types/Size'

// TODO add navigation through keyboard events
// TODO standardize keydown vs keyup events globally

const props = withDefaults(
  defineProps<{
    ariaLabel?: string
    id?: string
    menuClass?: ClassValue
    size?: Size
    splitClass?: ClassValue
    splitVariant?: ButtonVariant | null
    text?: string
    toggleClass?: ClassValue
    autoClose?: boolean | 'inside' | 'outside'
    block?: boolean
    disabled?: boolean
    isNav?: boolean
    dropup?: boolean
    dropend?: boolean
    dropstart?: boolean
    center?: boolean
    end?: boolean
    noFlip?: boolean
    noShift?: boolean
    offset?:
    | number
    | string
    | { mainAxis?: number; crossAxis?: number; alignmentAxis?: number | null }
    role?: string
    split?: boolean
    splitButtonType?: ButtonType
    splitHref?: string
    splitDisabled?: boolean
    noCaret?: boolean
    toggleText?: string
    variant?: ButtonVariant | null
    modelValue?: boolean
    lazy?: boolean
    strategy?: Strategy
    floatingMiddleware?: Middleware[]
    splitTo?: RouteLocationRaw
  }>(),
  {
    ariaLabel: undefined,
    id: undefined,
    menuClass: undefined,
    size: 'md',
    splitClass: undefined,
    splitVariant: undefined,
    text: undefined,
    toggleClass: undefined,
    splitTo: undefined,
    floatingMiddleware: undefined,
    splitDisabled: undefined,
    autoClose: true,
    block: false,
    disabled: false,
    dropup: false,
    isNav: false,
    dropend: false,
    dropstart: false,
    end: false,
    center: false,
    lazy: false,
    noFlip: false,
    noShift: false,
    offset: 0,
    role: 'menu',
    split: false,
    splitButtonType: 'button',
    splitHref: undefined,
    noCaret: false,
    toggleText: 'Toggle dropdown',
    variant: 'secondary',
    modelValue: false,
    strategy: 'absolute',
  },
)

const emit = defineEmits<{
  'show': [value: BvEvent]
  'shown': []
  'hide': [value: BvEvent]
  'hidden': []
  'hidePrevented': []
  'showPrevented': []
  'click': [event: MouseEvent]
  'toggle': []
  'update:modelValue': [value: boolean]
}>()

const computedId = useId(() => props.id, 'dropdown')

const modelValue = useVModel(props, 'modelValue', emit, { passive: true })

const computedOffset = computed(() =>
  typeof props.offset === 'string' || typeof props.offset === 'number' ? props.offset : NaN,
)
const offsetToNumber = useToNumber(computedOffset)

const floating = ref<HTMLElement | null>(null)
const button = ref<HTMLElement | null>(null)
const splitButton = ref<HTMLElement | null>(null)

onKeyStroke(
  'Escape',
  () => {
    modelValue.value = !modelValue
  },
  { target: splitButton },
)

const referencePlacement = computed(() => (!props.split ? splitButton.value : button.value))
const floatingPlacement = computed(() =>
  resolveFloatingPlacement({
    top: props.dropup,
    start: props.dropstart,
    end: props.dropend,
    alignCenter: props.center,
    alignEnd: props.end,
  }),
)
const floatingMiddleware = computed<Middleware[]>(() => {
  if (props.floatingMiddleware !== undefined)
    return props.floatingMiddleware

  const localOffset
    = typeof props.offset === 'string' || typeof props.offset === 'number'
      ? offsetToNumber.value
      : props.offset
  const arr: Middleware[] = [floatingOffset(localOffset)]
  if (props.noFlip === false)
    arr.push(flip())

  if (props.noShift === false)
    arr.push(shift())

  return arr
})
const { x, y, strategy, update } = useFloating(referencePlacement, floating, {
  placement: floatingPlacement,
  middleware: floatingMiddleware,
  strategy: toRef(props, 'strategy'),
  whileElementsMounted: autoUpdate,
})

function onButtonClick() {
  emit('toggle')
  const currentModelValue = modelValue.value
  const e = new BvEvent(currentModelValue ? 'hide' : 'show')
  currentModelValue ? emit('hide', e) : emit('show', e)
  if (e.defaultPrevented) {
    currentModelValue ? emit('hidePrevented') : emit('showPrevented')
    return
  }
  modelValue.value = !currentModelValue
  currentModelValue ? emit('hidden') : emit('shown')
}

function onSplitClick(event: MouseEvent) {
  props.split ? emit('click', event) : onButtonClick()
}

onClickOutside(
  floating,
  () => {
    if (modelValue.value && (props.autoClose === true || props.autoClose === 'outside'))
      toggle()
  },
  { ignore: [button, splitButton] },
)
function onClickInside() {
  if (modelValue.value && (props.autoClose === true || props.autoClose === 'inside'))
    toggle()
}

function close() {
  modelValue.value = false
}
function open() {
  modelValue.value = true
}
function toggle() {
  modelValue.value = !modelValue.value
}

watch(modelValue, update)

defineExpose({
  close,
  open,
  toggle,
})

provide(dropdownInjectionKey, {
  id: computedId,
  open,
  close,
  toggle,
  visible: modelValue,
  isNav: props.isNav,
})
</script>

<template>
  <div
    :class="{
      'd-grid': block,
      'dropup': props.dropup,
      'dropend': props.dropend,
      'dropstart': props.dropstart,
      'd-flex': block && props.split,
    }" class="btn-group"
  >
    <BButton
      :id="computedId" ref="splitButton" :variant="splitVariant || variant" :size="size" :class="[
        split ? splitClass : toggleClass,
        {
          'nav-link': props.isNav,
          'dropdown-toggle': !split,
          'dropdown-toggle-no-caret': noCaret && !split,
          'w-100': split && block,
          'show': split ? undefined : modelValue,
        },
      ]" :disabled="props.splitDisabled || disabled" :type="splitButtonType" :aria-label="ariaLabel"
      :aria-expanded="props.split ? undefined : modelValue" :aria-haspopup="props.split ? undefined : 'menu'"
      :href="props.split ? splitHref : undefined" :to="props.split && splitTo ? splitTo : undefined"
      @click="onSplitClick"
    >
      <slot name="button-content">
        {{ text }}
      </slot>
    </BButton>
    <BButton
      v-if="props.split" ref="button" :variant="variant" :size="size" :disabled="disabled"
      :class="[toggleClass, ...[modelValue ? 'show' : undefined]]" class="dropdown-toggle-split dropdown-toggle"
      :aria-expanded="modelValue" aria-haspopup="menu" @click="onButtonClick"
    >
      <span class="visually-hidden">
        <slot name="toggle-text">
          {{ toggleText }}
        </slot>
      </span>
    </BButton>
  </div>
  <ul
    v-if="!props.lazy || modelValue" v-show="props.lazy || modelValue" ref="floating" :style="{
      position: strategy === 'absolute' ? undefined : 'fixed',
      top: `${y}px`,
      left: `${x}px`,
      width: 'max-content',
    }" class="dropdown-menu show" :class="menuClass" :aria-labelledby="computedId" :role="role" @click="onClickInside"
  >
    <slot />
  </ul>
</template>

<style lang="scss" scoped>
.dropdown-toggle.dropdown-toggle-no-caret:before,
.dropdown-toggle.dropdown-toggle-no-caret:after {
  display: none !important;
}

.dropdown,
.dropdown-center,
.dropend,
.dropstart,
.dropup,
.dropup-center {
  position: relative
}

.dropdown-toggle {
  white-space: nowrap
}

.dropdown-toggle::after {
  display: inline-block;
  margin-left: .255em;
  vertical-align: .255em;
  content: "";
  border-top: .3em solid;
  border-right: .3em solid transparent;
  border-bottom: 0;
  border-left: .3em solid transparent
}

.dropdown-toggle:empty::after {
  margin-left: 0
}

.dropdown-menu {
  --bs-dropdown-zindex: 1000;
  --bs-dropdown-min-width: 10rem;
  --bs-dropdown-padding-x: 0;
  --bs-dropdown-padding-y: 0.5rem;
  --bs-dropdown-spacer: 0.125rem;
  --bs-dropdown-font-size: 1rem;
  --bs-dropdown-color: var(--bs-body-color);
  --bs-dropdown-bg: var(--bs-body-bg);
  --bs-dropdown-border-color: var(--bs-border-color-translucent);
  --bs-dropdown-border-radius: var(--bs-border-radius);
  --bs-dropdown-border-width: var(--bs-border-width);
  --bs-dropdown-inner-border-radius: calc(var(--bs-border-radius) - var(--bs-border-width));
  --bs-dropdown-divider-bg: var(--bs-border-color-translucent);
  --bs-dropdown-divider-margin-y: 0.5rem;
  --bs-dropdown-box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  --bs-dropdown-link-color: var(--bs-body-color);
  --bs-dropdown-link-hover-color: var(--bs-body-color);
  --bs-dropdown-link-hover-bg: var(--bs-tertiary-bg);
  --bs-dropdown-link-active-color: #fff;
  --bs-dropdown-link-active-bg: #0d6efd;
  --bs-dropdown-link-disabled-color: var(--bs-tertiary-color);
  --bs-dropdown-item-padding-x: 1rem;
  --bs-dropdown-item-padding-y: 0.25rem;
  --bs-dropdown-header-color: #6c757d;
  --bs-dropdown-header-padding-x: 1rem;
  --bs-dropdown-header-padding-y: 0.5rem;
  position: absolute;
  z-index: var(--bs-dropdown-zindex);
  display: none;
  min-width: var(--bs-dropdown-min-width);
  padding: var(--bs-dropdown-padding-y) var(--bs-dropdown-padding-x);
  margin: 0;
  font-size: var(--bs-dropdown-font-size);
  color: var(--bs-dropdown-color);
  text-align: left;
  list-style: none;
  background-color: var(--bs-dropdown-bg);
  background-clip: padding-box;
  border: var(--bs-dropdown-border-width) solid var(--bs-dropdown-border-color);
  border-radius: var(--bs-dropdown-border-radius)
}

.dropdown-menu[data-bs-popper] {
  top: 100%;
  left: 0;
  margin-top: var(--bs-dropdown-spacer)
}

.dropdown-menu-start {
  --bs-position: start
}

.dropdown-menu-start[data-bs-popper] {
  right: auto;
  left: 0
}

.dropdown-menu-end {
  --bs-position: end
}

.dropdown-menu-end[data-bs-popper] {
  right: 0;
  left: auto
}

@media (min-width:576px) {
  .dropdown-menu-sm-start {
    --bs-position: start
  }

  .dropdown-menu-sm-start[data-bs-popper] {
    right: auto;
    left: 0
  }

  .dropdown-menu-sm-end {
    --bs-position: end
  }

  .dropdown-menu-sm-end[data-bs-popper] {
    right: 0;
    left: auto
  }
}

@media (min-width:768px) {
  .dropdown-menu-md-start {
    --bs-position: start
  }

  .dropdown-menu-md-start[data-bs-popper] {
    right: auto;
    left: 0
  }

  .dropdown-menu-md-end {
    --bs-position: end
  }

  .dropdown-menu-md-end[data-bs-popper] {
    right: 0;
    left: auto
  }
}

@media (min-width:992px) {
  .dropdown-menu-lg-start {
    --bs-position: start
  }

  .dropdown-menu-lg-start[data-bs-popper] {
    right: auto;
    left: 0
  }

  .dropdown-menu-lg-end {
    --bs-position: end
  }

  .dropdown-menu-lg-end[data-bs-popper] {
    right: 0;
    left: auto
  }
}

@media (min-width:1200px) {
  .dropdown-menu-xl-start {
    --bs-position: start
  }

  .dropdown-menu-xl-start[data-bs-popper] {
    right: auto;
    left: 0
  }

  .dropdown-menu-xl-end {
    --bs-position: end
  }

  .dropdown-menu-xl-end[data-bs-popper] {
    right: 0;
    left: auto
  }
}

@media (min-width:1400px) {
  .dropdown-menu-xxl-start {
    --bs-position: start
  }

  .dropdown-menu-xxl-start[data-bs-popper] {
    right: auto;
    left: 0
  }

  .dropdown-menu-xxl-end {
    --bs-position: end
  }

  .dropdown-menu-xxl-end[data-bs-popper] {
    right: 0;
    left: auto
  }
}

.dropup .dropdown-menu[data-bs-popper] {
  top: auto;
  bottom: 100%;
  margin-top: 0;
  margin-bottom: var(--bs-dropdown-spacer)
}

.dropup .dropdown-toggle::after {
  display: inline-block;
  margin-left: .255em;
  vertical-align: .255em;
  content: "";
  border-top: 0;
  border-right: .3em solid transparent;
  border-bottom: .3em solid;
  border-left: .3em solid transparent
}

.dropup .dropdown-toggle:empty::after {
  margin-left: 0
}

.dropend .dropdown-menu[data-bs-popper] {
  top: 0;
  right: auto;
  left: 100%;
  margin-top: 0;
  margin-left: var(--bs-dropdown-spacer)
}

.dropend .dropdown-toggle::after {
  display: inline-block;
  margin-left: .255em;
  vertical-align: .255em;
  content: "";
  border-top: .3em solid transparent;
  border-right: 0;
  border-bottom: .3em solid transparent;
  border-left: .3em solid
}

.dropend .dropdown-toggle:empty::after {
  margin-left: 0
}

.dropend .dropdown-toggle::after {
  vertical-align: 0
}

.dropstart .dropdown-menu[data-bs-popper] {
  top: 0;
  right: 100%;
  left: auto;
  margin-top: 0;
  margin-right: var(--bs-dropdown-spacer)
}

.dropstart .dropdown-toggle::after {
  display: inline-block;
  margin-left: .255em;
  vertical-align: .255em;
  content: ""
}

.dropstart .dropdown-toggle::after {
  display: none
}

.dropstart .dropdown-toggle::before {
  display: inline-block;
  margin-right: .255em;
  vertical-align: .255em;
  content: "";
  border-top: .3em solid transparent;
  border-right: .3em solid;
  border-bottom: .3em solid transparent
}

.dropstart .dropdown-toggle:empty::after {
  margin-left: 0
}

.dropstart .dropdown-toggle::before {
  vertical-align: 0
}

.dropdown-divider {
  height: 0;
  margin: var(--bs-dropdown-divider-margin-y) 0;
  overflow: hidden;
  border-top: 1px solid var(--bs-dropdown-divider-bg);
  opacity: 1
}

.dropdown-item {
  display: block;
  width: 100%;
  padding: var(--bs-dropdown-item-padding-y) var(--bs-dropdown-item-padding-x);
  clear: both;
  font-weight: 400;
  color: var(--bs-dropdown-link-color);
  text-align: inherit;
  text-decoration: none;
  white-space: nowrap;
  background-color: transparent;
  border: 0;
  border-radius: var(--bs-dropdown-item-border-radius, 0)
}

.dropdown-item:focus,
.dropdown-item:hover {
  color: var(--bs-dropdown-link-hover-color);
  background-color: var(--bs-dropdown-link-hover-bg)
}

.dropdown-item.active,
.dropdown-item:active {
  color: var(--bs-dropdown-link-active-color);
  text-decoration: none;
  background-color: var(--bs-dropdown-link-active-bg)
}

.dropdown-item.disabled,
.dropdown-item:disabled {
  color: var(--bs-dropdown-link-disabled-color);
  pointer-events: none;
  background-color: transparent
}

.dropdown-menu.show {
  display: block
}

.dropdown-header {
  display: block;
  padding: var(--bs-dropdown-header-padding-y) var(--bs-dropdown-header-padding-x);
  margin-bottom: 0;
  font-size: .875rem;
  color: var(--bs-dropdown-header-color);
  white-space: nowrap
}

.dropdown-item-text {
  display: block;
  padding: var(--bs-dropdown-item-padding-y) var(--bs-dropdown-item-padding-x);
  color: var(--bs-dropdown-link-color)
}

.dropdown-menu-dark {
  --bs-dropdown-color: #dee2e6;
  --bs-dropdown-bg: #343a40;
  --bs-dropdown-border-color: var(--bs-border-color-translucent);
  --bs-dropdown-link-color: #dee2e6;
  --bs-dropdown-link-hover-color: #fff;
  --bs-dropdown-divider-bg: var(--bs-border-color-translucent);
  --bs-dropdown-link-hover-bg: rgba(255, 255, 255, 0.15);
  --bs-dropdown-link-active-color: #fff;
  --bs-dropdown-link-active-bg: #0d6efd;
  --bs-dropdown-link-disabled-color: #adb5bd;
  --bs-dropdown-header-color: #adb5bd
}

.dropdown-toggle-split {
  padding-right: .5625rem;
  padding-left: .5625rem
}

.dropdown-toggle-split::after,
.dropend .dropdown-toggle-split::after,
.dropup .dropdown-toggle-split::after {
  margin-left: 0
}

.dropstart .dropdown-toggle-split::before {
  margin-right: 0
}
</style>
