<script setup lang="ts">
import BLink from './BLink.vue'
import { collapseInjectionKey, dropdownInjectionKey, navbarInjectionKey } from '@/utils'
import type { ClassValue } from '~/types/ClassValue'
import type { ColorVariant } from '~/types/ColorVariant'
import type { LinkTarget } from '~/types/LinkTarget'

const props = withDefaults(
  defineProps<{
    href?: string
    linkClass?: ClassValue
    active?: boolean
    disabled?: boolean
    rel?: string
    target?: LinkTarget
    variant?: ColorVariant | null
  }>(),
  {
    active: false,
    disabled: false,
    rel: undefined,
    target: '_self',
    variant: null,
    linkClass: undefined,
    href: undefined,
  },
)

const emit = defineEmits<{
  click: [value: MouseEvent]
}>()

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs()

const componentAttrs = computed(() => ({
  ...(attrs.to ? { activeClass: 'active', ...attrs } : attrs),
}))

const collapseData = inject(collapseInjectionKey, null)
const dropdownData = inject(dropdownInjectionKey, null)
const navbarData = inject(navbarInjectionKey, null)

// Pretty sure this emits if tag is not button and is disabled
function clicked(e: MouseEvent): void {
  emit('click', e)
  if (navbarData !== null)
    collapseData?.close?.()

  dropdownData?.close?.()
}
</script>

<template>
  <li role="presentation">
    <component
      :is="href ? 'a' : attrs.to ? BLink : 'button'"
      class="dropdown-item"
      :class="[
        props.linkClass,
        {
          active,
          disabled,
          [`text-${props.variant}`]: props.variant !== null,
        },
      ]"
      :disabled="disabled"
      :aria-current="active ? true : null"
      :href="href ? href : null"
      :rel="rel"
      :type="href || attrs.to ? 'button' : null"
      :target="target"
      v-bind="componentAttrs"
      @click="clicked"
    >
      <slot />
    </component>
  </li>
</template>
