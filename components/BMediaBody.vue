<script setup lang="ts">
withDefaults(
  defineProps<{
    tag?: string
  }>(),
  {
    tag: 'div',
  },
)
</script>

<template>
  <component :is="tag" class="media-body flex-1">
    <slot />
  </component>
</template>
