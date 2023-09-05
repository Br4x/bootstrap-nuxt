<script setup lang="ts">
import type { ColorVariant } from '~/types/ColorVariant'

const props = withDefaults(
  defineProps<{
    colspan?: string | number
    rowspan?: string | number
    stackedHeading?: string
    stickyColumn?: boolean
    variant?: ColorVariant | null
  }>(),
  {
    colspan: undefined,
    rowspan: undefined,
    variant: null,
    stackedHeading: undefined,
    stickyColumn: false,
  },
)

const scope = computed(() => (props.colspan ? 'colspan' : props.rowspan ? 'rowspan' : 'col'))
</script>

<template>
  <th
    :scope="scope"
    :class="{
      [`table-${variant}`]: variant !== null,
      'b-table-sticky-column': stickyColumn,
      'table-b-table-default': stickyColumn && variant === null,
    }"
    :colspan="colspan"
    :rowspan="rowspan"
    :data-label="stackedHeading"
  >
    <div v-if="stackedHeading !== undefined">
      <slot />
    </div>
    <slot v-else />
  </th>
</template>
