<script setup>
import { cardTitleProps } from '@/constants/props'

defineProps(cardTitleProps)
</script>

<template>
  <component :is="titleTag" class="card-title mb-3 text-2xl">
    <slot>{{ title }}</slot>
  </component>
</template>
