<script setup lang="ts">
import type { TextColorVariant } from '~/types/TextColorVariant'

withDefaults(
  defineProps<{
    id?: string
    inline?: boolean
    tag?: string
    text?: string
    textVariant?: TextColorVariant | null
  }>(),
  {
    inline: false,
    id: undefined,
    text: undefined,
    tag: 'small',
    textVariant: 'body-secondary',
  },
)
</script>

<template>
  <component
    :is="tag" :id="id" :class="{
      [`text-${textVariant}`]: textVariant !== null,
      'form-text': !inline,
    }"
  >
    <slot>
      {{ text }}
    </slot>
  </component>
</template>
