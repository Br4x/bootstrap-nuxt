<script setup lang="ts">
import { useFocus, useVModel } from '@vueuse/core'
import RenderComponentOrSkip from './RenderComponentOrSkip.vue'
import { isEmptySlot, radioGroupKey } from '@/utils'

import { getClasses, getInputClasses, getLabelClasses } from '~/composables/useFormCheck'

import type { ButtonVariant } from '~/types/ButtonVariant'
import type { Size } from '~/types/Size'

const props = withDefaults(
  defineProps<{
    ariaLabel?: string
    ariaLabelledby?: string
    form?: string
    id?: string
    name?: string
    size?: Size
    autofocus?: boolean
    modelValue?: boolean | string | unknown[] | Record<string, unknown> | number | null
    plain?: boolean
    button?: boolean
    buttonGroup?: boolean
    disabled?: boolean
    buttonVariant?: ButtonVariant | null
    inline?: boolean
    required?: boolean
    state?: boolean | null
    value?: string | boolean | Record<string, unknown> | number
  }>(),
  {
    ariaLabel: undefined,
    ariaLabelledby: undefined,
    form: undefined,
    id: undefined,
    name: undefined,
    autofocus: false,
    plain: false,
    button: false,
    buttonGroup: false,
    disabled: false,
    modelValue: undefined,
    state: null,
    size: undefined,
    buttonVariant: null,
    inline: false,
    required: false,
    value: true,
  },
)

const emit = defineEmits<{
  'input': [value: boolean | string | unknown[] | Record<string, unknown> | number | null]
  'change': [value: boolean | string | unknown[] | Record<string, unknown> | number | null]
  'update:modelValue': [
    value: boolean | string | unknown[] | Record<string, unknown> | number | null,
  ]
}>()

defineOptions({
  inheritAttrs: false,
})

const slots = useSlots()

const modelValue = useVModel(props, 'modelValue', emit, { passive: true })

const computedId = useId(() => props.id, 'form-check')

const parentData = inject(radioGroupKey, null)

const input = ref<HTMLElement | null>(null)

const { focused } = useFocus(input, {
  initialValue: props.autofocus,
})

const hasDefaultSlot = computed(() => !isEmptySlot(slots.default))

const localValue = computed({
  get: () =>
    parentData !== null
      ? JSON.stringify(parentData.modelValue.value) === JSON.stringify(props.value)
      : JSON.stringify(modelValue.value) === JSON.stringify(props.value),
  set: (newValue: string | boolean | unknown[] | Record<string, unknown> | number | null) => {
    const updateValue = newValue || newValue === '' || newValue === 0 ? props.value : false

    emit('input', updateValue)
    modelValue.value = updateValue
    nextTick(() => {
      emit('change', updateValue)
    })
  },
})

watch(
  () => parentData?.modelValue.value,
  (newValue) => {
    const isEqual = JSON.stringify(newValue) === JSON.stringify(props.value)
    if (isEqual === true)
      return
    localValue.value = false
  },
)

watch(modelValue, (newValue) => {
  if (parentData === null || newValue === false)
    return
  parentData.set(props.value)
})

const computedRequired = computed(
  () =>
    !!(props.name ?? parentData?.name.value)
    && (props.required || parentData?.required.value),
)

const isButtonGroup = computed(
  () => props.buttonGroup || (parentData?.buttons.value ?? false),
)

const classesObject = computed(() => ({
  plain: props.plain || (parentData?.plain.value ?? false),
  button: props.button || (parentData?.buttons.value ?? false),
  inline: props.inline || (parentData?.inline.value ?? false),
  state: props.state || parentData?.state.value,
  size: props.size !== undefined ? props.size : parentData?.size.value ?? 'md', // This is where the true default is made
  buttonVariant:
    props.buttonVariant !== null
      ? props.buttonVariant
      : parentData?.buttonVariant.value ?? 'secondary', // This is where the true default is made
}))
const computedClasses = getClasses(classesObject)
const inputClasses = getInputClasses(classesObject)
const labelClasses = getLabelClasses(classesObject)

defineExpose({
  focus: () => {
    focused.value = true
  },
  blur: () => {
    focused.value = false
  },
})
</script>

<template>
  <RenderComponentOrSkip :skip="isButtonGroup" :class="computedClasses">
    <input
      :id="computedId"
      v-bind="$attrs"
      ref="input"
      v-model="localValue"
      :checked="localValue"
      :class="inputClasses"
      type="radio"
      :disabled="disabled || parentData?.disabled.value"
      :required="computedRequired || undefined"
      :name="name || parentData?.name.value"
      :form="form || parentData?.form.value"
      :aria-label="ariaLabel"
      :aria-labelledby="ariaLabelledby"
      :value="value"
      :aria-required="computedRequired || undefined"
    >
    <label v-if="hasDefaultSlot || plain === false" :for="computedId" :class="labelClasses">
      <slot />
    </label>
  </RenderComponentOrSkip>
</template>
