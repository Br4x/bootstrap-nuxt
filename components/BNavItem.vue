<script setup lang="ts">
import BLink from './BLink.vue'

import type { ClassValue } from '~/types/ClassValue'
import type { BLinkProps } from '~/types/ComponentProps'

import { pick } from '@/utils'

const props = withDefaults(
  defineProps<
    {
      linkClass?: ClassValue
      linkAttrs?: Record<string, unknown>
    } & Omit<BLinkProps, 'event' | 'routerTag'>
  >(),
  {
    linkClass: undefined,
    // Link props
    active: undefined,
    activeClass: 'router-link-active',
    append: false,
    linkAttrs: undefined,
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

const emit = defineEmits<{
  click: [value: MouseEvent]
}>()

const computedLinkProps = computed(() =>
  pick(props, [
    'active',
    'activeClass',
    'append',
    'disabled',
    'href',
    'icon',
    'opacity',
    'opacityHover',
    'rel',
    'replace',
    'routerComponentName',
    'target',
    'to',
    'underlineOffset',
    'underlineOffsetHover',
    'underlineOpacity',
    'underlineOpacityHover',
    'underlineVariant',
    'variant',
  ]),
)
</script>

<template>
  <li class="nav-item">
    <BLink
      class="nav-link"
      :class="linkClass"
      v-bind="{ ...computedLinkProps, ...linkAttrs }"
      :active-class="activeClass ?? 'active'"
      :tabindex="disabled ? -1 : undefined"
      :aria-disabled="disabled ? true : undefined"
      @click.stop="emit('click', $event)"
    >
      <slot />
    </BLink>
  </li>
</template>
