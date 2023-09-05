<script setup lang="ts">
import type { ColorVariant } from '~/types/ColorVariant'
import type { TextColorVariant } from '~/types/TextColorVariant'

withDefaults(
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
    bgVariant: null,
    borderVariant: null,
    html: undefined,
    textVariant: null,
  },
)
</script>

<template>
  <component
    :is="tag" :class="{
      [`text-${textVariant}`]: textVariant !== null,
      [`bg-${bgVariant}`]: bgVariant !== null,
      [`border-${borderVariant}`]: borderVariant !== null,
    }"
  >
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-if="!!html" v-html="html" />
    <slot v-else>
      {{ text }}
    </slot>
  </component>
</template>
