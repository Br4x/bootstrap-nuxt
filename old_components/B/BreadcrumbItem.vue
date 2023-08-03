<script setup lang="ts">
import { linkProps } from '@/constants/props'

const props = defineProps({
  ...linkProps,
  html: String,
  text: String,
  ariaCurrent: {
    type: String,
    default: 'location',
  },
})
</script>

<template>
  <li class="breadcrumb-item text-gray- inline-block px-2 py-2" :class="{ active: props.active }">
    <BBreadcrumbLink v-bind="props">
      <slot />
    </BBreadcrumbLink>
  </li>
</template>

<style type="scss">
.breadcrumb-item + .breadcrumb-item:before {
  @apply float-left text-[#6c757d] content-["/"] pr-2;
}
</style>
