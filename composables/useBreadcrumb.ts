import { createGlobalState } from '@vueuse/core'
import type { BreadcrumbItem } from '~/types/BreadcrumbItem'

export default createGlobalState(() => {
  const items = reactive<BreadcrumbItem[]>([])
  const reset = (): void => {
    items.splice(0, items.length)
  }

  return { items, reset }
})
