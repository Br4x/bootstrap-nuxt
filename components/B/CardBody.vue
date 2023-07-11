<script setup>
import { cardBodyProps, cardSubTitleProps, cardTitleProps } from '@/constants/props'

const props = defineProps(cardBodyProps)

const { pluckProps } = useUtils()
</script>

<template>
  <component
    :is="bodyTag"
    class="card-body flex-auto p-6"
    :class="[
      {
        'card-img-overlay absolute inset-y-0 inset-x-0 p-6': overlay,

        'bg-primary': bodyBgVariant === 'primary',
        'bg-secondary': bodyBgVariant === 'secondary',
        'bg-success': bodyBgVariant === 'success',
        'bg-danger': bodyBgVariant === 'danger',
        'bg-warning': bodyBgVariant === 'warning',
        'bg-info': bodyBgVariant === 'info',
        'bg-light': bodyBgVariant === 'light',
        'bg-dark': bodyBgVariant === 'dark',

        'border-primary': bodyBorderVariant === 'primary',
        'border-secondary': bodyBorderVariant === 'secondary',
        'border-success': bodyBorderVariant === 'success',
        'border-danger': bodyBorderVariant === 'danger',
        'border-warning': bodyBorderVariant === 'warning',
        'border-info': bodyBorderVariant === 'info',
        'border-light': bodyBorderVariant === 'light',
        'border-dark': bodyBorderVariant === 'dark',

        'text-primary': bodyTextVariant === 'primary',
        'text-secondary': bodyTextVariant === 'secondary',
        'text-success': bodyTextVariant === 'success',
        'text-danger': bodyTextVariant === 'danger',
        'text-warning': bodyTextVariant === 'warning',
        'text-info': bodyTextVariant === 'info',
        'text-gray-200': bodyTextVariant === 'light',
        'text-dark': bodyTextVariant === 'dark',
      },

      `bg-${bodyBgVariant}`,
      `border-${bodyBorderVariant}`,
      `text-${bodyTextVariant}`,
      bodyClass,
    ]"
  >
    <BCardTitle v-if="title" v-bind="pluckProps(cardTitleProps, props)" />
    <BCardSubTitle
      v-if="subTitle"
      v-bind="pluckProps(cardSubTitleProps, props)"
      class="mb-2"
    />
    <slot />
  </component>
</template>
