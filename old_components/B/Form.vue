import { extend, mergeData } from '../../vue'
import { NAME_FORM } from '../../constants/components'
import { PROP_TYPE_BOOLEAN, PROP_TYPE_STRING } from '../../constants/props'
import { makeProp, makePropsConfigurable } from '../../utils/props'

// --- Props ---

export const props = makePropsConfigurable(
  {
    id: String,
    inline: {
    type: Boolean,
    default: false,
  },
    novalidate: {
    type: Boolean,
    default: false,
  },
    validated: {
    type: Boolean,
    default: false,
  }
  },
  NAME_FORM
)

// --- Main component ---

// @vue/component
export const BForm = /*#__PURE__*/ extend({
  name: NAME_FORM,
  functional: true,
  props,
  render(h, { props, data, children }) {
    return h(
      'form',
      mergeData(data, {
        class: {
          'form-inline': props.inline,
          'was-validated': props.validated
        },
        attrs: {
          id: props.id,
          novalidate: props.novalidate
        }
      }),
      children
    )
  }
})
