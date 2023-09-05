<script setup lang="ts">
import { progressInjectionKey } from '@/utils'

import type { ColorVariant } from '~/types/ColorVariant'

const props = withDefaults(
  defineProps<{
    variant?: ColorVariant | null
    max?: number | string
    height?: string
    animated?: boolean
    precision?: number | string
    showProgress?: boolean
    showValue?: boolean
    striped?: boolean
    value?: number | string
  }>(),
  {
    variant: undefined,
    max: 100,
    height: undefined,
    animated: false,
    precision: 0,
    showProgress: false,
    showValue: false,
    striped: false,
    value: 0,
  },
)

provide(progressInjectionKey, {
  animated: readonly(toRef(props, 'animated')),
  max: readonly(toRef(props, 'max')),
  showProgress: readonly(toRef(props, 'showProgress')),
  showValue: readonly(toRef(props, 'showValue')),
  striped: readonly(toRef(props, 'striped')),
})
</script>

<template>
  <div class="progress" :style="{ height }">
    <slot>
      <BProgressBar
        :animated="animated"
        :max="max"
        :precision="precision"
        :show-progress="showProgress"
        :show-value="showValue"
        :striped="striped"
        :value="value"
        :variant="variant"
      />
    </slot>
  </div>
</template>
