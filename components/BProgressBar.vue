<script setup lang="ts">
import { progressInjectionKey } from '@/utils'

import type { ColorVariant } from '~/types/ColorVariant'

const props = withDefaults(
  defineProps<{
    animated?: boolean
    label?: string
    labelHtml?: string
    max?: string | number
    precision?: string | number
    showProgress?: boolean
    showValue?: boolean
    striped?: boolean
    value?: string | number
    variant?: ColorVariant | null
  }>(),
  {
    label: undefined,
    labelHtml: undefined,
    max: undefined,
    variant: null,
    animated: false,
    precision: 0,
    showProgress: false,
    showValue: false,
    striped: false,
    value: 0,
  },
)

const parentData = inject(progressInjectionKey, null)

const numberPrecision = computed<number>(() =>
  typeof props.precision === 'number' ? props.precision : Number.parseFloat(props.precision),
)

const numberValue = computed<number>(() =>
  typeof props.value === 'number' ? props.value : Number.parseFloat(props.value),
)

const numberMax = computed<number | undefined>(() =>
  typeof props.max === 'number'
    ? props.max
    : props.max === undefined
      ? undefined
      : Number.parseFloat(props.max),
)

const computedLabel = computed<string>(() =>
  props.labelHtml !== undefined
    ? props.labelHtml
    : props.showValue || parentData?.showValue.value
      ? numberValue.value.toFixed(numberPrecision.value)
      : props.showProgress || parentData?.showProgress.value
        ? ((numberValue.value * 100) / (numberMax.value || 100)).toFixed(numberPrecision.value)
        : props.label !== undefined
          ? props.label
          : '',
)

const computedWidth = computed<string>(() =>
  parentData?.max.value
    ? `${
        (numberValue.value * 100)
        / (typeof parentData?.max.value === 'number'
          ? parentData?.max.value
          : Number.parseInt(parentData.max.value))
      }%`
    : props.max
      ? `${
        (numberValue.value * 100)
        / (typeof props.max === 'number' ? props.max : Number.parseInt(props.max))
      }%`
      : typeof props.value === 'string'
        ? props.value
        : `${props.value}%`,
)
</script>

<template>
  <div
    class="progress-bar"
    :class="{
      'progress-bar-animated': animated || parentData?.animated,
      'progress-bar-striped':
        striped
        || parentData?.striped
        || animated
        || parentData?.animated,
      [`bg-${variant}`]: variant !== null,
    }"
    role="progressbar"
    :aria-valuenow="value"
    aria-valuemin="0"
    :aria-valuemax="max"
    :style="{ width: computedWidth }"
  >
    <slot>
      {{ computedLabel }}
    </slot>
  </div>
</template>
