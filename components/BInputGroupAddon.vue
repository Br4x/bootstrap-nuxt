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
  <BInputGroupText v-if="isText">
    <slot />
  </BInputGroupText>
  <slot v-else />
</template>
