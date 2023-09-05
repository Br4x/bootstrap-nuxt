<script setup lang="ts">
import { type TransitionProps } from 'vue'

import type { TransitionMode } from '~/types/TransitionMode'

const props = withDefaults(
  defineProps<{
    appear?: boolean
    mode?: TransitionMode
    noFade?: boolean
    transProps?: TransitionProps
  }>(),
  {
    appear: false,
    noFade: false,
    transProps: undefined,
    mode: undefined,
  },
)

const fadeProperties = computed(() => {
  const NO_FADE_PROPS = {
    name: '',
    enterActiveClass: '',
    enterToClass: '',
    leaveActiveClass: '',
    leaveToClass: 'showing',
    enterFromClass: 'showing',
    leaveFromClass: '',
  }
  const FADE_PROPS = {
    ...NO_FADE_PROPS,
    enterActiveClass: 'fade showing',
    leaveActiveClass: 'fade showing',
  }
  return props.noFade ? NO_FADE_PROPS : FADE_PROPS
})

const baseProperties = computed(() => ({ mode: props.mode, css: true, ...fadeProperties.value }))

const computedAttrs = computed(() =>
  props.transProps !== undefined
    ? {
        // Order matters here since the props.transProps would get overwritten if it came first
        // But the goal of props.transProps is to overwrite base properties
        ...baseProperties.value,
        ...props.transProps,
      }
    : props.appear
      ? {
          ...baseProperties.value,
          appear: true,
          appearActiveClass: fadeProperties.value.enterActiveClass,
          appearToClass: fadeProperties.value.enterToClass,
        }
      : baseProperties.value,
)
</script>

<template>
  <Transition v-bind="computedAttrs">
    <slot />
  </Transition>
</template>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s linear;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
