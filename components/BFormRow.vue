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
  <component :is="tag" class="d-flex row flex flex-wrap">
    <slot />
  </component>
</template>
