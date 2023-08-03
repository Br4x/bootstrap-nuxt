import { extend } from '../../vue'
import { NAME_PROGRESS } from '../../constants/components'
import { PROP_TYPE_BOOLEAN, PROP_TYPE_NUMBER_STRING, PROP_TYPE_STRING } from '../../constants/props'
import { omit, sortKeys } from '../../utils/object'
import { makeProp, makePropsConfigurable, pluckProps } from '../../utils/props'
import { normalizeSlotMixin } from '../../mixins/normalize-slot'
import { BProgressBar, props as BProgressBarProps } from './progress-bar'

// --- Props ---

const progressBarProps = omit(BProgressBarProps, ['label', 'labelHtml'])

export const props = makePropsConfigurable(
  sortKeys({
    ...progressBarProps,
    animated: {
    type: Boolean,
    default: false,
  },
    height: String,
    max: makeProp(PROP_TYPE_NUMBER_STRING, 100),
    precision: makeProp(PROP_TYPE_NUMBER_STRING, 0),
    showProgress: {
    type: Boolean,
    default: false,
  },
    showValue: {
    type: Boolean,
    default: false,
  },
    striped: {
    type: Boolean,
    default: false,
  }
  }),
  NAME_PROGRESS
)

// --- Main component ---

// @vue/component
export const BProgress = /*#__PURE__*/ extend({
  name: NAME_PROGRESS,
  mixins: [normalizeSlotMixin],
  provide() {
    return { getBvProgress: () => this }
  },
  props,
  computed: {
    progressHeight() {
      return { height: this.height || null }
    }
  },
  render(h) {
    let $childNodes = this.normalizeSlot()
    if (!$childNodes) {
      $childNodes = h(BProgressBar, { props: pluckProps(progressBarProps, this.$props) })
    }

    return h(
      'div',
      {
        staticClass: 'progress',
        style: this.progressHeight
      },
      [$childNodes]
    )
  }
})
