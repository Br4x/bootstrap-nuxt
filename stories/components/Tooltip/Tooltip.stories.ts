import type { Meta, StoryObj } from '@storybook/vue3'
import vitestResults from '@/tests/unit/results.json'
import BButton from '@/components/B/Button.vue'
import BTooltip from '@/components/B/Tooltip.vue'
import BContainer from '@/components/B/Container.vue'
import BRow from '@/components/B/Row.vue'
import BCol from '@/components/B/Col.vue'

const meta = {
  title: 'Components/Tooltip',
  component: BTooltip,
  parameters: {
    vitest: {
      testFile: 'tooltip.test.tsx',
      testResults: vitestResults,
    },
  },
  argTypes: {

  },
} satisfies Meta<typeof BTooltip>

export default meta
          type Story = StoryObj<typeof meta>

export const Tooltip: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BTooltip },
    props: Object.keys(argTypes),
    template: `
<div class="text-center my-3">
  <b-button v-b-tooltip.hover title="Tooltip directive content">
    Hover Me
  </b-button>

  <b-button id="tooltip-target-1">
    Hover Me
  </b-button>
  <b-tooltip target="tooltip-target-1" triggers="hover">
    I am tooltip <b>component</b> content!
  </b-tooltip>
</div>

<!-- b-tooltip.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const CaveatsWithFocusTriggerOnButtonElements: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BTooltip },
    props: Object.keys(argTypes),
    template: `
<b-button
  href="#"
  tabindex="0"
  v-b-tooltip.focus
  title="Tooltip title"
>
  Link button with tooltip directive
</b-button>

<b-button id="link-button" href="#" tabindex="0">
  Link button with tooltip component
</b-button>
<b-tooltip target="link-button" title="Tooltip title" triggers="focus">
  Tooltip title
</b-tooltip>
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const DisabledElements: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BTooltip },
    props: Object.keys(argTypes),
    template: `
<div>
  <span id="disabled-wrapper" class="d-inline-block" tabindex="0">
    <b-button variant="primary" style="pointer-events: none;" disabled>Disabled button</b-button>
  </span>
  <b-tooltip target="disabled-wrapper">Disabled tooltip</b-tooltip>
</div>

<!-- disabled-trigger-element.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const BTooltipComponentUsage: Story = {
  render: (args, { argTypes }) => ({
    components: { BContainer, BRow, BCol, BButton, BTooltip },
    props: Object.keys(argTypes),
    template: `
<b-container fluid>
  <b-row>
    <b-col md="4" class="py-4">
      <b-button id="button-1" variant="outline-success">Live chat</b-button>
    </b-col>
    <b-col md="4" class="py-4">
      <b-button id="button-2" variant="outline-success">Html chat</b-button>
    </b-col>
    <b-col md="4" class="py-4">
      <b-button ref="button-3" variant="outline-success">Alternative chat</b-button>
    </b-col>
  </b-row>

  <!-- Tooltip title specified via prop title -->
  <b-tooltip target="button-1" title="Online!"></b-tooltip>

  <!-- HTML title specified via default slot -->
  <b-tooltip target="button-2" placement="bottom">
    Hello <strong>World!</strong>
  </b-tooltip>

  <!-- Tooltip for an element identified by ref -->
  <b-tooltip :target="() => $refs['button-3']" title="Alternative!"></b-tooltip>
</b-container>

<!-- b-tooltip-component.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const NoninteractiveTooltips: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BTooltip },
    props: Object.keys(argTypes),
    template: `
<div class="text-center">
  <div>
    <b-button id="tooltip-button-interactive">My tooltip is interactive</b-button>
    <b-tooltip target="tooltip-button-interactive">I will stay open when hovered</b-tooltip>
  </div>

  <div class="mt-3">
    <b-button id="tooltip-button-not-interactive">Mine is not...</b-button>
    <b-tooltip target="tooltip-button-not-interactive" noninteractive>Catch me if you can!</b-tooltip>
  </div>
</div>

<!-- b-tooltip-interactive.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const VariantsAndCustomClass: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BTooltip },
    props: Object.keys(argTypes),
    template: `
<div class="text-center">
  <b-button id="tooltip-button-variant">Button</b-button>
  <b-tooltip target="tooltip-button-variant" variant="danger">Danger variant tooltip</b-tooltip>
</div>

<!-- b-tooltip-variant.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const VariantsAndCustomClass1: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BTooltip },
    props: Object.keys(argTypes),
    template: `
<div class="text-center">
  <b-button id="my-button">Button</b-button>
  <b-tooltip target="my-button" custom-class="my-tooltip-class">Tooltip Title</b-tooltip>
</div>
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const ProgrammaticallyShowAndHideTooltip: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BTooltip },
    props: Object.keys(argTypes),
    template: `
  <div class="text-center">
    <div>
      <b-button id="tooltip-button-1" variant="primary">I have a tooltip</b-button>
    </div>

    <div class="mt-3">
      <b-button @click="show = !show">Toggle Tooltip</b-button>
    </div>

    <b-tooltip :show.sync="show" target="tooltip-button-1" placement="top">
      Hello <strong>World!</strong>
    </b-tooltip>
  </div>
`,

    data: {
      show: true,
    },
    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const ProgrammaticallyShowAndHideTooltip1: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BTooltip },
    props: Object.keys(argTypes),
    template: `
<div class="text-center">
  <b-button id="tooltip-button-2" variant="primary">Button</b-button>
  <b-tooltip show target="tooltip-button-2">I start open</b-tooltip>
</div>

<!-- b-tooltip-show-open.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const ProgrammaticallyShowAndHideTooltip2: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BTooltip },
    props: Object.keys(argTypes),
    template: `
  <div class="d-flex flex-column text-md-center">
    <div class="p-2">
      <b-button id="tooltip-button-show-event" variant="primary">I have a tooltip</b-button>
    </div>

    <div class="p-2">
      <b-button class="px-1" @click="onOpen">Open</b-button>
      <b-button class="px-1" @click="onClose">Close</b-button>
    </div>

    <b-tooltip ref="tooltip" target="tooltip-button-show-event">
      Hello <strong>World!</strong>
    </b-tooltip>
  </div>
`,

    methods: {
      onOpen() {
        this.$refs.tooltip.$emit('open')
      },
      onClose() {
        this.$refs.tooltip.$emit('close')
      },
    },
    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const ProgrammaticallyDisablingTooltip: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BTooltip },
    props: Object.keys(argTypes),
    template: `
  <div class="d-flex flex-column text-md-center">
    <div class="p-2">
      <b-button id="tooltip-button-disable" variant="primary">I have a tooltip</b-button>
    </div>

    <div class="p-2">
      <b-button @click="disabled = !disabled">
        {{ disabled ? 'Enable' : 'Disable' }} Tooltip by prop
      </b-button>
      <b-button @click="disableByRef">
        {{ disabled ? 'Enable' : 'Disable' }} Tooltip by $ref event
      </b-button>

      <b-tooltip :disabled.sync="disabled" ref="tooltip" target="tooltip-button-disable">
        Hello <strong>World!</strong>
      </b-tooltip>
    </div>
  </div>
`,

    data() {
      return {
        disabled: false,
      }
    },
    methods: {
      disableByRef() {
        if (this.disabled)
          this.$refs.tooltip.$emit('enable')

        else
          this.$refs.tooltip.$emit('disable')
      },
    },
    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const VBTooltipDirectiveUsage: Story = {
  render: (args, { argTypes }) => ({
    components: { BContainer, BRow, BCol, BButton },
    props: Object.keys(argTypes),
    template: `
<b-container fluid>
  <b-row>
    <b-col md="6" class="py-4">
      <b-button v-b-tooltip title="Online!" variant="outline-success">Live chat</b-button>
    </b-col>

    <b-col md="6" class="py-4">
      <b-button
        v-b-tooltip.html
        title="Hello <strong>World!</strong>"
        variant="outline-success"
      >
        Html chat
      </b-button>
    </b-col>
  </b-row>
</b-container>

<!-- b-tooltip-directive.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}
