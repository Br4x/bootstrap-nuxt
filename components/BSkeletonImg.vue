<script setup lang="ts">
withDefaults(
  defineProps<{
    animation?: string
    aspect?: string
    cardImg?: string
    height?: string
    noAspect?: boolean
    variant?: string
    width?: string
  }>(),
  {
    aspect: '16:9',
    noAspect: false,
  },
)
</script>

<template>
  <div>
    <BSkeleton
      :width="width"
      :height="height"
      :animation="animation"
      :variant="variant"
      :class="{ [`card-img-${cardImg}`]: cardImg }"
    />
  </div>
</template>

<style scoped>
/* Your component-specific styles go here */
</style>
