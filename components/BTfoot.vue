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
  <tfoot
    :class="{
      [`table-${variant}`]: variant !== null,
    }"
  >
    <slot />
  </tfoot>
</template>
