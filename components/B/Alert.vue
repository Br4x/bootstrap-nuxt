<script setup lang="ts">
const props = withDefaults(defineProps<{
  show?: Boolean | Number | String
  dismissLabel?: string
  dismissible?: boolean
  fade?: boolean
  variant?: string
}>(), {
  dismissLabel: 'Close',
  variant: 'info',
})

const emit = defineEmits(['dismissCountDown', 'input', 'dismissed'])

const { toInteger, isBoolean, isNumeric, requestAF } = useUtils()

const countDownTimeout = ref()
const countDown = ref(0)
const localShow = ref(parseShow(props.show))
const BVTransition = resolveComponent('BVTransition')

watch(() => props.show, (newValue) => {
  countDown.value = parseCountDown(newValue)
  localShow.value = parseShow(newValue)
})
watch(() => countDown.value, (newValue) => {
  clearCountDownInterval()
  const show = props.show
  // Ignore if `show` transitions to a boolean value
  if (isNumeric(show)) {
    emit('dismissCountDown', newValue)
    // Update the v-model if needed
    if (show !== newValue)
      emit('input', newValue)

    if (newValue > 0) {
      localShow.value = true
      countDownTimeout.value = setTimeout(() => {
        countDown.value--
      }, 1000)
    }
    else {
      nextTick(() => {
        requestAF(() => {
          localShow.value = false
        })
      })
    }
  }
})
watch(() => localShow.value, (newValue) => {
  const show = props.show
  // Only emit dismissed events for dismissible or auto-dismissing alerts
  if (!newValue && (props.dismissible || isNumeric(show)))
    emit('dismissed')

  // Only emit booleans if we weren't passed a number via v-model
  if (!isNumeric(show) && show !== newValue)
    emit('input', newValue)
})

function dismiss() {
  clearCountDownInterval()
  countDown.value = 0
  localShow.value = false
}
function clearCountDownInterval() {
  clearTimeout(countDownTimeout.value)
  countDownTimeout.value = null
}
function parseCountDown(show: any) {
  if (show === '' || isBoolean(show))
    return 0

  show = toInteger(show, 0)
  return show > 0 ? show : 0
}
function parseShow(show: any) {
  if (show === '' || show === true)
    return true

  if (toInteger(show, 0) > 1)
    return false

  return !!show
}
</script>

<template>
  <BVTransition :no-fade="!fade">
    <div
      v-if="localShow" class="alert relative mb-4 border rounded px-3 py-3" :class="{
        'alert-dismissible': dismissible,
        [`alert-${variant}`]: variant,
        'bg-blue-200 border-blue-300 text-blue-800': variant === 'primary',
        'bg-gray-300 border-gray-400 text-gray-800': variant === 'secondary',
        'bg-green-200 border-green-300 text-green-800': variant === 'success',
        'bg-red-200 border-red-300 text-red-800': variant === 'danger',
        'bg-orange-200 border-orange-300 text-orange-800': variant === 'warning',
        'bg-teal-200 border-teal-300 text-teal-800': variant === 'info',
        'bg-white text-secondary': variant === 'light',
        'bg-gray-400 border-gray-500 text-dark': variant === 'dark',
      }" role="alert" aria-live="polite" aria-atomic="true"
    >
      <BButtonClose v-if="dismissible" :aria-label="dismissLabel" @click="dismiss">
        <template #dismiss>
          <slot name="dismiss" />
        </template>
      </BButtonClose>
      <slot />
    </div>
  </BVTransition>
</template>
