<script setup lang="ts">
import { isEmptySlot } from '@/utils'

withDefaults(
  defineProps<{
    bgVariant?: string
    borderVariant?: string
    containerFluid?: boolean | string
    fluid?: boolean
    header?: string
    headerHtml?: string
    headerLevel?: number | string
    headerTag?: string
    lead?: string
    leadHtml?: string
    leadTag?: string
    tag?: string
    textVariant?: string
  }>(),
  {
    tag: 'div',
    leadTag: 'p',
    headerTag: 'h1',
    headerLevel: 3,
    containerFluid: false,
    fluid: false,
  },
)

const slots = useSlots()

const hasHeaderSlot = computed(() => !isEmptySlot(slots.header))
const hasLeadSlot = computed(() => !isEmptySlot(slots.lead))
</script>

<template>
  <component
    :is="tag"
    class="jumbotron" :class="{
      'jumbotron-fluid': fluid,
      [`text-${textVariant}`]: textVariant,
      [`bg-${bgVariant}`]: bgVariant,
      [`border-${borderVariant}`]: borderVariant,
      'border': borderVariant,
    }"
  >
    <component
      :is="headerTag"
      v-if="(header || headerHtml) && !hasHeaderSlot"
      :class="{ [`display-${headerLevel}`]: headerLevel }"
      v-html="headerHtml || header"
    />

    <component
      :is="headerTag"
      v-if="(header || headerHtml) || hasHeaderSlot"
      :class="{ [`display-${headerLevel}`]: headerLevel }"
    >
      <slot v-if="hasHeaderSlot" name="header" />
    </component>

    <component
      :is="leadTag"
      v-if="(lead || leadHtml) && !hasLeadSlot"
      class="lead"
      v-html="leadHtml || lead"
    />
    <component
      :is="leadTag"
      v-if="(lead || leadHtml) && hasLeadSlot"
      class="lead"
    >
      <slot v-if="hasLeadSlot" name="lead" />
    </component>

    <slot />
  </component>
</template>

<style scoped>
.jumbotron {
    padding: 2rem 1rem;
    margin-bottom: 2rem;
    background-color: #e9ecef;
    border-radius: .3rem
}

@media (min-width: 576px) {
    .jumbotron {
        padding:4rem 2rem
    }
}

.jumbotron-fluid {
    padding-right: 0;
    padding-left: 0;
    border-radius: 0
}
</style>
