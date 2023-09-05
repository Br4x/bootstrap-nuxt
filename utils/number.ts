/**
 * Validates a number is an integer. If not return NaN
 *
 * @param value
 * @param defaultValue
 * @returns
 */
export function toInteger(value: number, defaultValue = NaN): number {
  return Number.isInteger(value) ? value : defaultValue
}

/**
 * @param value
 * @param defaultValue
 * @returns
 */
export function stringToInteger(value: string, defaultValue = NaN): number {
  const integer = Number.parseInt(value, 10)
  return Number.isNaN(integer) ? defaultValue : integer
}

/**
 * Validates a number is a float. If not return NaN
 *
 * @param value
 * @param defaultValue
 * @returns
 */
export function toFloat(value: number | string, defaultValue = NaN): number {
  const float = Number.parseFloat(value.toString())
  return Number.isNaN(float) ? defaultValue : float
}
