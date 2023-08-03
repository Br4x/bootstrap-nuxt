<script setup>
import { cardHeaderProps } from '@/constants/props'

const props = defineProps(cardHeaderProps)
</script>

<template>
  <component
    :is="headerTag"
    v-if="headerHtml || header"
    class="card-header mb-0 border-b px-6 py-3"
    :class="[
      props.headerClass,
      {
        'bg-[rgba(0,0,0,0.03)]': !headerBgVariant,
        'bg-primary': headerBgVariant === 'primary',
        'bg-secondary': headerBgVariant === 'secondary',
        'bg-success': headerBgVariant === 'success',
        'bg-danger': headerBgVariant === 'danger',
        'bg-warning': headerBgVariant === 'warning',
        'bg-info': headerBgVariant === 'info',
        'bg-light': headerBgVariant === 'light',
        'bg-dark': headerBgVariant === 'dark',

        'border-b-[rgba(0,0,0,0.125)]': !headerBorderVariant,
        'border-primary': headerBorderVariant === 'primary',
        'border-secondary': headerBorderVariant === 'secondary',
        'border-success': headerBorderVariant === 'success',
        'border-danger': headerBorderVariant === 'danger',
        'border-warning': headerBorderVariant === 'warning',
        'border-info': headerBorderVariant === 'info',
        'border-light': headerBorderVariant === 'light',
        'border-dark': headerBorderVariant === 'dark',

        'text-primary': headerTextVariant === 'primary',
        'text-secondary': headerTextVariant === 'secondary',
        'text-success': headerTextVariant === 'success',
        'text-danger': headerTextVariant === 'danger',
        'text-warning': headerTextVariant === 'warning',
        'text-info': headerTextVariant === 'info',
        'text-light': headerTextVariant === 'light',
        'text-dark': headerTextVariant === 'dark',
        'text-white': headerTextVariant === 'white',
      },
    ]"
    v-html="headerHtml || header"
  />
  <component
    :is="headerTag"
    v-else
    class="card-header mb-0 border-b border-b-[rgba(0,0,0,0.125)] px-6 py-3"
    :class="[
      props.headerClass,
      {
        'bg-[rgba(0,0,0,0.03)]': !headerBgVariant,
        'bg-primary': headerBgVariant === 'primary',
        'bg-secondary': headerBgVariant === 'secondary',
        'bg-success': headerBgVariant === 'success',
        'bg-danger': headerBgVariant === 'danger',
        'bg-warning': headerBgVariant === 'warning',
        'bg-info': headerBgVariant === 'info',
        'bg-light': headerBgVariant === 'light',
        'bg-dark': headerBgVariant === 'dark',

        'border-primary': headerBorderVariant === 'primary',
        'border-secondary': headerBorderVariant === 'secondary',
        'border-success': headerBorderVariant === 'success',
        'border-danger': headerBorderVariant === 'danger',
        'border-warning': headerBorderVariant === 'warning',
        'border-info': headerBorderVariant === 'info',
        'border-light': headerBorderVariant === 'light',
        'border-dark': headerBorderVariant === 'dark',

        'text-primary': headerTextVariant === 'primary',
        'text-secondary': headerTextVariant === 'secondary',
        'text-success': headerTextVariant === 'success',
        'text-danger': headerTextVariant === 'danger',
        'text-warning': headerTextVariant === 'warning',
        'text-info': headerTextVariant === 'info',
        'text-light': headerTextVariant === 'light',
        'text-dark': headerTextVariant === 'dark',
        'text-white': headerTextVariant === 'white',
      },
    ]"
  >
    <slot />
  </component>
</template>
