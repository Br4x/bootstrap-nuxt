const { pick, omit, isArray, isObject, identity, upperFirst, lowerFirst } = useUtils()

// Prefix a property
export const prefixPropName = (prefix: String, value: String) => prefix + upperFirst(value)

// Remove a prefix from a property
export const unprefixPropName = (prefix: String, value: { replace: (arg0: String, arg1: string) => String }) => lowerFirst(value.replace(prefix, ''))

export const hasOwnProperty = (obj: any[], prop: PropertyKey) => Object.prototype.hasOwnProperty.call(obj, prop)

// Shallow copy an object
export const clone = (obj: any) => ({ ...obj })

// Copies props from one array/object to a new array/object
// Prop values are also cloned as new references to prevent possible
// mutation of original prop object values
// Optionally accepts a function to transform the prop name
export function copyProps(props: any[], transformFn = identity) {
  if (isArray(props))
    return props.map(transformFn)

  const copied = {}
  for (const prop in props) {
    /* istanbul ignore else */
    if (hasOwnProperty(props, prop)) {
      // If the prop value is an object, do a shallow clone
      // to prevent potential mutations to the original object
      copied[transformFn(prop)] = isObject(props[prop]) ? clone(props[prop]) : props[prop]
    }
  }
  return copied
}

export const linkProps = {
  active: Boolean,
  disabled: Boolean,
  href: String,
  to: String,
  target: {
    type: String,
    default: '_self',
  },
  rel: {
    type: String,
    default: null,
  },
  noPrefetch: Boolean,
  prefetch: {
    type: Boolean,
    default: null,
  },
}

export const btnProps = {
  ...linkProps,
  block: Boolean,
  disabled: Boolean,
  pill: Boolean,
  // Tri-state: `true`, `false` or `null`
  // => On, off, not a toggle
  pressed: {
    type: Boolean,
    default: null,
  },
  size: String,
  squared: Boolean,
  tag: {
    type: String,
    default: 'button',
  },
  type: {
    type: String,
    default: 'button',
  },
  variant: {
    type: String,
    default: 'secondary',
  },
}

export const imgProps = {
  alt: String,
  blank: Boolean,
  blankColor: {
    type: String,
    default: 'transparent',
  },
  block: Boolean,
  center: Boolean,
  fluid: Boolean,
  // Gives fluid images class `w-100` to make them grow to fit container
  fluidGrow: Boolean,
  height: [Number, String],
  left: Boolean,
  right: Boolean,
  // Possible values:
  //   `false`: no rounding of corners
  //   `true`: slightly rounded corners
  //   'top': top corners rounded
  //   'right': right corners rounded
  //   'bottom': bottom corners rounded
  //   'left': left corners rounded
  //   'circle': circle/oval
  //   '0': force rounding off
  rounded: {
    type: [String, Boolean],
    default: false,
  },
  sizes: [Array, String],
  src: String,
  srcset: [Array, String],
  thumbnail: Boolean,
  width: [Number, String],
}

export const imgLazyProps = {
  ...omit(imgProps, ['blank']),
  blankHeight: [Number, String],
  // If `null`, a blank image is generated
  blankSrc: {
    type: String,
    default: null,
  },
  blankWidth: String,
  // Distance away from viewport (in pixels)
  // before being considered "visible"
  offset: {
    type: [String, Number],
    default: 360,
  },
  show: Boolean,
}

export const cardProps = {
  bgVariant: String,
  borderVariant: String,
  tag: {
    type: String,
    default: 'div',
  },
  textVariant: String,
}

export const cardSubTitleProps = {
  subTitle: String,
  subTitleTag: {
    type: String,
    default: 'h6',
  },
  subTitleTextVariant: {
    type: String,
    default: 'muted',
  },
}

export const cardTitleProps = {
  title: String,
  titleTag: {
    type: String,
    default: 'h4',
  },
}

export const cardHeaderProps = {
  headerBgVariant: String,
  headerBorderVariant: String,
  headerTag: {
    type: String,
    default: 'div',
  },
  headerTextVariant: String,
  header: String,
  headerClass: [Array, Object, String],
  headerHtml: String,
}

export const cardBodyProps = {
  ...cardTitleProps,
  ...cardSubTitleProps,
  ...copyProps(cardProps, prefixPropName.bind(null, 'body')),
  bodyClass: Array,
  overlay: Boolean,
}

export const cardFooterProps = {
  footerBgVariant: String,
  footerBorderVariant: String,
  footerTag: {
    type: String,
    default: 'div',
  },
  footerTextVariant: String,
  footer: String,
  footerClass: [Array, Object, String],
  footerHtml: String,
}

export const cardImgProps = {
  ...pick(imgProps, ['src', 'alt', 'width', 'height', 'left', 'right']),
  bottom: Boolean,
  end: Boolean,
  start: Boolean,
  top: Boolean,
}
