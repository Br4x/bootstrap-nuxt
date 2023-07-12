<script setup>
import { cardSubTitleProps } from '@/constants/props'

const props = defineProps(cardSubTitleProps)
</script>

<template>
  <component
    :is="subTitleTag" class="card-subtitle mb-0 -mt-2" :class="[subTitleTextVariant ? `text-${subTitleTextVariant}` : null, {
      'text-primary': subTitleTextVariant === 'primary',
      'text-secondary': subTitleTextVariant === 'secondary',
      'text-success': subTitleTextVariant === 'success',
      'text-danger': subTitleTextVariant === 'danger',
      'text-warning': subTitleTextVariant === 'warning',
      'text-info': subTitleTextVariant === 'info',
      'text-light': subTitleTextVariant === 'light',
      'text-dark': subTitleTextVariant === 'dark',
    }]"
  >
    <slot>{{ props.subTitle.toString() }}</slot>
  </component>
</template>
