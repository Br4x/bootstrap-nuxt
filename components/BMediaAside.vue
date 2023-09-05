<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    right?: boolean
    tag?: string
    verticalAlign?: string
  }>(),
  {
    tag: 'div',
    verticalAlign: 'top',
    right: false,
  },
)

const align = computed(() => props.verticalAlign === 'top'
  ? 'start'
  : props.verticalAlign === 'bottom'
    ? 'end'
    : props.verticalAlign)
</script>

<template>
  <component
    :is="tag"
    class="media-aside mr-4 flex"
    :class="{
      'media-aside-right ml-4 mr-0': right,
      [`align-self-${align}`]: align,
    }"
  >
    <slot />
  </component>
</template>
