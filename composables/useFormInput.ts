import { useFocus } from '@vueuse/core'

import { resolveAriaInvalid } from '@/utils'
import type { AriaInvalid } from '~/types/AriaInvalid'
import type { Size } from '~/types/Size'

export interface CommonInputProps {
  ariaInvalid?: AriaInvalid
  autocomplete?: string
  autofocus?: boolean
  disabled?: boolean
  form?: string

  formatter?: (val: any, evt: any) => any
  id?: string
  lazy?: boolean
  lazyFormatter?: boolean
  list?: string
  modelValue?: string | number
  name?: string
  number?: boolean
  placeholder?: string
  plaintext?: boolean
  readonly?: boolean
  required?: boolean
  size?: Size
  state?: boolean | null | undefined
  trim?: boolean
}

export default (props: Readonly<CommonInputProps>, emit: any) => {
  const input = ref<HTMLInputElement | null>(null)
  let inputValue: string | null = null
  let neverFormatted = true
  const computedId = useId(() => props.id, 'input')

  const { focused } = useFocus(input, {
    initialValue: props.autofocus,
  })

  const _formatValue = (value: unknown, evt: Event, force = false) => {
    value = String(value)
    if (typeof props.formatter === 'function' && (!props.lazyFormatter || force)) {
      neverFormatted = false
      return props.formatter(value, evt)
    }
    return value
  }

  const _getModelValue = (value: any) => {
    if (props.trim)
      return value.trim()
    if (props.number)
      return Number.parseFloat(value)

    return value
  }

  const handleAutofocus = () => {
    if (props.autofocus)
      focused.value = true
  }

  onMounted(() => {
    if (input.value)
      input.value.value = props.modelValue as string
  })

  onActivated(() => {
    nextTick(() => {
      handleAutofocus()
    })
  })

  const computedAriaInvalid = computed(() =>
    resolveAriaInvalid(props.ariaInvalid, props.state),
  )

  const onInput = (evt: Event) => {
    const { value } = evt.target as HTMLInputElement
    const formattedValue = _formatValue(value, evt)
    if (formattedValue === false || evt.defaultPrevented) {
      evt.preventDefault()
      return
    }

    if (props.lazy)
      return

    const nextModel = _getModelValue(formattedValue)

    if (props.modelValue !== nextModel) {
      inputValue = value
      emit('update:modelValue', nextModel)
    }

    emit('input', formattedValue)
  }

  const onChange = (evt: Event) => {
    const { value } = evt.target as HTMLInputElement
    const formattedValue = _formatValue(value, evt)
    if (formattedValue === false || evt.defaultPrevented) {
      evt.preventDefault()
      return
    }

    if (!props.lazy)
      return
    inputValue = value
    emit('update:modelValue', formattedValue)

    const nextModel = _getModelValue(formattedValue)
    if (props.modelValue !== nextModel)
      emit('change', formattedValue)
  }

  const onBlur = (evt: FocusEvent) => {
    emit('blur', evt)
    if (!props.lazy && !props.lazyFormatter)
      return

    const { value } = evt.target as HTMLInputElement
    const formattedValue = _formatValue(value, evt, true)

    inputValue = value
    emit('update:modelValue', formattedValue)
  }

  const focus = () => {
    if (!props.disabled)
      focused.value = true
  }

  const blur = () => {
    if (!props.disabled)
      input.value?.blur()
  }

  watch(
    () => props.modelValue,
    (newValue) => {
      if (!input.value)
        return
      input.value.value = inputValue && neverFormatted ? inputValue : (newValue as string)
      inputValue = null
      neverFormatted = true
    },
  )

  return {
    input,
    computedId,
    computedAriaInvalid,
    onInput,
    onChange,
    onBlur,
    focus,
    blur,
  }
}
