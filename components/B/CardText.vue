<script setup>
defineProps({
  textTag: {
    type: String,
    default: 'p',
  },
})
</script>

<template>
  <component :is="textTag" class="card-text mb-0">
    <slot />
  </component>
</template>
