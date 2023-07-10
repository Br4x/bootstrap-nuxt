<script setup>
defineProps(cardImgProps)

const { cardImgProps } = useProps()
</script>

<template>
  <img
    class="card-img w-full rounded" :class="{
      'card-img-top w-full rounded rounded-t': top,
      'card-img-right': right || end,
      'card-img-bottom w-full rounded rounded-b': bottom,
      'card-img-left': left || start,
    }" :src="src" :alt="alt" :width="width" :height="height"
  >
</template>
