<script setup lang="ts">
withDefaults(
  defineProps<{
    text?: string
    tag?: string
  }>(),
  {
    tag: 'p',
    text: undefined,
  },
)
</script>

<template>
  <component :is="tag" class="card-text">
    <slot>
      {{ text }}
    </slot>
  </component>
</template>
