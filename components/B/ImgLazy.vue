<script setup>
const props = defineProps(imgLazyProps)

const emit = defineEmits(['show'])

const { identity, concat, hasInteractionObserverSupport, toInteger } = useUtils()
const { imgLazyProps } = useProps()

const isShown = ref(props.show)

function updateShowProp() {
  emit('show', isShown.value)
}

function doShow(visible) {
  if ((visible || visible === null) && !isShown.value) {
    requestAnimationFrame(() => {
      isShown.value = true
    })
  }
}

watch(() => props.show, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    const visible = hasInteractionObserverSupport ? newValue : true
    isShown.value = visible

    if (newValue !== visible)
      nextTick(updateShowProp)
  }
})

watch(() => isShown, (newValue, oldValue) => {
  if (newValue !== oldValue)
    updateShowProp()
})

nextTick(() => {
  isShown.value = hasInteractionObserverSupport ? props.show : true
})
</script>

<template>
  <BImg
    v-if="!isShown" v-b-visible="doShow(toInteger(offset, 0))"
    :blank="!(isShown || blankSrc)"
    :src="!blankSrc || isShown ? src : blankSrc"
    :width="isShown ? width : blankWidth || width"
    :height="isShown ? height : blankHeight || height"
    :srcset="concat(srcset).filter(identity).join(',')"
    :sizes="concat(sizes).filter(identity).join(',')"
  />
  <BImg
    v-else :blank="!(isShown || blankSrc)"
    :src="!blankSrc || isShown ? src : blankSrc"
    :width="isShown ? width : blankWidth || width"
    :height="isShown ? height : blankHeight || height"
    :srcset="concat(srcset).filter(identity).join(',')"
    :sizes="concat(sizes).filter(identity).join(',')"
  />
</template>
