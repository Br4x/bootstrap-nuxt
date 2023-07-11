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
    :is="tag"
    class="card relative min-w-0 flex flex-col break-words border border-1 border-gray-300 rounded bg-white"
    :class="{
      'flex-row': imgLeft || imgStart,
      'flex-row-reverse': (imgRight || imgEnd) && !(imgLeft || imgStart),
      [`text-${align}`]: align,
      [`bg-${bgVariant}`]: bgVariant,
      [`border-${borderVariant}`]: borderVariant,
      [`text-${textVariant}`]: textVariant,
      'text-left': textVariant === 'left',
      'text-center': textVariant === 'center',
      'text-right': textVariant === 'right',
    }"
  >
    <template v-if="imgSrc && !imgBottom">
      <BCardImg
        :src="imgSrc"
        :left="imgLeft"
        :right="imgRight"
        :start="imgStart"
        :end="imgEnd"
        :alt="imgAlt"
      />
    </template>
    <BCardHeader v-if="hasHeaderSlot || header || headerHtml" :header-html="headerHtml">
      <template #default>
        <slot name="header" />
      </template>
    </BCardHeader>
    <template v-if="!noBody">
      <BCardBody v-bind="pluckProps(cardBodyProps, props)" :overlay="overlay">
        <template #default>
          <slot />
        </template>
      </BCardBody>
    </template>
    <BCardFooter v-if="hasFooterSlot || footer || footerHtml" v-bind="pluckProps(cardFooterProps, props)" :footer-html="footerHtml">
      <template #default>
        <slot name="footer" />
      </template>
    </BCardFooter>
    <template v-if="imgSrc && imgBottom">
      <BCardImg
        :src="imgSrc"
        :left="imgLeft"
        :right="imgRight"
        :start="imgStart"
        :end="imgEnd"
        :alt="imgAlt"
      />
    </template>
  </component>
</template>
