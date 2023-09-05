<script setup lang="ts">
import type { ColorVariant } from '~/types/ColorVariant'

withDefaults(
  defineProps<{
    colspan?: string | number
    rowspan?: string | number
    stackedHeading?: string
    stickyColumn?: boolean
    variant?: ColorVariant | null
  }>(),
  {
    colspan: undefined,
    variant: null,
    rowspan: undefined,
    stackedHeading: undefined,
    stickyColumn: false,
  },
)
</script>

<template>
  <td
    :scope="colspan ? 'colspan' : rowspan ? 'rowspan' : 'col'"
    :class="{
      [`table-${variant}`]: variant !== null,
      'b-table-sticky-column': stickyColumn,
      'table-b-table-default': stickyColumn && variant === null,
    }"
    :colspan="colspan"
    :rowspan="rowspan"
    :data-label="stackedHeading"
  >
    <div v-if="stackedHeading">
      <slot />
    </div>
    <slot v-else />
  </td>
</template>
