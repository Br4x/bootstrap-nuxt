<script setup lang="ts">
import { isPlainObject } from '@/utils'

const props = withDefaults(
  defineProps<{
    disabledField?: string
    htmlField?: string
    options: Object[] | Object
    textField?: string
    valueField?: string
    id: string
  }>(),
  {
    disabledField: 'disabled',
    htmlField: 'html',
    textField: 'text',
    valueField: 'value',
  },
)

const stripTags = (text = '') => String(text).replace(/(<([^>]+)>)/gi, '')

const formOptions = computed(() =>
  normalizeOptions(props.options),
)

function normalizeOption(option: Object, key: any = null) {
  // When the option is an object, normalize it
  if (isPlainObject(option)) {
    const value = get(option, props.valueField)
    const text = get(option, props.textField)
    return {
      value: value === undefined ? key || text : value,
      text: stripTags(String(value === undefined ? key : text)),
      html: get(option, props.htmlField),
      disabled: Boolean(get(option, props.disabledField)),
    }
  }
  // Otherwise create an `<option>` object from the given value
  return {
    value: key || option,
    text: stripTags(String(option)),
    disabled: false,
  }
}

function normalizeOptions(options: Object[] | Object) {
  // Normalize the given options array
  if (Array.isArray(options)) {
    return options.map(option => normalizeOption(option))
  }
  else if (isPlainObject(options)) {
    // Normalize a `options` object to an array of options
    return Object.keys(options).map(key => normalizeOption(options[key] || {}, key))
  }
  return []
}
</script>

<template>
  <datalist :id="id">
    <option v-for="(option, index) in formOptions" :key="`option_${index}`" :value="option.value" :disabled="option.disabled">
      {{ option.html ? option.html : option.text }}
    </option>
    <slot />
  </datalist>
</template>

<style scoped>
/* Your component-specific styles go here */
</style>
