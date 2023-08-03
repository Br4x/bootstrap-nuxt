<script setup>
defineProps({
  fluid: {
    type: [Boolean, String],
    default: false,
  },
  tag: {
    type: String,
    default: 'div',
  },
})
</script>

<template>
  <component
    :is="tag" :class="{
      'container w-full mx-auto px-[15px]': !(fluid || fluid === ''),
      'container-fluid w-full mx-auto px-[15px]': fluid === true || fluid === '',
      [`container-sm sm:max-w-[540px]`]: fluid === 'sm' && fluid !== true,
      [`container-md md:max-w-[720px]`]: fluid === 'md' && fluid !== true,
      [`container-lg lg:max-w-[960px]`]: fluid === 'lg' && fluid !== true,
      [`container-xl xl:max-w-[1140px]`]: fluid === 'xl' && fluid !== true,
    }"
  >
    <slot />
  </component>
</template>
