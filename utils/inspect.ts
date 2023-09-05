export function isObject(obj: unknown): obj is Record<PropertyKey, unknown> {
  return obj !== null && typeof obj === 'object'
}

export const isNumeric = (value: unknown): boolean => /^[0-9]*\.?[0-9]+$/.test(String(value))

export function isPlainObject(obj: unknown): obj is Record<PropertyKey, unknown> {
  return Object.prototype.toString.call(obj) === '[object Object]'
}
