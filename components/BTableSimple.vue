<script setup lang="ts">
import type { Breakpoint } from '~/types/Breakpoint'
import type { ClassValue } from '~/types/ClassValue'
import type { ColorVariant } from '~/types/ColorVariant'

withDefaults(
  defineProps<{
    bordered?: boolean
    borderless?: boolean
    borderVariant?: ColorVariant | null
    captionTop?: boolean
    dark?: boolean
    hover?: boolean
    responsive?: boolean | Breakpoint
    stacked?: boolean | Breakpoint
    striped?: boolean
    small?: boolean
    tableClass?: ClassValue
    tableVariant?: ColorVariant | null
    stickyHeader?: boolean
  }>(),
  {
    borderVariant: null,
    tableClass: undefined,
    tableVariant: null,
    bordered: false,
    borderless: false,
    captionTop: false,
    dark: false,
    hover: false,
    responsive: false,
    stacked: false,
    striped: false,
    small: false,
    stickyHeader: false,
  },
)
</script>

<template>
  <table
    v-if="!responsive" class="b-table table" :class="[
      tableClass,
      {
        'table-bordered': bordered,
        'table-borderless': borderless,
        [`border-${borderVariant}`]: borderVariant !== null,
        'caption-top': captionTop,
        'table-dark': dark,
        'table-hover': hover,
        'b-table-stacked': typeof stacked === 'boolean' && stacked,
        [`b-table-stacked-${stacked}`]: typeof stacked === 'string',
        'table-striped': striped,
        'table-sm': small,
        [`table-${tableVariant}`]: tableVariant !== null,
      },
    ]"
  >
    <slot />
  </table>
  <div
    v-else :class="{
      'table-responsive': responsive === true,
      [`table-responsive-${responsive}`]: typeof responsive === 'string',
      'b-table-sticky-header': stickyHeader,
    }"
  >
    <table
      :class="[
        tableClass,
        {
          'table-bordered': bordered,
          'table-borderless': borderless,
          [`border-${borderVariant}`]: borderVariant !== null,
          'caption-top': captionTop,
          'table-dark': dark,
          'table-hover': hover,
          'b-table-stacked': typeof stacked === 'boolean' && stacked,
          [`b-table-stacked-${stacked}`]: typeof stacked === 'string',
          'table-striped': striped,
          'table-sm': small,
          [`table-${tableVariant}`]: tableVariant !== null,
        },
      ]"
    >
      <slot />
    </table>
  </div>
</template>
