<script setup>
const props = defineProps(cardBodyProps)

const { pluckProps } = useUtils()
const { cardBodyProps } = useProps()
</script>

<template>
  <component
    :is="bodyTag"
    class="card-body flex-auto p-6"
    :class="[
      {
        'card-img-overlay absolute inset-y-0 inset-x-0 p-6': overlay,

        'bg-blue-600': bodyBgVariant === 'primary',
        'bg-gray-600': bodyBgVariant === 'secondary',
        'bg-green-500': bodyBgVariant === 'success',
        'bg-red-600': bodyBgVariant === 'danger',
        'bg-orange-400': bodyBgVariant === 'warning',
        'bg-teal-500': bodyBgVariant === 'info',
        'bg-gray-100': bodyBgVariant === 'light',
        'bg-gray-900': bodyBgVariant === 'dark',

        'border-blue-600': bodyBorderVariant === 'primary',
        'border-gray-600': bodyBorderVariant === 'secondary',
        'border-green-500': bodyBorderVariant === 'success',
        'border-red-600': bodyBorderVariant === 'danger',
        'border-orange-400': bodyBorderVariant === 'warning',
        'border-teal-500': bodyBorderVariant === 'info',
        'border-gray-100': bodyBorderVariant === 'light',
        'border-gray-900': bodyBorderVariant === 'dark',

        'text-blue-600': bodyTextVariant === 'primary',
        'text-gray-600': bodyTextVariant === 'secondary',
        'text-green-500': bodyTextVariant === 'success',
        'text-red-600': bodyTextVariant === 'danger',
        'text-orange-400': bodyTextVariant === 'warning',
        'text-teal-500': bodyTextVariant === 'info',
        'text-gray-200': bodyTextVariant === 'light',
        'text-gray-900': bodyTextVariant === 'dark',
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
