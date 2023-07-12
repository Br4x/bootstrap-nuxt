<script setup>
const props = defineProps({
  cols: [String, Number],
  colsXs: [String, Number],
  colsSm: [String, Number],
  colsMd: [String, Number],
  colsLg: [String, Number],
  colsXl: [String, Number],
  alignContent: {
    type: String,
    validator(value) {
      ['start', 'center', 'end', 'around', 'between'].includes(value)
    },
    default: null,
  },
  alignH: {
    type: String,
    validator(value) {
      ['start', 'center', 'end', 'around', 'between'].includes(value)
    },
    default: null,
  },
  alignV: {
    type: String,
    validator(value) {
      ['start', 'center', 'end', 'baseline', 'stretch'].includes(value)
    },
    default: null,
  },
  noGutters: Boolean,
  tag: {
    type: String,
    default: 'div',
  },
})

// TODO : find something to apply classes to slot childrens instead of rough style
const computedClass = computed(() => {
  let classe = ''
  if (props.cols > 0)
    classe += `row-cols-${props.cols} `
  if (props.colsXs > 0)
    classe += `row-cols-xs-${props.colsXs} `
  if (props.colsSm > 0)
    classe += `row-cols-sm-${props.colsSm} `
  if (props.colsMd > 0)
    classe += `row-cols-md-${props.colsMd} `
  if (props.colsLg > 0)
    classe += `row-cols-lg-${props.colsLg} `
  if (props.colsXl > 0)
    classe += `row-cols-xl-${props.colsXl} `

  return classe
})
</script>

<template>
  <component
    :is="tag" class="row flex flex-wrap" :class="[computedClass, {
      'items-start': alignV === 'start',
      'items-center': alignV === 'center',
      'items-end': alignV === 'end',
      'items-baseline': alignV === 'baseline',
      'items-stretch': alignV === 'strech',

      'justify-start': alignV === 'start',
      'justify-center': alignV === 'center',
      'justify-end': alignV === 'end',
      'justify-baseline': alignV === 'baseline',
      'justify-stretch': alignV === 'strech',

      'content-start': alignV === 'start',
      'content-center': alignV === 'center',
      'content-end': alignV === 'end',
      'content-around': alignV === 'around',
      'content-between': alignV === 'between',

      'mr-[-15px] ml-[-15px]': !noGutters,
      'no-gutters': noGutters,
    }]"
  >
    <slot />
  </component>
</template>

<style type="scss">
.row-cols-1>* {
  @apply flex-[0_0_1] max-w-full;
}

.row-cols-2>* {
  @apply flex-[0_0_1/2] max-w-1/2;
}

.row-cols-3>* {
  @apply flex-[0_0_1/3] max-w-1/3;
}

.row-cols-4>* {
  @apply flex-[0_0_1/4] max-w-1/4;
}

.row-cols-5>* {
  @apply flex-[0_0_1/5] max-w-1/5;
}

.row-cols-6>* {
  @apply flex-[0_0_1/5] max-w-1/6;
}

.row-cols-sm-1>* {
  @apply sm:flex-[0_0_1] sm:max-w-full;
}

.row-cols-sm-2>* {
  @apply sm:flex-[0_0_1/2] sm:max-w-1/2;
}

.row-cols-sm-3>* {
  @apply sm:flex-[0_0_1/3] sm:max-w-1/3;
}

.row-cols-sm-4>* {
  @apply sm:flex-[0_0_1/4] sm:max-w-1/4;
}

.row-cols-sm-5>* {
  @apply sm:flex-[0_0_1/5] sm:max-w-1/5;
}

.row-cols-sm-6>* {
  @apply sm:flex-[0_0_1/5] sm:max-w-1/6;
}

.row-cols-lg-1>* {
  @apply lg:flex-[0_0_1] lg:max-w-full;
}

.row-cols-lg-2>* {
  @apply lg:flex-[0_0_1/2] lg:max-w-1/2;
}

.row-cols-lg-3>* {
  @apply lg:flex-[0_0_1/3] lg:max-w-1/3;
}

.row-cols-lg-4>* {
  @apply lg:flex-[0_0_1/4] lg:max-w-1/4;
}

.row-cols-lg-5>* {
  @apply lg:flex-[0_0_1/5] lg:max-w-1/5;
}

.row-cols-lg-6>* {
  @apply lg:flex-[0_0_1/5] lg:max-w-1/6;
}

.row-cols-md-1>* {
  @apply md:flex-[0_0_1] md:max-w-full;
}

.row-cols-md-2>* {
  @apply md:flex-[0_0_1/2] md:max-w-1/2;
}

.row-cols-md-3>* {
  @apply md:flex-[0_0_1/3] md:max-w-1/3;
}

.row-cols-md-4>* {
  @apply md:flex-[0_0_1/4] md:max-w-1/4;
}

.row-cols-md-5>* {
  @apply md:flex-[0_0_1/5] md:max-w-1/5;
}

.row-cols-md-6>* {
  @apply md:flex-[0_0_1/5] md:max-w-1/6;
}

.row-cols-xl-1>* {
  @apply xl:flex-[0_0_1] xl:max-w-full;
}

.row-cols-xl-2>* {
  @apply xl:flex-[0_0_1/2] xl:max-w-1/2;
}

.row-cols-xl-3>* {
  @apply xl:flex-[0_0_1/3] xl:max-w-1/3;
}

.row-cols-xl-4>* {
  @apply xl:flex-[0_0_1/4] xl:max-w-1/4;
}

.row-cols-xl-5>* {
  @apply xl:flex-[0_0_1/5] xl:max-w-1/5;
}

.row-cols-xl-6>* {
  @apply xl:flex-[0_0_1/5] xl:max-w-1/6;
}
</style>
