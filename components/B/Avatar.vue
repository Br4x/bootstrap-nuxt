<script setup lang="ts">
import BLink from '@/components/B/Link.vue'
import BButton from '@/components/B/Button.vue'
import { linkProps } from '@/constants/props'

const props = defineProps({
  ...linkProps,
  alt: {
    type: String,
    default: 'avatar',
  },
  ariaLabel: String,
  badge: {
    type: [Boolean, String],
    default: false,
  },
  badgeLeft: Boolean,
  badgeOffset: Boolean,
  badgeTop: Boolean,
  badgeVariant: {
    type: String,
    default: 'primary',
  },
  button: Boolean,
  buttonType: {
    type: String,
    default: 'button',
  },
  icon: String,
  rounded: {
    type: [Boolean, String],
    default: false,
  },
  size: [Number, String],
  square: Boolean,
  src: String,
  text: String,
  variant: {
    type: String,
    default: 'secondary',
  },
})

const emit = defineEmits(['imgError', 'click'])

const getBvAvatarGroup = inject('getBvAvatarGroup')

const slots = useSlots()
const { isNumber, isNumeric, isString, toFloat } = useUtils()

const SIZES = ['sm', null, 'lg']
const FONT_SIZE_SCALE = 0.4
const BADGE_FONT_SIZE_SCALE = FONT_SIZE_SCALE * 0.7

const localSrc = ref(props.src || null)

const isLink = computed(() => {
  return !props.button && !!(props.href || props.to)
})
const bvAvatarGroup = computed(() => {
  return getBvAvatarGroup
})
const computedSize = computed(() => {
  const size = bvAvatarGroup ? bvAvatarGroup.size : props.size

  const value = isString(size) && isNumeric(size) ? toFloat(size, 0) : size
  return isNumber(value) ? `${value}px` : value || null
})
const computedVariant = computed(() => {
  return bvAvatarGroup && bvAvatarGroup.variant ? bvAvatarGroup.variant : props.variant
})
const computedRounded = computed(() => {
  const square = bvAvatarGroup && bvAvatarGroup.square ? true : props.square
  const rounded = bvAvatarGroup && bvAvatarGroup.rounded ? bvAvatarGroup.rounded : props.rounded
  return square ? '0' : rounded === '' ? true : rounded || 'circle'
})
const fontStyle = computed(() => {
  // TODO replace inline style with unocss
  const fontSize = !SIZES.includes(computedSize.value) ? `calc(${computedSize} * ${FONT_SIZE_SCALE})` : null
  return fontSize ? { fontSize } : {}
})
const marginStyle = computed(() => {
  const overlapScale = bvAvatarGroup ? bvAvatarGroup.overlapScale : 0
  // TODO replace inline style with unocss
  const value = computedSize.value && overlapScale ? `calc(${computedSize.value} * -${overlapScale})` : null
  return value ? { marginLeft: value, marginRight: value } : {}
})
const badgeStyle = computed(() => {
  // TODO replace inline style with unocss
  const offset = props.badgeOffset || '0px'
  return {
    fontSize: !SIZES.includes(computedSize.value) ? `calc(${computedSize.value} * ${BADGE_FONT_SIZE_SCALE} )` : null,
    top: props.badgeTop ? offset : null,
    bottom: props.badgeTop ? null : offset,
    left: props.badgeLeft ? offset : null,
    right: props.badgeLeft ? null : offset,
  }
})

watch(() => props.src, (newValue, oldValue) => {
  if (newValue !== oldValue)
    localSrc.value = newValue || null
})

function onImgError(event: any) {
  localSrc.value = null
  emit('imgError', event)
}
function onClick(event: any) {
  emit('click', event)
}
</script>

<template>
  <component
    :is="button ? BButton : isLink ? BLink : 'span'" :class="{
      [`b-avatar-${computedSize}`]: computedSize && SIZES.indexOf(computedSize) !== -1,
      [`badge-${computedVariant}`]: !button && variant,
      'bg-blue-500 text-white hover:bg-primary': variant === 'primary',
      'bg-secondary text-white hover:bg-gray-700': variant === 'secondary',
      'bg-success text-white hover:green-600': variant === 'success',
      'bg-danger text-white hover:bg-red-700': variant === 'danger',
      'bg-warning text-black hover:bg-orange-500': variant === 'warning',
      'bg-info text-white hover:bg-teal-600': variant === 'info',
      'bg-light text-gray-800 hover:bg-gray-200': variant === 'light',
      'bg-dark text-white': variant === 'dark',
      'rounded-1/2': !square && !rounded,
      'rounded-lg': computedRounded === 'lg',
      'rounded-t': computedRounded === 'top',
      'rounded-l': computedRounded === 'left',
      'rounded-r': computedRounded === 'right',
      'rounded-b': computedRounded === 'bottom',
      'rounded': computedRounded === true || computedRounded === 'sm',
      [`rounded-${computedRounded}`]: computedRounded && computedRounded !== true,
      disabled,
    }"
    class="b-avatar relative h-10 max-h-[auto] max-w-full w-10 inline-flex shrink-0 items-center justify-center overflow-visible text-center align-middle font-normal leading-none text-[inherit]"
    :style="{ ...marginStyle, width: size, height: size }"
    :aria-label="ariaLabel || null"
    v-bind="button ? { variant, disabled, type: buttonType } : isLink ? linkProps : {}"
    @click="button || isLink ? onClick($event) : null"
  >
    <span v-if="$slots.default" class="b-avatar-custom">
      <slot />
    </span>

    <span v-else-if="src" class="b-avatar-img h-full w-full flex items-center justify-center overflow-hidden rounded-[inherit]">
      <img :src="localSrc" :alt="alt" class="object-cover" :class="{ 'w-full h-full': !variant }" @error="onImgError">
    </span>

    <i v-else-if="icon" :class="icon" :alt="alt" aria-hidden="true" />

    <span v-else-if="text" class="b-avatar-text whitespace-no-wrap h-full w-full flex items-center justify-center overflow-hidden uppercase" :style="fontStyle">
      <span>{{ text }}</span>
    </span>

    <i v-else class="i-bi-person-fill" aria-hidden="true" :alt="alt" />

    <span
      v-if="badge || badge === '' || slots.badge" class="b-avatar-badge absolute z-[1] min-h-[1.5em] min-w-[1.5em] rounded-[10em] p-[0.25em] text-[70%] font-bold leading-none" :class="{
        [`badge-${badgeVariant}`]: badgeVariant,
        'bg-blue-500 text-white hover:bg-primary': badgeVariant === 'primary',
        'bg-secondary text-white hover:bg-gray-700': badgeVariant === 'secondary',
        'bg-success text-white hover:green-600': badgeVariant === 'success',
        'bg-danger text-white hover:bg-red-700': badgeVariant === 'danger',
        'bg-warning text-black hover:bg-orange-500': badgeVariant === 'warning',
        'bg-info text-white hover:bg-teal-600': badgeVariant === 'info',
        'bg-light text-gray-800 hover:bg-gray-200': badgeVariant === 'light',
        'bg-dark text-white': badgeVariant === 'dark',
      }" :style="badgeStyle"
    >
      <slot v-if="slots.badge" name="badge" />
      <span v-else>{{ badge === true ? '' : badge }}</span>
    </span>
  </component>
</template>
