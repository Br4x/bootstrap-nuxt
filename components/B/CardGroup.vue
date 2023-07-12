<script setup>
defineProps(
  {
    columns: Boolean,
    deck: Boolean,
    tag: {
      type: String,
      default: 'div',
    },
  })
</script>

<template>
  <component
    :is="tag"
    :class="deck ? 'card-deck flex flex-row flex-wrap md:flex-no-wrap -mx-1' : columns ? 'card-columns' : 'card-group flex flex-col'"
    :columns="columns"
    :deck="deck"
  >
    <slot :deck="deck" />
  </component>
</template>

<style type="scss">
.card-deck .card {
    -ms-flex: 1 0 0%;
    flex: 1 0 0%;
    margin-right: 15px;
    margin-bottom: 0;
    margin-left: 15px;
}
</style>
