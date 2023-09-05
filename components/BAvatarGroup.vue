<script setup lang="ts">
import { type StyleValue, computed, provide, readonly, toRef } from 'vue'
import { useToNumber } from '@vueuse/shared'
import { computeSize } from './BAvatar.vue'
import { avatarGroupInjectionKey } from '@/utils'

import type { ColorVariant } from '~/types/ColorVariant'
import type { Size } from '~/types/Size'

const props = withDefaults(
  defineProps<{
    overlap?: number | string
    rounded?: boolean | string
    size?: Size | string
    square?: boolean
    tag?: string
    variant?: ColorVariant | null
  }>(),
  {
    overlap: 0.3,
    rounded: true,
    square: false,
    tag: 'div',
    size: undefined,
    variant: null,
  },
)

const computedSize = computed<string | null>(() => computeSize(props.size))
const overlapNumber = useToNumber(() => props.overlap)

const overlapScale = computed<number>(() => Math.min(Math.max(overlapNumber.value, 0), 1) / 2)

const paddingStyle = computed<StyleValue>(() => {
  const value = computedSize.value ? `calc(${computedSize.value} * ${overlapScale.value})` : null
  return value ? { paddingLeft: value, paddingRight: value } : {}
})

provide(avatarGroupInjectionKey, {
  overlapScale,
  size: readonly(toRef(props, 'size')),
  square: readonly(toRef(props, 'square')),
  rounded: readonly(toRef(props, 'rounded')),
  variant: readonly(toRef(props, 'variant')),
})
</script>

<template>
  <component :is="tag" class="b-avatar-group" role="group">
    <div class="b-avatar-group-inner" :style="paddingStyle">
      <slot />
    </div>
  </component>
</template>
