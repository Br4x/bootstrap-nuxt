<script setup lang="ts">
import { isEmptySlot } from '@/utils'

defineProps({
  noBody: {
    type: Boolean,
    default: false,
  },
  rightAlign: {
    type: Boolean,
    default: false,
  },
  tag: {
    type: String,
    default: 'div',
  },
  verticalAlign: {
    type: String,
    default: 'top',
  },
},
)
const slots = useSlots()

const hasAsideSlot = computed(() => !isEmptySlot(slots.header))
</script>

<template>
  <component
    :is="tag"
    class="media flex items-start"
  >
    <template v-if="!noBody">
      <slot />
      <BMediaBody>
        <slot name="default" />
      </BMediaBody>
      <BMediaAside v-if="hasAsideSlot" :right="rightAlign" :vertical-align="verticalAlign">
        <slot name="aside" />
      </BMediaAside>
    </template>
    <template v-else>
      <slot />
    </template>
  </component>
</template>
