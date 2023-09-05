<script setup lang="ts">
withDefaults(
  defineProps<{
    text?: string
    tag?: string
  }>(),
  {
    tag: 'h4',
    text: undefined,
  },
)
</script>

<template>
  <component :is="tag" class="card-title">
    <slot>
      {{ text }}
    </slot>
  </component>
</template>
