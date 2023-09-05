<script setup lang="ts">
import type { ColorVariant } from '~/types/ColorVariant'
import type { SpinnerType } from '~/types/SpinnerType'

const props = withDefaults(
  defineProps<{
    bgColor?: string
    blur?: string
    fixed?: boolean
    noCenter?: boolean
    noFade?: boolean
    noWrap?: boolean
    opacity?: number | string
    overlayTag?: string
    rounded?: boolean | string
    show?: boolean
    spinnerSmall?: boolean
    spinnerType?: SpinnerType
    spinnerVariant?: ColorVariant | null
    noSpinner?: boolean
    variant?: ColorVariant | 'white' | 'transparent' | null
    wrapTag?: string
    zIndex?: number | string
  }>(),
  {
    blur: '2px',
    bgColor: undefined,
    spinnerVariant: undefined,
    fixed: false,
    noCenter: false,
    noSpinner: false,
    noFade: false,
    noWrap: false,
    opacity: 0.85,
    overlayTag: 'div',
    rounded: false,
    show: false,
    spinnerSmall: false,
    spinnerType: 'border',
    variant: 'light',
    wrapTag: 'div',
    zIndex: 10,
  },
)

const emit = defineEmits<{
  click: [value: MouseEvent]
  hidden: []
  shown: []
}>()

const positionStyles = { top: 0, left: 0, bottom: 0, right: 0 }

const computedRounded = computed(() =>
  props.rounded === true || props.rounded === ''
    ? 'rounded'
    : props.rounded === false
      ? ''
      : `rounded-${props.rounded}`,
)

const computedVariant = computed(() =>
  props.variant !== null && !props.bgColor ? `bg-${props.variant}` : '',
)

const computedAriaBusy = computed(() => (props.show ? true : null))

const spinnerAttrs = computed(() => ({
  type: props.spinnerType,
  variant: props.spinnerVariant,
  small: props.spinnerSmall,
}))

const overlayStyles = computed(() => ({
  ...positionStyles,
  zIndex: props.zIndex || 10,
}))

const blurClasses = computed(() => [computedVariant.value, computedRounded.value])

const blurStyles = computed(() => ({
  ...positionStyles,
  opacity: props.opacity,
  backgroundColor: props.bgColor || undefined,
  backdropFilter: props.blur ? `blur(${props.blur})` : undefined,
}))

const spinWrapperStyles = computed(() =>
  props.noCenter
    ? positionStyles
    : {
        top: '50%',
        left: '50%',
        transform: 'translateX(-50%) translateY(-50%)',
      },
)
</script>

<template>
  <component :is="wrapTag" class="b-overlay-wrap position-relative" :aria-busy="computedAriaBusy">
    <slot />
    <BTransition
      :no-fade="noFade"
      :trans-props="{ enterToClass: 'show' }"
      name="fade"
      @on-after-enter="emit('shown')"
      @on-after-leave="emit('hidden')"
    >
      <component
        :is="overlayTag"
        v-if="props.show"
        class="b-overlay"
        :class="{
          'position-absolute': !props.noWrap || !props.fixed,
          'position-fixed': props.noWrap && props.fixed,
        }"
        :style="overlayStyles"
        @click="emit('click', $event)"
      >
        <div class="position-absolute" :class="blurClasses" :style="blurStyles" />

        <div class="position-absolute" :style="spinWrapperStyles">
          <slot name="overlay" v-bind="spinnerAttrs">
            <BSpinner v-if="!props.noSpinner" v-bind="spinnerAttrs" />
          </slot>
        </div>
      </component>
    </BTransition>
  </component>
</template>
