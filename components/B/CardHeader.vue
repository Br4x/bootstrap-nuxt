<script setup>
import { cardHeaderProps } from '@/constants/props'

const props = defineProps(cardHeaderProps)
</script>

<template>
  <component
    :is="headerTag"
    v-if="headerHtml || header"
    class="card-header mb-0 border-b-1 border-gray-300 bg-light px-6 py-3 text-dark"
    :class="[props.headerClass, { [`bg-${headerBgVariant}`]: headerBgVariant, [`border-${headerBorderVariant}`]: headerBorderVariant, [`text-${headerTextVariant}`]: headerTextVariant }]"
    v-html="headerHtml || header"
  />
  <component
    :is="headerTag"
    v-else
    class="card-header mb-0 border-b-1 border-gray-300 bg-light px-6 py-3 text-dark"
    :class="[props.headerClass, { [`bg-${headerBgVariant}`]: headerBgVariant, [`border-${headerBorderVariant}`]: headerBorderVariant, [`text-${headerTextVariant}`]: headerTextVariant }]"
  >
    <slot />
  </component>
</template>
