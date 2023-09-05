<script setup lang="ts">
import type { Size } from '~/types/Size'

withDefaults(
  defineProps<{
    ariaLabel?: string
    size?: Size
    tag?: string
    vertical?: boolean
  }>(),
  {
    ariaLabel: 'Group',
    tag: 'div',
    vertical: false,
    size: 'md',
  },
)
</script>

<template>
  <component
    :is="tag" :class="{
      'btn-group': !vertical,
      [`btn-group-${size}`]: size !== 'md',
      'btn-group-vertical': vertical,
    }" role="group" :aria-label="ariaLabel"
  >
    <slot />
  </component>
</template>
