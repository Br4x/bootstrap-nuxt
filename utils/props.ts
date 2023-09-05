// Suffix can be a falsey value so nothing is appended to string
// (helps when looping over props & some shouldn't change)

import { upperFirst } from './stringUtils'

/**
 * Use data last parameters to allow for currying
 *
 * @param suffix
 * @param value
 * @returns
 */
export function suffixPropName(suffix: string, value: string): string {
  return value + (suffix ? upperFirst(suffix) : '')
}
