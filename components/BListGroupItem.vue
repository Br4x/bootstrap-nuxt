<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import BLink from './BLink.vue'
import { listGroupInjectionKey } from '@/utils'

import type { ColorVariant } from '~/types/ColorVariant'
import type { LinkTarget } from '~/types/LinkTarget'

const props = withDefaults(
  defineProps<{
    action?: boolean
    active?: boolean
    button?: boolean
    disabled?: boolean
    href?: string
    tag?: string
    target?: LinkTarget
    to?: RouteLocationRaw
    variant?: ColorVariant | null
  }>(),
  {
    to: undefined,
    variant: null,
    href: undefined,
    action: false,
    active: false,
    button: false,
    disabled: false,
    tag: 'div',
    target: '_self',
  },
)

const attrs = useAttrs()

const parentData = inject(listGroupInjectionKey, null)

const link = computed<boolean>(() => !props.button && (!!props.href || !!props.to))

const tagComputed = computed<string | typeof BLink>(() =>
  parentData?.numbered.value
    ? 'li'
    : props.button
      ? 'button'
      : !link.value
          ? props.tag
          : BLink,
)

const isAction = computed(
  () =>
    props.action
    || link.value
    || props.button
    || ['a', 'router-link', 'button', 'b-link'].includes(props.tag),
)

const computedAttrs = computed(() => {
  const localAttrs = {} as { type?: string; disabled?: boolean }
  if (props.button) {
    if (!attrs || !attrs.type) {
      // Add a type for button is one not provided in passed attributes
      localAttrs.type = 'button'
    }
    if (props.disabled) {
      // Set disabled attribute if button and disabled
      localAttrs.disabled = true
    }
  }
  return localAttrs
})
</script>

<template>
  <component
    :is="tagComputed"
    class="list-group-item"
    :class="{
      [`list-group-item-${variant}`]: variant !== null,
      'list-group-item-action': isAction,
      'active': active,
      'disabled': disabled,
    }"
    :aria-current="active ? true : undefined"
    :aria-disabled="disabled ? true : undefined"
    :target="link ? target : undefined"
    :href="!button ? href : undefined"
    :to="!button ? to : undefined"
    v-bind="computedAttrs"
  >
    <slot />
  </component>
</template>
