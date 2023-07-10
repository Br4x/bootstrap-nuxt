<script setup>
defineProps(cardTitleProps)
const { cardTitleProps } = useProps()
</script>

<template>
  <component :is="titleTag" class="card-title mb-3">
    <slot>{{ title }}</slot>
  </component>
</template>
