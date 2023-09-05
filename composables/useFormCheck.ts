import { type MaybeRefOrGetter } from 'vue'
import useStateClass from './useStateClass'
import type { AriaInvalid } from '~/types/AriaInvalid'
import type { ButtonVariant } from '~/types/ButtonVariant'
import type { Size } from '~/types/Size'
import { resolveAriaInvalid } from '@/utils'

interface ClassesItemsInput {
  plain?: boolean
  button?: boolean
  inline?: boolean
  switch?: boolean
  size?: Size
}

function getClasses(items: MaybeRefOrGetter<ClassesItemsInput>) {
  return computed(() => {
    const resolvedItems = toValue(items)
    return {
      'form-check': resolvedItems.plain === false && resolvedItems.button === false,
      'form-check-inline': resolvedItems.inline === true,
      'form-switch': resolvedItems.switch === true,
      [`form-control-${resolvedItems.size}`]:
        resolvedItems.size !== undefined
        && resolvedItems.size !== 'md'
        && resolvedItems.button === false,
    }
  })
}

interface InputClassesItemsInput {
  plain?: boolean
  button?: boolean
  state?: boolean | null
}

function getInputClasses(items: MaybeRefOrGetter<InputClassesItemsInput>) {
  const resolvedItems = toRef(items)

  const stateClass = useStateClass(computed(() => resolvedItems.value.state ?? null))

  return computed(() => [
    stateClass.value,
    {
      'form-check-input':
        resolvedItems.value.plain === false && resolvedItems.value.button === false,
      'btn-check': resolvedItems.value.button === true,
    },
  ])
}

interface LabelClasesItemsInput {
  plain?: boolean
  button?: boolean
  buttonVariant?: ButtonVariant | null
  size?: Size
}

function getLabelClasses(items: MaybeRefOrGetter<LabelClasesItemsInput>) {
  return computed(() => {
    const resolvedItems = toValue(items)
    return {
      'form-check-label': resolvedItems.plain === false && resolvedItems.button === false,
      'btn': resolvedItems.button === true,
      [`btn-${resolvedItems.buttonVariant}`]:
        resolvedItems.button === true
        && resolvedItems.buttonVariant !== undefined
        && resolvedItems.buttonVariant !== null,
      [`btn-${resolvedItems.size}`]:
        resolvedItems.button && resolvedItems.size && resolvedItems.size !== 'md',
    }
  })
}

interface GroupAttrItemsInput {
  required?: boolean
  ariaInvalid?: AriaInvalid
  state?: boolean | null
}

function getGroupAttr(items: MaybeRefOrGetter<GroupAttrItemsInput>) {
  return computed(() => {
    const resolvedItems = toValue(items)
    return {
      'aria-invalid': resolveAriaInvalid(resolvedItems.ariaInvalid, resolvedItems.state),
      'aria-required': resolvedItems.required === true ? true : undefined,
    }
  })
}

interface GroupClassesItemsInput {
  validated?: boolean
  buttons?: boolean
  stacked?: boolean
  size?: Size
}

function getGroupClasses(items: MaybeRefOrGetter<GroupClassesItemsInput>) {
  return computed(() => {
    const resolvedItems = toValue(items)
    return {
      'was-validated': resolvedItems.validated === true,
      'btn-group': resolvedItems.buttons === true && resolvedItems.stacked === false,
      'btn-group-vertical': resolvedItems.stacked === true && resolvedItems.buttons === true,
      [`btn-group-${resolvedItems.size}`]: resolvedItems.size !== undefined,
    }
  })
}

export { getClasses, getInputClasses, getLabelClasses, getGroupAttr, getGroupClasses }
