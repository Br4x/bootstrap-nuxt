<script setup lang="ts">
import type { ColorVariant } from '~/types/ColorVariant'
import type { PlaceholderAnimation } from '~/types/PlaceholderAnimation'
import type { PlaceholderSize } from '~/types/PlaceholderSize'

const props = withDefaults(
  defineProps<{
    noHeader?: boolean
    headerWidth?: string | number
    headerVariant?: ColorVariant | null
    headerAnimation?: PlaceholderAnimation
    headerSize?: PlaceholderSize
    noFooter?: boolean
    footerWidth?: string | number
    footerVariant?: ColorVariant | null
    footerAnimation?: PlaceholderAnimation
    footerSize?: PlaceholderSize
    animation?: PlaceholderAnimation
    size?: PlaceholderSize
    variant?: ColorVariant | null
    noButton?: boolean
    imgBottom?: boolean
    imgSrc?: string
    imgBlankColor?: string
    imgHeight?: string | number
    noImg?: boolean
  }>(),
  {
    footerVariant: undefined,
    footerAnimation: undefined,
    footerSize: 'md',
    animation: undefined,
    size: 'md',
    variant: undefined,
    imgSrc: undefined,
    headerAnimation: undefined,
    headerSize: 'md',
    headerVariant: undefined,
    noButton: false,
    headerWidth: 100,
    footerWidth: 100,
    noHeader: false,
    noFooter: false,
    imgBlankColor: '#868e96',
    imgHeight: 100,
    imgBottom: false,
    noImg: false,
  },
)

const footerAttrs = computed(() => ({
  width: props.footerWidth,
  animation: props.footerAnimation,
  size: props.noButton ? props.footerSize : undefined,
  variant: props.footerVariant,
}))

const defaultAttrs = computed(() => ({
  animation: props.animation,
  size: props.size,
  variant: props.variant,
}))
</script>

<template>
  <BCard :img-bottom="imgBottom">
    <template v-if="!noImg" #img>
      <slot name="img">
        <BCardImg
          :blank="!imgSrc ? true : false"
          :blank-color="imgBlankColor"
          :height="!imgSrc ? imgHeight : undefined"
          :src="imgSrc"
          :top="!imgBottom"
          :bottom="imgBottom"
        />
      </slot>
    </template>

    <template v-if="!noHeader" #header>
      <slot name="header">
        <BPlaceholder
          :width="headerWidth"
          :variant="headerVariant"
          :animation="headerAnimation"
          :size="headerSize"
        />
      </slot>
    </template>
    <slot>
      <BPlaceholder cols="7" v-bind="defaultAttrs" />
      <BPlaceholder cols="4" v-bind="defaultAttrs" />
      <BPlaceholder cols="4" v-bind="defaultAttrs" />
      <BPlaceholder cols="6" v-bind="defaultAttrs" />
      <BPlaceholder cols="8" v-bind="defaultAttrs" />
    </slot>
    <template v-if="!noFooter" #footer>
      <slot name="footer">
        <BPlaceholderButton v-if="!noButton" v-bind="footerAttrs" />
        <BPlaceholder v-else v-bind="footerAttrs" />
      </slot>
    </template>
  </BCard>
</template>
