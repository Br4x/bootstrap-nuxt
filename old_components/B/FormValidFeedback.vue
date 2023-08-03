import { extend, mergeData } from '../../vue'
import { NAME_FORM_VALID_FEEDBACK } from '../../constants/components'
import { PROP_TYPE_BOOLEAN, PROP_TYPE_STRING } from '../../constants/props'
import { makeProp, makePropsConfigurable } from '../../utils/props'

// --- Props ---

export const props = makePropsConfigurable(
  {
    ariaLive: String,
    forceShow: {
    type: Boolean,
    default: false,
  },
    id: String,
    role: String,
    // Tri-state prop: `true`, `false`, or `null`
    state: makeProp(PROP_TYPE_BOOLEAN, null),
    tag: {
    type: String,
    default: 'div',
  },
    tooltip: {
    type: Boolean,
    default: false,
  }
  },
  NAME_FORM_VALID_FEEDBACK
)

// --- Main component ---

// @vue/component
export const BFormValidFeedback = /*#__PURE__*/ extend({
  name: NAME_FORM_VALID_FEEDBACK,
  functional: true,
  props,
  render(h, { props, data, children }) {
    const { tooltip, ariaLive } = props
    const show = props.forceShow === true || props.state === true

    return h(
      props.tag,
      mergeData(data, {
        class: {
          'd-block': show,
          'valid-feedback': !tooltip,
          'valid-tooltip': tooltip
        },
        attrs: {
          id: props.id || null,
          role: props.role || null,
          'aria-live': ariaLive || null,
          'aria-atomic': ariaLive ? 'true' : null
        }
      }),
      children
    )
  }
})
