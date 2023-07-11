<script setup lang="ts">
import { linkProps } from '@/constants/props'

const props = defineProps({
  ...linkProps,
  html: String,
  text: String,
  ariaCurrent: {
    type: String,
    default: 'location',
  },
})

const BLink = resolveComponent('BLink')
</script>

<template>
  <component :is="active ? 'span' : BLink" v-if="!(text || html)" v-bind="props" :aria-current=" active ? ariaCurrent : null">
    <slot />
  </component>
  <component :is="active ? 'span' : BLink" v-else v-bind="props" :aria-current=" active ? ariaCurrent : null" v-html="html || text" />
</template>
