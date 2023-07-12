<script setup>
import { cardImgProps } from '@/constants/props'

defineProps(cardImgProps)
</script>

<template>
  <img
    class="card-img" :class="{
      'card-img-top w-full rounded rounded-t': top,
      'card-img-right rounded-tr-1 rounded-br-1': right || end,
      'card-img-bottom w-full rounded rounded-b': bottom,
      'card-img-left rounded-tl-1 rounded-bl-1': left || start,
    }" :src="src" :alt="alt" :width="width" :height="height"
  >
</template>
