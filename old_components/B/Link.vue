<script setup lang="ts">
import { useCurrentElement } from '@vueuse/core'
import { linkProps } from '@/constants/props'

const props = defineProps(linkProps)

const $el = useCurrentElement()

function onClick(event: Event) {
  const eventIsEvent = event instanceof Event
  if (eventIsEvent && props.disabled) {
    event.preventDefault()
    event.stopPropagation()
    event.stopImmediatePropagation()
  }
}
function focus() {
  $el.value.focus()
}
function blur() {
  $el.value.blur()
}
</script>

<template>
  <nuxt-link :class="{ active, disabled }" :to="href" :rel="rel" :target="target" :aria-disabled="disabled ? 'true' : null" @click="onClick">
    <slot />
  </nuxt-link>
</template>

<style lang="scss" scoped>

</style>
