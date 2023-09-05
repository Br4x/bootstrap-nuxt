import { computedEager } from '@vueuse/core'
import { type MaybeRefOrGetter } from 'vue'
import type { AlignmentJustifyContent } from '~/types/AlignmentJustifyContent'

export default (
  align: MaybeRefOrGetter<AlignmentJustifyContent | undefined>,
): Readonly<Ref<string>> =>
  computedEager(() => {
    const value = toValue(align)
    return !value ? '' : `justify-content-${value}`
  })
