<script setup lang="ts">
import type { AlignmentJustifyContent } from '~/types/AlignmentJustifyContent'

const props = withDefaults(
  defineProps<{
    align?: AlignmentJustifyContent
    fill?: boolean
    justified?: boolean
    small?: boolean
    tag?: string
  }>(),
  {
    fill: false,
    align: undefined,
    justified: false,
    small: false,
    tag: 'ul',
  },
)

const alignment = useAlignment(() => props.align)
</script>

<template>
  <ul
    class="navbar-nav" :class="{
      'nav-fill': fill,
      'nav-justified': justified,
      [alignment]: align !== undefined,
      'small': small,
    }"
  >
    <slot />
  </ul>
</template>
