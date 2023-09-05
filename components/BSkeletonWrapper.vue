<script setup lang="ts">
withDefaults(
  defineProps<{
    loading: boolean
  }>(),
  {
    loading: false,
  },
)
</script>

<template>
  <div
    v-if="loading"
    key="loading"
    role="alert"
    aria-live="polite"
    aria-busy="true"
    class="b-skeleton-wrapper"
  >
    <slot name="loading" />
  </div>
  <template v-else>
    <slot />
  </template>
</template>

<style scoped>
/* Your component-specific styles go here */
</style>
