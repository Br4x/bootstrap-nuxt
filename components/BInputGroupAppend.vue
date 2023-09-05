<script setup lang="ts">
withDefaults(
  defineProps<{
    isText?: boolean
  }>(),
  {
    isText: false,
  },
)
</script>

<template>
  <BInputGroupAddon :is-text="isText">
    <slot />
  </BInputGroupAddon>
</template>
