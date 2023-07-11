<script setup>
import { cardImgProps, imgLazyProps } from '@/constants/props'

const props = defineProps({
  ...omit(imgLazyProps, Object.keys(cardImgProps)),
  ...omit(cardImgProps, ['src', 'alt', 'width', 'height']),
})
const { omit } = useUtils()
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
