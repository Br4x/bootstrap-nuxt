<script setup lang="ts">
import type { Middleware, Strategy } from '@floating-ui/vue'
import { useVModel } from '@vueuse/core'

import { omit } from '@/utils'

import type { ButtonVariant } from '~/types/ButtonVariant'
import type { ClassValue } from '~/types/ClassValue'
import type { Size } from '~/types/Size'

// TODO see how this works in a b-collapse navbar ie https://bootstrap-vue.org/docs/components/navbar first example
const props = withDefaults(
  defineProps<{
    id?: string
    text?: string
    toggleClass?: ClassValue
    size?: Size
    offset?: string
    autoClose?: boolean | 'inside' | 'outside'
    splitVariant?: ButtonVariant | null
    noCaret?: boolean
    variant?: ButtonVariant | null
    modelValue?: boolean
    lazy?: boolean
    strategy?: Strategy
    floatingMiddleware?: Middleware[]
    noFlip?: boolean
    noShift?: boolean
    dropup?: boolean
    dropend?: boolean
    dropstart?: boolean
    center?: boolean
    end?: boolean
    menuClass?: ClassValue
  }>(),
  {
    lazy: undefined,
    strategy: undefined,
    floatingMiddleware: undefined,
    noFlip: undefined,
    noShift: undefined,
    dropup: undefined,
    dropend: undefined,
    dropstart: undefined,
    center: undefined,
    end: undefined,
    menuClass: undefined,
    id: undefined,
    text: undefined,
    toggleClass: undefined,
    size: 'md',
    offset: undefined,
    autoClose: undefined,
    splitVariant: undefined,
    noCaret: undefined,
    variant: 'link',
    modelValue: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const modelValue = useVModel(props, 'modelValue', emit, { passive: true })

const dropdownValue = computed({
  get: () => modelValue.value,
  set: (value: boolean) => {
    modelValue.value = value
  },
})
const computedDropdownProps = computed(() => omit(props, ['modelValue']))

function close() {
  modelValue.value = false
}
function open() {
  modelValue.value = true
}
function toggle() {
  modelValue.value = !modelValue.value
}

defineExpose({
  close,
  open,
  toggle,
})
</script>

<template>
  <li class="nav-item dropdown">
    <BDropdown v-model="dropdownValue" v-bind="computedDropdownProps" is-nav>
      <template #button-content>
        <slot name="button-content" />
      </template>
      <template #toggle-text>
        <slot name="toggle-text" />
      </template>
      <template #default>
        <slot />
      </template>
    </BDropdown>
  </li>
</template>
