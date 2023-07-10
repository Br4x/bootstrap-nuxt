<script setup>
import { props as linkProps } from '@/components/B/Link.vue'
import { CODE_ENTER, CODE_SPACE } from '@/constants/key-codes'

const props = defineProps(btnProps)

const { btnProps } = useProps()

const attrs = useAttrs()

const { removeClass, addClass, isBoolean, isTag, stopEvent, isEvent, isLink, pluckProps } = useUtils()

// Focus handler for toggle buttons
// Needs class of 'focus' when focused
function handleFocus(event) {
  if (event.type === 'focusin')
    addClass(event.target, 'focus')
  else if (event.type === 'focusout')
    removeClass(event.target, 'focus')
}

// Is the requested button a link?
// If tag prop is set to `a`, we use a <b-link> to get proper disabled handling
const isALink = props => isLink(props) || isTag(props.tag, 'a')
const BLink = resolveComponent('BLink')
const link = isALink(props)

// Is the button to be a toggle button?
const isToggle = props => isBoolean(props.pressed)

// Is the button "really" a button?
const isButton = props => !(isALink(props) || (props.tag && !isTag(props.tag, 'button')))

// Is the requested tag not a button or link?
const isNonStandardTag = props => !isALink(props) && !isButton(props)

// Compute the link props to pass to b-link (if required)
const computeLinkProps = props => (isALink(props) ? pluckProps(linkProps, props) : {})

// Compute the attributes for a button
function computeAttrs(props) {
  const button = isButton(props)
  const toggle = isToggle(props)
  const nonStandardTag = isNonStandardTag(props)
  const hashLink = link && props.href === '#'
  const role = attrs && attrs.role ? attrs.role : null
  let tabindex = attrs ? attrs.tabindex : null
  if (nonStandardTag || hashLink)
    tabindex = '0'

  return {
    'type': button && !link ? props.type : null,
    'disabled': button ? props.disabled : null,
    'role': nonStandardTag || hashLink ? 'button' : role,
    'aria-disabled': nonStandardTag ? String(props.disabled) : null,
    'aria-pressed': toggle ? String(props.pressed) : null,
    'autocomplete': toggle ? 'off' : null,
    'tabindex': props.disabled && !button ? '-1' : tabindex,
  }
}

function handleKeydown(event) {
  // When the link is a `href="#"` or a non-standard tag (has `role="button"`),
  // we add a keydown handlers for CODE_SPACE/CODE_ENTER
  /* istanbul ignore next */
  if (props.disabled || !(nonStandardTag || hashLink))
    return

  const { keyCode } = event
  // Add CODE_SPACE handler for `href="#"` and CODE_ENTER handler for non-standard tags
  if (keyCode === CODE_SPACE || (keyCode === CODE_ENTER && nonStandardTag)) {
    const target = event.currentTarget || event.target
    stopEvent(event, { propagation: false })
    target.click()
  }
}

function handleClick(event) {
  if (props.disabled && isEvent(event))
    stopEvent(event)
}
</script>

<template>
  <component
    :is="link ? BLink : tag"
    class="btn inline-block select-none border rounded border-solid px-3 py-1.5 text-center align-middle text-base font-normal leading-normal text-[#212529]"
    :class="[
      `btn-${variant || 'secondary'}`,
      {
        [`btn-${size}`]: size,
        'border-blue-600 bg-blue-600 text-white hover:bg-blue-600 ': variant === 'primary',
        'border-gray-600 bg-gray-600 text-white hover:bg-gray-700': variant === 'secondary',
        'border-green-500 bg-green-500 text-white hover:bg-green-600': variant === 'success',
        'border-red-600 bg-red-600 text-white hover:bg-red-700': variant === 'danger',
        'border-orange-400 bg-orange-400 text-black hover:bg-orange-500': variant === 'warning',
        'border-teal-500 bg-teal-500 text-white hover:bg-teal-600': variant === 'info',
        'border-gray-100 bg-gray-100 text-gray-800 hover:bg-gray-200': variant === 'light',
        'border-gray-900 bg-gray-900 text-white hover:bg-gray-900': variant === 'dark',
        'text-blue-600 bg-white hover:bg-blue-600 hover:text-white border-blue-600': variant === 'outline-primary',
        'text-gray-600 bg-white hover:bg-gray-700 hover:text-white border-gray-600': variant === 'outline-secondary',
        'text-green-500 bg-white hover:bg-green-600 hover:text-white border-green-500': variant === 'outline-success',
        'text-red-600 bg-white hover:bg-red-700 hover:text-white border-red-600': variant === 'outline-danger',
        'text-orange-400 bg-white hover:bg-orange-500 hover:text-white border-orange-400': variant === 'outline-warning',
        'text-teal-500 bg-white hover:bg-teal-600 hover:text-white border-teal-500': variant === 'outline-info',
        'text-gray-200 bg-white hover:bg-gray-200 hover:text-white border-gray-200': variant === 'outline-light',
        'text-gray-900 bg-white hover:bg-gray-900 hover:text-white border-gray-900': variant === 'outline-dark',
        'btn-xs py-1 px-2 leading-tight text-xs': size === 'sm',
        'btn-xl py-3 px-4 leading-tight text-xl': size === 'lg',
        'btn-block block w-full': block,
        'rounded-pill rounded-full': pill,
        'rounded-0': squared && !pill,
        'disabled opacity-[0.65]': disabled,
        'active': pressed,
      },
    ]"
    v-bind="{ ...computeLinkProps(props), ...computeAttrs(props) }"
    @keydown="handleKeydown"
    @click="handleClick"
    @focusin="handleFocus"
    @focusout="handleFocus"
  >
    <slot />
  </component>
</template>
