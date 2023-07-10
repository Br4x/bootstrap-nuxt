<script setup lang="ts">
const props = defineProps({
  tag: {
    type: String,
    default: 'div',
  },
  square: Boolean,
  variant: String,
  size: String,
  rounded: {
    type: [Boolean, String],
    default: false,
  },
  overlap: {
    type: [Number, String],
    default: 0.3,
  },
})
const { isNumber, isNumeric, isString, toFloat } = useUtils()

provide('getBvAvatarGroup', () => ({
  overlap: props.overlap,
  rounded: props.rounded,
  size: props.size,
  square: props.square,
  tag: props.tag,
}))

function computeSize(value: any) {
  value = isString(value) && isNumeric(value) ? toFloat(value, 0) : value
  return isNumber(value) ? `${value}px` : value || null
}

const computedSize = computed(() => {
  return computeSize(props.size)
})
const overlapScale = computed(() => {
  return Math.min(Math.max(toFloat(props.overlap.toString()), 0), 1) / 2
})
const paddingStyle = computed(() => {
  let value = computedSize.value
  value = value ? `calc(${value} * ${overlapScale.value})` : null
  return value ? { paddingLeft: value, paddingRight: value } : {}
})
</script>

<template>
  <component :is="tag" role="group" class="b-avatar-group">
    <div class="b-avatar-group-inner" :style="paddingStyle">
      <slot />
    </div>
  </component>
</template>
