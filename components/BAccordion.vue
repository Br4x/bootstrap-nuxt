<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { accordionInjectionKey } from '@/utils'

const props = withDefaults(
  defineProps<{
    flush?: boolean
    free?: boolean
    id?: string
    modelValue?: string
  }>(),
  {
    flush: false,
    free: false,
    id: undefined,
    modelValue: undefined,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const modelValue = useVModel(props, 'modelValue', emit, { passive: true })

const computedId = useId(() => props.id, 'accordion')

provide(accordionInjectionKey, {
  openItem: readonly(modelValue),
  free: readonly(toRef(props, 'free')),
  setOpenItem: (id: string) => {
    modelValue.value = id
  },
})
</script>

<template>
  <div
    :id="computedId" class="accordion" :class="{
      'accordion-flush': flush,
    }"
  >
    <slot />
  </div>
</template>
