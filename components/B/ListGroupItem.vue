<script setup>
import { linkProps } from '@/constants/props'

const props = defineProps({
  ...linkProps,
  action: Boolean,
  button: Boolean,
  tag: {
    type: String,
    default: 'div',
  },
  variant: {
    type: String,
  },
})

const { pluckProps, isLink } = useUtils()
const BLink = resolveComponent('BLink')
</script>

<template>
  <component
    :is="button ? 'button' : !isLink(props) ? tag : BLink"
    class="list-group-item relative block border border-gray-300 border-solid px-6 py-3 no-underline -mb-px"
    :class="{
      'list-group-item-action w-full text-left': action || isLink(props) || button || ['a', 'router-link', 'button', 'b-link'].includes(tag),
      [`list-group-item-${variant}`]: variant,
      'bg-lightPrimary text-darkPrimary': variant === 'primary',
      'bg-lightSecondary text-darkSecondary': variant === 'secondary',
      'bg-lightSuccess text-darkSuccess': variant === 'success',
      'bg-lightDanger text-darkDanger': variant === 'danger',
      'bg-lightWarning text-darkWarning': variant === 'warning',
      'bg-lightInfo text-darkInfo': variant === 'info',
      'bg-lightLight text-darkLight': variant === 'light',
      'bg-lightDark text-darkDark': variant === 'dark',
      'active': active,
      'disabled': disabled,
    }"
    :disabled="button && disabled"
    :type="button ? 'button' : undefined"
    v-bind="pluckProps(linkProps, props)"
  >
    <slot />
  </component>
</template>
