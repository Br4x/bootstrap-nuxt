<script setup lang="ts">
import type { BreadcrumbItem } from '~/types/BreadcrumbItem'
import type { BreadcrumbItemObject } from '~/types/BreadcrumbItemObject'

const props = withDefaults(
  defineProps<{
    items?: BreadcrumbItem[]
  }>(),
  { items: undefined },
)

const breadcrumb = useBreadcrumb()

const breadcrumbItemObjects = computed<BreadcrumbItemObject[]>(() => {
  const localItems = props.items || breadcrumb?.items || []
  let activeDefined = false
  const items = localItems.map((item, idx) => {
    if (typeof item === 'string') {
      item = { text: item }
      if (idx < localItems.length - 1)
        item.href = '#'
    }
    if (item.active)
      activeDefined = true

    // Auto-detect active by position in list
    if (!item.active && !activeDefined)
      item.active = idx + 1 === localItems.length

    return item
  })
  return items
})
</script>

<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <slot name="prepend" />
      <BBreadcrumbItem v-for="(item, i) in breadcrumbItemObjects" :key="i" v-bind="item">
        {{ item.text }}
      </BBreadcrumbItem>
      <slot />
      <slot name="append" />
    </ol>
  </nav>
</template>
