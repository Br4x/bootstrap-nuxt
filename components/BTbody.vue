<script setup lang="ts">
import type { ColorVariant } from '~/types/ColorVariant'

withDefaults(
  defineProps<{
    variant?: ColorVariant | null
  }>(),
  {
    variant: null,
  },
)
</script>

<template>
  <tbody
    :class="{
      [`thead-${variant}`]: variant !== null,
    }"
  >
    <slot />
  </tbody>
</template>
