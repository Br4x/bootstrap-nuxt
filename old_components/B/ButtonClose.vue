<script>
export default {
  props: {
    disabled: Boolean,
    textVariant: String,
    ariaLabel: {
      type: String,
      default: 'Close',
    },
    content: {
      type: String,
      default: '&times;',
    },
  },
  methods: {
    onClick(event) {
      const eventIsEvent = event instanceof Event
      if (eventIsEvent && this.disabled) {
        event.preventDefault()
        event.stopPropagation()
        event.stopImmediatePropagation()
      }
    },
  },
}
</script>

<template>
  <button
    class="close py-3' absolute bottom-0 right-0 top-0 px-4" :class=" {
      [`text-${textVariant}`]: textVariant,
      'text-primary': 'primary' === textVariant,
      'text-secondary': 'secondary' === textVariant,
      'text-success': 'success' === textVariant,
      'text-danger': 'danger' === textVariant,
      'text-yellow-500': 'warning' === textVariant,
      'text-info': 'info' === textVariant,
      'text-light': 'light' === textVariant,
      'text-dark': 'dark' === textVariant,
      'text-white': 'white' === textVariant,
      'text-gray-700': 'muted' === textVariant,
    }" type="button" :disabled="disabled" :aria-label="ariaLabel"
    @click="onClick"
  >
    <span v-if="!$slots.default" v-html="content" />
    <slot v-else />
  </button>
</template>
