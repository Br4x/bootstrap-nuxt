<script setup>
const props = defineProps(cardSubTitleProps)

const { cardSubTitleProps } = useProps()
</script>

<template>
  <component
    :is="subTitleTag" class="card-subtitle mb-0 -mt-2" :class="[subTitleTextVariant ? `text-${subTitleTextVariant}` : null, {
      'text-blue-600': bodyTextVariant === 'primary',
      'text-gray-600': bodyTextVariant === 'secondary',
      'text-green-500': bodyTextVariant === 'success',
      'text-red-600': bodyTextVariant === 'danger',
      'text-orange-400': bodyTextVariant === 'warning',
      'text-teal-500': bodyTextVariant === 'info',
      'text-gray-200': bodyTextVariant === 'light',
      'text-gray-900': bodyTextVariant === 'dark',
    }]"
  >
    <slot>{{ props.subTitle.toString() }}</slot>
  </component>
</template>
