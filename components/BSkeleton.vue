<script setup lang="ts">
withDefaults(
  defineProps<{
    animation?: string
    height?: string
    size?: string
    type?: string
    variant?: string
    width?: string
  }>(),
  {
    animation: 'throb',
    type: 'text',
  },
)
</script>

<template>
  <div
    class="b-skeleton"

    :class="{
      [`b-skeleton-${type}`]: true,
      [`b-skeleton-animate-${animation}`]: animation,
      [`bg-${variant}`]: variant,
    }"

    :style="{
      width: size || width,
      height: size || height,
    }"
  />
</template>

<style>
.b-skeleton-wrapper {
  cursor: wait
}

.b-skeleton {
  position: relative;
  overflow: hidden;
  background-color: rgba(0, 0, 0, .12);
  cursor: wait;
  mask-image: radial-gradient(#fff, #000)
}

.b-skeleton:before {
  content: " "
}

.b-skeleton-text {
  height: 1rem;
  margin-bottom: .25rem;
  border-radius: .25rem
}

.b-skeleton-button {
  width: 75px;
  padding: .375rem .75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: .25rem
}

.b-skeleton-avatar {
  width: 2.5em;
  height: 2.5em;
  border-radius: 50%
}

.b-skeleton-input {
  height: calc(1.5em + .75rem + 2px);
  padding: .375rem .75rem;
  line-height: 1.5;
  border: 1px solid #ced4da;
  border-radius: .25rem
}

.b-skeleton-icon-wrapper svg {
  color: rgba(0, 0, 0, .12)
}

.b-skeleton-img {
  height: 100%;
  width: 100%
}

.b-skeleton-animate-wave:after,
.b-skeleton-animate-throb:after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
  background: linear-gradient(90deg, transparent, hsla(0, 0%, 100%, .4), transparent);
  animation: b-skeleton-animate-wave 1.75s linear infinite
}

@media (prefers-reduced-motion:reduce) {
  .b-skeleton-animate-wave:after {
    background: none;
    animation: none
  }
}

@keyframes b-skeleton-animate-wave {
  0% {
    transform: translateX(-100%)
  }

  to {
    transform: translateX(100%)
  }
}

.b-skeleton-animate-fade {
  animation: b-skeleton-animate-fade .875s ease-in-out infinite alternate
}

@media (prefers-reduced-motion:reduce) {
  .b-skeleton-animate-fade {
    animation: none
  }
}

@keyframes b-skeleton-animate-fade {
  0% {
    opacity: 1
  }

  to {
    opacity: .4
  }
}

.b-skeleton-animate-throb {
  animation: b-skeleton-animate-throb .875s ease-in infinite alternate
}

@media (prefers-reduced-motion:reduce) {
  .b-skeleton-animate-throb {
    animation: none
  }
}

@keyframes b-skeleton-animate-throb {
  0% {
    transform: scale(1)
  }

  to {
    transform: scale(.975)
  }
}
</style>
