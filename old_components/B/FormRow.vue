<script setup>
defineProps({
  tag: {
    type: String,
    default: 'div',
  },
})
</script>

<template>
  <component :is="tag" class="form-row ml-[-5px] mr-[-5px] flex flex-wrap">
    <slot />
  </component>
</template>

<style type="scss">
.form-row > .col,
.form-row > [class*="col-"] {
  @apply px-[5px];
}
</style>
