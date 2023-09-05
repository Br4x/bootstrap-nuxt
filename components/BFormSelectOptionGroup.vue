<script setup lang="ts">
import normalizeOptions from '~/composables/useFormSelect'

const props = withDefaults(
  defineProps<{
    label?: string
    disabledField?: string
    htmlField?: string
    options?: unknown[] | Record<string, unknown>
    textField?: string
    valueField?: string
  }>(),
  {
    disabledField: 'disabled',
    label: undefined,
    htmlField: 'html',
    options: () => [],
    textField: 'text',
    valueField: 'value',
  },
)

const formOptions = computed(() =>
  normalizeOptions(props.options as any[], 'BFormSelectOptionGroup', props),
)
</script>

<template>
  <optgroup :label="label">
    <slot name="first" />
    <!-- TODO these options don't seem right for the component -->
    <BFormSelectOption
      v-for="(option, index) in formOptions"
      :key="index"
      :value="(option as any).value"
      :disabled="(option as any).disabled"
      v-bind="$attrs"
      v-html="(option as any).html || (option as any).text"
    />
    <slot />
  </optgroup>
</template>
