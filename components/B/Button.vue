<script setup>
import { btnProps, linkProps } from '@/constants/props'
import { CODE_ENTER, CODE_SPACE } from '@/constants/key-codes'

const props = defineProps(btnProps)

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
        'border-primary bg-primary text-white hover:bg-primary ': variant === 'primary',
        'border-secondary bg-secondary text-white hover:bg-gray-700': variant === 'secondary',
        'border-success bg-success text-white hover:bg-green-600': variant === 'success',
        'border-danger bg-danger text-white hover:bg-red-700': variant === 'danger',
        'border-warning bg-warning text-black hover:bg-orange-500': variant === 'warning',
        'border-info bg-info text-white hover:bg-teal-600': variant === 'info',
        'border-light bg-light text-gray-800 hover:bg-light': variant === 'light',
        'border-dark bg-dark text-white hover:bg-dark': variant === 'dark',
        'text-primary bg-white hover:bg-primary hover:text-white border-primary': variant === 'outline-primary',
        'text-secondary bg-white hover:bg-gray-700 hover:text-white border-secondary': variant === 'outline-secondary',
        'text-success bg-white hover:bg-green-600 hover:text-white border-success': variant === 'outline-success',
        'text-danger bg-white hover:bg-red-700 hover:text-white border-danger': variant === 'outline-danger',
        'text-warning bg-white hover:bg-orange-500 hover:text-white border-warning': variant === 'outline-warning',
        'text-info bg-white hover:bg-teal-600 hover:text-white border-info': variant === 'outline-info',
        'text-light bg-white hover:bg-light hover:text-white border-light': variant === 'outline-light',
        'text-dark bg-white hover:bg-dark hover:text-white border-dark': variant === 'outline-dark',
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
