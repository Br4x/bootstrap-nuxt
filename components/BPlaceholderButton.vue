<script setup lang="ts">
import type { ColorVariant } from '~/types/ColorVariant'
import type { PlaceholderAnimation } from '~/types/PlaceholderAnimation'

withDefaults(
  defineProps<{
    tag?: string
    width?: string | number
    cols?: string | number
    variant?: ColorVariant | null
    animation?: PlaceholderAnimation
  }>(),
  {
    tag: 'div',
    width: undefined,
    cols: undefined,
    animation: undefined,
    variant: 'primary',
  },
)
</script>

<template>
  <BPlaceholder
    class="btn disabled"
    :class="{
      [`btn-${variant}`]: variant !== null,
    }"
    :animation="animation"
    :width="width"
    :cols="cols"
    :tag="tag"
  />
</template>
