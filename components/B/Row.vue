<script setup>
import { NAME_ROW } from '../../constants/components'
import { arrayIncludes, concat } from '../../utils/array'
import { getBreakpointsUpCached } from '../../utils/config'
import { create, keys, sortKeys } from '../../utils/object'
import { makeProp, makePropsConfigurable, suffixPropName } from '../../utils/props'

const props = defineProps(generateProps())

const COMMON_ALIGNMENT = ['start', 'end', 'center']

function generateProps() {
  const rowColsProps = getBreakpointsUpCached().reduce((props, breakpoint) => {
    props[suffixPropName(breakpoint, 'cols')] = makeProp(PROP_TYPE_NUMBER_STRING)
    return props
  }, create(null))

  let rowColsPropList = []

  rowColsPropList = keys(rowColsProps)

  return makePropsConfigurable(
    sortKeys({
      ...rowColsProps,
      alignContent: makeProp(PROP_TYPE_STRING, null, (value) => {
        return arrayIncludes(concat(COMMON_ALIGNMENT, 'between', 'around', 'stretch'), value)
      }),
      alignH: makeProp(PROP_TYPE_STRING, null, (value) => {
        return arrayIncludes(concat(COMMON_ALIGNMENT, 'between', 'around'), value)
      }),
      alignV: makeProp(PROP_TYPE_STRING, null, (value) => {
        return arrayIncludes(concat(COMMON_ALIGNMENT, 'baseline', 'stretch'), value)
      }),
      noGutters: makeProp(PROP_TYPE_BOOLEAN, false),
      tag: makeProp(PROP_TYPE_STRING, 'div'),
    }),
    NAME_ROW,
  )
}

const computedData = computed(() => {
  const { alignV, alignH, alignContent, noGutters, tag } = props

  const classList = []
  rowColsPropList.forEach((prop) => {
    const c = computeRowColsClass(computeRowColsBreakpoint(prop), props[prop])
    if (c)
      classList.push(c)
  })

  classList.push({
    'no-gutters': noGutters,
    [`align-items-${alignV}`]: alignV,
    [`justify-content-${alignH}`]: alignH,
    [`align-content-${alignContent}`]: alignContent,
  })

  return mergeData({
    staticClass: 'row',
    class: classList,
  })
})

const mergeData = mergeProps({ ...props }, computedData)
</script>

<template>
  <component
    :is="tag" class="row" :class="{
      'no-gutters': noGutters,
      [`align-items-${alignV}`]: alignV,
      [`justify-content-${alignH}`]: alignH,
      [`align-content-${alignContent}`]: alignContent,
    }"
  >
    <slot />
  </component>
</template>
