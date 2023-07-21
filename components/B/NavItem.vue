<script setup>
import { linkProps } from '@/constants/props'

const props = defineProps({
  ...linkProps,
  linkAttrs: Object,
  linkClasses: [Array, Object, String],
})

const { pluckProps } = useUtils()
</script>

<template>
  <li class="nav-item list-item">
    <BLink
      class="nav-link block px-4 py-2 focus:no-underline hover:no-underline"
      :class="linkClasses"
      v-bind="pluckProps(linkProps, props)"
    >
      <slot />
    </BLink>
  </li>
</template>
