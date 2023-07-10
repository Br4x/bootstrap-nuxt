export function useUtils() {
  const File = typeof window !== 'undefined' ? window.File : class File extends Object {}

  const identity = (x: any) => x

  const toType = (value: any) => typeof value

  const toRawType = (value: any) => Object.prototype.toString.call(value).slice(8, -1)

  const toRawTypeLC = (value: any) => toRawType(value).toLowerCase()

  const isUndefined = (value: undefined) => value === undefined

  const isNull = (value: null) => value === null

  const isEmptyString = (value: string) => value === ''

  const isUndefinedOrNull = (value: any) => isUndefined(value) || isNull(value)

  const isUndefinedOrNullOrEmpty = (value: any) => isUndefinedOrNull(value) || isEmptyString(value)

  const isFunction = (value: any) => toType(value) === 'function'

  const isBoolean = (value: any) => toType(value) === 'boolean'

  const isString = (value: any) => toType(value) === 'string'

  const isNumber = (value: any) => toType(value) === 'number'

  const isNumeric = (value: any) => /^[0-9]*\.?[0-9]+$/.test(String(value))

  const isPrimitive = (value: any) => isBoolean(value) || isString(value) || isNumber(value)

  const isArray = (value: any) => Array.isArray(value)

  const isObject = (obj: null) => obj !== null && typeof obj === 'object'

  const isPlainObject = (obj: any) => Object.prototype.toString.call(obj) === '[object Object]'

  const isDate = (value: any) => value instanceof Date

  const isEvent = (value: any) => value instanceof Event

  const isFile = (value: any) => value instanceof File

  const isRegExp = (value: any) => toRawType(value) === 'RegExp'

  const isLink = (props: any) => !!(props.href || props.to)

  // Return a shallow copy of object with the specified properties only
  // See: https://gist.github.com/bisubus/2da8af7e801ffd813fab7ac221aa7afc
  const pick = (obj, props) => {
    return Object.keys(obj)
      .filter(key => props.includes(key))
      .reduce((result, key) => ({ ...result, [key]: obj[key] }), {})
  }

  // Given an array of properties or an object of property keys,
  // plucks all the values off the target object, returning a new object
  // that has props that reference the original prop values
  function pluckProps(keysToPluck: any[], objToPluck: { [x: string]: any }, transformFn = identity) {
    return (isArray(keysToPluck) ? keysToPluck.slice() : Object.keys(keysToPluck)).reduce((memo: { [x: string]: any }, prop: string | number) => {
      memo[transformFn(prop)] = objToPluck[prop]
      return memo
    }, {})
  }

  function isPromise(value: any) {
    return !isUndefinedOrNull(value) && isFunction(value.then) && isFunction(value.catch)
  }

  function toInteger(value: string, defaultValue = NaN) {
    const integer = Number.parseInt(value, 10)
    return Number.isNaN(integer) ? defaultValue : integer
  }

  function toFloat(value: string, defaultValue = NaN) {
    const float = Number.parseFloat(value)
    return Number.isNaN(float) ? defaultValue : float
  }

  const toFixed = (val: string, precision: string) => toFloat(val).toFixed(toInteger(precision, 0))

  function getArray(...args: any[]) {
    return args
  }

  const from = (...args: any[]) => Array.from(getArray(...args))

  const arrayIncludes = (array: string | any[], value: any) => array.includes(value)

  const concat = (...args: any[]) => Array.prototype.concat.apply([], args)

  function createArray(length: number, fillFn: any) {
    const mapFn = isFunction(fillFn) ? fillFn : () => fillFn
    // eslint-disable-next-line prefer-spread
    return Array.apply(null, { length }).map(mapFn)
  }

  const flatten = (array: any[]) => array.reduce((result, item) => concat(result, item), [])

  function flattenDeep(array: any[]) {
    return array.reduce((result, item) => concat(result, Array.isArray(item) ? flattenDeep(item) : item), [])
  }

  const isElement = (el: { classList?: { add: (arg0: any) => void } | { remove: (arg0: any) => void }; nodeType?: any }) => !!(el && el.nodeType === Node.ELEMENT_NODE)

  const addClass = (el: { classList: { add: (arg0: any) => void } }, className: any) => {
    if (className && isElement(el) && el.classList)
      el.classList.add(className)
  }

  const removeClass = (el: { classList: { remove: (arg0: any) => void } }, className: any) => {
    if (className && isElement(el) && el.classList)
      el.classList.remove(className)
  }

  const isTag = (tag: any, name: any) => tag.toString().toLowerCase() === name.toString().toLowerCase()

  const requestAF = (
    window.requestAnimationFrame || (cb => setTimeout(cb, 16))
  ).bind(window)

  const stopEvent = (
    event: Event,
    { preventDefault = true, propagation = true, immediatePropagation = false } = {},
  ) => {
    if (preventDefault)
      event.preventDefault()

    if (propagation)
      event.stopPropagation()

    if (immediatePropagation)
      event.stopImmediatePropagation()
  }

  // Determine if an HTML element is the currently active element
  const isActiveElement = (el: HTMLElement) => isElement(el) && el === getActiveElement()

  // Get the currently active HTML element
  function getActiveElement(excludes: HTMLElement[] = []) {
    const { activeElement } = document
    return activeElement && !excludes.includes(activeElement as HTMLElement) ? activeElement : null
  }

  // Attempt to focus an element, and return `true` if successful
  function attemptFocus(el: HTMLElement, options = {}) {
    try {
      el.focus(options)
    }
    catch {}
    return isActiveElement(el)
  }

  // Attempt to blur an element, and return `true` if successful
  function attemptBlur(el: HTMLElement) {
    try {
      el.blur()
    }
    catch {}
    return !isActiveElement(el)
  }

  // Get an style property value from an element
  // Returns `null` if not found
  const getStyle = (el: HTMLElement, prop: any) => (prop && isElement(el) ? el.style[prop] || null : null)

  // Return the Bounding Client Rect of an element
  // Returns `null` if not an element
  /* istanbul ignore next: getBoundingClientRect() doesn't work in JSDOM */
  const getBCR = (el: HTMLElement) => (isElement(el) ? el.getBoundingClientRect() : null)

  // Determine if an HTML element is visible - Faster than CSS check
  function isVisible(el: HTMLElement) {
    if (!isElement(el) || !el.parentNode || !contains(document.body, el)) {
    // Note this can fail for shadow dom elements since they
    // are not a direct descendant of document.body
      return false
    }
    if (getStyle(el, 'display') === 'none') {
    // We do this check to help with vue-test-utils when using v-show
    /* istanbul ignore next */
      return false
    }
    // All browsers support getBoundingClientRect(), except JSDOM as it returns all 0's for values :(
    // So any tests that need isVisible will fail in JSDOM
    // Except when we override the getBCR prototype in some tests
    const bcr = getBCR(el)
    return !!(bcr && bcr.height > 0 && bcr.width > 0)
  }

  // Returns true if the parent element contains the child element
  function contains(parent: HTMLElement, child: HTMLElement) {
    return parent && isFunction(parent.contains) ? parent.contains(child) : false
  }

  // Select all elements matching selector. Returns `[]` if none found
  function selectAll(selector: any, root: HTMLElement) {
    return from((isElement(root) ? root : document).querySelectorAll(selector))
  }

  // Return a shallow copy of object with the specified properties omitted
  // See: https://gist.github.com/bisubus/2da8af7e801ffd813fab7ac221aa7afc
  function omit(obj: { [x: string]: any }, props: string | string[]) {
    return Object.keys(obj)
      .filter(key => !props.includes(key))
      .reduce((result, key) => ({ ...result, [key]: obj[key] }), {})
  }

  // Edge 15 and UC Browser lack support for `isIntersecting`
  // but we an use `intersectionRatio > 0` instead
  // 'isIntersecting' in window.IntersectionObserverEntry.prototype &&
  const hasInteractionObserverSupport = (window && typeof document !== 'undefined' && typeof navigator !== 'undefined') && 'IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype

  return {
    hasInteractionObserverSupport,
    omit,
    pick,
    contains,
    selectAll,
    isVisible,
    attemptFocus,
    attemptBlur,
    pluckProps,
    isLink,
    stopEvent,
    isTag,
    addClass,
    removeClass,
    identity,
    toFixed,
    toFloat,
    toInteger,
    isPromise,
    isRegExp,
    isFile,
    isEvent,
    isDate,
    isPlainObject,
    isObject,
    isArray,
    isPrimitive,
    isNumeric,
    isNumber,
    isString,
    isBoolean,
    isFunction,
    isUndefinedOrNullOrEmpty,
    isUndefinedOrNull,
    isEmptyString,
    isNull,
    isUndefined,
    toRawTypeLC,
    toRawType,
    toType,
    flattenDeep,
    flatten,
    createArray,
    concat,
    arrayIncludes,
    from,
    requestAF,
  }
}
