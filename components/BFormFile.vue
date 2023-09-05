<script setup lang="ts">
import { useFocus, useVModel } from '@vueuse/core'
import { isEmptySlot } from '@/utils'

import type { ClassValue } from '~/types/ClassValue'
import type { Size } from '~/types/Size'

const props = withDefaults(
  defineProps<{
    accept?: string | string[]
    autofocus?: boolean
    capture?: boolean | 'user' | 'environment' | undefined
    directory?: boolean
    disabled?: boolean
    form?: string
    id?: string
    multiple?: boolean
    name?: string
    noDrop?: boolean
    noTraverse?: boolean
    required?: boolean
    size?: Size
    state?: boolean | null
    modelValue?: File[] | File | null
    label?: string
    labelClass?: ClassValue
  }>(),
  {
    accept: '',
    autofocus: false,
    capture: false,
    directory: false,
    disabled: false,
    form: undefined,
    id: undefined,
    multiple: false,
    name: undefined,
    noDrop: false,
    noTraverse: false,
    required: false,
    size: undefined,
    state: null,
    modelValue: null,
    label: '',
    labelClass: undefined,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: File | File[] | null]
  'change': [value: Event]
}>()

defineOptions({
  inheritAttrs: false,
})

const slots = useSlots()

const modelValue = useVModel(props, 'modelValue', emit)
const computedId = useId(() => props.id)

const stateClass = useStateClass(props.state)

const input = ref<HTMLInputElement | null>(null)

const { focused } = useFocus(input, { initialValue: props.autofocus })

const hasLabelSlot = computed(() => !isEmptySlot(slots.label))

const computedAccept = computed(() =>
  typeof props.accept === 'string' ? props.accept : props.accept.join(','),
)

function onChange(e: Event) {
  const value
    = input.value?.files === null || input.value?.files === undefined ? null : [...input.value.files]
  modelValue.value = value === null ? null : props.multiple === true ? value : value[0]
  emit('change', e)
}

function onDrop(e: Event) {
  if (props.noDrop === true)
    e.preventDefault()
}

/**
 * Reset the form input
 */
function reset() {
  modelValue.value = null
}

watch(modelValue, (newValue) => {
  if (newValue === null && input.value !== null)
    input.value.value = ''
})

defineExpose({
  focus: () => {
    focused.value = true
  },
  blur: () => {
    focused.value = false
  },
  reset,
})
</script>

<template>
  <label v-if="hasLabelSlot || label" :for="computedId" class="form-label" :class="labelClass">
    <slot name="label">
      {{ label }}
    </slot>
  </label>
  <input
    :id="computedId"
    v-bind="$attrs"
    ref="input"
    type="file"
    class="form-control"
    :class="[
      stateClass,
      {
        [`form-control-${size}`]: size !== undefined,
      },
    ]"
    :form="form"
    :name="name"
    :multiple="multiple"
    :disabled="disabled"
    :capture="capture"
    :accept="computedAccept || undefined"
    :required="required || undefined"
    :aria-required="required || undefined"
    :directory="directory"
    :webkitdirectory="directory"
    @change="onChange"
    @drop="onDrop"
  >
</template>
