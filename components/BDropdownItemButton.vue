<script setup lang="ts">
import type { ClassValue } from '~/types/ClassValue'
import type { ColorVariant } from '~/types/ColorVariant'

withDefaults(
  defineProps<{
    buttonClass?: ClassValue
    active?: boolean
    activeClass?: ClassValue
    disabled?: boolean
    variant?: ColorVariant | null
  }>(),
  {
    active: false,
    activeClass: 'active',
    disabled: false,
    variant: null,
    buttonClass: undefined,
  },
)

const emit = defineEmits<{
  click: [value: MouseEvent]
}>()

defineOptions({
  inheritAttrs: false,
})

function clicked(e: MouseEvent) {
  emit('click', e)
}
</script>

<template>
  <li role="presentation">
    <button
      role="menu"
      type="button"
      class="dropdown-item"
      :class="[
        buttonClass,
        {
          [activeClass]: active,
          disabled,
          [`text-${variant}`]: variant !== null,
        },
      ]"
      :disabled="disabled"
      @click="clicked"
    >
      <slot />
    </button>
  </li>
</template>
