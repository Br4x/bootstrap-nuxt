<script setup lang="ts">
withDefaults(
  defineProps<{
    ariaLabel?: string
    justify?: boolean
    role?: string
  }>(),
  {
    role: 'toolbar',
    ariaLabel: 'Group',
    justify: false,
  },
)
</script>

<template>
  <div :class="{ 'justify-content-between': justify }" class="btn-toolbar" :role="role" :aria-label="ariaLabel">
    <slot />
  </div>
</template>
