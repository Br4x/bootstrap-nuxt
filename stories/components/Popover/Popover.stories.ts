import type { Meta, StoryObj } from '@storybook/vue3'
import vitestResults from '@/tests/unit/results.json'
import BButton from '@/components/B/Button.vue'
import BPopover from '@/components/B/Popover.vue'
import BContainer from '@/components/B/Container.vue'
import BRow from '@/components/B/Row.vue'
import BCol from '@/components/B/Col.vue'
import BCard from '@/components/B/Card.vue'
import BFormGroup from '@/components/B/FormGroup.vue'
import BFormInput from '@/components/B/FormInput.vue'
import BFormSelect from '@/components/B/FormSelect.vue'
import BAlert from '@/components/B/Alert.vue'

const meta = {
  title: 'Components/Popover',
  component: BPopover,
  parameters: {
    vitest: {
      testFile: 'popover.test.tsx',
      testResults: vitestResults,
    },
  },
  argTypes: {

  },
} satisfies Meta<typeof BPopover>

export default meta
          type Story = StoryObj<typeof meta>

export const Popover: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BPopover },
    props: Object.keys(argTypes),
    template: `
<div class="text-center my-3">
  <b-button v-b-popover.hover.top="'I am popover directive content!'" title="Popover Title">
    Hover Me
  </b-button>

  <b-button id="popover-target-1">
    Hover Me
  </b-button>
  <b-popover target="popover-target-1" triggers="hover" placement="top">
    <template #title>Popover Title</template>
    I am popover <b>component</b> content!
  </b-popover>
</div>

<!-- b-popover.vue -->
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
    components: { BButton, BPopover },
    props: Object.keys(argTypes),
    template: `
<b-button
  href="#"
  tabindex="0"
  v-b-popover.focus="'Popover content'"
  title="Popover title"
>
  Link button with popover directive
</b-button>

<b-button id="link-button" href="#" tabindex="0">
  Link button with popover component
</b-button>
<b-popover target="link-button" title="Popover title" triggers="focus">
  Popover content
</b-popover>
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const BPopoverComponentBasicUsage: Story = {
  render: (args, { argTypes }) => ({
    components: { BContainer, BRow, BCol, BButton, BPopover },
    props: Object.keys(argTypes),
    template: `
  <b-container fluid>
    <h5 class="my-3">Placement</h5>
    <b-row>
      <b-col
        v-for="placement in placements"
        :key="placement"
        md="4"
        class="py-4 text-center"
      >
        <b-button :id="\`popover-1-${placement}\`" variant="primary">{{ placement }}</b-button>
        <b-popover
          :target="\`popover-1-${placement}\`"
          :placement="placement"
          title="Popover!"
          triggers="hover focus"
          :content="\`Placement ${placement}\`"
        ></b-popover>
      </b-col>
    </b-row>

    <h5 class="my-3">Content via properties or slots</h5>
    <b-row>
      <b-col md="6" class="py-4 text-center">
        <b-button id="popover-2" variant="primary">Using properties</b-button>
        <b-popover
          target="popover-2"
          title="Prop Examples"
          triggers="hover focus"
          content="Embedding content using properties is easy"
        ></b-popover>
      </b-col>

      <b-col md="6" class="py-4 text-center">
        <b-button id="popover-3" variant="primary">Using slots</b-button>
        <b-popover target="popover-3" triggers="hover focus">
          <template #title>Content via Slots`,

    data() {
      return {
        placements: [
          'topright',
          'top',
          'topleft',
          'bottomright',
          'bottom',
          'bottomleft',
          'righttop',
          'right',
          'lefttop',
          'rightbottom',
          'left',
          'leftbottom',
        ],
      }
    },
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
    components: { BButton, BPopover },
    props: Object.keys(argTypes),
    template: `
<div class="text-center">
  <b-button id="popover-button-variant" href="#" tabindex="0">Button</b-button>
  <b-popover target="popover-button-variant" variant="danger" triggers="focus">
    <template #title>Danger!</template>
    Danger variant popover
  </b-popover>
</div>

<!-- b-popover-variant.vue -->
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
    components: { BButton, BPopover },
    props: Object.keys(argTypes),
    template: `
<div class="text-center">
  <b-button id="my-button">Button</b-button>
  <b-popover target="my-button" custom-class="my-popover-class">
    <template #title>Popover Title</template>
    Popover content
  </b-popover>
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

export const ProgrammaticallyShowAndHidePopover: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BPopover },
    props: Object.keys(argTypes),
    template: `
  <div class="d-flex flex-column text-md-center">
    <div class="p-2">
      <b-button id="popover-button-sync" variant="primary">I have a popover</b-button>
    </div>

    <div class="p-2">
      <b-button class="px-1" @click="show = !show">Toggle Popover</b-button>

      <b-popover :show.sync="show" target="popover-button-sync" title="Popover">
        Hello <strong>World!</strong>
      </b-popover>
    </div>
  </div>
`,

    data() {
      return {
        show: false,
      }
    },
    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const ProgrammaticallyShowAndHidePopover1: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BPopover },
    props: Object.keys(argTypes),
    template: `
  <div class="d-flex flex-column text-md-center">
    <div class="p-2">
      <b-button id="popover-button-event" variant="primary">I have a popover</b-button>
    </div>

    <div class="p-2">
      <b-button class="px-1" @click="onOpen">Open</b-button>
      <b-button class="px-1" @click="onClose">Close</b-button>
    </div>

    <b-popover ref="popover" target="popover-button-event" title="Popover">
      Hello <strong>World!</strong>
    </b-popover>
  </div>
`,

    methods: {
      onOpen() {
        this.$refs.popover.$emit('open')
      },
      onClose() {
        this.$refs.popover.$emit('close')
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

export const ProgrammaticallyShowAndHidePopover2: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BPopover },
    props: Object.keys(argTypes),
    template: `
<div class="text-center">
  <b-button id="popover-button-open" variant="primary">Button</b-button>

  <b-popover show target="popover-button-open" title="Popover">
    I start <strong>open</strong>
  </b-popover>
</div>

<!-- b-popover-show-open.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const ProgrammaticallyShowAndHidePopover3: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BPopover },
    props: Object.keys(argTypes),
    template: `
  <div class="d-flex flex-column text-md-center">
    <div class="p-2">
      <b-button id="popover-manual-1" variant="primary" ref="button">Unreliable</b-button>

      <b-popover target="popover-manual-1" :show.sync="pop1" triggers="click">
        I can be stubborn sometimes.
      </b-popover>
    </div>

    <div class="p-2">
      <b-button id="popover-manual-2" variant="primary" ref="button" @click="pop2 = !pop2">
        Comfortably Numb
      </b-button>

      <b-popover target="popover-manual-2" :show.sync="pop2" triggers="">
        I do believe it's working, good.
      </b-popover>
    </div>

    <div class="p-2">
      <b-button class="px-1" @click="popOpen">Open</b-button>
      <b-button class="px-1" @click="popClose">Close</b-button>
      <b-button class="px-1" @click="popToggle">Toggle</b-button>
    </div>
  </div>
`,

    data() {
      return {
        pop1: false,
        pop2: false,
      }
    },
    methods: {
      popOpen() {
        this.pop1 = this.pop2 = true
      },
      popClose() {
        this.pop1 = this.pop2 = false
      },
      popToggle() {
        this.pop1 = !this.pop1
        this.pop2 = !this.pop2
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

export const ProgrammaticallyDisablingPopover: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BPopover },
    props: Object.keys(argTypes),
    template: `
  <div class="d-flex flex-column text-md-center">
    <div class="p-2">
      <b-button id="popover-button-disable" variant="primary">I have a popover</b-button>
    </div>

    <div class="p-2">
      <b-button @click="disabled = !disabled">
        {{ disabled ? 'Enable' : 'Disable' }} Popover by prop
      </b-button>
      <b-button @click="disableByRef">
        {{ disabled ? 'Enable' : 'Disable' }} Popover by $ref event
      </b-button>

      <b-popover
        :disabled.sync="disabled"
        target="popover-button-disable"
        title="Popover"
        ref="popover"
      >
        Hello <strong>World!</strong>
      </b-popover>
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
          this.$refs.popover.$emit('enable')

        else
          this.$refs.popover.$emit('disable')
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

export const ProgrammaticallyDisablingPopover1: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BPopover },
    props: Object.keys(argTypes),
    template: `
  <div class="d-flex flex-column text-md-center">
    <div class="p-2">
      <b-button id="popover-button-disable-event" variant="primary">I have a popover</b-button>
    </div>

    <div class="p-2">
      <b-button class="px-1" @click="onEnable">Enable</b-button>
      <b-button class="px-1" @click="onDisable">Disable</b-button>
    </div>

    <b-popover ref="popover" target="popover-button-disable-event" title="Popover">
      Hello <strong>World!</strong>
    </b-popover>
  </div>
`,

    methods: {
      onEnable() {
        this.$refs.popover.$emit('enable')
      },
      onDisable() {
        this.$refs.popover.$emit('disable')
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

export const VBPopoverDirectiveUsage: Story = {
  render: (args, { argTypes }) => ({
    components: { BContainer, BRow, BCol, BButton },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-container fluid>
    <b-row class="text-center">
      <b-col md="3" class="py-3">
        <b-button v-b-popover.hover.top="'Popover!'" title="Title" variant="primary">Top</b-button>
      </b-col>

      <b-col md="3" class="py-3">
        <b-button v-b-popover.hover.right="'Popover!'" title="Title" variant="primary">Right</b-button>
      </b-col>

      <b-col md="3" class="py-3">
        <b-button v-b-popover.hover.left="'Popover!'" title="Title" variant="primary">Left</b-button>
      </b-col>

      <b-col md="3" class="py-3">
        <b-button v-b-popover.hover.bottom="'Popover!'" title="Title" variant="primary">Bottom</b-button>
      </b-col>
    </b-row>
  </b-container>
</div>

<!-- b-popover-directive-placement.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const AdvancedBPopoverUsageWithReactiveContent: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BCard, BPopover, BFormGroup, BFormInput, BFormSelect, BAlert },
    props: Object.keys(argTypes),
    template: `
  <div id="my-container">
    <div class="my-3">
      <!-- Our triggering (target) element -->
      <b-button id="popover-reactive-1" variant="primary" ref="button">
        Reactive Content Using Slots
      </b-button>
    </div>

    <!-- Output from the popover interaction -->
    <b-card title="Returned values:" v-if="input1Return && input2Return">
      <p class="card-text" style="max-width: 20rem;">
        Name: <strong>{{ input1Return }}</strong><br>
        Color: <strong>{{ input2Return }}</strong>
      </p>
    </b-card>

    <!-- Our popover title and content render container -->
    <!-- We use placement 'auto' so popover fits in the best spot on viewport -->
    <!-- We specify the same container as the trigger button, so that popover is close to button -->
    <b-popover
      target="popover-reactive-1"
      triggers="click"
      :show.sync="popoverShow"
      placement="auto"
      container="my-container"
      ref="popover"
      @show="onShow"
      @shown="onShown"
      @hidden="onHidden"
    >
      <template #title>
        <b-button @click="onClose" class="close" aria-label="Close">
          <span class="d-inline-block" aria-hidden="true">&times;</span>
        </b-button>
        Interactive Content
      `,

    data() {
      return {
        input1: '',
        input1state: null,
        input2: '',
        input2state: null,
        options: [{ text: '- Choose 1 -', value: '' }, 'Red', 'Green', 'Blue'],
        input1Return: '',
        input2Return: '',
        popoverShow: false,
      }
    },
    watch: {
      input1(val) {
        if (val)
          this.input1state = true
      },
      input2(val) {
        if (val)
          this.input2state = true
      },
    },
    methods: {
      onClose() {
        this.popoverShow = false
      },
      onOk() {
        if (!this.input1)
          this.input1state = false

        if (!this.input2)
          this.input2state = false

        if (this.input1 && this.input2) {
          this.onClose()
          // Return our popover form results
          this.input1Return = this.input1
          this.input2Return = this.input2
        }
      },
      onShow() {
        // This is called just before the popover is shown
        // Reset our popover form variables
        this.input1 = ''
        this.input2 = ''
        this.input1state = null
        this.input2state = null
        this.input1Return = ''
        this.input2Return = ''
      },
      onShown() {
        // Called just after the popover has been shown
        // Transfer focus to the first input
        this.focusRef(this.$refs.input1)
      },
      onHidden() {
        // Called just after the popover has finished hiding
        // Bring focus back to the button
        this.focusRef(this.$refs.button)
      },
      focusRef(ref) {
        // Some references may be a component, functional component, or plain element
        // This handles that check before focusing, assuming a `focus()` method exists
        // We do this in a double `$nextTick()` to ensure components have
        // updated & popover positioned first
        this.$nextTick(() => {
          this.$nextTick(() => {
            (ref.$el || ref).focus()
          })
        })
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
