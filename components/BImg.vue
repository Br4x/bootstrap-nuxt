<script setup lang="ts">
import type { BImgProps } from '~/types/ComponentProps'

const props = withDefaults(defineProps<BImgProps>(), {
  sizes: undefined,
  src: undefined,
  srcset: undefined,
  width: undefined,
  height: undefined,
  blank: false,
  lazy: false,
  blankColor: 'transparent',
  block: false,
  center: false,
  fluid: false,
  fluidGrow: false,
  end: false,
  start: false,
  rounded: false,
  thumbnail: false,
})

const BLANK_TEMPLATE
  = '<svg width="%{w}" height="%{h}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %{w} %{h}" preserveAspectRatio="none">'
  + '<rect width="100%" height="100%" style="fill:%{f};"></rect>'
  + '</svg>'

const computedSrcset = computed<string | undefined>(() =>
  typeof props.srcset === 'string'
    ? props.srcset
      .split(',')
      .filter(x => x)
      .join(',')
    : Array.isArray(props.srcset)
      ? props.srcset.filter(x => x).join(',')
      : undefined,
)

const computedSizes = computed<string | undefined>(() =>
  typeof props.sizes === 'string'
    ? props.sizes
      .split(',')
      .filter(x => x)
      .join(',')
    : Array.isArray(props.sizes)
      ? props.sizes.filter(x => x).join(',')
      : undefined,
)

// TODO go through an makes number props type string | number
// May be able to replace the internal util function with vueuse useToString/useToNumber utils
const computedDimentions = computed<{ height: number | undefined; width: number | undefined }>(() => {
  const parser = (str: string | number | undefined): number | undefined =>
    str === undefined
      ? undefined
      : typeof str === 'number'
        ? str
        : Number.parseInt(str, 10) || undefined
  const width = parser(props.width)
  const height = parser(props.height)
  if (props.blank) {
    if (width !== undefined && height === undefined)
      return { height: width, width }

    if (width === undefined && height !== undefined)
      return { height, width: height }

    if (width === undefined && height === undefined)
      return { height: 1, width: 1 }
  }
  return {
    width,
    height,
  }
})

const computedBlankImgSrc = computed(() =>
  makeBlankImgSrc(computedDimentions.value.width, computedDimentions.value.height, props.blankColor),
)

const alignment = computed<'float-start' | 'float-end' | 'mx-auto' | undefined>(() =>
  props.start
    ? 'float-start'
    : props.end
      ? 'float-end'
      : props.center
        ? 'mx-auto'
        : undefined,
)

function makeBlankImgSrc(width: number | undefined,
  height: number | undefined,
  color: string): string {
  const src = encodeURIComponent(
    BLANK_TEMPLATE.replace('%{w}', String(width))
      .replace('%{h}', String(height))
      .replace('%{f}', color),
  )
  return `data:image/svg+xml;charset=UTF-8,${src}`
}
</script>

<template>
  <img
    :class="{
      'img-thumbnail': thumbnail,
      'img-fluid': fluid || fluidGrow,
      'w-100': fluidGrow,
      'rounded': rounded === '' || rounded === true,
      [`rounded-${rounded}`]: typeof rounded === 'string' && rounded !== '',
      [`${alignment}`]: alignment !== undefined,
      'd-block block': block || center,
    }"
    :src="!blank ? src : computedBlankImgSrc"
    :width="computedDimentions.width || undefined"
    :height="computedDimentions.height || undefined"
    :srcset="!blank ? computedSrcset : undefined"
    :sizes="!blank ? computedSizes : undefined"
    :loading="lazy ? 'lazy' : 'eager'"
  >
</template>
