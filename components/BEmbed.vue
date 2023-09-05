<script setup lang="ts">
import type { EmbedType } from '~/types/EmbedType'

withDefaults(
  defineProps<{
    aspect?: string
    tag?: string
    type?: EmbedType
  }>(),
  {
    aspect: '16by9',
    tag: 'div',
    type: 'iframe',
  },
)
</script>

<template>
  <component
    :is="tag" class="embed-responsive"
    :class="[
      aspect && `embed-responsive-${aspect}`,
    ]"
  >
    <component
      :is="type"
      class="embed-responsive-item"
    >
      <slot />
    </component>
  </component>
</template>

<style scoped>
.embed-responsive {
    position: relative;
    display: block;
    width: 100%;
    padding: 0;
    overflow: hidden
}

.embed-responsive:before {
    display: block;
    content: ""
}

.embed-responsive .embed-responsive-item,.embed-responsive embed,.embed-responsive iframe,.embed-responsive object,.embed-responsive video {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0
}
</style>
