<script setup lang="ts">
import { listGroupInjectionKey } from '@/utils'

import type { Breakpoint } from '~/types/Breakpoint'

const props = withDefaults(
  defineProps<{
    flush?: boolean
    horizontal?: boolean | Breakpoint
    numbered?: boolean
    tag?: string
  }>(),
  {
    flush: false,
    horizontal: false,
    numbered: false,
    tag: 'div',
  },
)

const horizontal = computed(() => props.flush ? false : props.horizontal)

provide(listGroupInjectionKey, {
  numbered: readonly(toRef(props, 'numbered')),
})
</script>

<template>
  <component
    :is="numbered === true ? 'ol' : tag" class="list-group" :class="{
      'list-group-flush': flush,
      'list-group-horizontal': horizontal === true,
      [`list-group-horizontal-${horizontal}`]: typeof horizontal === 'string',
      'list-group-numbered': numbered,
    }"
  >
    <slot />
  </component>
</template>
