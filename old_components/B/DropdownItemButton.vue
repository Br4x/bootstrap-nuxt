import { extend } from '../../vue'
import { NAME_DROPDOWN_ITEM_BUTTON } from '../../constants/components'
import { EVENT_NAME_CLICK } from '../../constants/events'
import {
  PROP_TYPE_ARRAY_OBJECT_STRING,
  PROP_TYPE_BOOLEAN,
  PROP_TYPE_STRING
} from '../../constants/props'
import { makeProp, makePropsConfigurable } from '../../utils/props'
import { attrsMixin } from '../../mixins/attrs'
import { normalizeSlotMixin } from '../../mixins/normalize-slot'

// --- Props ---

export const props = makePropsConfigurable(
  {
    active: {
    type: Boolean,
    default: false,
  },
    activeClass: {
    type: String,
    default: 'active',
  },
    buttonClass: [Array, Object, String],
    disabled: {
    type: Boolean,
    default: false,
  },
    variant: String
  },
  NAME_DROPDOWN_ITEM_BUTTON
)

// --- Main component ---

// @vue/component
export const BDropdownItemButton = /*#__PURE__*/ extend({
  name: NAME_DROPDOWN_ITEM_BUTTON,
  mixins: [attrsMixin, normalizeSlotMixin],
  inject: {
    getBvDropdown: { default: () => () => null }
  },
  inheritAttrs: false,
  props,
  computed: {
    bvDropdown() {
      return this.getBvDropdown()
    },

    computedAttrs() {
      return {
        ...this.bvAttrs,
        role: 'menuitem',
        type: 'button',
        disabled: this.disabled
      }
    }
  },
  methods: {
    closeDropdown() {
      if (this.bvDropdown) {
        this.bvDropdown.hide(true)
      }
    },
    onClick(event) {
      this.$emit(EVENT_NAME_CLICK, event)
      this.closeDropdown()
    }
  },
  render(h) {
    const { active, variant, bvAttrs } = this

    return h(
      'li',
      {
        class: bvAttrs.class,
        style: bvAttrs.style,
        attrs: { role: 'presentation' }
      },
      [
        h(
          'button',
          {
            staticClass: 'dropdown-item',
            class: [
              this.buttonClass,
              {
                [this.activeClass]: active,
                [`text-${variant}`]: variant && !(active || this.disabled)
              }
            ],
            attrs: this.computedAttrs,
            on: { click: this.onClick },
            ref: 'button'
          },
          this.normalizeSlot()
        )
      ]
    )
  }
})
