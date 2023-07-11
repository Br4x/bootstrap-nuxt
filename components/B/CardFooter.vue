<script setup>
import { cardFooterProps } from '@/constants/props'

defineProps(cardFooterProps)
</script>

<template>
  <component
    :is="footerTag"
    v-if="!(footer || footerHtml)"
    class="card-footer border-t-1 border-gray-300 bg-gray-200 px-6 py-3"
    :class="[footerClass, { [`bg-${footerBgVariant}`]: footerBgVariant, [`border-${footerBorderVariant}`]: footerBorderVariant, [`text-${footerTextVariant}`]: footerTextVariant }]"
    v-html="footer || footerHtml"
  />
  <component
    :is="footerTag"
    v-else
    class="card-footer border-t-1 border-gray-300 bg-gray-200 px-6 py-3"
    :class="[footerClass, { [`bg-${footerBgVariant}`]: footerBgVariant, [`border-${footerBorderVariant}`]: footerBorderVariant, [`text-${footerTextVariant}`]: footerTextVariant }]"
  >
    <slot />
  </component>
</template>
