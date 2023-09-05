<script setup lang="ts">
import { isEmptySlot } from '@/utils'
import type { ColorVariant } from '~/types/ColorVariant'
import type { TextColorVariant } from '~/types/TextColorVariant'

withDefaults(
  defineProps<{
    bodyBgVariant?: ColorVariant | null
    bodyTag?: string
    bodyTextVariant?: TextColorVariant | null
    overlay?: boolean
    subtitle?: string
    subtitleTag?: string
    subtitleTextVariant?: TextColorVariant | null
    title?: string
    titleTag?: string
    text?: string
  }>(),
  {
    bodyTag: 'div',
    overlay: false,
    titleTag: 'h4',
    subtitleTag: 'h4',
    bodyBgVariant: null,
    bodyTextVariant: null,
    subtitleTextVariant: undefined,
    subtitle: undefined,
    title: undefined,
    text: undefined,
  },
)

const slots = useSlots()

const hasTitleSlot = computed(() => !isEmptySlot(slots.title))
const hasSubtitleSlot = computed(() => !isEmptySlot(slots.subtitle))
</script>

<template>
  <component
    :is="bodyTag" class="card-body" :class="{
      'card-img-overlay': overlay,
      [`text-${bodyTextVariant}`]: bodyTextVariant !== null,
      [`bg-${bodyBgVariant}`]: bodyBgVariant !== null,
    }"
  >
    <BCardTitle v-if="!!title || hasTitleSlot" :tag="titleTag">
      <slot name="title">
        {{ title }}
      </slot>
    </BCardTitle>

    <BCardSubtitle
      v-if="!!subtitle || hasSubtitleSlot"
      :tag="subtitleTag"
      :text-variant="subtitleTextVariant"
    >
      <slot name="subtitle">
        {{ subtitle }}
      </slot>
    </BCardSubtitle>

    <slot>
      {{ text }}
    </slot>
  </component>
</template>
