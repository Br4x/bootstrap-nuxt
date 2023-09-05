<script setup lang="ts">
import {
  onKeyStroke,
  useElementHover,
  useIntervalFn,
  useSwipe,
  useToNumber,
  useVModel,
} from '@vueuse/core'
import {
  BvCarouselEvent,
  carouselInjectionKey,
  getSlotElements,
} from '@/utils'

const props = withDefaults(
  defineProps<{
    ride?: true | false | 'true' | 'false' | '' | 'carousel' // boolean | 'carousel'
    noHoverPause?: boolean
    rideReverse?: boolean
    fade?: boolean
    id?: string
    imgHeight?: string
    imgWidth?: string
    background?: string
    modelValue?: number
    controls?: boolean
    indicators?: boolean
    interval?: number | string
    noTouch?: boolean
    noWrap?: boolean
    controlsPrevText?: string
    controlsNextText?: string
    indicatorsButtonLabel?: string
    keyboard?: boolean
    touchThreshold?: number | string
  }>(),
  {
    id: undefined,
    imgHeight: undefined,
    imgWidth: undefined,
    background: undefined,
    ride: false,
    noHoverPause: false,
    rideReverse: false,
    modelValue: 0,
    fade: false,
    controls: false,
    indicators: false,
    keyboard: true,
    interval: 5000,
    noTouch: false,
    noWrap: false,
    controlsNextText: 'Next',
    controlsPrevText: 'Previous',
    indicatorsButtonLabel: 'Slide',
    touchThreshold: 50,
  },
)

const emit = defineEmits<{
  'slid': [value: BvCarouselEvent]
  'slide': [value: BvCarouselEvent]
  'update:modelValue': [value: number]
}>()

const slots = useSlots()

const computedId = useId(() => props.id, 'carousel')

const modelValue = useVModel(props, 'modelValue', emit, { passive: true })

const touchThresholdNumber = useToNumber(() => props.touchThreshold)
const intervalNumber = useToNumber(() => props.interval)

const isTransitioning = ref(false)
const rideStarted = ref(false)
const direction = ref(true)
const relatedTarget = ref<HTMLElement | null>(null)
const element = ref<HTMLElement | null>(null)
const previousModelValue = ref(modelValue.value)

const isHovering = useElementHover(element)

// Class carousel-item is a static property
// If you make it static, the direction can be reversed -- properly (atm it does the carousel-item-${} logic backwards for entering, a weird hack)
// So all that would be great. However, when you do this, it will break the transition flow. Something about it breaks and I'm not sure why!
// Try it by removing carousel-item from below and making `!direction.value` => `direction.value` for enter
// Then reviewing the behavior
const enterClasses = computed(
  () =>
    `carousel-item carousel-item-${!direction.value ? 'next' : 'prev'} carousel-item-${!direction.value ? 'start' : 'end'
    }`,
)
const leaveClasses = computed(
  () => `carousel-item active carousel-item-${direction.value ? 'start' : 'end'}`,
)

const { pause, resume } = useIntervalFn(
  () => {
    props.rideReverse ? prev() : next()
  },
  intervalNumber,
  { immediate: props.ride === 'carousel' },
)

const isRiding = computed(
  () =>
    (props.ride === true && rideStarted.value === true) || props.ride === 'carousel',
)
const slides = computed(() => getSlotElements(slots.default, 'BCarouselSlide'))

function buildBvCarouselEvent(event: 'slid' | 'slide') {
  return new BvCarouselEvent(event, {
    componentId: computedId.value,
    cancelable: false,
    target: element.value,
    direction: direction.value ? 'right' : 'left',
    from: previousModelValue.value,
    to: modelValue.value,
    relatedTarget: relatedTarget.value?.children[modelValue.value] ?? null,
  })
}

function goToValue(value: number): void {
  if (isTransitioning.value === true)
    return

  if (props.ride === true)
    rideStarted.value = true

  if (isRiding.value === true)
    resume()

  direction.value = !(value < modelValue.value)
  if (value >= slides.value.length) {
    if (props.noWrap)
      return
    modelValue.value = 0
    return
  }
  if (value < 0) {
    if (props.noWrap)
      return
    modelValue.value = slides.value.length - 1
    return
  }
  previousModelValue.value = modelValue.value
  modelValue.value = value
}

function prev(): void {
  goToValue(modelValue.value - 1)
}
function next(): void {
  goToValue(modelValue.value + 1)
}

function onKeydown(fn: () => void) {
  if (props.keyboard === false)
    return
  fn()
}

function onMouseEnter() {
  if (props.noHoverPause)
    return
  pause()
}
function onMouseLeave() {
  if (!isRiding.value)
    return
  resume()
}

const { lengthX } = useSwipe(element, {
  passive: true,
  onSwipeStart() {
    if (props.noTouch === true)
      return
    pause()
  },
  onSwipeEnd() {
    if (props.noTouch === true)
      return
    const resumeRiding = () => {
      if (isRiding.value === false)
        return
      resume()
    }
    if (lengthX.value >= touchThresholdNumber.value) {
      next()
      resumeRiding()
      return
    }
    if (lengthX.value <= -touchThresholdNumber.value) {
      prev()
      resumeRiding()
    }
  },
})

function onBeforeLeave() {
  emit('slide', buildBvCarouselEvent('slide'))
  isTransitioning.value = true
}
function onAfterLeave() {
  emit('slid', buildBvCarouselEvent('slid'))
  isTransitioning.value = false
}
// carousel-item class is removed from the slide during the transition,
// as is included within enter classes.
// The first slide recovers carousel-item class,
function onAfterEnter(el: Element) {
  if (modelValue.value !== 0)
    el.classList.add('carousel-item')
}

onKeyStroke(
  'ArrowLeft',
  () => {
    onKeydown(prev)
  },
  { target: element },
)
onKeyStroke(
  'ArrowRight',
  () => {
    onKeydown(next)
  },
  { target: element },
)

watch(
  () => props.ride,
  () => {
    rideStarted.value = false
  },
)

watch(isHovering, (newValue) => {
  if (newValue) {
    onMouseEnter()
    return
  }
  onMouseLeave()
})

defineExpose({ pause, resume, prev, next })

provide(carouselInjectionKey, {
  background: readonly(toRef(props, 'background')),
  width: readonly(toRef(props, 'imgWidth')),
  height: readonly(toRef(props, 'imgHeight')),
})
</script>

<template>
  <div :id="computedId" ref="element" class="carousel slide pointer-event" :class="{ 'carousel-fade': fade }">
    <div v-if="indicators" class="carousel-indicators">
      <!-- :data-bs-target="`#${computedId}`" is required since the classes target elems with that attr -->
      <button
        v-for="(_, i) in slides.length" :key="i" type="button" data-bs-target=""
        :class="i === modelValue ? 'active' : ''" :aria-current="i === modelValue ? true : undefined"
        :aria-label="`${indicatorsButtonLabel} ${i}`" @click="goToValue(i)"
      />
    </div>

    <div ref="relatedTarget" class="carousel-inner">
      <TransitionGroup
        :enter-from-class="enterClasses" :enter-active-class="enterClasses" :enter-to-class="enterClasses"
        :leave-from-class="leaveClasses" :leave-active-class="leaveClasses" :leave-to-class="leaveClasses"
        @before-leave="onBeforeLeave" @after-leave="onAfterLeave" @after-enter="onAfterEnter"
      >
        <component
          :is="slide" v-for="(slide, i) in slides" v-show="i === modelValue" :key="i"
          :class="{ active: i === modelValue && isTransitioning === false }"
        />
      </TransitionGroup>
    </div>

    <template v-if="controls">
      <button class="carousel-control-prev" type="button" @click="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true" />
        <span class="visually-hidden">{{ controlsPrevText }}</span>
      </button>
      <button class="carousel-control-next" type="button" @click="next">
        <span class="carousel-control-next-icon" aria-hidden="true" />
        <span class="visually-hidden">{{ controlsNextText }}</span>
      </button>
    </template>
  </div>
</template>
