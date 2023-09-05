import { type MaybeRefOrGetter } from 'vue'

export default (value: MaybeRefOrGetter<boolean | null>) =>
  computed(() => {
    const resolvedValue = toValue(value)

    return resolvedValue === true ? 'is-valid' : resolvedValue === false ? 'is-invalid' : null
  })
