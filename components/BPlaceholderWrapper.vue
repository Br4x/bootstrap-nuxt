<script setup lang="ts">
withDefaults(
  defineProps<{
    loading?: boolean
  }>(),
  {
    loading: false,
  },
)
</script>

<template>
  <slot v-if="loading" name="loading" />
  <slot v-else />
</template>
