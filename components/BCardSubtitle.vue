<script setup lang="ts">
import type { TextColorVariant } from '~/types/TextColorVariant'

const props = withDefaults(
  defineProps<{
    text?: string
    tag?: string
    textVariant?: TextColorVariant | null
  }>(),
  {
    tag: 'h6',
    textVariant: 'body-secondary',
    text: undefined,
  },
)

const coomputedClasses = computed(() => ({
  [`text-${props.textVariant}`]: props.textVariant !== null,
}))
</script>

<template>
  <component :is="tag" class="card-subtitle mb-2" :class="coomputedClasses">
    <slot>
      {{ text }}
    </slot>
  </component>
</template>
