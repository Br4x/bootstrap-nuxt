<script setup lang="ts">
import type { RouteLocation, RouteLocationRaw } from 'vue-router'
import { collapseInjectionKey, navbarInjectionKey } from '@/utils'

import type { ColorVariant } from '~/types/ColorVariant'
import type { BLinkProps } from '~/types/ComponentProps'
import type { LinkTarget } from '~/types/LinkTarget'

// TODO this component will likely have an issue with inheritAttrs
const props = withDefaults(defineProps<BLinkProps>(), {
  active: undefined,
  activeClass: 'router-link-active',
  append: false,
  disabled: false,
  event: 'click',
  href: undefined,
  rel: undefined,
  replace: false,
  routerComponentName: 'router-link',
  routerTag: 'a',
  target: '_self',
  to: undefined,
  variant: null,
  opacity: undefined,
  opacityHover: undefined,
  underlineVariant: null,
  underlineOffset: undefined,
  underlineOffsetHover: undefined,
  underlineOpacity: undefined,
  underlineOpacityHover: undefined,
  icon: false,
})

const emit = defineEmits<{
  click: [value: MouseEvent]
}>()

const attrs = useAttrs()

const collapseData = inject(collapseInjectionKey, null)
const navbarData = inject(navbarInjectionKey, null)
function closeCollapse() {
  if (navbarData !== null)
    collapseData?.close?.()
}

const instance = getCurrentInstance()

const tag = computed<string>(() => {
  const routerName = props.routerComponentName
    ?.split('-')
    .map(e => e.charAt(0).toUpperCase() + e.slice(1))
    .join('')
  const hasRouter = instance?.appContext.app.component(routerName) !== undefined
  if (!hasRouter || props.disabled || !props.to)
    return 'a'

  return props.routerComponentName
})

const computedHref = computed<string>(() => {
  const toFallback = '#'
  if (props.href)
    return props.href

  if (typeof props.to === 'string')
    return props.to || toFallback

  const to = props.to as RouteLocation

  if (
    Object.prototype.toString.call(to) === '[object Object]'
    && (to.path || to.query || to.hash)
  ) {
    const path = to.path || ''
    const query = to.query
      ? `?${Object.keys(to.query)
          .map(e => `${e}=${to.query[e]}`)
          .join('=')}`
      : ''
    const hash = !to.hash || to.hash.charAt(0) === '#' ? to.hash || '' : `#${to.hash}`
    return `${path}${query}${hash}` || toFallback
  }

  return toFallback
})

const computedClasses = computed(() => ({
  [`link-${props.variant}`]: props.variant !== null,
  [`link-opacity-${props.opacity}`]: props.opacity !== undefined,
  [`link-opacity-${props.opacityHover}-hover`]: props.opacityHover !== undefined,
  [`link-underline-${props.underlineVariant}`]: props.underlineVariant !== null,
  [`link-offset-${props.underlineOffset}`]: props.underlineOffset !== undefined,
  [`link-offset-${props.underlineOffsetHover}-hover`]: props.underlineOffsetHover !== undefined,
  [`link-underline-opacity-${props.underlineOpacity}`]: props.underlineOpacity !== undefined,
  [`link-underline-opacity-${props.underlineOpacityHover}-hover`]:
    props.underlineOpacityHover !== undefined,
  'icon-link': props.icon === true,
}))

const routerAttr = computed(() => ({
  'class': computedClasses.value,
  'to': props.to,
  'href': computedHref.value,
  'target': props.target,
  'rel': props.target === '_blank' && props.rel === undefined ? 'noopener' : props.rel || undefined,
  'tabindex': props.disabled
    ? '-1'
    : typeof attrs.tabindex === 'undefined'
      ? null
      : attrs.tabindex,
  'aria-disabled': props.disabled ? true : null,
}))

const computedLinkClasses = computed(() => ({
  [props.activeClass]: props.active,
  disabled: props.disabled,
}))

function clicked(e: MouseEvent): void {
  if (props.disabled) {
    e.preventDefault()
    e.stopImmediatePropagation()
    return
  }

  if (collapseData?.isNav?.value === true)
    collapseData?.close?.()

  emit('click', e)
}
</script>

<script lang="ts">
/**
 * @deprecated will be removed when BToast is refactored
 */
export const BLINK_PROPS = {
  active: { type: [Boolean, String, undefined] as PropType<boolean>, default: undefined },
  activeClass: { type: String, default: 'router-link-active' },
  append: { type: [Boolean, String] as PropType<boolean>, default: false },
  disabled: { type: [Boolean, String] as PropType<boolean>, default: false },
  event: { type: [String, Array], default: 'click' },
  href: { type: String },
  // noPrefetch: {type: [Boolean, String] as PropType<boolean>, default: false},
  // prefetch: {type: [Boolean, String] as PropType<boolean>, default: null},
  rel: { type: String, default: null },
  replace: { type: [Boolean, String] as PropType<boolean>, default: false },
  routerComponentName: { type: String, default: 'router-link' },
  routerTag: { type: String, default: 'a' },
  target: { type: String as PropType<LinkTarget>, default: '_self' },
  to: { type: [String, Object] as PropType<RouteLocationRaw>, default: null },
  variant: { type: String as PropType<ColorVariant | null>, default: null },
}
</script>

<template>
  <component
    :is="tag"
    v-if="tag === 'router-link'"
    v-slot="//@ts-ignore
      { href: localHref, navigate, isActive }"
    v-bind="routerAttr"
    custom
  >
    <component
      :is="routerTag"
      :href="localHref"
      :class="[(active ?? isActive) && activeClass]"
      v-bind="$attrs"
      @click=";[navigate($event), closeCollapse(), clicked($event)]"
    >
      <slot />
    </component>
  </component>
  <component :is="tag" v-else :class="computedLinkClasses" v-bind="routerAttr" @click="clicked">
    <slot />
  </component>
</template>
