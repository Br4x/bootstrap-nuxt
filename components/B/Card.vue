<script setup>
import { cardBodyProps, cardFooterProps, cardHeaderProps, cardImgProps, cardProps, copyProps, prefixPropName } from '@/constants/props'

const props = defineProps({
  ...cardBodyProps,
  ...cardHeaderProps,
  ...cardFooterProps,
  ...copyProps(cardImgProps, prefixPropName.bind(null, 'img')),
  ...cardProps,
  align: String,
  noBody: Boolean,
},
)

const { pluckProps } = useUtils()

const slots = useSlots()

const hasHeaderSlot = computed(() => {
  return !!slots.header
})
const hasFooterSlot = computed(() => {
  return !!slots.footer
})
</script>

<template>
  <component
    :is="tag" class="card relative min-w-0 break-words border border-1 rounded" :class="{
      'flex flex-col': !(imgLeft || imgStart) && !((imgRight || imgEnd) && !(imgLeft || imgStart)),
      'flex flex-row': imgLeft || imgStart,
      'flex flex-row-reverse': (imgRight || imgEnd) && !(imgLeft || imgStart),

      'bg-primary': bgVariant === 'primary',
      'bg-secondary': bgVariant === 'secondary',
      'bg-success': bgVariant === 'success',
      'bg-danger': bgVariant === 'danger',
      'bg-warning': bgVariant === 'warning',
      'bg-info': bgVariant === 'info',
      'bg-light': bgVariant === 'light',
      'bg-dark': bgVariant === 'dark',

      'border-primary': borderVariant === 'primary',
      'border-secondary': borderVariant === 'secondary',
      'border-success': borderVariant === 'success',
      'border-danger': borderVariant === 'danger',
      'border-warning': borderVariant === 'warning',
      'border-info': borderVariant === 'info',
      'border-light': borderVariant === 'light',
      'border-dark': borderVariant === 'dark',

      'text-darkPrimary': textVariant === 'primary',
      'text-darkSecondary': textVariant === 'secondary',
      'text-darkSuccess': textVariant === 'success',
      'text-darkDanger': textVariant === 'danger',
      'text-darkWarning': textVariant === 'warning',
      'text-darkInfo': textVariant === 'info',
      'text-darkLight': textVariant === 'light',
      'text-darkDark': textVariant === 'dark',
      'text-white': textVariant === 'white',

      'text-left': textVariant === 'left',
      'text-center': textVariant === 'center',
      'text-right': textVariant === 'right',
    }"
  >
    <template v-if="imgSrc && !imgBottom">
      <BCardImg :src="imgSrc" :left="imgLeft" :right="imgRight" :start="imgStart" :end="imgEnd" :alt="imgAlt" />
    </template>
    <BCardHeader
      v-if="hasHeaderSlot || header || headerHtml" v-bind="pluckProps(cardHeaderProps, props)"
      :header-html="headerHtml || header"
    >
      <slot name="header" />
    </BCardHeader>
    <template v-if="!noBody">
      <BCardBody v-bind="pluckProps(cardBodyProps, props)" :overlay="overlay">
        <template #default>
          <slot />
        </template>
      </BCardBody>
    </template>
    <slot v-else />
    <BCardFooter
      v-if="hasFooterSlot || footer || footerHtml" v-bind="pluckProps(cardFooterProps, props)"
      :footer-html="footerHtml || footer"
    >
      <slot name="footer" />
    </BCardFooter>
    <template v-if="imgSrc && imgBottom">
      <BCardImg :src="imgSrc" :left="imgLeft" :right="imgRight" :start="imgStart" :end="imgEnd" :alt="imgAlt" />
    </template>
  </component>
</template>

<style type="scss">
.card>hr {
  margin-right: 0;
  margin-left: 0
}

.card>.list-group {
  border-top: inherit;
  border-bottom: inherit;

  &:first-child {
    border-top-width: 0;
    border-top-left-radius: calc(.25rem - 1px);
    border-top-right-radius: calc(.25rem - 1px)
  }

  &:last-child {
    border-bottom-width: 0;
    border-bottom-right-radius: calc(.25rem - 1px);
    border-bottom-left-radius: calc(.25rem - 1px)
  }
}

.card>.card-header+.list-group,
.card>.list-group+.card-footer {
  border-top: 0
}
</style>
