<script setup lang="ts">
import { type CSSProperties } from 'vue'
import type { CommonInputProps } from '@/composables/useFormInput'

const props = withDefaults(
  defineProps<
    {
      noResize?: boolean
      rows?: string | number
      wrap?: string
    } & CommonInputProps
  >(),
  {
    noResize: false,
    rows: 2,
    wrap: 'soft',
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

const computedStyles = computed<CSSProperties>(() => ({
  resize: props.noResize ? 'none' : undefined,
}))

defineExpose({
  focus,
  blur,
})
</script>

<template>
  <textarea
    :id="computedId"
    ref="input"
    :class="[
      stateClass,
      {
        'form-control': !plaintext,
        'form-control-plaintext': plaintext,
        [`form-control-${size}`]: !!size,
      },
    ]"
    :name="name || undefined"
    :form="form || undefined"
    :disabled="disabled"
    :placeholder="placeholder"
    :required="required || undefined"
    :autocomplete="autocomplete || undefined"
    :readonly="readonly || plaintext"
    :aria-required="required || undefined"
    :aria-invalid="computedAriaInvalid"
    :rows="rows"
    :style="computedStyles"
    :wrap="wrap || undefined"
    @input="onInput($event)"
    @change="onChange($event)"
    @blur="onBlur($event)"
  />
</template>
