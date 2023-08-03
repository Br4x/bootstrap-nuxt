<script setup>
defineProps({
  alignSelf: {
    type: String,
    validator(value) {
      ['center', 'end', 'baseline', 'stretch'].includes(value)
    },
    default: null,
  },
  col: Boolean,
  cols: [String, Number],
  offset: [String, Number],
  offsetSm: [String, Number],
  offsetMd: [String, Number],
  offsetLg: [String, Number],
  offsetXl: [String, Number],
  order: [String, Number],
  orderSm: [String, Number],
  orderMd: [String, Number],
  orderLg: [String, Number],
  orderXl: [String, Number],
  sm: [String, Number, Boolean],
  md: [String, Number, Boolean],
  lg: [String, Number, Boolean],
  xl: [String, Number, Boolean],
  tag: {
    type: String,
    default: 'div',
  },
})
</script>

<template>
  <component
    :is="tag" class="" :class="{
      [`col-${cols} flex-[0_0_${cols}/12] max-w-${cols}/12`]: cols > 0,
      [`col-sm-${sm} sm:flex-[0_0_${sm}/12] sm:max-w-${sm}/12`]: sm > 0,
      [`col-md-${md} md:flex-[0_0_${md}/12] md:max-w-${md}/12`]: md > 0,
      [`col-lg-${lg} lg:flex-[0_0_${lg}/12] lg:max-w-${lg}/12`]: lg > 0,
      [`col-xl-${xl} xl:flex-[0_0_${xl}/12] xl:max-w-${xl}/12`]: xl > 0,

      'basis-0 grow max-w-full': col || (!cols),

      'col-auto flex-[0_0_auto] w-auto max-w-full': cols === 'auto',
      'col-sm-auto sm:flex-[0_0_auto] sm:w-auto sm:max-w-full': sm === 'auto',
      'col-md-auto md:flex-[0_0_auto] md:w-auto md:max-w-full': md === 'auto',
      'col-lg-auto lg:flex-[0_0_auto] lg:w-auto lg:max-w-full': lg === 'auto',
      'col-sm-auto xl:flex-[0_0_auto] xl:w-auto xl:max-w-full': cols === 'auto',

      'self-start': alignSelf === 'start',
      'self-center': alignSelf === 'center',
      'self-end': alignSelf === 'end',
      'self-baseline': alignSelf === 'baseline',
      'self-stretch': alignSelf === 'stretch',

      [`offset-${offset} ml-${offset}/12`]: offset > 0,
      [`offset-sm-${offsetSm} sm:ml-${offsetSm}/12`]: offsetSm > 0,
      [`offset-md-${offsetMd} md:ml-${offsetMd}/12`]: offsetMd > 0,
      [`offset-lg-${offsetLg} lg:ml-${offsetLg}/12`]: offsetLg > 0,
      [`offset-xl-${offsetXl} xl:ml-${offsetXl}/12`]: offsetXl > 0,

      [`order-${order} order-${order}`]: order > 0,
      [`order-sm-${orderSm} sm:order-${orderSm}`]: orderSm > 0,
      [`order-md-${orderMd} md:order-${orderMd}`]: orderMd > 0,
      [`order-lg-${orderLg} lg:order-${orderLg}`]: orderLg > 0,
      [`order-xl-${orderXl} xl:order-${orderXl}`]: orderXl > 0,
    }"
  >
    <slot />
  </component>
</template>
