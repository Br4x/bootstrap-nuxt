<script setup lang="ts">
const props = defineProps(linkProps)

const { linkProps } = useProps()

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
  <NuxtLink :class="{ active, disabled }" :to="href" :rel="rel" :target="target" :aria-disabled="disabled ? 'true' : null" @click="onClick">
    <slot />
  </NuxtLink>
</template>

<style lang="scss" scoped>

</style>
