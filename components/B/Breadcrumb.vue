<script>
export default {
  props: {
    items: Array,
  },
}
</script>

<template>
  <ol class="breadcrumb list-reset mb-4 flex flex-wrap rounded bg-gray-200 px-4 py-4 pb-3 pt-3">
    <BBreadcrumbItem v-for="item in items" :key="`breadcrumb_${item.text}`" v-bind="item" />
    <slot />
  </ol>
</template>
