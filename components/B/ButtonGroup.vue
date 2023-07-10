<script setup>
defineProps({
  ariaRole: {
    type: String,
    default: 'group',
  },
  size: String,
  tag: {
    type: String,
    default: 'div',
  },
  vertical: Boolean,
})
</script>

<template>
  <component
    :is="tag" :class="{
      'btn-group relative inline-flex align-middle': !vertical,
      'btn-group-vertical relative inline-flex align-middle flex-col items-start justify-center': vertical,
      [`btn-group-sm py-1 px-2 leading-tight text-xs`]: size === 'sm',
      [`btn-group-lg py-3 px-4 leading-tight text-xl`]: size === 'lg',
    }" :role="ariaRole"
  >
    <slot />
  </component>
</template>

<style type="scss">
.btn-group > .btn-group:not(:last-child) > .btn,
.btn-group > .btn:not(:last-child):not(.dropdown-toggle) {
  @apply rounded-tr-none rounded-br-none;
}
.btn-group > .btn-group:not(:first-child) > .btn,
.btn-group > .btn:not(:first-child) {
  @apply rounded-tl-none rounded-bl-none;
}

.btn-group-vertical>.btn-group:not(:last-child)>.btn, .btn-group-vertical>.btn:not(:last-child):not(.dropdown-toggle) {
  @apply rounded-tr-none rounded-br-none;
}

.btn-group-vertical>.btn-group:not(:first-child)>.btn, .btn-group-vertical>.btn:not(:first-child) {
  @apply rounded-tl-none rounded-bl-none;
}

.btn-group-vertical>.btn-group:not(:first-child), .btn-group-vertical>.btn:not(:first-child) {
    margin-top: -1px;
}

.btn-group-vertical>.btn, .btn-group-vertical>.btn-group {
  @apply w-full;
}
</style>
