<!-- eslint-disable @typescript-eslint/no-use-before-define -->
<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { BvEvent, getId, tabsInjectionKey } from '@/utils'

import type { AlignmentJustifyContent } from '~/types/AlignmentJustifyContent'
import type { ClassValue } from '~/types/ClassValue'

// TODO this component needs a desperate refactoring to use provide/inject and not the complicated slot manipulation logic it's doing now

const props = withDefaults(
  defineProps<{
    activeNavItemClass?: ClassValue
    activeTabClass?: ClassValue
    align?: AlignmentJustifyContent
    contentClass?: ClassValue
    card?: boolean
    end?: boolean
    fill?: boolean
    id?: string
    justified?: boolean
    lazy?: boolean
    navClass?: ClassValue
    navWrapperClass?: ClassValue
    noFade?: boolean
    // noKeyNav?: boolean
    noNavStyle?: boolean
    pills?: boolean
    small?: boolean
    tag?: string
    vertical?: boolean
    modelValue?: number
  }>(),
  {
    navClass: undefined,
    navWrapperClass: undefined,
    id: undefined,
    activeNavItemClass: undefined,
    activeTabClass: undefined,
    align: undefined,
    contentClass: undefined,
    card: false,
    end: false,
    fill: false,
    justified: false,
    lazy: false,
    noFade: false,
    noNavStyle: false,
    pills: false,
    small: false,
    tag: 'div',
    vertical: false,
    modelValue: -1,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: number]
  'activateTab': [v1: number, v2: number, v3: BvEvent]
  'click': [] // TODO click event is never used
}>()

const modelValue = useVModel(props, 'modelValue', emit)

const slots = useSlots()

const _tabIndex = ref(modelValue.value)
const _currentTabButton = ref('')

const tabIndex = computed({
  get: () => _tabIndex.value,
  set: (value: number) => {
    _tabIndex.value = value
    if (tabs.value.length > 0 && value >= 0 && value < tabs.value.length)
      _currentTabButton.value = tabs.value[value].buttonId
    else
      _currentTabButton.value = ''

    modelValue.value = value
  },
})
const tabsInternal = ref<
  {
    buttonId: string
    contentId: string
    disabled: boolean
    target: string
    title: string
    titleItemClass: ClassValue
    titleLinkAttributes: Record<string, unknown>
    onClick: (e: Event) => void
    tab: VNode
    tabComponent: () => VNode
  }[]
      >([])

// TODO simplify this! YOu cannot do things like nest BTab in a wrapper component!
watch(
  () => slots.default?.(),
  () => {
    tabsInternal.value
      = slots.default === undefined
        ? []
        : getSlotElements(slots.default, 'BTab').map((tab, idx) => {
          if (!tab.props)
            tab.props = {}
          const buttonId = tab.props['button-id'] || getId('tab')
          const contentId = tab.props.id || getId()
          const titleItemClass = tab.props['title-item-class']
          const titleLinkAttributes = tab.props['title-link-attributes']

          return {
            buttonId,
            contentId,
            disabled: tab.props.disabled === '' || tab.props.disabled === true,
            target: `#${contentId}`,
            title: tab.props.title,
            titleItemClass,
            titleLinkAttributes,
            onClick: tab.props.onClick,
            tab,
            tabComponent: () => getSlotElements(slots.default, 'BTab')[idx],
          }
        })
  },
  { immediate: true },
)

const tabs = computed(() =>
  tabsInternal.value.map((item, idx) => {
    const { tab } = item
    if (!tab.props)
      tab.props = {}
    const active = tabIndex.value > -1 ? idx === tabIndex.value : tab.props.active === ''

    return {
      ...item,
      active,
      navItemClasses: [
        {
          active,
          disabled: tab.props.disabled === '' || tab.props.disabled === true,
        },
        active && props.activeNavItemClass ? props.activeNavItemClass : null,
        tab.props['title-link-class'],
      ],
      tabClasses: [
        {
          fade: !props.noFade,
        },
        active && props.activeTabClass ? props.activeTabClass : null,
      ],
    }
  }),
)

const showEmpty = computed(() => !(tabs?.value && tabs.value.length > 0))

const alignment = useAlignment(() => props.align)

function activateTab(index: number): boolean {
  let result = false
  if (index !== undefined) {
    if (
      index > -1
      && index < tabs.value.length
      && !tabs.value[index].disabled
      && (tabIndex.value < 0 || tabs.value[index].buttonId !== _currentTabButton.value)
    ) {
      const tabEvent = new BvEvent('activateTab', { cancelable: true })
      emit('activateTab', index, tabIndex.value, tabEvent)
      if (!tabEvent.defaultPrevented) {
        tabIndex.value = index
        result = true
      }
    }
  }
  if (!result && modelValue.value !== tabIndex.value)
    modelValue.value = tabIndex.value

  return result
}

function handleClick(event: MouseEvent, index: number) {
  activateTab(index)
  if (
    index >= 0
    && !tabs.value[index].disabled
    && tabs.value[index]?.onClick
    && typeof tabs.value[index].onClick === 'function'
  )
    tabs.value[index].onClick(event)
}

activateTab(_tabIndex.value)

watch(modelValue, (newValue, oldValue) => {
  if (newValue === oldValue)
    return
  newValue = Math.max(newValue, -1)
  oldValue = Math.max(oldValue, -1)

  if (tabs.value.length <= 0) {
    tabIndex.value = -1
    return
  }

  const goForward = newValue > oldValue
  let index = newValue
  const maxIdx = tabs.value.length - 1
  while (index >= 0 && index <= maxIdx && tabs.value[index].disabled)
    index += goForward ? 1 : -1

  if (index < 0) {
    activateTab(0)
    return
  }
  if (index >= tabs.value.length) {
    activateTab(tabs.value.length - 1)
    return
  }
  activateTab(index)
})

watch(tabs, () => {
  // find last active tab
  let activeTabIndex = tabs.value.map(tab => tab.active && !tab.disabled).lastIndexOf(true)

  if (activeTabIndex < 0) {
    if (tabIndex.value >= tabs.value.length) {
      // handle last tab removed, so find the last non-disabled tab
      activeTabIndex = tabs.value.map(tab => !tab.disabled).lastIndexOf(true)
    }
    else {
      if (tabs.value[tabIndex.value] && !tabs.value[tabIndex.value].disabled)
        activeTabIndex = tabIndex.value
    }
  }
  // still no active tab found, find first non-disabled tab
  if (activeTabIndex < 0)
    activeTabIndex = tabs.value.map(tab => !tab.disabled).indexOf(true)

  // ensure only one tab active at a time
  tabs.value.forEach((tab, idx) => {
    tab.active = idx === activeTabIndex
  })

  activateTab(activeTabIndex)
})

onMounted(() => {
  // If there are tabs available, make sure a tab is set active
  if (tabIndex.value < 0 && tabs.value.length > 0 && !tabs.value.some(tab => tab.active)) {
    const firstTab = tabs.value.map(t => !t.disabled).indexOf(true)
    activateTab(firstTab >= 0 ? firstTab : -1)
  }
})

provide(tabsInjectionKey, {
  lazy: readonly(toRef(props, 'lazy')),
  card: readonly(toRef(props, 'card')),
})
</script>

<template>
  <component
    :is="tag" :id="id" class="tabs" :class="{
      'd-flex': vertical,
      'align-items-start': vertical,
    }"
  >
    <!-- Tab Content Above Tabs -->
    <div v-if="props.end" class="tab-content" :class="contentClass">
      <component
        :is="tabComponent()"
        v-for="({ tabComponent, contentId, tabClasses, active }, i) in tabs"
        :id="contentId"
        :key="i"
        :class="tabClasses"
        :active="active"
      />
      <div
        v-if="showEmpty"
        key="bv-empty-tab"
        class="tab-pane active"
        :class="{ 'card-body': props.card }"
      >
        <slot name="empty" />
      </div>
    </div>
    <div
      :class="[navWrapperClass, { 'card-header': props.card, 'ms-auto': vertical && props.end }]"
    >
      <!-- Render Tabs -->
      <ul
        class="nav" :class="[{
          'nav-pills': pills,
          'flex-column me-3': vertical,
          [alignment]: align !== undefined,
          'nav-fill': fill,
          'card-header-tabs': card,
          'nav-justified': justified,
          'nav-tabs': !noNavStyle && !pills,
          'small': small,
        }, navClass]" role="tablist"
      >
        <slot name="tabs-start" />
        <li
          v-for="({ tab, buttonId, contentId, navItemClasses, active, target }, idx) in tabs"
          :key="idx"
          class="nav-item"
          :class="tab?.props?.['title-item-class']"
          role="presentation"
        >
          <button
            :id="buttonId"
            class="nav-link"
            :class="navItemClasses"
            data-bs-toggle="tab"
            :data-bs-target="target"
            role="tab"
            :aria-controls="contentId"
            :aria-selected="active"
            v-bind="tab?.props?.['title-link-attributes']"
            @click.stop.prevent="(e) => handleClick(e, idx)"
          >
            <component
              :is="(tab.children as any).title"
              v-if="tab.children && (tab.children as any).title"
            />
            <template v-else>
              {{ tab?.props?.title }}
            </template>
          </button>
        </li>
        <slot name="tabs-end" />
      </ul>
    </div>
    <!-- Tab Content Below Tabs -->
    <div v-if="!props.end" class="tab-content" :class="contentClass">
      <component
        :is="tabComponent()"
        v-for="({ tabComponent, contentId, tabClasses, active }, i) in tabs"
        :id="contentId"
        :key="i"
        :class="tabClasses"
        :active="active"
      />
      <div
        v-if="showEmpty"
        key="bv-empty-tab"
        class="tab-pane active"
        :class="{ 'card-body': props.card }"
      >
        <slot name="empty" />
      </div>
    </div>
  </component>
</template>
