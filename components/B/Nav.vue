<script setup>
defineProps({
  align: String,
  cardHeader: Boolean,
  fill: Boolean,
  justified: Boolean,
  pills: Boolean,
  small: Boolean,
  tabs: Boolean,
  tag: {
    type: String,
    default: 'ul',
  },
  vertical: Boolean,
})
</script>

<template>
  <component
    :is="tag"
    class="nav mb-0 flex flex-wrap list-none pl-0"
    :class="{
      'nav-tabs border-b-gray-200 border-b border-solid': !!tabs,
      'nav-pills': pills && !tabs,
      'card-header-tabs mb-[-0.75rem] border-b-0 mr-[-0.625rem] ml-[-0.625rem]': !vertical && cardHeader && tabs,
      'card-header-pills mr-[-0.625rem] ml-[-0.625rem]': !vertical && cardHeader && pills && !tabs,
      'flex-column': vertical,
      'nav-fill': !vertical && fill,
      'nav-justified': !vertical && justified,
      'small': small,
      'text-gray-500 pointer-events-none cursor-default': disabled,
      'content-start': !vertical && align === 'left',
      'content-end': !vertical && align === 'right',
      [`justify-content-${align}`]: !vertical && !['left', 'right'].includes(align) && align,
    }"
  >
    <slot />
  </component>
</template>

<style type="scss">
.nav-tabs .nav-link {
  @apply border -mb-px rounded-tl rounded-tr border-solid border-transparent;
}
.nav-tabs .nav-link:focus,
.nav-tabs .nav-link:hover {
  @apply border-gray-200;
}
.nav-tabs .nav-link.disabled {
  @apply text-gray-500 bg-transparent border-transparent;
}
.nav-tabs .nav-item.show .nav-link,
.nav-tabs .nav-link.active {
  @apply text-gray-600 bg-white border-gray-200;
}
.nav-tabs .dropdown-menu {
  @apply -mt-px rounded-t-none;
}
.nav-pills .nav-link {
  @apply rounded;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  @apply text-white bg-primary;
}
.nav-fill .nav-item,
.nav-fill > .nav-link {
  @apply flex-auto text-center;
}
.nav-justified .nav-item,
.nav-justified > .nav-link {
  @apply basis-0 grow text-center;
}
</style>
