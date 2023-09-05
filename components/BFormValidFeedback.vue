<script setup lang="ts">
withDefaults(
  defineProps<{
    ariaLive?: string
    forceShow?: boolean
    id?: string
    role?: string
    text?: string
    state?: boolean | null
    tag?: string
    tooltip?: boolean
  }>(),
  {
    id: undefined,
    role: undefined,
    text: undefined,
    ariaLive: undefined,
    forceShow: false,
    tag: 'div',
    tooltip: false,
    state: null,
  },
)
</script>

<template>
  <component
    :is="tag"
    :id="id"
    :role="role"
    :aria-live="ariaLive"
    :aria-atomic="ariaLive ? true : undefined"
    :class="{
      'd-block block': forceShow === true || state === true,
      'valid-feedback': !tooltip,
      'valid-tooltip': tooltip,
    }"
  >
    <slot>
      {{ text }}
    </slot>
  </component>
</template>
