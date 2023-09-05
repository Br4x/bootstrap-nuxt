<script setup lang="ts">
withDefaults(
  defineProps<{
    text?: string
  }>(),
  { text: undefined },
)
</script>

<template>
  <li class="navbar-text">
    <slot>
      {{ text }}
    </slot>
  </li>
</template>
