<script setup>
const props = defineProps({
  // Accepts a number (i.e. `16 / 9`, `1`, `4 / 3`)
  // Or a string (i.e. '16/9', '16:9', '4:3' '1:1')
  aspect: {
    type: [Number, String],
    default: '1:1',
  },
  tag: {
    type: String,
    default: 'div',
  },
},
)

const { toFloat } = useUtils()

const padding = computed(() => {
  const { aspect } = props
  let ratio = 1
  if (/^\d+(\.\d*)?[/:]\d+(\.\d*)?$/.test(aspect)) {
    const [width, height] = aspect.split(/[/:]/).map(v => toFloat(v) || 1)
    ratio = width / height
  }
  else {
    ratio = toFloat(aspect) || 1
  }
  return `${100 / Math.abs(ratio)}%`
})
</script>

<template>
  <component :is="tag" class="b-aspect flex">
    <div class="b-aspect-sizer h-0 grow" :style="{ paddingBottom: padding }" />
    <div class="b-aspect-content ml-[-100%] ml-[-100%] max-w-full w-full grow">
      <slot />
    </div>
  </component>
</template>
