<script setup lang="ts">
import type { ColorVariant } from '~/types/ColorVariant'
import type { TextColorVariant } from '~/types/TextColorVariant'

const props = withDefaults(
  defineProps<{
    text?: string
    bgVariant?: ColorVariant | null
    borderVariant?: ColorVariant | null
    html?: string
    tag?: string
    textVariant?: TextColorVariant | null
  }>(),
  {
    tag: 'div',
    text: undefined,
    bgVariant: undefined,
    borderVariant: undefined,
    html: undefined,
    textVariant: undefined,
  },
)
</script>

<template>
  <BCardHeadFoot class="card-header" v-bind="props">
    <slot />
  </BCardHeadFoot>
</template>
