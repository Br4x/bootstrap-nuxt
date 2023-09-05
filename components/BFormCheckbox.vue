<script setup lang="ts">
import { useFocus, useVModel } from '@vueuse/core'
import RenderComponentOrSkip from './RenderComponentOrSkip.vue'
import { checkboxGroupKey, isEmptySlot } from '@/utils'

import { getClasses, getInputClasses, getLabelClasses } from '~/composables/useFormCheck'

import type { ButtonVariant } from '~/types/ButtonVariant'
import type { Size } from '~/types/Size'

const props = withDefaults(
  defineProps<{
    ariaLabel?: string
    ariaLabelledBy?: string
    form?: string
    indeterminate?: boolean
    name?: string
    id?: string
    autofocus?: boolean
    plain?: boolean
    button?: boolean
    buttonGroup?: boolean
    switch?: boolean
    disabled?: boolean
    buttonVariant?: ButtonVariant | null
    inline?: boolean
    required?: boolean
    size?: Size
    state?: boolean | null
    uncheckedValue?:
    | unknown[]
    | Set<unknown>
    | boolean
    | string
    | Record<string, unknown>
    | number
    | null
    value?: unknown[] | Set<unknown> | boolean | string | Record<string, unknown> | number | null
    modelValue?:
    | unknown[]
    | Set<unknown>
    | boolean
    | string
    | Record<string, unknown>
    | number
    | null
  }>(),
  {
    ariaLabel: undefined,
    ariaLabelledBy: undefined,
    form: undefined,
    indeterminate: undefined,
    name: undefined,
    autofocus: false,
    plain: false,
    button: false,
    buttonGroup: false,
    id: undefined,
    required: undefined,
    state: null,
    modelValue: undefined,
    switch: false,
    disabled: false,
    buttonVariant: null,
    inline: false,
    size: undefined,
    value: true,
    uncheckedValue: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [
    value: unknown[] | Set<unknown> | boolean | string | Record<string, unknown> | number | null,
  ]
  'input': [
    value: unknown[] | Set<unknown> | boolean | string | Record<string, unknown> | number | null,
  ]
  'change': [
    value: unknown[] | Set<unknown> | boolean | string | Record<string, unknown> | number | null,
  ]
}>()

defineOptions({
  inheritAttrs: false,
})

const slots = useSlots()

const modelValue = useVModel(props, 'modelValue', emit, { passive: true })

const computedId = useId(() => props.id, 'form-check')

const parentData = inject(checkboxGroupKey, null)

const input = ref<HTMLElement | null>(null)

const { focused } = useFocus(input, {
  initialValue: props.autofocus,
})

const hasDefaultSlot = computed(() => !isEmptySlot(slots.default))

const localValue = computed({
  get: () =>
    parentData !== null
      ? parentData.modelValue.value
        .map(el => JSON.stringify(el))
        .includes(JSON.stringify(props.value))
      : JSON.stringify(modelValue.value) === JSON.stringify(props.value),
  set: (newValue) => {
    const updateValue = newValue ? props.value : props.uncheckedValue

    emit('input', updateValue)
    modelValue.value = updateValue
    nextTick(() => {
      emit('change', updateValue)
    })
  },
})

watch(modelValue, (newValue) => {
  if (parentData === null)
    return
  if (newValue === false) {
    parentData.remove(props.value)
    return
  }
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
  switch: props.switch || (parentData?.switch.value ?? false),
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
      :id="computedId" v-bind="$attrs" ref="input" v-model="localValue" :class="inputClasses" type="checkbox"
      :disabled="props.disabled || parentData?.disabled.value" :required="computedRequired || undefined"
      :name="name || parentData?.name.value" :form="form || parentData?.form.value" :aria-label="ariaLabel"
      :aria-labelledby="ariaLabelledBy" :aria-required="computedRequired || undefined" :value="value"
      :indeterminate="indeterminate"
    >
    <label v-if="hasDefaultSlot || props.plain === false" :for="computedId" :class="labelClasses">
      <slot />
    </label>
  </RenderComponentOrSkip>
</template>
