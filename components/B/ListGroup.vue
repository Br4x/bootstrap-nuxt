<script setup>
defineProps({
  flush: Boolean,
  horizontal: {
    type: [Boolean, String],
    default: false,
  },
  tag: {
    type: String,
    default: 'div',
  },
})

const { isString } = useUtils()
</script>

<template>
  <component
    :is="tag" class="list-group mb-0 flex pl-0" :class="{
      'rounded': !flush,
      'flex-col': !horizontal,
      'list-group-flush rounded-0': flush,
      'list-group-horizontal flex-row': horizontal === true,
      [`list-group-horizontal-${horizontal}`]: isString(horizontal),
    }"
  >
    <slot />
  </component>
</template>

<style type="scss">
.list-group-item:last-child {
  @apply rounded-br-[inherit] rounded-bl-[inherit];
}

.list-group-flush > .list-group-item {
  border-width: 0 0 1px
}

.list-group-item:first-child {
  @apply rounded-t-[inherit];
}

.list-group-horizontal > .list-group-item:first-child {
  @apply rounded-tr-none rounded-bl;
}

.list-group-horizontal > .list-group-item:last-child {
  @apply rounded-bl-none rounded-tr;
}

.list-group-horizontal > .list-group-item.active {
  @apply mt-0;
}

.list-group-horizontal > .list-group-item + .list-group-item {
  @apply border-l-0 border-t;
}

.list-group-horizontal > .list-group-item + .list-group-item.active {
  @apply -ml-px border-l;
}

.list-group-item:first-child {
  @apply rounded-t-[inherit];
}
</style>
