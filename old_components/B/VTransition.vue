<script>
import { isPlainObject } from '@/utils/inspect'

const NO_FADE_PROPS = {
  name: '',
  enterClass: '',
  enterActiveClass: '',
  enterToClass: 'show',
  leaveClass: 'show',
  leaveActiveClass: '',
  leaveToClass: '',
}

const FADE_PROPS = {
  ...NO_FADE_PROPS,
  enterActiveClass: 'fade',
  leaveActiveClass: 'fade',
}

export default {
  props: {
    appear: Boolean,
    // Can be overridden by user supplied `trans-props`
    mode: String,
    // Only applicable to the built in transition
    // Has no effect if `trans-props` provided
    noFade: Boolean,
    // For user supplied transitions (if needed)
    transProps: Object,
  },
  methods: {
    getTransProps() {
      let transProps = this.transProps
      if (!isPlainObject(transProps)) {
        transProps = this.noFade ? NO_FADE_PROPS : FADE_PROPS
        if (this.appear) {
        // Default the appear classes to equal the enter classes
          transProps = {
            ...transProps,
            appear: true,
            appearClass: transthis.enterClass,
            appearActiveClass: transthis.enterActiveClass,
            appearToClass: transthis.enterToClass,
          }
        }
      }
      transProps = {
        mode: this.mode,
        ...transProps,
        // We always need `css` true
        css: true,
      }
    },
  },
}
</script>

<template>
  <Transition v-bind="getTransProps()">
    <slot />
  </Transition>
</template>

<style lang="scss" scoped>

</style>
