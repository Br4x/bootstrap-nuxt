import { extend, mergeData } from '../../vue'
import { NAME_SKELETON } from '../../constants/components'
import { PROP_TYPE_STRING } from '../../constants/props'
import { makeProp, makePropsConfigurable } from '../../utils/props'

// --- Props ---

export const props = makePropsConfigurable(
  {
    animation: {
    type: String,
    default: 'wave',
  },
    height: String,
    size: String,
    type: {
    type: String,
    default: 'text',
  },
    variant: String,
    width: String
  },
  NAME_SKELETON
)

// --- Main component ---

// @vue/component
export const BSkeleton = /*#__PURE__*/ extend({
  name: NAME_SKELETON,
  functional: true,
  props,
  render(h, { data, props }) {
    const { size, animation, variant } = props

    return h(
      'div',
      mergeData(data, {
        staticClass: 'b-skeleton',
        style: {
          width: size || props.width,
          height: size || props.height
        },
        class: {
          [`b-skeleton-${props.type}`]: true,
          [`b-skeleton-animate-${animation}`]: animation,
          [`bg-${variant}`]: variant
        }
      })
    )
  }
})
