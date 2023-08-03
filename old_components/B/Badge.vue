<script setup lang="ts">
import { linkProps } from '@/constants/props'

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
        'bg-blue-500 text-white hover:bg-primary': variant === 'primary',
        'bg-secondary text-white hover:bg-gray-700': variant === 'secondary',
        'bg-success text-white hover:green-600': variant === 'success',
        'bg-danger text-white hover:bg-red-700': variant === 'danger',
        'bg-warning text-black hover:bg-orange-500': variant === 'warning',
        'bg-info text-white hover:bg-teal-600': variant === 'info',
        'bg-light text-gray-800 hover:bg-light': variant === 'light',
        'bg-dark text-white': variant === 'dark',
        'badge-pill rounded-full py-1 px-3': pill,
        active,
        disabled,
      },
    ]"
  >
    <slot />
  </component>
</template>
