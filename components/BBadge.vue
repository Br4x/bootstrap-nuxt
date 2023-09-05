<script setup lang="ts">
import BLink from './BLink.vue'
import { isLink, pick } from '@/utils'
import type { BLinkProps } from '~/types/ComponentProps'

const props = withDefaults(
  defineProps<
    {
      pill?: boolean
      tag?: string
      textIndicator?: boolean
      dotIndicator?: boolean
    } & Omit<BLinkProps, 'event' | 'routerTag'>
  >(),
  {
    pill: false,
    tag: 'span',
    textIndicator: false,
    dotIndicator: false,
    variant: 'secondary',
    // Link props
    active: undefined,
    activeClass: 'router-link-active',
    append: false,
    disabled: false,
    href: undefined,
    // noPrefetch: {type: [Boolean, String] as PropType<boolean>, default: false},
    // prefetch: {type: [Boolean, String] as PropType<boolean>, default: null},
    rel: undefined,
    replace: false,
    routerComponentName: 'router-link',
    target: '_self',
    to: undefined,
    opacity: undefined,
    opacityHover: undefined,
    underlineVariant: null,
    underlineOffset: undefined,
    underlineOffsetHover: undefined,
    underlineOpacity: undefined,
    underlineOpacityHover: undefined,
    icon: false,
    // End link props
  },
)

const computedLinkProps = computed(() =>
  isLink(props)
    ? pick(props, [
      'active',
      'activeClass',
      'append',
      'disabled',
      'href',
      'rel',
      'replace',
      'routerComponentName',
      'target',
      'to',
      'variant',
      'opacity',
      'opacityHover',
      'underlineVariant',
      'underlineOffset',
      'underlineOffsetHover',
      'underlineOpacity',
      'underlineOpacityHover',
      'icon',
    ])
    : {},
)
</script>

<template>
  <component
    :is="isLink(props) ? BLink : tag" class="badge" :class="{
      [`bg-${variant}`]: variant !== null,
      'active': active,
      'disabled': disabled,
      'text-dark': variant !== null && ['warning', 'info', 'light'].includes(variant),
      'rounded-pill': pill,
      'position-absolute top-0 start-100 translate-middle':
        textIndicator || dotIndicator,
      'p-2 border border-light rounded-circle': dotIndicator,
      'text-decoration-none': isLink(props),
    }" v-bind="computedLinkProps"
  >
    <slot />
  </component>
</template>
