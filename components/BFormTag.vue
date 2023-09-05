<script setup lang="ts">
import type { ColorVariant } from '~/types/ColorVariant'

const props = withDefaults(
  defineProps<{
    id?: string
    title?: string
    disabled?: boolean
    noRemove?: boolean
    pill?: boolean
    removeLabel?: string
    tag?: string
    variant?: ColorVariant | null
  }>(),
  {
    id: undefined,
    title: undefined,
    disabled: false,
    noRemove: false,
    pill: false,
    removeLabel: 'Remove tag',
    tag: 'span',
    variant: 'secondary',
  },
)

const emit = defineEmits<{
  remove: [value: string]
}>()

const slots = useSlots()

const computedId = useId(() => props.id)

const tagText = computed<string>(
  () => ((slots.default?.()[0].children ?? '').toString() || props.title) ?? '',
)

const taglabelId = computed<string>(() => `${computedId.value}taglabel__`)
</script>

<template>
  <component
    :is="tag"
    :id="computedId"
    :title="tagText"
    class="badge d-inline-flex align-items-center mw-100 b-form-tag"
    :class="{
      [`bg-${variant}`]: variant !== null,
      'text-dark': variant !== null && ['warning', 'info', 'light'].includes(variant),
      'rounded-pill': pill,
      'disabled': disabled,
    }"
    :aria-labelledby="taglabelId"
  >
    <span :id="taglabelId" class="b-form-tag-content flex-grow-1 text-truncate">
      <slot>{{ tagText }}</slot>
    </span>
    <BCloseButton
      v-if="!disabled && !noRemove"
      aria-keyshortcuts="Delete"
      :aria-label="removeLabel"
      class="b-form-tag-remove"
      :white="variant !== null && !['warning', 'info', 'light'].includes(variant)"
      :aria-describedby="taglabelId"
      :aria-controls="id"
      @click="emit('remove', tagText)"
    />
  </component>
</template>
