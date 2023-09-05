<script setup lang="ts">
import type { CommonInputProps } from '@/composables/useFormInput'

import type { InputType } from '~/types/InputType'

const props = withDefaults(
  defineProps<
    {
      max?: string | number
      min?: string | number
      step?: string | number
      type?: InputType
    } & CommonInputProps
  >(),
  {
    max: undefined,
    min: undefined,
    step: undefined,
    type: 'text',
    // CommonInputProps
    ariaInvalid: undefined,
    autocomplete: undefined,
    autofocus: false,
    disabled: false,
    form: undefined,
    formatter: undefined,
    id: undefined,
    lazy: false,
    lazyFormatter: false,
    list: undefined,
    modelValue: '',
    name: undefined,
    number: false,
    placeholder: undefined,
    plaintext: false,
    readonly: false,
    required: false,
    size: undefined,
    state: null,
    trim: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [val: any]
  'change': [val: any]
  'blur': [val: any]
  'input': [val: any]
}>()

const { input, computedId, computedAriaInvalid, onInput, onChange, onBlur, focus, blur }
  = useFormInput(props, emit)

const stateClass = useStateClass(props.state)

const isHighlighted = ref(false)

const isRange = computed(() => props.type === 'range')
const isColor = computed(() => props.type === 'color')

defineExpose({
  focus,
  blur,
})
</script>

<template>
  <input
    :id="computedId"
    ref="input"
    :class="[
      stateClass,
      {
        'form-control-highlighted': isHighlighted,
        'form-range': isRange,
        'form-control': isColor || (!plaintext && !isRange),
        'form-control-color': isColor,
        'form-control-plaintext': plaintext && !isRange && !isColor,
        [`form-control-${size}`]: !!size,
      },
    ]"
    :name="name || undefined"
    :form="form || undefined"
    :type="type"
    :disabled="disabled"
    :placeholder="placeholder"
    :required="required || undefined"
    :autocomplete="autocomplete || undefined"
    :readonly="readonly || plaintext"
    :min="min"
    :max="max"
    :step="step"
    :list="type !== 'password' ? list : undefined"
    :aria-required="required || undefined"
    :aria-invalid="computedAriaInvalid"
    @input="onInput($event)"
    @change="onChange($event)"
    @blur="onBlur($event)"
  >
</template>

<style lang="scss" scoped>
.form-control-highlighted {

  transition: box-shadow 0.3s ease-in-out;
  animation: form-control-highlighted-blink 1s infinite;
}

@keyframes form-control-highlighted-blink {
  0% {
    box-shadow: 0 0 0 0 transparent;
  }

  50% {

      // Avoid using mixin so we can pass custom focus shadow properly
      box-shadow: var(--un-ring-offset-shadow), var(--un-ring-shadow),
    var(--un-shadow);

  }

  100% {
    box-shadow: 0 0 0 0 transparent;
  }
}
</style>
