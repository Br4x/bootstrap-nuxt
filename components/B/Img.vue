<script setup>
import { imgProps } from '@/constants/props'

const props = defineProps(imgProps)

const { toInteger, identity, concat } = useUtils()

const src = ref(props.src)
const alt = props.alt
const thumbnail = props.thumbnail
const fluid = props.fluid
const fluidGrow = props.fluidGrow
const rounded = props.rounded
const isBlock = ref(props.block)

let width = toInteger(props.width) || null
let height = toInteger(props.height) || null
let srcset = concat(props.srcset).filter(identity).join(',')
let sizes = concat(props.sizes).filter(identity).join(',')

if (props.blank) {
  if (!height && width)
    height = width
  else if (!width && height)
    width = height

  if (!width && !height) {
    width = 1
    height = 1
  }
  src.value = makeBlankImgSrc(width, height, props.blankColor || 'transparent')
  srcset = null
  sizes = null
}

function makeBlankImgSrc(width, height, color) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none"><rect width="100%" height="100%" style="fill:${color};"></rect></svg>`)}`
}
</script>

<template>
  <img
    :src="src" :alt="alt" :width="width ? width.toString() : null" :height="height ? height.toString() : null"
    :srcset="srcset || null" :sizes="sizes || null" :class="{
      'img-thumbnail': thumbnail,
      'img-fluid': fluid || fluidGrow,
      'w-100': fluidGrow,
      'rounded': rounded === '' || rounded === true,
      [`rounded-${rounded}`]: typeof rounded === 'string' && rounded !== '',
      'float-right': right,
      'float-left': left,
      'mx-auto': center,
      'd-block': isBlock,
    }"
  >
</template>
