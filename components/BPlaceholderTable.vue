<script setup lang="ts">
import { useToNumber } from '@vueuse/core'

import type { ColorVariant } from '~/types/ColorVariant'
import type { PlaceholderAnimation } from '~/types/PlaceholderAnimation'
import type { PlaceholderSize } from '~/types/PlaceholderSize'

const props = withDefaults(
  defineProps<{
    rows?: string | number
    columns?: string | number
    cellWidth?: string | number
    size?: PlaceholderSize
    animation?: PlaceholderAnimation
    variant?: ColorVariant | null
    headerColumns?: string | number
    hideHeader?: boolean
    headerCellWidth?: string | number
    headerSize?: PlaceholderSize
    headerAnimation?: PlaceholderAnimation
    headerVariant?: ColorVariant | null
    footerColumns?: string | number
    showFooter?: boolean
    footerCellWidth?: string | number
    footerSize?: PlaceholderSize
    footerAnimation?: PlaceholderAnimation
    footerVariant?: ColorVariant | null
  }>(),
  {
    headerSize: 'md',
    headerAnimation: undefined,
    headerVariant: undefined,
    footerColumns: undefined,
    footerSize: 'md',
    footerAnimation: undefined,
    footerVariant: undefined,
    size: 'md',
    animation: undefined,
    variant: undefined,
    headerColumns: undefined,
    columns: 5,
    rows: 3,
    cellWidth: 100,
    showFooter: false,
    footerCellWidth: 100,
    hideHeader: false,
    headerCellWidth: 100,
  },
)

const columnsToNumber = useToNumber(() => props.columns)
const rowsToNumber = useToNumber(() => props.rows)
const computedHeaderColumns = computed(() => props.headerColumns ?? NaN)
const computedFooterColumns = computed(() => props.footerColumns ?? NaN)
const headerColumnsNumber = useToNumber(computedHeaderColumns)
const footerColumnsNumber = useToNumber(computedFooterColumns)

const columnsNumber = computed<number>(() => columnsToNumber.value || 5)
const rowsNumber = computed<number>(() => rowsToNumber.value || 3)

const computedHeaderColumnsLength = computed<number>(() =>
  props.headerColumns === undefined ? columnsNumber.value : headerColumnsNumber.value,
)
const computedFooterColumnsLength = computed<number>(() =>
  props.footerColumns === undefined ? columnsNumber.value : footerColumnsNumber.value,
)
</script>

<template>
  <BTableSimple>
    <slot v-if="!hideHeader" name="thead">
      <thead>
        <tr>
          <th v-for="(_, i) in computedHeaderColumnsLength" :key="i">
            <BPlaceholder
              :size="headerSize"
              :variant="headerVariant"
              :animation="headerAnimation"
              :width="headerCellWidth"
            />
          </th>
        </tr>
      </thead>
    </slot>
    <slot>
      <tbody>
        <tr v-for="(_, j) in rowsNumber" :key="j">
          <td v-for="(__, k) in columnsNumber" :key="k">
            <BPlaceholder
              :size="size"
              :variant="variant"
              :animation="animation"
              :width="cellWidth"
            />
          </td>
        </tr>
      </tbody>
    </slot>
    <slot v-if="showFooter" name="tfoot">
      <tfoot>
        <tr>
          <th v-for="(_, l) in computedFooterColumnsLength" :key="l">
            <BPlaceholder
              :size="footerSize"
              :variant="footerVariant"
              :animation="footerAnimation"
              :width="footerCellWidth"
            />
          </th>
        </tr>
      </tfoot>
    </slot>
  </BTableSimple>
</template>
