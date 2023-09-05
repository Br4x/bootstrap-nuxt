<script setup lang="ts">
import { useFocus, useVModel } from '@vueuse/core'
import { radioGroupKey } from '@/utils'

import { getGroupAttr, getGroupClasses } from '~/composables/useFormCheck'
import type { AriaInvalid } from '~/types/AriaInvalid'
import type { ButtonVariant } from '~/types/ButtonVariant'
import type { Size } from '~/types/Size'

const props = withDefaults(
  defineProps<{
    size?: Size
    form?: string
    id?: string
    name?: string
    modelValue?: string | boolean | unknown[] | Record<string, unknown> | number | null
    ariaInvalid?: AriaInvalid
    autofocus?: boolean
    buttonVariant?: ButtonVariant | null
    buttons?: boolean
    disabled?: boolean
    disabledField?: string
    htmlField?: string
    options?: (string | number | Record<string, unknown>)[]
    plain?: boolean
    required?: boolean
    stacked?: boolean
    state?: boolean | null
    textField?: string
    validated?: boolean
    valueField?: string
  }>(),
  {
    size: 'md',
    form: undefined,
    id: undefined,
    name: undefined,
    modelValue: null,
    autofocus: false,
    buttonVariant: 'secondary',
    buttons: false,
    ariaInvalid: undefined,
    state: null,
    disabled: false,
    disabledField: 'disabled',
    htmlField: 'html',
    options: () => [],
    plain: false,
    required: false,
    stacked: false,
    textField: 'text',
    validated: false,
    valueField: 'value',
  },
)

const emit = defineEmits<{
  'input': [value: string | boolean | unknown[] | Record<string, unknown> | number | null]
  'update:modelValue': [
    value: string | boolean | unknown[] | Record<string, unknown> | number | null,
  ]
  'change': [value: string | boolean | unknown[] | Record<string, unknown> | number | null]
}>()

const modelValue = useVModel(props, 'modelValue', emit)
const computedId = useId(() => props.id, 'radio')
const computedName = useId(() => props.name, 'checkbox')

const element = ref<HTMLElement | null>(null)

const { focused } = useFocus(element, {
  initialValue: props.autofocus,
})

provide(radioGroupKey, {
  set: (value: string | boolean | unknown[] | Record<string, unknown> | number | null) => {
    emit('input', value)
    modelValue.value = value
    nextTick(() => {
      emit('change', value)
    })
  },
  modelValue: computed(() => modelValue.value),
  buttonVariant: readonly(toRef(props, 'buttonVariant')),
  form: readonly(toRef(props, 'form')),
  name: computedName,
  buttons: readonly(toRef(props, 'buttons')),
  state: readonly(toRef(props, 'state')),
  plain: readonly(toRef(props, 'plain')),
  size: readonly(toRef(props, 'size')),
  inline: computed(() => !props.stacked),
  required: readonly(toRef(props, 'required')),
  disabled: readonly(toRef(props, 'disabled')),
})

const normalizeOptions = computed(() =>
  props.options.map((el, ind) =>
    typeof el === 'string' || typeof el === 'number'
      ? {
          props: {
            value: el,
            disabled: props.disabled,
          },
          text: el.toString(),
          html: undefined,
          self: Symbol(`radioGroupOptionItem${ind}`),
        }
      : {
          props: {
            value: el[props.valueField] as string | undefined,
            disabled: el[props.disabledField] as boolean | undefined,
            ...(el.props ? el.props : {}),
          },
          text: el[props.textField] as string | undefined,
          html: el[props.htmlField] as string | undefined,
          self: Symbol(`radioGroupOptionItem${ind}`),
        },
  ),
)

const classesObject = computed(() => ({
  required: props.required,
  ariaInvalid: props.ariaInvalid,
  state: props.state,
  validated: props.validated,
  buttons: props.buttons,
  stacked: props.stacked,
  size: props.size,
}))
const computedAttrs = getGroupAttr(classesObject)
const computedClasses = getGroupClasses(classesObject)

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
  <div
    v-bind="computedAttrs"
    :id="computedId"
    ref="element"
    role="radiogroup"
    :class="computedClasses"
    class="bv-no-focus-ring"
    tabindex="-1"
  >
    <slot name="first" />
    <BFormRadio v-for="item in normalizeOptions" :key="item.self" v-bind="item.props">
      <span v-if="item.html" v-html="item.html" />
      <span v-else v-text="item.text" />
    </BFormRadio>
    <slot />
  </div>
</template>
