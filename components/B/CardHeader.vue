<script setup>
const props = defineProps(cardHeaderProps)

const { cardHeaderProps } = useProps()
</script>

<template>
  <component
    :is="headerTag"
    v-if="headerHtml || header"
    class="card-header mb-0 border-b-1 border-gray-300 bg-gray-200 px-6 py-3 text-gray-900"
    :class="[props.headerClass, { [`bg-${headerBgVariant}`]: headerBgVariant, [`border-${headerBorderVariant}`]: headerBorderVariant, [`text-${headerTextVariant}`]: headerTextVariant }]"
    v-html="headerHtml || header"
  />
  <component
    :is="headerTag"
    v-else
    class="card-header mb-0 border-b-1 border-gray-300 bg-gray-200 px-6 py-3 text-gray-900"
    :class="[props.headerClass, { [`bg-${headerBgVariant}`]: headerBgVariant, [`border-${headerBorderVariant}`]: headerBorderVariant, [`text-${headerTextVariant}`]: headerTextVariant }]"
  >
    <slot />
  </component>
</template>
