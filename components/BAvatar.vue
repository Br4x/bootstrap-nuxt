<script setup lang="ts">
import { type CSSProperties, type StyleValue, computed, inject, useSlots } from 'vue'
import BLink from './BLink.vue'
import { avatarGroupInjectionKey, isEmptySlot, isLink, isNumeric, pick, toFloat } from '@/utils'

import type { ButtonType } from '~/types/ButtonType'
import type { ColorVariant } from '~/types/ColorVariant'
import type { BLinkProps } from '~/types/ComponentProps'
import type { Size } from '~/types/Size'
import type { TextColorVariant } from '~/types/TextColorVariant'

const props = withDefaults(
  defineProps<
    {
      alt?: string
      badge?: boolean | string
      badgeLeft?: boolean
      badgeOffset?: string
      badgeTop?: boolean
      badgeVariant?: ColorVariant | null
      button?: boolean
      buttonType?: ButtonType
      disabled?: boolean
      icon?: string
      rounded?: boolean | string
      size?: Size | string // TODO number --> compat
      square?: boolean
      src?: string
      text?: string
      textVariant?: TextColorVariant | null
      variant?: ColorVariant | null
    } & Omit<BLinkProps, 'event' | 'routerTag'>
  >(),
  {
    badgeOffset: undefined,
    icon: undefined,
    size: undefined,
    src: undefined,
    text: undefined,
    textVariant: null,
    alt: 'avatar',
    badge: false,
    badgeLeft: false,
    badgeTop: false,
    badgeVariant: 'primary',
    button: false,
    buttonType: 'button',
    disabled: false,
    rounded: 'circle',
    square: false,
    variant: 'secondary',
    // Link props
    active: undefined,
    activeClass: 'router-link-active',
    append: false,
    href: undefined,
    // noPrefetch: {type: [Boolean, String] as PropType<boolean>, default: false},
    // prefetch: {type: [Boolean, String] as PropType<boolean>, default: null},
    rel: undefined,
    replace: false,
    routerComponentName: 'router-link',
    target: '_self',
    to: undefined,
    opacity: undefined,
    opacityHover: undefined,
    underlineVariant: null,
    underlineOffset: undefined,
    underlineOffsetHover: undefined,
    underlineOpacity: undefined,
    underlineOpacityHover: undefined,
  },
)

const emit = defineEmits<{
  'click': [value: MouseEvent]
  'imgError': [value: Event]
}>()

const slots = useSlots()

const parentData = inject(avatarGroupInjectionKey, null)

const SIZES = ['sm', null, 'lg']
const FONT_SIZE_SCALE = 0.4
const BADGE_FONT_SIZE_SCALE = FONT_SIZE_SCALE * 0.7

const hasDefaultSlot = computed(() => !isEmptySlot(slots.default))
const hasBadgeSlot = computed(() => !isEmptySlot(slots.badge))

const computedLink = computed<boolean>(() => isLink(props))

const computedSize = computed<string | null>(
  () => parentData?.size.value ?? computeSize(props.size),
)

const computedVariant = computed<ColorVariant | null>(
  () => parentData?.variant.value ?? props.variant,
)

const isRound = computed<string | boolean>(() => parentData?.rounded.value ?? props.rounded)

const computedLinkProps = computed(() =>
  computedLink.value
    ? pick(props, [
      'active',
      'activeClass',
      'append',
      'href',
      'rel',
      'replace',
      'routerComponentName',
      'target',
      'to',
      'variant',
      'opacity',
      'opacityHover',
      'underlineVariant',
      'underlineOffset',
      'underlineOffsetHover',
      'underlineOpacity',
      'underlineOpacityHover',
    ])
    : {},
)

const badgeStyle = computed<StyleValue>(() => {
  const offset = props.badgeOffset || '0px'
  const fontSize
    = !SIZES.includes(computedSize.value || null)
      ? `calc(${computedSize.value} * ${BADGE_FONT_SIZE_SCALE})`
      : ''
  return {
    fontSize: fontSize || '',
    top: props.badgeTop ? offset : '',
    bottom: props.badgeTop ? '' : offset,
    left: props.badgeLeft ? offset : '',
    right: props.badgeLeft ? '' : offset,
  }
})

const textFontStyle = computed<StyleValue>(() => {
  const fontSize
    = !SIZES.includes(computedSize.value || null)
      ? `calc(${computedSize.value} * ${FONT_SIZE_SCALE})`
      : null
  return fontSize ? { fontSize } : {}
})

const marginStyle = computed(() => {
  const overlapScale = parentData?.overlapScale?.value || 0

  const value
    = computedSize.value && overlapScale ? `calc(${computedSize.value} * -${overlapScale})` : null
  return value ? { marginLeft: value, marginRight: value } : {}
})

const computedTag = computed<typeof BLink | 'button' | 'span'>(() =>
  computedLink.value ? BLink : props.button ? 'button' : 'span',
)

const computedStyle = computed<CSSProperties>(() => ({
  ...marginStyle.value,
  width: computedSize.value ?? undefined,
  height: computedSize.value ?? undefined,
}))

function computeContrastVariant(colorVariant: ColorVariant): 'dark' | 'light' {
  return colorVariant === 'light' || colorVariant === 'warning' ? 'dark' : 'light'
}

function clicked(e: MouseEvent): void {
  if (!props.disabled && (computedLink.value || props.button))
    emit('click', e)
}

function onImgError(e: Event) {
  emit('imgError', e)
}
</script>

<script lang="ts">
export function computeSize(value: any): string | null {
  const calcValue = typeof value === 'string' && isNumeric(value) ? toFloat(value, 0) : value
  return typeof calcValue === 'number' ? `${calcValue}px` : calcValue || null
}
</script>

<template>
  <component
    :is="computedTag"
    class="b-avatar"
    :class="{
      [`b-avatar-${size}`]: !!size && SIZES.includes(computeSize(props.size)),
      [`bg-${computedVariant}`]: computedVariant !== null,
      'badge': !props.button && computedVariant !== null && hasDefaultSlot,
      'rounded-full': isRound === '' || isRound === true,
      'rounded-circle': !props.square && isRound === 'circle',
      'rounded-0': props.square || isRound === '0',
      'rounded-1': !props.square && isRound === 'sm',
      'rounded-3': !props.square && isRound === 'lg',
      'rounded-top': !props.square && isRound === 'top',
      'rounded-bottom': !props.square && isRound === 'bottom',
      'rounded-start': !props.square && isRound === 'left',
      'rounded-end': !props.square && isRound === 'right',
      'btn': props.button,
      [`btn-${computedVariant}`]: props.button ? computedVariant !== null : false,
    }"
    :style="computedStyle"
    v-bind="computedLinkProps"
    :type="props.button && !computedLink ? props.buttonType : undefined"
    :disabled="props.disabled || null"
    @click="clicked"
  >
    <span v-if="hasDefaultSlot" class="b-avatar-custom">
      <slot />
    </span>
    <span v-else-if="!!src" class="b-avatar-img">
      <img :src="src" :alt="alt" @error="onImgError">
    </span>
    <span
      v-else-if="!!text" class="b-avatar-text" :class="{
        [`text-${badgeVariant !== null && computeContrastVariant(badgeVariant)}`]:
          badgeVariant !== null,
      }" :style="textFontStyle"
    >
      {{ text }}
    </span>
    <span
      v-if="!!badge || badge === '' || hasBadgeSlot" class="b-avatar-badge" :class="{
        [`bg-${badgeVariant}`]: badgeVariant !== null,
      }" :style="badgeStyle"
    >
      <slot v-if="hasBadgeSlot" name="badge" />
      <span
        v-else :class="{
          [`text-${badgeVariant !== null && computeContrastVariant(badgeVariant)}`]: badgeVariant !== null,
        }"
      >
        {{ badge === true ? '' : badge }}
      </span>
    </span>
  </component>
</template>

<style lang="scss" scoped>
// --- Avatar ---

.b-avatar {
  @apply inline-flex items-center justify-center align-middle shrink-0 w-10 h-10 text-[inherit] font-normal leading-none max-w-full max-h-[auto] text-center overflow-visible relative;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
}
.b-avatar:focus {
  outline: 0;
}
.b-avatar.btn,
.b-avatar[href] {
  @apply p-0 border-0;
}
.b-avatar.btn .b-avatar-img img,
.b-avatar[href] .b-avatar-img img {
  @apply transition-transform duration-[0.15s] ease-[ease-in-out];
}
.b-avatar.btn:not(:disabled):not(.disabled),
.b-avatar[href]:not(:disabled):not(.disabled) {
  @apply cursor-pointer;
}
.b-avatar.btn:not(:disabled):not(.disabled):hover .b-avatar-img img,
.b-avatar[href]:not(:disabled):not(.disabled):hover .b-avatar-img img {
  @apply scale-[1.15];
}
.b-avatar.disabled,
.b-avatar:disabled,
.b-avatar[disabled] {
  @apply opacity-[0.65] pointer-events-none;
}
.b-avatar .b-avatar-custom,
.b-avatar .b-avatar-text,
.b-avatar .b-avatar-img {
  @apply w-full h-full overflow-hidden flex justify-center items-center rounded-[inherit];
  mask-image: radial-gradient(white, black);
}
.b-avatar .b-avatar-text {
  @apply uppercase whitespace-nowrap;
}
.b-avatar[href] {
  @apply no-underline;
}
.b-avatar > .bootstrap-icon {
  @apply w-3/5 h-auto max-w-full;
}
.b-avatar .b-avatar-img img {
  @apply w-full h-full max-h-[auto] object-cover rounded-[inherit];
}
.b-avatar .b-avatar-badge {
  @apply absolute min-h-[1.5em] min-w-[1.5em] leading-none text-[70%] font-bold z-[1] p-[0.25em] rounded-[10em];
}
.b-avatar-sm {
  @apply w-6 h-6;
}
.b-avatar-sm .b-avatar-text {
  @apply text-[0.6rem];
}
.b-avatar-sm .b-avatar-badge {
  @apply text-[0.42rem];
}
.b-avatar-lg {
  @apply w-14 h-14;
}
.b-avatar-lg .b-avatar-text {
  @apply text-[1.4rem];
}
.b-avatar-lg .b-avatar-badge {
  @apply text-[1,715rem];
}
.b-avatar-group .b-avatar-group-inner {
  @apply flex flex-wrap;
}
.b-avatar-group .b-avatar {
  @apply border border-solid border-[#dee2e6];
}
.b-avatar-group a.b-avatar:hover:not(.disabled):not(disabled),
.b-avatar-group .btn.b-avatar:hover:not(.disabled):not(disabled) {
  @apply z-[1];
}
</style>
