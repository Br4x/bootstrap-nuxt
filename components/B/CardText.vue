<script setup>
defineProps({
  textTag: {
    type: String,
    default: 'p',
  },
})
</script>

<template>
  <component :is="textTag" class="card-text mb-4">
    <slot />
  </component>
</template>
