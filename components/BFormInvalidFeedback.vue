<script setup lang="ts">
withDefaults(
  defineProps<{
    ariaLive?: string
    forceShow?: boolean
    text?: string
    state?: boolean | null
    tag?: string
    tooltip?: boolean
  }>(),
  {
    text: undefined,
    ariaLive: undefined,
    forceShow: false,
    tag: 'div',
    state: null,
    tooltip: false,
  },
)
</script>

<template>
  <component
    :is="tag"
    :class="{
      'd-block': forceShow === true || state === false,
      'invalid-feedback': !tooltip,
      'invalid-tooltip': tooltip,
    }"
    :aria-live="ariaLive"
    :aria-atomic="ariaLive ? true : undefined"
  >
    <slot>
      {{ text }}
    </slot>
  </component>
</template>
