<script setup lang="ts">
withDefaults(
  defineProps<{
    labelFor?: string
    label?: string
    text?: string
  }>(),
  {
    label: undefined,
    text: undefined,
    labelFor: undefined,
  },
)
</script>

<template>
  <div class="form-floating">
    <slot>
      {{ text }}
    </slot>
    <label :for="labelFor">
      <slot name="label">
        {{ label }}
      </slot>
    </label>
  </div>
</template>
