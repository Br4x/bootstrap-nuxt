import { extend, mergeData } from '../../vue'
import { NAME_INPUT_GROUP_ADDON } from '../../constants/components'
import { PROP_TYPE_BOOLEAN, PROP_TYPE_STRING } from '../../constants/props'
import { makeProp, makePropsConfigurable } from '../../utils/props'
import { BInputGroupText } from './input-group-text'

// --- Props ---

export const props = makePropsConfigurable(
  {
    append: {
    type: Boolean,
    default: false,
  },
    id: String,
    isText: {
    type: Boolean,
    default: false,
  },
    tag: {
    type: String,
    default: 'div',
  }
  },
  NAME_INPUT_GROUP_ADDON
)

// --- Main component ---

// @vue/component
export const BInputGroupAddon = /*#__PURE__*/ extend({
  name: NAME_INPUT_GROUP_ADDON,
  functional: true,
  props,
  render(h, { props, data, children }) {
    const { append } = props

    return h(
      props.tag,
      mergeData(data, {
        class: {
          'input-group-append': append,
          'input-group-prepend': !append
        },
        attrs: {
          id: props.id
        }
      }),
      props.isText ? [h(BInputGroupText, children)] : children
    )
  }
})
