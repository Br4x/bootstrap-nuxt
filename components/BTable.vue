<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import BTableLite from './BTableLite.vue'

import type { BTableProvider } from '~/types/BTableProvider'
import type { BTableSortCompare } from '~/types/BTableSortCompare'
import type { Breakpoint } from '~/types/Breakpoint'
import type { ColorVariant } from '~/types/ColorVariant'
import type { LiteralUnion } from '~/types/LiteralUnion'
import type { TableField } from '~/types/TableField'
import type { TableFieldObject } from '~/types/TableFieldObject'
import type { TableItem } from '~/types/TableItem'
import type { VerticalAlign } from '~/types/VerticalAlign'

type NoProviderTypes = 'paging' | 'sorting' | 'filtering'

const props = withDefaults(
  defineProps<{
    align?: VerticalAlign
    caption?: string
    captionTop?: boolean
    borderless?: boolean
    bordered?: boolean
    borderVariant?: ColorVariant | null
    dark?: boolean
    fields?: TableField[]
    footClone?: boolean
    hover?: boolean
    items?: TableItem[]
    provider?: BTableProvider
    sortCompare?: BTableSortCompare
    noProvider?: NoProviderTypes[]
    noProviderPaging?: boolean
    noProviderSorting?: boolean
    noProviderFiltering?: boolean
    responsive?: boolean | Breakpoint
    small?: boolean
    striped?: boolean
    stacked?: boolean | Breakpoint
    labelStacked?: boolean
    variant?: ColorVariant | null
    sortBy?: string
    sortDesc?: boolean
    sortInternal?: boolean
    selectable?: boolean
    stickySelect?: boolean
    selectHead?: boolean | string
    selectMode?: 'multi' | 'single' | 'range'
    selectionVariant?: ColorVariant | null
    stickyHeader?: boolean
    busy?: boolean
    busyLoadingText?: string
    showEmpty?: boolean
    // TODO number | string => with useToNumber
    perPage?: number
    // TODO number | string => with useToNumber
    currentPage?: number
    filter?: string
    filterable?: string[]
    emptyText?: string
    emptyFilteredText?: string
    fieldColumnClass?: (field: TableFieldObject) => Record<string, any>[]
    tbodyTrClass?: (item: TableItem | null, type: string) => string | any[] | null | undefined
  }>(),
  {
    perPage: undefined,
    sortBy: undefined,
    variant: undefined,
    borderVariant: undefined,
    caption: undefined,
    align: undefined,
    filter: undefined,
    filterable: undefined,
    provider: undefined,
    sortCompare: undefined,
    noProvider: undefined,
    noProviderPaging: false,
    noProviderSorting: false,
    noProviderFiltering: false,
    captionTop: false,
    borderless: false,
    bordered: false,
    dark: false,
    fields: () => [],
    footClone: false,
    hover: false,
    items: () => [],
    responsive: false,
    small: false,
    striped: false,
    labelStacked: false,
    stacked: false,
    sortDesc: false,
    sortInternal: true,
    selectable: false,
    stickySelect: false,
    selectHead: true,
    selectMode: 'single',
    selectionVariant: 'primary',
    stickyHeader: false,
    busy: false,
    busyLoadingText: 'Loading...',
    showEmpty: false,
    currentPage: 1,
    emptyText: 'There are no records to show',
    emptyFilteredText: 'There are no records matching your request',
    fieldColumnClass: undefined,
    tbodyTrClass: undefined,
  },
)

const emit = defineEmits<{
  'headClicked': [
    key: TableFieldObject['key'],
    field: TableField,
    event: MouseEvent,
    isFooter: boolean,
  ]
  'rowClicked': [item: TableItem, index: number, event: MouseEvent]
  'rowDblClicked': [item: TableItem, index: number, event: MouseEvent]
  'rowHovered': [item: TableItem, index: number, event: MouseEvent]
  'rowUnhovered': [item: TableItem, index: number, event: MouseEvent]
  'rowSelected': [value: TableItem]
  'rowUnselected': [value: TableItem]
  'selection': [value: TableItem[]]
  'update:busy': [value: boolean]
  'update:sortBy': [value: string]
  'update:sortDesc': [value: boolean]
  'sorted': [sortBy: string, isDesc: boolean]
  'filtered': [value: TableItem[]]
}>()

const sortByModel = useVModel(props, 'sortBy', emit, { passive: true })
const busyModel = useVModel(props, 'busy', emit, { passive: true })
const sortDescModel = useVModel(props, 'sortDesc', emit, { passive: true })

const slots = useSlots()

const liteTable = ref<null | InstanceType<typeof BTableLite>>(null)

const isFilterableTable = computed(() => props.filter !== undefined && props.filter !== '')

const selectedItems = ref<Set<TableItem>>(new Set([]))
const isSelecting = computed(() => selectedItems.value.size > 0)

const isSortable = computed(() => {
  const hasSortableFields
    = props.fields.filter(field => (typeof field === 'string' ? false : field.sortable)).length > 0
  return hasSortableFields || props.sortBy !== undefined
})
const usesProvider = computed(() => props.provider !== undefined)

const tableClasses = computed(() => ({
  'b-table-sortable': isSortable.value,
  'b-table-sort-desc': isSortable.value && sortDescModel.value === true,
  'b-table-sort-asc': isSortable.value && sortDescModel.value === false,
  'b-table-busy': busyModel.value,
  'b-table-selectable': props.selectable,
  [`b-table-select-${props.selectMode}`]: props.selectable,
  'b-table-selecting user-select-none': props.selectable && isSelecting.value,
}))

const requireItemsMapping = computed(() => isSortable.value && props.sortInternal === true)
const addSelectableCell = computed(
  () => props.selectable && (!!props.selectHead || slots.selectHead !== undefined),
)

const {
  computedItems,
  computedDisplayItems,
  updateInternalItems,
  filteredHandler,
  notifyFilteredItems,
} = useTableItems(
  props,
  {
    isFilterableTable,
    isSortable,
    requireItemsMapping,
    sortDescModel,
  },
  usesProvider,
  sortByModel,
)

filteredHandler.value = async (items) => {
  if (usesProvider.value) {
    await callItemsProvider()
    return
  }
  emit('filtered', items)
}

function onRowClick(row: TableItem, index: number, e: MouseEvent) {
  handleRowSelection(row, index, e.shiftKey, e.ctrlKey, e.metaKey)
  emit('rowClicked', row, index, e)
}

function onFieldHeadClick(fieldKey: LiteralUnion<string>,
  field: TableField,
  event: MouseEvent,
  isFooter = false) {
  emit('headClicked', fieldKey, field, event, isFooter)
  handleFieldSorting(field)
}

function handleFieldSorting(field: TableField) {
  if (!isSortable.value)
    return

  const fieldKey = typeof field === 'string' ? field : field.key
  const fieldSortable = typeof field === 'string' ? false : field.sortable
  if (isSortable.value === true && fieldSortable === true) {
    const sortDesc = !sortDescModel.value
    sortByModel.value = fieldKey
    sortDescModel.value = sortDesc
    emit('sorted', fieldKey, sortDesc)
  }
}

async function callItemsProvider() {
  if (!usesProvider.value || !props.provider || busyModel.value)
    return
  busyModel.value = true
  const context = new Proxy(
    {
      currentPage: props.currentPage,
      filter: props.filter,
      sortBy: props.sortBy,
      sortDesc: props.sortDesc,
      perPage: props.perPage,
    },
    {
      get: (target: any, prop) => (prop in target ? target[prop] : undefined),
      set: () => {
        console.error('BTable provider context is a read-only object.')
        return true
      },
    },
  )
  const response = props.provider(context, updateInternalItems)
  if (response === undefined)
    return
  if (response instanceof Promise) {
    try {
      const items = await response
      if (!Array.isArray(items))
        return
      const internalItems = await updateInternalItems(items)
      return internalItems
    }
    finally {
      if (busyModel.value)
        busyModel.value = false
    }
  }

  try {
    const internalItems = await updateInternalItems(response)
    return internalItems
  }
  finally {
    if (busyModel.value)
      busyModel.value = false
  }
}

function getFieldColumnClasses(field: TableFieldObject) {
  return [
    {
      'b-table-sortable-column': isSortable.value && field.sortable,
    },
  ]
}

function getRowClasses(item: TableItem | null, type: string): string | any[] | null | undefined {
  const classesArray = [
    props.selectable && item && selectedItems.value.has(item)
      ? `selected table-${props.selectionVariant}`
      : null,
  ]

  if (props.tbodyTrClass) {
    const extraClasses = props.tbodyTrClass(item, type)
    if (extraClasses)
      classesArray.push(...(typeof extraClasses === 'string' ? [extraClasses] : extraClasses))
  }
  return classesArray
}

function getBusyRowClasses() {
  const classesArray = [{ 'b-table-static-busy': computedItems.value.length === 0 }]

  if (props.tbodyTrClass) {
    const extraClasses = props.tbodyTrClass(null, 'table-busy')
    if (extraClasses)
      classesArray.push(...(typeof extraClasses === 'string' ? [extraClasses] : extraClasses))
  }
  return classesArray
}

function notifySelectionEvent() {
  if (!props.selectable)
    return
  emit('selection', Array.from(selectedItems.value))
}

function handleRowSelection(row: TableItem,
  index: number,
  shiftClicked = false,
  ctrlClicked = false,
  metaClicked = false) {
  if (!props.selectable)
    return

  if (shiftClicked && props.selectMode === 'range' && selectedItems.value.size > 0) {
    const lastSelectedItem = Array.from(selectedItems.value).pop()
    const lastSelectedIndex = props.items.findIndex(i => i === lastSelectedItem)
    const selectStartIndex = Math.min(lastSelectedIndex, index)
    const selectEndIndex = Math.max(lastSelectedIndex, index)
    props.items.slice(selectStartIndex, selectEndIndex + 1).forEach((item) => {
      if (!selectedItems.value.has(item)) {
        selectedItems.value.add(item)
        emit('rowSelected', item)
      }
    })
  }
  else if (ctrlClicked || metaClicked) {
    if (selectedItems.value.has(row)) {
      selectedItems.value.delete(row)
      emit('rowUnselected', row)
    }
    else if (props.selectMode === 'range' || props.selectMode === 'multi') {
      selectedItems.value.add(row)
      emit('rowSelected', row)
    }
    else {
      selectedItems.value.forEach((item) => {
        emit('rowUnselected', item)
      })
      selectedItems.value.clear()
      selectedItems.value.add(row)
      emit('rowSelected', row)
    }
  }
  else {
    selectedItems.value.forEach((item) => {
      emit('rowUnselected', item)
    })
    selectedItems.value.clear()
    selectedItems.value.add(row)
    emit('rowSelected', row)
  }

  notifySelectionEvent()
}

function selectAllRows() {
  if (!props.selectable)
    return
  const unselectableItems = selectedItems.value.size > 0 ? Array.from(selectedItems.value) : []
  selectedItems.value = new Set([...props.items])
  selectedItems.value.forEach((item) => {
    if (unselectableItems.includes(item))
      return
    emit('rowSelected', item)
  })
  notifySelectionEvent()
}

function clearSelected() {
  if (!props.selectable)
    return
  selectedItems.value.forEach((item) => {
    emit('rowUnselected', item)
  })
  selectedItems.value = new Set([])
  notifySelectionEvent()
}

function selectRow(index: number) {
  if (!props.selectable)
    return
  const item = props.items[index]
  if (!item || selectedItems.value.has(item))
    return
  selectedItems.value.add(item)
  emit('rowSelected', item)
  notifySelectionEvent()
}

function unselectRow(index: number) {
  if (!props.selectable)
    return
  const item = props.items[index]
  if (!item || !selectedItems.value.has(item))
    return
  selectedItems.value.delete(item)
  emit('rowUnselected', item)
  notifySelectionEvent()
}

async function providerPropsWatch(prop: string, val: any, oldVal: any) {
  if (val === oldVal)
    return

  // stop provide when paging
  const inNoProvider = (key: NoProviderTypes) => props.noProvider && props.noProvider.includes(key)
  const notifyFiltered = !['currentPage', 'perPage'].includes(prop)
  const noProvideWhenPaging
    = ['currentPage', 'perPage'].includes(prop)
    && (inNoProvider('paging') || props.noProviderPaging === true)
  const noProvideWhenFiltering
    = ['filter'].includes(prop)
    && (inNoProvider('filtering') || props.noProviderFiltering === true)
  const noProvideWhenSorting
    = ['sortBy', 'sortDesc'].includes(prop)
    && (inNoProvider('sorting') || props.noProviderSorting === true)

  if (noProvideWhenPaging || noProvideWhenFiltering || noProvideWhenSorting)
    return

  await callItemsProvider()

  if (notifyFiltered)
    notifyFilteredItems()
}

watch(
  () => props.filter,
  (filter, oldFilter) => {
    if (filter === oldFilter || usesProvider.value)
      return
    if (!filter)
      emit('filtered', computedItems.value)
  },
)

watch(
  () => props.filter,
  (val, oldVal) => providerPropsWatch('filter', val, oldVal),
)
watch(
  () => props.currentPage,
  (val, oldVal) => providerPropsWatch('currentPage', val, oldVal),
)
watch(
  () => props.perPage,
  (val, oldVal) => providerPropsWatch('perPage', val, oldVal),
)
watch(
  () => props.sortBy,
  (val, oldVal) => providerPropsWatch('sortBy', val, oldVal),
)
watch(
  () => props.sortDesc,
  (val, oldVal) => providerPropsWatch('sortDesc', val, oldVal),
)

onMounted(callItemsProvider)

defineExpose({
  selectAllRows,
  clearSelected,
  selectRow,
  unselectRow,
  refresh: callItemsProvider,
})
</script>

<template>
  <BTableLite
    ref="liteTable"
    v-bind="props"
    v-model:busy="busyModel"
    :items="computedDisplayItems"
    :table-classes="tableClasses"
    :tbody-tr-class="getRowClasses"
    :field-column-class="getFieldColumnClasses"
    :virtual-fields="props.selectable ? 1 : 0"
    @head-clicked="onFieldHeadClick"
    @row-clicked="onRowClick"
  >
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
    <template #field-prefix="scope">
      <slot
        name="sort-icon"
        :field="scope.field"
        :sort-by="sortByModel"
        :selected="scope.field.key === sortByModel"
        :is-desc="sortDescModel"
        :direction="sortDescModel ? 'desc' : 'asc'"
      >
        <span
          v-if="isSortable && scope.field.sortable"
          class="b-table-sort-icon"
          :class="{
            sorted: scope.field.key === sortByModel,
            [`sorted-${sortDescModel ? 'desc' : 'asc'}`]: scope.field.key === sortByModel,
          }"
        />
      </slot>
    </template>
    <template #thead-tr-prefix>
      <th
        v-if="addSelectableCell"
        class="b-table-selection-column"
        :class="{
          'b-table-sticky-column': props.stickySelect,
        }"
      >
        <slot name="select-head">
          {{ typeof selectHead === 'boolean' ? 'Selected' : selectHead }}
        </slot>
      </th>
    </template>
    <template #tbody-tr-prefix="scope">
      <td
        v-if="addSelectableCell"
        class="b-table-selection-column"
        :class="{
          'b-table-sticky-column': props.stickySelect,
        }"
      >
        <slot name="select-cell">
          <span
            class="b-table-selection-icon"
            :class="selectedItems.has(scope.item) ? `text-${props.selectionVariant} selected` : ''"
          >🗹</span>
        </slot>
      </td>
    </template>
    <template #tbody-prefix="scope">
      <tr v-if="busyModel" class="b-table-busy-slot" :class="getBusyRowClasses()">
        <td :colspan="scope.fieldsTotal">
          <slot name="table-busy">
            <div class="d-flex justify-content-center align-items-center gap-2">
              <BSpinner class="align-middle" />
              <strong>{{ busyLoadingText }}</strong>
            </div>
          </slot>
        </td>
      </tr>
    </template>
  </BTableLite>
</template>

<style lang="scss" scoped>
.b-table-stacked-label {
  display: none;
  font-weight: bold;
}

.b-table-sticky-header,
.table-responsive,
[class*="table-responsive-"] {
  // Move the table bottom margin to the wrapper

  > .table {
    // Reset `margin-bottom` to we don't get a space after
    // the table inside the scroll area
    margin-bottom: 0;
  }
}

.b-table-sticky-header {
  overflow-y: auto;
  // Annoyingly, when overflow-y is set, browsers convert
  // 'overflow-x: visible' to 'overflow-x: auto' - so it becomes
  // responsive in the x axis automatically
  // Default `max-height` before a scrollbar will show
  // We don't use `height` as table could be shorter than this value
}

@media print {
  // Override any styles (including inline styles)
  // when printing
  .b-table-sticky-header {
    overflow-y: visible !important;
    max-height: none !important;
  }
}

@supports (position: sticky) {
  // Positioning of sticky headers
  .b-table-sticky-header > .table.b-table > thead > tr > th {
    // Header cells need to be sticky on top
    position: sticky;
    top: 0;
    z-index: 2;
  }

  // Positioning of sticky columns
  // Sticky columns only work when table has sticky
  // headers and/or is responsive
  .b-table-sticky-header,
  .table-responsive,
  [class*="table-responsive-"] {
    > .table.b-table {
      > thead,
      > tbody,
      > tfoot {
        > tr > .b-table-sticky-column {
          position: sticky;
          left: 0;
        }
      }

      > thead {
        > tr > .b-table-sticky-column {
          // z-index needs to be higher than sticky columns and
          // sticky headers for correct layering
          z-index: 5;
        }
      }

      > tbody,
      > tfoot {
        > tr > .b-table-sticky-column {
          // z-index needs to be lower than sticky header that
          // is also a sticky column
          z-index: 2;
        }
      }
    }
  }
}

.table.b-table > tbody > tr > .table-b-table-default,
.table.b-table > tfoot > tr > .table-b-table-default,
.table.b-table > thead > tr > .table-b-table-default {
  color: #212529;
  background-color: #fff;
}

.table th {
  &.b-table-sortable-column {
    cursor: pointer;
  }
}

.b-table {
  &.b-table-selectable {
    td {
      cursor: pointer;
    }
  }

  &.b-table-busy {
    position: relative;

    .b-table-busy-slot {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ffffffa8;

      & > td {
        border: none;
        padding: 0;
      }

      &.b-table-static-busy {
        position: initial;
        width: 100%;
        display: table-row;
      }
    }
  }

  &.b-table-sortable {
    &.b-table-sort-asc .sorted.b-table-sort-icon::before {
      content: "▲";
    }

    &.b-table-sort-desc .sorted.b-table-sort-icon::before {
      content: "▼";
    }
  }
}
</style>
