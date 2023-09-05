<script setup lang="ts">
withDefaults(
  defineProps<{

    value?: any
    disabled?: boolean
  }>(),
  {
    disabled: false,
    value: undefined,
  },
)
</script>

<template>
  <option :value="value" :disabled="disabled">
    <slot />
  </option>
</template>
