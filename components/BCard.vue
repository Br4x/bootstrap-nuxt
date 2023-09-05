<script setup lang="ts">
import { isEmptySlot } from '@/utils'
import type { AlignmentTextHorizontal } from '~/types/AlignmentTextHorizontal'
import type { ClassValue } from '~/types/ClassValue'
import type { ColorVariant } from '~/types/ColorVariant'
import type { TextColorVariant } from '~/types/TextColorVariant'

const props = withDefaults(
  defineProps<{
    align?: AlignmentTextHorizontal
    bgVariant?: ColorVariant | null
    bodyBgVariant?: ColorVariant | null
    bodyClass?: ClassValue
    bodyTag?: string
    bodyTextVariant?: TextColorVariant | null
    borderVariant?: ColorVariant | null
    footer?: string
    footerBgVariant?: ColorVariant | null
    footerBorderVariant?: ColorVariant | null
    footerClass?: ClassValue
    footerHtml?: string
    footerTag?: string
    footerTextVariant?: TextColorVariant | null
    header?: string
    headerBgVariant?: ColorVariant | null
    headerBorderVariant?: ColorVariant | null
    headerClass?: ClassValue
    headerHtml?: string
    headerTag?: string
    headerTextVariant?: TextColorVariant | null
    imgAlt?: string
    imgBottom?: boolean
    imgEnd?: boolean
    imgHeight?: string | number
    imgSrc?: string
    imgStart?: boolean
    imgTop?: boolean
    imgWidth?: string | number
    noBody?: boolean
    overlay?: boolean
    subtitle?: string
    subtitleTag?: string
    subtitleTextVariant?: TextColorVariant | null
    tag?: string
    textVariant?: TextColorVariant | null
    title?: string
    titleTag?: string
    bodyText?: string
  }>(),
  {
    align: undefined,
    bgVariant: null,
    bodyBgVariant: undefined,
    bodyClass: undefined,
    bodyTextVariant: undefined,
    borderVariant: null,
    footer: undefined,
    footerBgVariant: undefined,
    footerBorderVariant: undefined,
    footerClass: undefined,
    footerTextVariant: undefined,
    header: undefined,
    headerBgVariant: undefined,
    headerBorderVariant: undefined,
    headerClass: undefined,
    textVariant: null,
    headerTextVariant: undefined,
    imgAlt: undefined,
    title: undefined,
    subtitle: undefined,
    imgWidth: undefined,
    imgHeight: undefined,
    imgSrc: undefined,
    bodyTag: 'div',
    footerHtml: '',
    footerTag: 'div',
    headerHtml: '',
    headerTag: 'div',
    imgBottom: false,
    imgEnd: false,
    imgStart: false,
    bodyText: '',
    imgTop: false,
    noBody: false,
    overlay: false,
    subtitleTag: 'h6',
    subtitleTextVariant: 'body-secondary',
    tag: 'div',
    titleTag: 'h4',
  },
)

const slots = useSlots()

const hasHeaderSlot = computed(() => !isEmptySlot(slots.header))
const hasFooterSlot = computed(() => !isEmptySlot(slots.footer))

const imgAttr = computed(() => ({
  src: props.imgSrc,
  alt: props.imgAlt,
  height: props.imgHeight,
  width: props.imgWidth,
  bottom: props.imgBottom,
  end: props.imgEnd,
  start: props.imgStart,
  top: props.imgTop,
}))
</script>

<template>
  <component
    :is="tag" class="card" :class="{
      [`text-${align}`]: align !== undefined,
      [`text-${textVariant}`]: textVariant !== null,
      [`bg-${bgVariant}`]: bgVariant !== null,
      [`border-${borderVariant}`]: borderVariant !== null,
      'flex-row': imgStart,
      'flex-row-reverse': imgEnd,
    }"
  >
    <slot v-if="!imgBottom" name="img">
      <BCardImg v-if="imgSrc" v-bind="imgAttr" />
    </slot>
    <BCardHeader
      v-if="header || hasHeaderSlot || headerHtml" :bg-variant="headerBgVariant"
      :border-variant="headerBorderVariant" :html="headerHtml" :tag="headerTag" :text-variant="headerTextVariant"
      :class="headerClass"
    >
      <slot name="header">
        {{ header }}
      </slot>
    </BCardHeader>
    <BCardBody
      v-if="!noBody" :overlay="overlay" :body-bg-variant="bodyBgVariant" :body-tag="bodyTag"
      :body-text-variant="bodyTextVariant" :subtitle="subtitle" :subtitle-tag="subtitleTag"
      :subtitle-text-variant="subtitleTextVariant" :title="title" :title-tag="titleTag" :class="bodyClass"
    >
      <slot>
        {{ bodyText }}
      </slot>
    </BCardBody>
    <slot v-else>
      {{ bodyText }}
    </slot>
    <BCardFooter
      v-if="footer || hasFooterSlot || footerHtml" :bg-variant="footerBgVariant"
      :border-variant="footerBorderVariant" :html="footerHtml" :tag="footerTag" :text-variant="footerTextVariant"
      :class="footerClass"
    >
      <slot name="footer">
        {{ footer }}
      </slot>
    </BCardFooter>
    <slot v-if="imgBottom" name="img">
      <BCardImg v-if="imgSrc" v-bind="imgAttr" />
    </slot>
  </component>
</template>

<style lang="scss" scoped>
$b-card-deck-gap: 1.5rem !default;
$b-card-media-min-width: 576px !default;
$card-columns-count: 3 !default;
$card-columns-gap: 1.25rem !default;
$card-columns-margin: 0.75rem !default;

.card-deck {
  gap: $b-card-deck-gap;

  @media (min-width: $b-card-media-min-width) {
    display: flex;
    flex-flow: row wrap;
  }

  // The child selector allows nested `.card` within `.card-group`
  // to display properly.
  >.card {
    flex: 1 0 0%;
    margin-bottom: 0;
  }
}

.card-columns {
  .card {
    margin-bottom: $card-columns-margin;
  }

  @media (min-width: $b-card-media-min-width) {
    column-count: $card-columns-count;
    column-gap: $card-columns-gap;
    orphans: 1;
    widows: 1;

    .card {
      display: inline-block; // Don't let them vertically span multiple columns
      width: 100%; // Don't let their width change
    }
  }
}

.card {
  --bs-card-spacer-y: 1rem;
  --bs-card-spacer-x: 1rem;
  --bs-card-title-spacer-y: 0.5rem;
  --bs-card-border-width: var(--bs-border-width);
  --bs-card-border-color: var(--bs-border-color-translucent);
  --bs-card-border-radius: var(--bs-border-radius);
  --bs-card-inner-border-radius: calc(var(--bs-border-radius) - (var(--bs-border-width)));
  --bs-card-cap-padding-y: 0.5rem;
  --bs-card-cap-padding-x: 1rem;
  --bs-card-cap-bg: rgba(var(--bs-body-color-rgb), 0.03);
  --bs-card-bg: var(--bs-body-bg);
  --bs-card-img-overlay-padding: 1rem;
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  color: var(--bs-body-color);
  word-wrap: break-word;
  background-color: var(--bs-card-bg);
  background-clip: border-box;
  border: var(--bs-card-border-width) solid var(--bs-card-border-color);
  border-radius: var(--bs-card-border-radius)
}

.card>hr {
  margin-right: 0;
  margin-left: 0
}

.card>.list-group {
  border-top: inherit;
  border-bottom: inherit
}

.card>.list-group:first-child {
  border-top-width: 0;
  border-top-left-radius: var(--bs-card-inner-border-radius);
  border-top-right-radius: var(--bs-card-inner-border-radius)
}

.card>.list-group:last-child {
  border-bottom-width: 0;
  border-bottom-right-radius: var(--bs-card-inner-border-radius);
  border-bottom-left-radius: var(--bs-card-inner-border-radius)
}

.card>.card-header+.list-group,
.card>.list-group+.card-footer {
  border-top: 0
}

.card-body {
  flex: 1 1 auto;
  padding: var(--bs-card-spacer-y) var(--bs-card-spacer-x);
}

.card-title {
  margin-bottom: var(--bs-card-title-spacer-y);
}

.card-subtitle {
  margin-top: calc(-.5 * var(--bs-card-title-spacer-y));
  margin-bottom: 0;
}

.card-text:last-child {
  margin-bottom: 0
}

.card-link+.card-link {
  margin-left: var(--bs-card-spacer-x)
}

.card-header {
  padding: var(--bs-card-cap-padding-y) var(--bs-card-cap-padding-x);
  margin-bottom: 0;
  background-color: var(--bs-card-cap-bg);
  border-bottom: var(--bs-card-border-width) solid var(--bs-card-border-color)
}

.card-header:first-child {
  border-radius: var(--bs-card-inner-border-radius) var(--bs-card-inner-border-radius) 0 0
}

.card-footer {
  padding: var(--bs-card-cap-padding-y) var(--bs-card-cap-padding-x);
  background-color: var(--bs-card-cap-bg);
  border-top: var(--bs-card-border-width) solid var(--bs-card-border-color)
}

.card-footer:last-child {
  border-radius: 0 0 var(--bs-card-inner-border-radius) var(--bs-card-inner-border-radius)
}

.card-header-tabs {
  margin-right: calc(-.5 * var(--bs-card-cap-padding-x));
  margin-bottom: calc(-1 * var(--bs-card-cap-padding-y));
  margin-left: calc(-.5 * var(--bs-card-cap-padding-x));
  border-bottom: 0
}

.card-header-tabs .nav-link.active {
  background-color: var(--bs-card-bg);
  border-bottom-color: var(--bs-card-bg)
}

.card-header-pills {
  margin-right: calc(-.5 * var(--bs-card-cap-padding-x));
  margin-left: calc(-.5 * var(--bs-card-cap-padding-x))
}

.card-img-overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: var(--bs-card-img-overlay-padding);
  border-radius: var(--bs-card-inner-border-radius)
}

.card-img,
.card-img-bottom,
.card-img-top {
  width: 100%
}

.card-img,
.card-img-top {
  border-top-left-radius: var(--bs-card-inner-border-radius);
  border-top-right-radius: var(--bs-card-inner-border-radius)
}

.card-img,
.card-img-bottom {
  border-bottom-right-radius: var(--bs-card-inner-border-radius);
  border-bottom-left-radius: var(--bs-card-inner-border-radius)
}
</style>
