export function useProps() {
  const { pick, omit } = useUtils()

  const linkProps = {
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

  const btnProps = {
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

  const imgProps = {
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

  const imgLazyProps = {
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

  const cardProps = {
    bgVariant: String,
    borderVariant: String,
    tag: {
      type: String,
      default: 'div',
    },
    textVariant: String,
  }

  const cardSubTitleProps = {
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

  const cardTitleProps = {
    title: String,
    titleTag: {
      type: String,
      default: 'h4',
    },
  }

  const cardHeaderProps = {
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

  const cardBodyProps = {
    ...cardTitleProps,
    ...cardSubTitleProps,
    bodyBgVariant: String,
    bodyBorderVariant: String,
    bodyTag: {
      type: String,
      default: 'div',
    },
    bodyTextVariant: String,
    bodyClass: Array,
    overlay: Boolean,
  }

  const cardFooterProps = {
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

  const cardImageProps = {
    ...pick(imgProps, ['src', 'alt', 'width', 'height', 'left', 'right']),
    bottom: Boolean,
    end: Boolean,
    start: Boolean,
    top: Boolean,
  }

  return {
    cardImageProps,
    cardHeaderProps,
    cardFooterProps,
    cardTitleProps,
    cardSubTitleProps,
    cardBodyProps,
    cardProps,
    linkProps,
    btnProps,
    imgProps,
    imgLazyProps,
  }
}
