<script setup lang="ts">
import { omit } from '@/utils'
import type { BImgProps } from '~/types/ComponentProps'

const props = withDefaults(
  defineProps<
    {
      bottom?: boolean
      top?: boolean
    } & BImgProps
  >(),
  {
    bottom: false,
    top: false,
  },
)

const baseClass = computed(() =>
  props.top
    ? 'card-img-top'
    : props.end
      ? 'card-img-right'
      : props.bottom
        ? 'card-img-bottom'
        : props.start
          ? 'card-img-left'
          : 'card-img',
)

const computedImgProps = computed(() => omit(props, ['bottom', 'top', 'end', 'start']))
</script>

<template>
  <BImg v-bind="computedImgProps" :class="baseClass" />
</template>
