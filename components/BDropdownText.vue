<script setup lang="ts">
withDefaults(
  defineProps<{
    text?: string
  }>(),
  {
    text: '',
  },
)
</script>

<template>
  <li role="presentation">
    <p class="text-body-secondary mb-0 px-4 py-1">
      <slot>
        {{ text }}
      </slot>
    </p>
  </li>
</template>
