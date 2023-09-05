<script setup lang="ts">
withDefaults(
  defineProps<{
    animation?: string
    columns?: number
    hideHeader?: boolean
    rows?: number
    showFooter?: boolean
    tableProps?: Object
  }>(),
  {
    columns: 5,
    rows: 3,
    showFooter: false,
    hideHeader: false,
  },
)
</script>

<template>
  <BTableSimple v-bind="tableProps">
    <template v-if="!hideHeader" #thead>
      <tr>
        <th v-for="n in columns" :key="`header-${n}`">
          <BSkeleton :animation="animation" />
        </th>
      </tr>
    </template>
    <template #tbody>
      <tr v-for="row in rows" :key="`row-${row}`">
        <td v-for="n in columns" :key="`cell-${row}-${n}`">
          <BSkeleton :animation="animation" width="75%" />
        </td>
      </tr>
    </template>
    <template v-if="showFooter" #tfoot>
      <tr>
        <th v-for="n in columns" :key="`footer-${n}`">
          <BSkeleton :animation="animation" />
        </th>
      </tr>
    </template>
  </BTableSimple>
</template>

<style scoped>
/* Your component-specific styles go here */
</style>
