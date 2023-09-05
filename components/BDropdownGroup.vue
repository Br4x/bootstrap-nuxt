<script setup lang="ts">
import type { ClassValue } from '~/types/ClassValue'
import type { ColorVariant } from '~/types/ColorVariant'

const props = withDefaults(
  defineProps<{
    id?: string
    ariaDescribedby?: string
    header?: string
    headerClass?: ClassValue
    headerTag?: string
    headerVariant?: ColorVariant | null
  }>(),
  {
    headerTag: 'header',
    id: undefined,
    ariaDescribedby: undefined,
    header: undefined,
    headerClass: undefined,
    headerVariant: null,
  },
)

defineOptions({
  inheritAttrs: false,
})

const headerId = computed<string | undefined>(() =>
  props.id ? `${props.id}_group_dd_header` : undefined,
)
</script>

<template>
  <li role="presentation">
    <component
      :is="headerTag"
      :id="headerId"
      class="dropdown-header"
      :class="[
        headerClass,
        {
          [`text-${headerVariant}`]: headerVariant !== null,
        },
      ]"
      :role="headerTag === 'header' ? undefined : 'heading'"
    >
      <slot name="header">
        {{ header }}
      </slot>
    </component>
    <ul
      :id="id"
      role="group"
      class="list-unstyled"
      v-bind="$attrs"
      :aria-describedby="ariaDescribedby || headerId"
    >
      <slot />
    </ul>
  </li>
</template>
