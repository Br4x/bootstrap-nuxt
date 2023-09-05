<script setup lang="ts">
import BLink from './BLink.vue'
import { isLink, pick } from '@/utils'
import type { BLinkProps } from '~/types/ComponentProps'

const props = withDefaults(
  defineProps<
    {
      tag?: string
    } & Omit<BLinkProps, 'event' | 'routerTag'>
  >(),
  {
    tag: 'div',
    // Link props
    active: undefined,
    activeClass: 'router-link-active',
    append: false,
    disabled: false,
    href: undefined,
    rel: undefined,
    replace: false,
    routerComponentName: 'router-link',
    target: '_self',
    to: undefined,
    variant: undefined,
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

const computedLink = computed<boolean>(() => isLink(props))
const computedTag = computed<string | typeof BLink>(() => (computedLink.value ? BLink : props.tag))

const computedLinkProps = computed(() =>
  computedLink.value
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
  <component :is="computedTag" class="navbar-brand" v-bind="computedLinkProps">
    <slot />
  </component>
</template>
