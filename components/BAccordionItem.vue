<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import type { BvTriggerableEvent } from '@/utils'
import { accordionInjectionKey } from '@/utils'

const props = withDefaults(
  defineProps<{
    id?: string
    title?: string
    modelValue?: boolean
    headerTag?: string
    tag?: string
    toggle?: boolean
    horizontal?: boolean
    visible?: boolean
    isNav?: boolean
  }>(),
  {
    headerTag: 'h2',
    id: undefined,
    title: undefined,
    tag: undefined,
    horizontal: undefined,
    toggle: undefined,
    isNav: undefined,
    modelValue: false,
    visible: false,
  },
)

const emit = defineEmits<{
  'show': [value: BvTriggerableEvent]
  'shown': [value: BvTriggerableEvent]
  'hide': [value: BvTriggerableEvent]
  'hidden': [value: BvTriggerableEvent]
  'hidePrevented': []
  'showPrevented': []
  'update:modelValue': [value: boolean]
}>()

defineOptions({
  inheritAttrs: false,
})

const modelValue = useVModel(props, 'modelValue', emit, { passive: true })

const parentData = inject(accordionInjectionKey, null)

const computedId = useId(() => props.id, 'accordion_item')

onMounted(() => {
  if (modelValue.value && !parentData?.free)
    parentData?.setOpenItem(computedId.value)

  if (!modelValue.value && parentData?.openItem.value === computedId.value)
    modelValue.value = true
})

watch(
  () => parentData?.openItem.value,
  () =>
    (modelValue.value = parentData?.openItem.value === computedId.value && !parentData?.free),
)
watch(modelValue, () => {
  if (modelValue.value && !parentData?.free)
    parentData?.setOpenItem(computedId.value)
})
</script>

<template>
  <div class="accordion-item">
    <BCollapse
      :id="computedId"
      v-model="modelValue"
      class="accordion-collapse"
      v-bind="$attrs"
      :aria-labelledby="`${computedId}-heading`"
      :tag="tag"
      :toggle="toggle"
      :horizontal="horizontal"
      :visible="visible"
      :is-nav="isNav"
      @show="$emit('show', $event)"
      @shown="emit('shown', $event)"
      @hide="emit('hide', $event)"
      @hidden="emit('hidden', $event)"
      @hide-prevented="emit('hidePrevented')"
      @show-prevented="emit('showPrevented')"
    >
      <template #header="{ visible: toggleVisible, toggle: slotToggle }">
        <component :is="headerTag" :id="`${computedId}-heading`" class="accordion-header">
          <button
            class="accordion-button"
            :class="{ collapsed: !toggleVisible }"
            type="button"
            :aria-expanded="toggleVisible ? 'true' : 'false'"
            :aria-controls="computedId"
            @click="slotToggle"
          >
            <slot name="title">
              {{ title }}
            </slot>
          </button>
        </component>
      </template>
      <div class="accordion-body">
        <slot />
      </div>
    </BCollapse>
  </div>
</template>
