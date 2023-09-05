<script setup lang="ts">
import { tabsInjectionKey } from '@/utils'

import type { ClassValue } from '~/types/ClassValue'

const props = withDefaults(
  defineProps<{
    id?: string
    title?: string
    active?: boolean
    buttonId?: string
    disabled?: boolean
    lazy?: boolean
    lazyOnce?: boolean
    noBody?: boolean | string
    tag?: string
    titleItemClass?: ClassValue
    titleLinkAttributes?: Record<string, unknown>
    titleLinkClass?: ClassValue
  }>(),
  {
    titleItemClass: undefined,
    titleLinkClass: undefined,
    id: undefined,
    title: undefined,
    active: false,
    buttonId: undefined,
    disabled: false,
    lazy: undefined,
    lazyOnce: undefined,
    noBody: false,
    tag: 'div',
    titleLinkAttributes: undefined,
  },
)

const parentData = inject(tabsInjectionKey, null)

const lazyBoolean = computed(() => (props.lazyOnce !== undefined ? props.lazyOnce : props.lazy))

const lazyRenderCompleted = ref(false)

const computedLazy = computed<boolean>(() => !!(parentData?.lazy.value || lazyBoolean.value))
const computedLazyOnce = computed<boolean>(() => props.lazyOnce !== undefined)

const computedActive = computed<boolean>(() => props.active && !props.disabled)
const showSlot = computed<boolean>(() => {
  const hasLazyRenderedOnce
    = computedLazy.value && computedLazyOnce.value && lazyRenderCompleted.value
  return computedActive.value || !computedLazy.value || hasLazyRenderedOnce
})
const show = ref(props.active)

watch(showSlot, (shown) => {
  if (shown && !lazyRenderCompleted.value)
    lazyRenderCompleted.value = true
})
</script>

<template>
  <component
    :is="tag"
    :id="id"
    class="tab-pane"
    :class="{
      'active': active,
      'show': show,
      'card-body': parentData?.card && noBody === false,
    }"
    role="tabpanel"
    aria-labelledby="profile-tab"
  >
    <slot v-if="showSlot" />
  </component>
</template>
