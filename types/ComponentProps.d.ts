import type { RouteLocationRaw } from 'vue-router'
import type { ColorVariant } from './ColorVariant'
import type { LinkTarget } from './LinkTarget'

export interface BLinkProps {
  active?: boolean
  activeClass?: string
  append?: boolean
  disabled?: boolean

  event?: string | any[]
  href?: string
  // noPrefetch: {type: [Boolean, String] as PropType<boolean>, default: false},
  // prefetch: {type: [Boolean, String] as PropType<boolean>, default: null},
  rel?: string
  replace?: boolean
  routerComponentName?: string
  routerTag?: string
  target?: LinkTarget
  to?: RouteLocationRaw
  variant?: ColorVariant | null
  opacity?: 10 | 25 | 50 | 75 | 100 | '10' | '25' | '50' | '75' | '100'
  opacityHover?: 10 | 25 | 50 | 75 | 100 | '10' | '25' | '50' | '75' | '100'
  underlineVariant?: ColorVariant | null
  underlineOffset?: 1 | 2 | 3 | '1' | '2' | '3'
  underlineOffsetHover?: 1 | 2 | 3 | '1' | '2' | '3'
  underlineOpacity?: 0 | 10 | 25 | 50 | 75 | 100 | '0' | '10' | '25' | '50' | '75' | '100'
  underlineOpacityHover?: 0 | 10 | 25 | 50 | 75 | 100 | '0' | '10' | '25' | '50' | '75' | '100'
  icon?: boolean
}

export interface BImgProps {
  blank?: boolean
  blankColor?: string
  block?: boolean
  center?: boolean
  fluid?: boolean
  lazy?: boolean
  fluidGrow?: boolean
  height?: number | string
  start?: boolean
  end?: boolean
  rounded?: boolean | string
  sizes?: string | string[]
  src?: string
  srcset?: string | string[]
  thumbnail?: boolean
  width?: number | string
}
