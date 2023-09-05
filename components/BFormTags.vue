<script setup lang="ts">
import { onKeyStroke, useFocus, useToNumber, useVModel } from '@vueuse/core'
import { escapeRegExpChars } from '@/utils'

import type { ButtonVariant } from '~/types/ButtonVariant'
import type { ClassValue } from '~/types/ClassValue'
import type { ColorVariant } from '~/types/ColorVariant'
import type { InputType } from '~/types/InputType'
import type { Size } from '~/types/Size'

const props = withDefaults(
  defineProps<{
    addButtonText?: string
    addButtonVariant?: ButtonVariant | null
    addOnChange?: boolean
    autofocus?: boolean
    disabled?: boolean
    duplicateTagText?: string
    inputAttrs?: Record<string, unknown>
    inputClass?: ClassValue
    inputId?: string
    inputType?: InputType
    invalidTagText?: string
    form?: string
    limit?: number | string
    limitTagsText?: string
    modelValue?: string[]
    name?: string
    noAddOnEnter?: boolean
    noOuterFocus?: boolean
    noTagRemove?: boolean
    placeholder?: string
    removeOnDelete?: boolean
    required?: boolean
    separator?: string | string[]
    state?: boolean | null
    size?: Size
    tagClass?: ClassValue
    tagPills?: boolean
    tagRemoveLabel?: string
    tagRemovedLabel?: string
    tagValidator?: (t: string) => boolean
    tagVariant?: ColorVariant | null
  }>(),
  {
    inputAttrs: undefined,
    tagRemoveLabel: undefined,
    tagClass: undefined,
    separator: undefined,
    size: 'md',
    name: undefined,
    limit: undefined,
    form: undefined,
    inputClass: undefined,
    inputId: undefined,
    addButtonText: 'Add',
    addButtonVariant: 'outline-secondary',
    addOnChange: false,
    autofocus: false,
    disabled: false,
    duplicateTagText: 'Duplicate tag(s)',
    inputType: 'text',
    invalidTagText: 'Invalid tag(s)',
    limitTagsText: 'Tag limit reached',
    modelValue: () => [],
    noAddOnEnter: false,
    noOuterFocus: false,
    noTagRemove: false,
    placeholder: 'Add tag...',
    removeOnDelete: false,
    required: false,
    state: null,
    tagPills: false,
    tagRemovedLabel: 'Tag removed',
    tagValidator: () => true,
    tagVariant: 'secondary',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
  'input': [value: string[]]
  'tagState': [...args: string[][]]
  'focus': [value: FocusEvent]
  'focusin': [value: FocusEvent]
  'focusout': [value: FocusEvent]
  'blur': [value: FocusEvent]
}>()

const modelValue = useVModel(props, 'modelValue', emit)

const computedId = useId()

const limitNumber = useToNumber(computed(() => props.limit ?? NaN))

const stateClass = useStateClass(props.state)

const input = ref<HTMLInputElement | null>(null)

const { focused } = useFocus(input, {
  initialValue: props.autofocus,
})

const _inputId = computed<string>(() => props.inputId || `${computedId.value}input__`)
const tags = ref<string[]>(modelValue.value)
const inputValue = ref<string>('')
const shouldRemoveOnDelete = ref<boolean>(modelValue.value.length > 0)
const lastRemovedTag = ref<string>('')
const validTags = ref<string[]>([])
const invalidTags = ref<string[]>([])
const duplicateTags = ref<string[]>([])

const isDuplicate = computed<boolean>(() => tags.value.includes(inputValue.value))

const isInvalid = computed<boolean>(() =>
  inputValue.value === '' ? false : !props.tagValidator(inputValue.value),
)
const isLimitReached = computed<boolean>(() => tags.value.length === limitNumber.value)

const disableAddButton = computed<boolean>(() => !isInvalid.value && !isDuplicate.value)

const slotAttrs = computed(() => ({
  addButtonText: props.addButtonText,
  addButtonVariant: props.addButtonVariant,
  addTag,
  disableAddButton: disableAddButton.value,
  disabled: props.disabled,
  duplicateTagText: props.duplicateTagText,
  duplicateTags: duplicateTags.value,
  form: props.form,
  inputAttrs: {
    ...props.inputAttrs,
    disabled: props.disabled,
    form: props.form,
    id: _inputId,
    value: inputValue,
  },
  inputHandlers: {
    input: onInput,
    keydown: onKeydown,
    change: onChange,
  },
  inputId: _inputId,
  inputType: props.inputType,
  invalidTagText: props.invalidTagText,
  invalidTags: invalidTags.value,
  isDuplicate: isDuplicate.value,
  isInvalid: isInvalid.value,
  isLimitReached: isLimitReached.value,
  limitTagsText: props.limitTagsText,
  limit: limitNumber.value,
  noTagRemove: props.noTagRemove,
  placeholder: props.placeholder,
  removeTag,
  required: props.required,
  separator: props.separator,
  size: props.size,
  state: props.state,
  tagClass: props.tagClass,
  tagPills: props.tagPills,
  tagRemoveLabel: props.tagRemoveLabel,
  tagVariant: props.tagVariant,
  tags: tags.value,
}))

watch(modelValue, (newVal) => {
  tags.value = newVal
})

function onFocusin(e: FocusEvent): void {
  if (props.disabled) {
    const target = e.target as HTMLDivElement
    target.blur()
    return
  }

  emit('focusin', e)
}

function onFocus(e: FocusEvent): void {
  if (props.disabled || props.noOuterFocus)
    return

  focused.value = true
  emit('focus', e)
}

function onBlur(e: FocusEvent): void {
  focused.value = false
  emit('blur', e)
}

function onInput(e: Event | string): void {
  const value = typeof e === 'string' ? e : (e.target as HTMLInputElement).value

  shouldRemoveOnDelete.value = false

  if (props.separator?.includes(value.charAt(0)) && value.length > 0) {
    if (input.value)
      input.value.value = ''

    return
  }

  inputValue.value = value

  if (props.separator?.includes(value.charAt(value.length - 1))) {
    addTag(value.slice(0, value.length - 1))
    return
  }

  validTags.value = props.tagValidator(value) && !isDuplicate.value ? [value] : []
  invalidTags.value = props.tagValidator(value) ? [] : [value]
  duplicateTags.value = isDuplicate.value ? [value] : []

  emit('tagState', validTags.value, invalidTags.value, duplicateTags.value)
}

function onChange(e: Event): void {
  if (props.addOnChange) {
    onInput(e)

    if (!isDuplicate.value)
      addTag(inputValue.value)
  }
}

function onKeydown(e: KeyboardEvent): void {
  if (e.key === 'Enter' && !props.noAddOnEnter) {
    addTag(inputValue.value)
    return
  }

  if (
    (e.key === 'Backspace' || e.key === 'Delete')
    && props.removeOnDelete
    && inputValue.value === ''
    && shouldRemoveOnDelete.value
    && tags.value.length > 0
  )
    removeTag(tags.value[tags.value.length - 1])
  else
    shouldRemoveOnDelete.value = true
}

onKeyStroke(onKeydown, { target: input })

const separator = computed(() => {
  if (!props.separator)
    return

  return typeof props.separator === 'string' ? props.separator : props.separator.join('')
})

const separatorRegExp = computed(() => {
  if (!separator.value)
    return

  return new RegExp(`[${escapeRegExpChars(separator.value)}]+`)
})

function addTag(tag?: string): void {
  tag = (tag ?? inputValue.value).trim()

  const newTags = separatorRegExp.value
    ? tag.split(separatorRegExp.value).map(t => t.trim())
    : [tag]
  const validTags: string[] = []

  for (const newTag of newTags) {
    if (newTag === '' || isDuplicate.value || !props.tagValidator(newTag))
      continue

    if (limitNumber.value && isLimitReached.value)
      break

    validTags.push(newTag)
  }

  const newValue = [...modelValue.value, ...validTags]
  inputValue.value = ''
  shouldRemoveOnDelete.value = true
  modelValue.value = newValue
  emit('input', newValue)
  focused.value = true
}

function removeTag(tag?: string): void {
  const tagIndex = tags.value.indexOf(tag?.toString() ?? '')
  lastRemovedTag.value = tags.value.splice(tagIndex, 1).toString()
  modelValue.value = tags.value
}

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
    :id="computedId"
    class="b-form-tags form-control h-auto"
    :class="[
      stateClass,
      {
        [`form-control-${size}`]: size !== 'md',
        disabled,
        focus: focused,
      },
    ]"
    role="group"
    tabindex="-1"
    @focusin="onFocusin"
    @focusout="emit('focusout', $event)"
  >
    <output
      :id="`${computedId}selected_tags__`"
      class="visually-hidden"
      :for="_inputId"
      :aria-live="focused ? 'polite' : 'off'"
      aria-atomic="true"
      aria-relevant="additions text"
    >{{ tags.join(', ') }}</output>
    <div
      :id="`${computedId}removed_tags__`"
      role="status"
      :aria-live="focused ? 'assertive' : 'off'"
      aria-atomic="true"
      class="visually-hidden"
    >
      ({{ tagRemovedLabel }}) {{ lastRemovedTag }}
    </div>

    <slot v-bind="slotAttrs">
      <ul
        :id="`${computedId}tag_list__`"
        class="b-form-tags-list list-unstyled d-flex align-items-center mb-0 flex-wrap"
      >
        <template v-for="(tag, index) in tags" :key="index">
          <slot
            name="tag"
            :tag="tag"
            :tag-class="tagClass"
            :tag-variant="tagVariant"
            :tag-pills="tagPills"
            :remove-tag="removeTag"
          >
            <BFormTag
              :key="tag"
              :class="tagClass"
              tag="li"
              :variant="tagVariant"
              :pill="tagPills"
              @remove="removeTag"
            >
              {{ tag }}
            </BFormTag>
          </slot>
        </template>
        <li
          role="none"
          aria-live="off"
          class="b-from-tags-field flex-grow-1"
          :aria-controls="`${computedId}tag_list__`"
        >
          <div role="group" class="d-flex">
            <input
              :id="_inputId"
              ref="input"
              :disabled="disabled"
              :value="inputValue"
              :type="inputType"
              :placeholder="placeholder"
              class="b-form-tags-input m-0 w-100 flex-grow-1 border-0 bg-transparent p-0"
              style="outline: currentcolor none 0px; min-width: 5rem"
              v-bind="inputAttrs"
              :form="form"
              :required="required || undefined"
              :aria-required="required || undefined"
              @input="onInput"
              @change="onChange"
              @focus="onFocus"
              @blur="onBlur"
            >
            <button
              v-if="disableAddButton"
              type="button"
              class="btn b-form-tags-button py-0"
              :class="[
                inputClass,
                {
                  [`btn-${addButtonVariant}`]: addButtonVariant !== null,
                  'disabled invisible': inputValue.length === 0,
                },
              ]"
              style="font-size: 90%"
              :disabled="disabled || inputValue.length === 0 || isLimitReached"
              @click="addTag(inputValue)"
            >
              <slot name="add-button-text">
                {{ addButtonText }}
              </slot>
            </button>
          </div>
        </li>
      </ul>
      <div aria-live="polite" aria-atomic="true">
        <div v-if="isInvalid" class="d-block invalid-feedback">
          {{ invalidTagText }}: {{ inputValue }}
        </div>
        <small v-if="isDuplicate" class="form-text text-body-secondary">{{ duplicateTagText }}: {{ inputValue }}</small>
        <small v-if="tags.length === limit" class="form-text text-body-secondary">Tag limit reached</small>
      </div>
    </slot>
    <template v-if="name">
      <input v-for="(tag, index) in tags" :key="index" type="hidden" :name="name" :value="tag">
    </template>
  </div>
</template>

<style lang="scss" scoped>
.b-form-tags.focus {
  color: #212529;
  background-color: #fff;
  border-color: #86b7fe;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.b-form-tags.disabled {
  background-color: #e9ecef;
}

.b-form-tag.disabled {
  opacity: 0.75;
}

.b-form-tags.focus.is-valid {
  border-color: #198754;
  box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.25);
}

.b-form-tags.focus.is-invalid {
  border-color: #dc3545;
  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
}

.b-form-tags .b-form-tags-list {
  margin-top: -0.25rem;
}

.b-form-tags .b-form-tags-list .b-form-tag,
.b-form-tags .b-form-tags-list .b-from-tags-field {
  margin-top: 0.25rem;
}

.b-form-tags .b-form-tags-list .b-form-tag {
  padding: 0.25em 0.65em;
}

.b-form-tag {
  font-size: 75% !important;
  font-weight: 400 !important;
  line-height: 1.5 !important;
  margin-right: 0.25rem;
}

.b-form-tags .b-form-tag + .b-form-tag {
  margin-left: 0;
}

.b-form-tag > button.b-form-tag-remove {
  color: inherit;
  font-size: 75%;
  line-height: 1;
  float: none;
  margin-left: 0.25rem;
}
</style>
