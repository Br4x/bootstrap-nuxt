<script setup lang="ts">
import { isEmptySlot } from '../utils'
import type { ColorVariant } from '~/types/ColorVariant'
import type { SpinnerType } from '~/types/SpinnerType'

withDefaults(
  defineProps<{
    label?: string
    role?: string
    small?: boolean
    tag?: string
    type?: SpinnerType
    variant?: ColorVariant | null
  }>(),
  {
    role: 'status',
    small: false,
    variant: null,
    label: undefined,
    tag: 'span',
    type: 'border',
  },
)

const slots = useSlots()

const hasLabelSlot = computed(() => !isEmptySlot(slots.label))
</script>

<template>
  <component
    :is="tag"
    :class="[
      `spinner-${type}`,
      {
        [`spinner-${type}-sm`]: small,
        [`text-${variant}`]: variant !== null,
      },
    ]"
    :role="label || hasLabelSlot ? role : null"
    :aria-hidden="label || hasLabelSlot ? null : true"
  >
    <span v-if="label || hasLabelSlot" class="visually-hidden">
      <slot name="label">{{ label }}</slot>
    </span>
  </component>
</template>
