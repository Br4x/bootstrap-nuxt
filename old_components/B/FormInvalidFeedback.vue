import { extend, mergeData } from '../../vue'
import { NAME_FORM_INVALID_FEEDBACK } from '../../constants/components'
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
  NAME_FORM_INVALID_FEEDBACK
)

// --- Main component ---

// @vue/component
export const BFormInvalidFeedback = /*#__PURE__*/ extend({
  name: NAME_FORM_INVALID_FEEDBACK,
  functional: true,
  props,
  render(h, { props, data, children }) {
    const { tooltip, ariaLive } = props
    const show = props.forceShow === true || props.state === false

    return h(
      props.tag,
      mergeData(data, {
        class: {
          'd-block': show,
          'invalid-feedback': !tooltip,
          'invalid-tooltip': tooltip
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
