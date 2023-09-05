<script setup lang="ts">
import type { AlignmentJustifyContent } from '~/types/AlignmentJustifyContent'

const props = withDefaults(
  defineProps<{
    align?: AlignmentJustifyContent
    cardHeader?: boolean
    fill?: boolean
    justified?: boolean
    pills?: boolean
    small?: boolean
    tabs?: boolean
    tag?: string
    vertical?: boolean
    underline?: boolean
  }>(),
  {
    align: undefined,
    cardHeader: false,
    fill: false,
    justified: false,
    pills: false,
    small: false,
    tabs: false,
    tag: 'ul',
    vertical: false,
    underline: false,
  },
)

const alignment = useAlignment(() => props.align)
</script>

<template>
  <component
    :is="tag" class="nav" :class="{
      'nav-tabs': tabs,
      'nav-pills': pills && !tabs,
      'card-header-tabs': !vertical && cardHeader && tabs,
      'card-header-pills':
        !vertical && cardHeader && pills && !tabs,
      'flex-column': vertical,
      'nav-fill': !vertical && fill,
      'nav-justified': !vertical && justified,
      [alignment]: !vertical && align !== undefined,
      'small': small,
      'nav-underline': underline,
    }"
  >
    <slot />
  </component>
</template>
