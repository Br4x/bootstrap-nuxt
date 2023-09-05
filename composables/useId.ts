import { type MaybeRefOrGetter } from 'vue'
import { getId } from '@/utils'

export default (id?: MaybeRefOrGetter<string | undefined>, suffix?: string): ComputedRef<string> =>
  computed(() => toValue(id) || getId(suffix))
