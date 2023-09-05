import type { AriaInvalid } from '~/types/AriaInvalid'

/**
 * Resolves the aria-invalid and state props to a basic aria-invalid attribute
 *
 * @param {AriaInvalid} ariaInvalid `Truthy` values, and more specific `'grammar' | 'spelling'` values have higher priority than 'state' param, `Falsy` values have lower priority than 'state'
 * @param {boolean} state If the prop state is `false`, it will render the aria-invalid attribute to be `'true'`, as the value would be considered invalid
 * @returns Truthy > Grammar | Spelling > State > Falsy
 */
export default (
  ariaInvalid?: AriaInvalid,
  state?: boolean | null,
) => ariaInvalid === true
  ? 'true'
  : ariaInvalid === 'grammar' || ariaInvalid === 'spelling'
    ? ariaInvalid
    : state === false
      ? 'true'
      : ariaInvalid === false || ariaInvalid === 'false'
        ? 'false'
        : undefined
