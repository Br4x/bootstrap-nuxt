<script setup>
import { HAS_POINTER_EVENT_SUPPORT, HAS_TOUCH_SUPPORT, IS_BROWSER } from '../../constants/env'
import { eventOff, eventOn, stopEvent } from '../../utils/events'
import { mathAbs, mathFloor, mathMax, mathMin } from '../../utils/math'
import { makeModelMixin } from '../../utils/model'
import { noop } from '../../utils/noop'
import { observeDom } from '../../utils/observe-dom'
import { makeProp } from '../../utils/props'
import { props as idProps } from '../../mixins/id'
import { CODE_ENTER, CODE_LEFT, CODE_RIGHT, CODE_SPACE } from '@/constants/key-codes'

const props = defineProps({
  ...idProps,
  ...modelProps,
  background: String,
  controls: {
    type: Boolean,
    default: false,
  },
  fade: {
    type: Boolean,
    default: false,
  },
  imgHeight: [Number, String],
  imgWidth: [Number, String],
  indicators: {
    type: Boolean,
    default: false,
  },
  interval: makeProp(PROP_TYPE_NUMBER, 5000),
  labelGotoSlide: {
    type: String,
    default: 'Goto slide',
  },
  labelIndicators: {
    type: String,
    default: 'Select a slide to display',
  },
  labelNext: {
    type: String,
    default: 'Next slide',
  },
  labelPrev: {
    type: String,
    default: 'Previous slide',
  },
  noAnimation: {
    type: Boolean,
    default: false,
  },
  noHoverPause: {
    type: Boolean,
    default: false,
  },
  noTouch: {
    type: Boolean,
    default: false,
  },
  noWrap: {
    type: Boolean,
    default: false,
  },
})

const {
  addClass,
  getActiveElement,
  reflow,
  removeClass,
  requestAF,
  selectAll,
  setAttr,
  toInteger,
} = useUtils()

const {
  mixin: modelMixin,
  props: modelProps,
  prop: MODEL_PROP_NAME,
  event: MODEL_EVENT_NAME,
} = makeModelMixin('value', {
  type: PROP_TYPE_NUMBER,
  defaultValue: 0,
})

const DIRECTION = {
  next: {
    dirClass: 'carousel-item-left',
    overlayClass: 'carousel-item-next',
  },
  prev: {
    dirClass: 'carousel-item-right',
    overlayClass: 'carousel-item-prev',
  },
}

const TRANS_DURATION = 600 + 50

const TOUCH_EVENT_COMPAT_WAIT = 500

const SWIPE_THRESHOLD = 40

const PointerType = {
  TOUCH: 'touch',
  PEN: 'pen',
}

const TransitionEndEvents = {
  WebkitTransition: 'webkitTransitionEnd',
  MozTransition: 'transitionend',
  OTransition: 'otransitionend oTransitionEnd',
  transition: 'transitionend',
}

function data() {
  return {
    index: props[MODEL_PROP_NAME] || 0,
    isSliding: false,
    transitionEndEvent: null,
    slides: [],
    direction: null,
    isPaused: !(toInteger(props.interval, 0) > 0),
    touchStartX: 0,
    touchDeltaX: 0,
  }
}

const computed = {
  numSlides() {
    return slides.length
  },
  controlButtons() {
    return {
      prev: {
        label: labelPrev,
        handler: prev,
      },
      next: {
        label: labelNext,
        handler: next,
      },
    }
  },
}

const watch = {
  [MODEL_PROP_NAME](newValue, oldValue) {
    if (newValue !== oldValue)
      setSlide(toInteger(newValue, 0))
  },
  interval(newValue, oldValue) {
    if (newValue === oldValue)
      return

    if (!newValue) {
      pause(false)
    }
    else {
      pause(true)
      start(false)
    }
  },
  isPaused(newValue, oldValue) {
    if (newValue !== oldValue)
      $emit(newValue ? 'paused' : 'unpaused')
  },
  index(to, from) {
    if (to === from || isSliding)
      return

    doSlide(to, from)
  },
}

function created() {
  $_interval = null
  $_animationTimeout = null
  $_touchTimeout = null
  $_observer = null
  isPaused = !(toInteger(props.interval, 0) > 0)
}

function mounted() {
  transitionEndEvent = getTransitionEndEvent($el) || null
  updateSlides()
  setObserver(true)
}

function beforeDestroy() {
  clearInterval()
  clearAnimationTimeout()
  clearTouchTimeout()
  setObserver(false)
}

function clearInterval() {
  clearInterval($_interval)
  $_interval = null
}

function clearAnimationTimeout() {
  clearTimeout($_animationTimeout)
  $_animationTimeout = null
}

function clearTouchTimeout() {
  clearTimeout($_touchTimeout)
  $_touchTimeout = null
}

function setObserver(on = false) {
  $_observer && $_observer.disconnect()
  $_observer = null
  if (on) {
    $_observer = observeDom($refs.inner, updateSlides, {
      subtree: false,
      childList: true,
      attributes: true,
      attributeFilter: ['id'],
    })
  }
}

function setSlide(slide, direction = null) {
  if (IS_BROWSER && document.visibilityState && document.hidden)
    return

  const noWrap = noWrap
  const numSlides = numSlides
  slide = mathFloor(slide)
  if (numSlides === 0)
    return

  if (isSliding) {
    $once('sliding-end', () => {
      requestAF(() => setSlide(slide, direction))
    })
    return
  }
  direction = calcDirection(direction, index, slide)
  index = slide >= numSlides
    ? noWrap
      ? numSlides - 1
      : 0
    : slide < 0
      ? noWrap
        ? 0
        : numSlides - 1
      : slide
  if (noWrap && index !== slide && index !== props[MODEL_PROP_NAME])
    $emit(MODEL_EVENT_NAME, index)
}

function prev() {
  setSlide(index - 1, 'prev')
}

function next() {
  setSlide(index + 1, 'next')
}

function pause(event) {
  if (!event)
    isPaused = true

  clearInterval()
}

function start(event) {
  if (!event)
    isPaused = false

  clearInterval()
  if (interval && numSlides > 1)
    $_interval = setInterval(next, mathMax(1000, interval))
}

function restart() {
  if (!$el.contains(getActiveElement()))
    start()
}

function doSlide(to, from) {
  const isCycling = Boolean(interval)
  const direction = calcDirection(direction, from, to)
  const overlayClass = direction.overlayClass
  const dirClass = direction.dirClass
  const currentSlide = slides[from]
  const nextSlide = slides[to]
  if (!currentSlide || !nextSlide)
    return

  isSliding = true
  if (isCycling)
    pause(false)

  $emit('sliding-start', to)
  $emit(MODEL_EVENT_NAME, index)
  if (noAnimation) {
    addClass(nextSlide, 'active')
    removeClass(currentSlide, 'active')
    isSliding = false
    $nextTick(() => $emit('sliding-end', to))
  }
  else {
    addClass(nextSlide, overlayClass)
    reflow(nextSlide)
    addClass(currentSlide, dirClass)
    addClass(nextSlide, dirClass)
    let called = false
    const onceTransEnd = () => {
      if (called)
        return

      called = true
      if (transitionEndEvent) {
        const events = transitionEndEvent.split(/\s+/)
        events.forEach(event =>
          eventOff(nextSlide, event, onceTransEnd, { passive: true, capture: false }),
        )
      }
      clearAnimationTimeout()
      removeClass(nextSlide, dirClass)
      removeClass(nextSlide, overlayClass)
      addClass(nextSlide, 'active')
      removeClass(currentSlide, 'active')
      removeClass(currentSlide, dirClass)
      removeClass(currentSlide, overlayClass)
      setAttr(currentSlide, 'aria-current', 'false')
      setAttr(nextSlide, 'aria-current', 'true')
      setAttr(currentSlide, 'aria-hidden', 'true')
      setAttr(nextSlide, 'aria-hidden', 'false')
      isSliding = false
      direction = null
      $nextTick(() => $emit('sliding-end', to))
    }
    if (transitionEndEvent) {
      const events = transitionEndEvent.split(/\s+/)
      events.forEach(event => eventOn(nextSlide, event, onceTransEnd, { passive: true, capture: false }))
    }
    $_animationTimeout = setTimeout(onceTransEnd, TRANS_DURATION)
  }
  if (isCycling)
    start(false)
}

function updateSlides() {
  pause(true)
  slides = selectAll('.carousel-item', $refs.inner)
  const numSlides = slides.length
  const index = mathMax(0, mathMin(mathFloor(index), numSlides - 1))
  slides.forEach((slide, idx) => {
    const n = idx + 1
    if (idx === index) {
      addClass(slide, 'active')
      setAttr(slide, 'aria-current', 'true')
    }
    else {
      removeClass(slide, 'active')
      setAttr(slide, 'aria-current', 'false')
    }
    setAttr(slide, 'aria-posinset', String(n))
    setAttr(slide, 'aria-setsize', String(numSlides))
  })
  setSlide(index)
  start(isPaused)
}

function calcDirection(direction = null, curIndex = 0, nextIndex = 0) {
  if (!direction)
    return nextIndex > curIndex ? DIRECTION.next : DIRECTION.prev

  return DIRECTION[direction]
}

function handleClick(fn) {
  const keyCode = event.keyCode
  if (event.type === 'click' || keyCode === CODE_SPACE || keyCode === CODE_ENTER) {
    stopEvent(event)
    fn()
  }
}

function touchStart(event) {
  if (HAS_POINTER_EVENT_SUPPORT && PointerType[event.pointerType.toUpperCase()])
    touchStartX = event.clientX
  else if (!HAS_POINTER_EVENT_SUPPORT)
    touchStartX = event.touches[0].clientX
}

function touchMove(event) {
  if (event.touches && event.touches.length > 1)
    touchDeltaX = 0
  else
    touchDeltaX = event.touches[0].clientX - touchStartX
}

function touchEnd(event) {
  if (HAS_POINTER_EVENT_SUPPORT && PointerType[event.pointerType.toUpperCase()])
    touchDeltaX = event.clientX - touchStartX

  handleSwipe()
  pause(false)
  clearTouchTimeout()
  $_touchTimeout = setTimeout(start, TOUCH_EVENT_COMPAT_WAIT + mathMax(1000, interval))
}

function handleSwipe() {
  const absDeltaX = mathAbs(touchDeltaX)
  if (absDeltaX <= SWIPE_THRESHOLD)
    return

  const direction = absDeltaX / touchDeltaX
  touchDeltaX = 0
  if (direction > 0)
    prev()
  else if (direction < 0)
    next()
}

function handleKeyDown(event) {
  if (/input|textarea/i.test(event.target.tagName))
    return

  const { keyCode } = event
  if (keyCode === CODE_LEFT || keyCode === CODE_RIGHT) {
    stopEvent(event)
    keyCode === CODE_LEFT ? prev() : next()
  }
}

extend({
  props,
  data,
  computed,
  watch,
  created,
  mounted,
  beforeDestroy,
  methods,
})
</script>

<template>
  <div
    :id="safeId()"
    class="carousel"
    :class="{
      'slide': !noAnimation,
      'carousel-fade': !noAnimation && fade,
      'pointer-event': HAS_TOUCH_SUPPORT && HAS_POINTER_EVENT_SUPPORT && !noTouch,
    }"
    :style="{ background }"
    role="region"
    :aria-busy="isSliding ? 'true' : 'false'"
    @mouseenter="noHoverPause ? noop : pause"
    @mouseleave="noHoverPause ? noop : restart"
    @focusin="pause"
    @focusout="restart"
    @keydown="handleKeyDown"
    @pointerdown="touchStart"
    @pointerup="touchEnd"
    @touchstart="touchStart"
    @touchmove="touchMove"
    @touchend="touchEnd"
  >
    <div
      :id="safeId('__BV_inner_')"
      ref="inner"
      class="carousel-inner"
      role="list"
    >
      <slot />
    </div>
    <template v-if="controls">
      <a
        v-for="(control, direction) in controlButtons"
        :key="direction"
        href="#"
        :class="`carousel-control-${direction}`"
        role="button"
        :aria-controls="safeId('__BV_inner_')"
        :aria-disabled="isSliding ? 'true' : null"
        @click.stop="handleClick(control.handler)"
        @keydown.stop="handleClick(control.handler)"
      >
        <span :class="`carousel-control-${direction}-icon`" aria-hidden="true" />
        <span class="sr-only">{{ control.label }}</span>
      </a>
    </template>
    <ol
      v-if="indicators"
      :id="safeId('__BV_indicators_')"
      class="carousel-indicators"
      :aria-hidden="indicators ? 'false' : 'true'"
      :aria-label="labelIndicators"
      :aria-owns="safeId('__BV_inner_')"
    >
      <li
        v-for="(slide, i) in slides"
        :id="safeId(`__BV_indicator_${i + 1}_`)"
        :key="`slide_${i}`"
        :class="{ active: i === index }"
        role="button"
        :tabindex="indicators ? '0' : '-1'"
        :aria-current="i === index ? 'true' : 'false'"
        :aria-label="`${labelGotoSlide} ${i + 1}`"
        :aria-describedby="slide.id || null"
        :aria-controls="safeId('__BV_inner_')"
        @click="handleClick(() => setSlide(i))"
        @keydown="handleClick(() => setSlide(i))"
      />
    </ol>
  </div>
</template>

<style>
.carousel.pointer-event {
  touch-action: pan-y;
}
</style>
