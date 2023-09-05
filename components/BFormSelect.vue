<script setup lang="ts">
import { useFocus, useToNumber, useVModel } from '@vueuse/core'

import normalizeOptions from '~/composables/useFormSelect'
import type { AriaInvalid } from '~/types/AriaInvalid'
import type { Size } from '~/types/Size'

import { resolveAriaInvalid } from '@/utils'

const props = withDefaults(
  defineProps<{
    ariaInvalid?: AriaInvalid
    autofocus?: boolean
    disabled?: boolean
    disabledField?: string
    form?: string
    htmlField?: string
    id?: string
    labelField?: string
    multiple?: boolean
    name?: string
    options?: unknown[] | Record<string, unknown>
    optionsField?: string
    plain?: boolean
    required?: boolean
    selectSize?: number | string
    size?: Size
    state?: boolean | null
    textField?: string
    valueField?: string
    modelValue?: string | unknown[] | Record<string, unknown> | number | null
  }>(),
  {
    form: undefined,
    id: undefined,
    name: undefined,
    size: 'md',
    ariaInvalid: undefined,
    autofocus: false,
    disabled: false,
    disabledField: 'disabled',
    htmlField: 'html',
    state: null,
    labelField: 'label',
    multiple: false,
    options: () => [],
    optionsField: 'options',
    plain: false,
    required: false,
    selectSize: 0,
    textField: 'text',
    valueField: 'value',
    modelValue: '',
  },
)

const emit = defineEmits<{
  'input': [value: unknown]
  'update:modelValue': [value: unknown]
  'change': [value: unknown]
}>()

const modelValue = useVModel(props, 'modelValue', emit)

const computedId = useId(() => props.id, 'input')

const selectSizeNumber = useToNumber(() => props.selectSize)

const stateClass = useStateClass(props.state)

const input = ref<HTMLElement>()

const { focused } = useFocus(input, {
  initialValue: props.autofocus,
})

// TODO this needs to be redone to fit the structure of BFormCheckboxGroup
// It also doesn't work for array syntaxes. Review second example from https://bootstrap-vue.org/docs/components/form-select
// For more info on how it should behave

const formOptions = computed(() => normalizeOptions(props.options as any[], 'BFormSelect', props))
const localValue = computed({
  get: () => modelValue.value,

  set: (newValue: any) => {
    emit('input', newValue)
    modelValue.value = newValue
    nextTick(() => {
      emit('change', newValue)
    })
  },
})

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
  <select
    :id="computedId"
    ref="input"
    v-model="localValue"
    :class="[
      stateClass,
      {
        'form-control': plain,
        [`form-control-${size}`]: size !== 'md' && plain,
        'form-select': !plain,
        [`form-select-${size}`]: size !== 'md' && !plain,
      },
    ]"
    :name="name"
    :form="form || undefined"
    :multiple="multiple || undefined"
    :size="selectSizeNumber || plain ? selectSizeNumber : undefined"
    :disabled="disabled"
    :required="required || undefined"
    :aria-required="required || undefined"
    :aria-invalid="resolveAriaInvalid(ariaInvalid, state)"
  >
    <slot name="first" />
    <template v-for="(option, index) in formOptions" :key="index">
      <BFormSelectOptionGroup
        v-if="Array.isArray((option as any).options)"
        :label="(option as any).label"
        :options="(option as any).options"
      />
      <BFormSelectOption
        v-else
        :value="(option as any).value"
        :disabled="(option as any).disabled"
        v-html="(option as any).html || (option as any).text"
      />
    </template>
    <slot />
  </select>
</template>
