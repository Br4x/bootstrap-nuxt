<script setup lang="ts">
import { navbarInjectionKey } from '@/utils'
import type { Breakpoint } from '~/types/Breakpoint'
import type { ColorVariant } from '~/types/ColorVariant'

const props = withDefaults(
  defineProps<{
    fixed?: 'top' | 'bottom'
    print?: boolean
    sticky?: 'top' | 'bottom'
    tag?: string
    toggleable?: boolean | Breakpoint
    variant?: ColorVariant | null
    container?: 'fluid' | boolean
  }>(),
  {
    variant: null,
    sticky: undefined,
    fixed: undefined,
    print: false,
    tag: 'nav',
    toggleable: false,
    container: 'fluid',
  },
)

const computedNavbarExpand = computed<undefined | string>(() =>
  typeof props.toggleable === 'string'
    ? `navbar-expand-${props.toggleable}`
    : props.toggleable === false
      ? 'navbar-expand'
      : undefined,
)

provide(navbarInjectionKey, {
  tag: readonly(toRef(props, 'tag')),
})
</script>

<template>
  <component
    :is="tag" class="navbar" :class="{
      'd-print': print,
      [`sticky-${sticky}`]: sticky !== undefined,
      [`bg-${variant}`]: variant !== null,
      [`fixed-${fixed}`]: fixed !== undefined,
      [`${computedNavbarExpand}`]: computedNavbarExpand !== undefined,
    }" :role="props.tag === 'nav' ? undefined : 'navigation'"
  >
    <div v-if="container !== false" :class="container === true ? 'container' : 'container-fluid'">
      <slot />
    </div>
    <slot v-else />
  </component>
</template>
