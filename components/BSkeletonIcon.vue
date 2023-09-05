<script setup lang="ts">
withDefaults(
  defineProps<{
    animation?: string
    icon?: string
    iconProps?: Object
  }>(),
  {
    animation: 'wave',
  },
)
</script>

<template>
  <div
    class="b-skeleton-icon-wrapper relative inline-block overflow-hidden" :class="{
      [`b-skeleton-animate-${animation}`]: animation,
    }"
  >
    <i class="icon b-skeleton-icon i-carbon-user relative inline-block w-6 w-6" v-bind="iconProps" />
  </div>
</template>
