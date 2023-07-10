<script setup lang="ts">
import { props as linkProps } from '@/components/B/Link.vue'

defineProps({
  ...linkProps,
  pill: Boolean,
  tag: {
    type: String,
    default: 'span',
  },
  variant: {
    type: String,
    default: 'secondary',
  },
})
const BLink = resolveComponent('BLink')
</script>

<template>
  <component
    :is="!!(href || to) ? BLink : tag" :href="href" :to="to" class="badge inline-block rounded p-1 text-center align-baseline text-sm font-semibold leading-none" :class="[
      `badge-${variant}`,
      {
        'bg-blue-500 text-white hover:bg-blue-600': variant === 'primary',
        'bg-gray-600 text-white hover:bg-gray-700': variant === 'secondary',
        'bg-green-500 text-white hover:green-600': variant === 'success',
        'bg-red-600 text-white hover:bg-red-700': variant === 'danger',
        'bg-orange-400 text-black hover:bg-orange-500': variant === 'warning',
        'bg-teal-500 text-white hover:bg-teal-600': variant === 'info',
        'bg-gray-100 text-gray-800 hover:bg-gray-200': variant === 'light',
        'bg-gray-900 text-white': variant === 'dark',
        'badge-pill rounded-full py-1 px-3': pill,
        active,
        disabled,
      },
    ]"
  >
    <slot />
  </component>
</template>
