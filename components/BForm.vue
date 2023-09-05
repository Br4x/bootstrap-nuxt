<script setup lang="ts">
withDefaults(
  defineProps<{
    id?: string
    floating?: boolean
    novalidate?: boolean
    validated?: boolean
  }>(),
  {
    floating: false,
    id: undefined,
    novalidate: false,
    validated: false,
  },
)

const emit = defineEmits<{
  submit: [value: Event]
}>()

function submitted(e: Event) {
  emit('submit', e)
}
</script>

<template>
  <form
    :id="id" :novalidate="novalidate" :class="{
      'form-floating': floating,
      'was-validated': validated,
    }" @submit.prevent="submitted"
  >
    <slot />
  </form>
</template>
