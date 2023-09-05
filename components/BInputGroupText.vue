<script setup lang="ts">
withDefaults(
  defineProps<{
    tag?: string
    text?: string
  }>(),
  {
    tag: 'div',
    text: undefined,
  },
)
</script>

<template>
  <component :is="tag" class="input-group-text">
    <slot>
      {{ text }}
    </slot>
  </component>
</template>
