<script setup>
import { cardImgProps, imgLazyProps } from '@/constants/props'

const props = defineProps({
  ...imgLazyProps,
  ...cardImgProps,
})
</script>

<template>
  <BImgLazy
    :class="{
      'card-img-top w-full rounded rounded-t': top,
      'card-img-right': right || end,
      'card-img-bottom w-full rounded rounded-b': bottom,
      'card-img-left': left || start,
    }" v-bind="omit(props, ['left', 'right'])"
  />
</template>
