<script setup lang="ts">
import BLink from './BLink.vue'
import { pick } from '@/utils'
import type { BLinkProps } from '~/types/ComponentProps'

const props = withDefaults(
  defineProps<
    {
      ariaCurrent?: string
      text?: string
    } & Omit<BLinkProps, 'event' | 'routerTag'>
  >(),
  {
    ariaCurrent: 'location',
    text: undefined,
    active: false,
    activeClass: 'router-link-active',
    append: false,
    disabled: false,
    event: 'click',
    href: undefined,
    rel: undefined,
    replace: false,
    routerComponentName: 'router-link',
    routerTag: 'a',
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
  },
)

const emit = defineEmits<{
  click: [value: MouseEvent]
}>()

const computedLinkProps = computed(() =>
  props.active
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

function clicked(e: MouseEvent): void {
  if (props.disabled || props.active) {
    e.preventDefault()
    e.stopImmediatePropagation()
    return
  }
  if (!props.disabled)
    emit('click', e)
}
</script>

<template>
  <li
    class="breadcrumb-item" :class="{ active }"
  >
    <component
      :is="active ? 'span' : BLink"
      :aria-current="active ? ariaCurrent : undefined"
      v-bind="computedLinkProps"
      @click="clicked"
    >
      <slot>
        {{ text }}
      </slot>
    </component>
  </li>
</template>
