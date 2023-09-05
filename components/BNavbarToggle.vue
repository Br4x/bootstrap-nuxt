<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    disabled?: boolean
    label?: string
    target?: string | string[]
  }>(),
  {
    label: 'Toggle navigation',
    disabled: false,
    target: undefined,
  },
)

const emit = defineEmits<{
  click: [value: MouseEvent]
}>()

function onClick(e: MouseEvent): void {
  if (!props.disabled)
    emit('click', e)
}
</script>

<template>
  <button
    v-b-toggle="!disabled ? target : undefined"
    class="navbar-toggler"
    type="button"
    :class="{
      disabled,
    }"
    :disabled="disabled"
    :aria-label="label"
    @click="onClick"
  >
    <slot>
      <span class="navbar-toggler-icon" />
    </slot>
  </button>
</template>
