<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import BLink from './BLink.vue'
import { isLink } from '@/utils'
import type { ButtonType } from '~/types/ButtonType'
import type { ButtonVariant } from '~/types/ButtonVariant'
import type { BLinkProps } from '~/types/ComponentProps'
import type { Size } from '~/types/Size'

const props = withDefaults(
  defineProps<
    {
      pill?: boolean
      pressed?: boolean
      size?: Size
      squared?: boolean
      tag?: string
      type?: ButtonType
      variant?: ButtonVariant | null
      loading?: boolean
      loadingFill?: boolean
      block?: boolean
      loadingText?: string
    } & Omit<BLinkProps, 'variant'>
  >(),
  {
    active: false,
    pill: false,
    pressed: undefined,
    size: 'md',
    squared: false,
    tag: 'button',
    type: 'button',
    variant: 'secondary',
    loading: false,
    loadingFill: false,
    block: false,
    loadingText: 'Loading...',
    // Link props
    activeClass: 'router-link-active',
    append: false,
    disabled: false,
    event: 'click',
    href: undefined,
    // noPrefetch: {type: [Boolean, String] as PropType<boolean>, default: false},
    // prefetch: {type: [Boolean, String] as PropType<boolean>, default: null},
    rel: undefined,
    replace: false,
    routerComponentName: 'router-link',
    routerTag: 'a',
    target: '_self',
    to: undefined,
    opacity: undefined,
    opacityHover: undefined,
    underlineVariant: null,
    underlineOffset: undefined,
    underlineOffsetHover: undefined,
    underlineOpacity: undefined,
    underlineOpacityHover: undefined,
    icon: false,
    // End link props
  },
)

const emit = defineEmits<{
  'click': [value: MouseEvent]
  'update:pressed': [value: boolean]
}>()

const pressedValue = useVModel(props, 'pressed', emit)

const isToggle = computed<boolean>(() => typeof props.pressed === 'boolean')
const isButton = computed<boolean>(
  () => props.tag === 'button' && props.href === undefined && props.to === undefined,
)
const computedLink = computed<boolean>(() => isLink(props))

function clicked(e: MouseEvent): void {
  if (props.disabled) {
    e.preventDefault()
    e.stopPropagation()
    return
  }
  emit('click', e)
  if (typeof props.pressed === 'boolean')
    pressedValue.value = !props.pressed
}
</script>

<template>
  <component
    :is="to !== undefined ? BLink : href ? 'a' : tag" class="btn" :class="[
      [`btn-${size}`],
      {
        [`btn-${variant}`]: variant !== null,
        'btn-block': block,
        'active': active || pressed,
        'rounded-pill': pill,
        'rounded-0': squared,
        'disabled': disabled,
      },
    ]" :aria-disabled="props.href !== undefined ? false : !isButton ? disabled : null"
    :aria-pressed="isToggle ? pressed : null" :autocomplete="isToggle ? 'off' : null"
    :disabled="isButton ? disabled : null" :href="href" :rel="computedLink ? rel : null"
    :role="props.href !== undefined ? false : !isButton || computedLink ? 'button' : null"
    :target="computedLink ? target : null" :type="isButton ? type : null" :to="!isButton ? to : null"
    :append="computedLink ? append : null" :active-class="to !== undefined ? activeClass : null"
    :event="to !== undefined ? event : null" :replace="to !== undefined ? replace : null"
    :router-component-name="to !== undefined ? routerComponentName : null"
    :router-tag="to !== undefined ? routerTag : null" @click="clicked"
  >
    <template v-if="loading">
      <slot name="loading">
        <template v-if="!loadingFill">
          {{ loadingText }}
        </template>
        <slot name="loading-spinner">
          <BSpinner :small="size !== 'lg'" :label="loadingFill ? loadingText : undefined" />
        </slot>
      </slot>
    </template>
    <template v-else>
      <slot />
    </template>
  </component>
</template>
