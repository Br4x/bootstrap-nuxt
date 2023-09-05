<script setup lang="ts">
import { useElementHover, useToNumber, useVModel } from '@vueuse/core'
import { isEmptySlot } from '@/utils'

import type { ButtonType } from '~/types/ButtonType'
import type { ButtonVariant } from '~/types/ButtonVariant'
import type { ColorVariant } from '~/types/ColorVariant'

const props = withDefaults(
  defineProps<{
    noHoverPause?: boolean
    dismissLabel?: string
    dismissible?: boolean
    fade?: boolean
    closeVariant?: ButtonVariant | null
    modelValue?: boolean | number
    variant?: ColorVariant | null
    closeContent?: string
    immediate?: boolean
    interval?: number | string
    showOnPause?: boolean
    show?: boolean
  }>(),
  {
    closeContent: undefined,
    closeVariant: 'secondary',
    noHoverPause: false,
    interval: 1000,
    dismissLabel: 'Close',
    dismissible: false,
    fade: false,
    modelValue: false,
    variant: 'info',
    immediate: true,
    showOnPause: true,
    show: false,
  },
)

const emit = defineEmits<{
  'closed': []
  'closeCountdown': [value: number]
  'update:modelValue': [value: boolean | number]
}>()

const slots = useSlots()

const element = ref<HTMLElement | null>(null)

const modelValue = useVModel(props, 'modelValue', emit)
const isHovering = useElementHover(element)

const intervalNumber = useToNumber(() => props.interval)

const hasCloseSlot = computed(() => !isEmptySlot(slots.close))

const countdownLength = computed(() =>
  typeof modelValue.value === 'boolean' ? 0 : modelValue.value,
)

const {
  isActive,
  pause,
  restart,
  resume,
  stop,
  isPaused,
  value: remainingMs,
} = useCountdown(countdownLength, intervalNumber, {
  immediate: typeof modelValue.value === 'number' && props.immediate,
})

const isAlertVisible = computed<boolean>(() =>
  typeof modelValue.value === 'boolean'
    ? modelValue.value || props.show
    : isActive.value || (props.showOnPause && isPaused.value) || props.show,
)

const closeAttrs = computed(() => ({
  variant: props.closeVariant,
  type: 'button' as ButtonType,
}))

watchEffect(() => {
  emit('closeCountdown', remainingMs.value)
})

function closeClicked(): void {
  if (typeof modelValue.value === 'boolean') {
    modelValue.value = false
  }
  else {
    modelValue.value = 0
    stop()
  }
  emit('closed')
}

// TODO mouseleave/mouseenter could be replaced with useElementHover with a watcher
function onMouseEnter() {
  if (props.noHoverPause)
    return
  pause()
}

watch(isHovering, (newValue) => {
  if (newValue) {
    onMouseEnter()
    return
  }
  resume()
})

onBeforeUnmount(stop)

defineExpose({ pause, resume, restart, stop })
</script>

<template>
  <BTransition :no-fade="!fade" :trans-props="{ enterToClass: 'show' }">
    <div
      v-if="isAlertVisible" ref="element" class="alert" role="alert" aria-live="polite" aria-atomic="true" :class="{
        [`alert-${variant}`]: variant !== null,
        'alert-dismissible': dismissible,
      }"
    >
      <slot />
      <template v-if="dismissible">
        <!-- TODO this renders incorrectly -->
        <BButton v-if="hasCloseSlot || closeContent" v-bind="closeAttrs" @click="closeClicked">
          <slot name="close">
            {{ closeContent }}
          </slot>
        </BButton>
        <BCloseButton v-else :aria-label="dismissLabel" v-bind="closeAttrs" @click="closeClicked" />
      </template>
    </div>
  </BTransition>
</template>
