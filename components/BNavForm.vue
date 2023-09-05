<script setup lang="ts">
withDefaults(
  defineProps<{
    role?: string
    id?: string // Extend BFormProps
    floating?: boolean
    novalidate?: boolean
    validated?: boolean
  }>(),
  {
    role: undefined,
    id: undefined,
    floating: false,
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
  <BForm
    :id="id"
    :floating="floating"
    :role="role"
    :novalidate="novalidate"
    :validated="validated"
    class="d-flex"
    @submit.prevent="submitted"
  >
    <slot />
  </BForm>
</template>
