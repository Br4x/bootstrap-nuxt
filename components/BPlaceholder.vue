<script setup lang="ts">
import { type CSSProperties } from 'vue'
import type { ColorVariant } from '~/types/ColorVariant'
import type { PlaceholderAnimation } from '~/types/PlaceholderAnimation'
import type { PlaceholderSize } from '~/types/PlaceholderSize'

const props = withDefaults(
  defineProps<{
    tag?: string
    wrapperTag?: string
    width?: string | number
    cols?: string | number
    variant?: ColorVariant | null
    size?: PlaceholderSize
    animation?: PlaceholderAnimation
  }>(),
  {
    variant: null,
    size: 'md',
    animation: undefined,
    width: undefined,
    tag: 'span',
    wrapperTag: 'span',
    cols: 12,
  },
)

defineOptions({
  inheritAttrs: false,
})

const widthString = computed<string | undefined>(() =>
  props.width === undefined
    ? undefined
    : typeof props.width === 'number'
      ? props.width.toString()
      : props.width.replace('%', ''),
)

const colsString = computed<string | undefined>(() =>
  props.cols === undefined
    ? undefined
    : typeof props.cols === 'number'
      ? props.cols.toString()
      : props.cols,
)

const computedClasses = computed(() => ({
  [`col-${colsString.value}`]: colsString.value !== undefined && widthString.value === undefined,
  [`bg-${props.variant}`]: props.variant !== null,
  [`placeholder-${props.size}`]: props.size !== 'md',
}))

const wrapperClasses = computed(() => ({
  [`placeholder-${props.animation}`]: props.animation !== undefined,
}))

const computedStyle = computed<CSSProperties>(() => ({
  width: widthString.value === undefined ? undefined : `${widthString.value}%`,
}))
</script>

<template>
  <component :is="wrapperTag" :class="wrapperClasses">
    <component
      v-bind="$attrs"
      :is="tag"
      class="placeholder"
      :class="computedClasses"
      :style="computedStyle"
    />
  </component>
</template>
