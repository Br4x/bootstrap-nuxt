import { extend, mergeData } from '../../vue'
import { NAME_SKELETON_IMG } from '../../constants/components'
import { PROP_TYPE_BOOLEAN, PROP_TYPE_STRING } from '../../constants/props'
import { makeProp, makePropsConfigurable } from '../../utils/props'
import { BAspect } from '../aspect'
import { BSkeleton } from './skeleton'

// --- Props ---

export const props = makePropsConfigurable(
  {
    animation: String,
    aspect: makeProp(PROP_TYPE_STRING, '16:9'),
    cardImg: String,
    height: String,
    noAspect: {
    type: Boolean,
    default: false,
  },
    variant: String,
    width: String
  },
  NAME_SKELETON_IMG
)

// --- Main component ---

// @vue/component
export const BSkeletonImg = /*#__PURE__*/ extend({
  name: NAME_SKELETON_IMG,
  functional: true,
  props,
  render(h, { data, props }) {
    const { aspect, width, height, animation, variant, cardImg } = props

    const $img = h(
      BSkeleton,
      mergeData(data, {
        props: {
          type: 'img',
          width,
          height,
          animation,
          variant
        },
        class: { [`card-img-${cardImg}`]: cardImg }
      })
    )

    return props.noAspect ? $img : h(BAspect, { props: { aspect } }, [$img])
  }
})
