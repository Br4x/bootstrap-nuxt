<script setup lang="ts">
import type { ButtonType } from '~/types/ButtonType'

withDefaults(
  defineProps<{
    ariaLabel?: string
    disabled?: boolean
    type?: ButtonType
  }>(),
  {
    ariaLabel: 'Close',
    disabled: false,
    type: 'button',
  },
)

const emit = defineEmits<{
  click: [value: MouseEvent]
}>()
</script>

<template>
  <button
    :type="type" class="btn-close" :disabled="disabled" :aria-label="ariaLabel"
    @click="emit('click', $event)"
  />
</template>
