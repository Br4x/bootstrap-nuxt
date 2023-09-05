import type { Meta, StoryObj } from '@storybook/vue3'
import vitestResults from '@/tests/unit/results.json'
import BButton from '@/components/BButton.vue'
import BButtonGroup from '@/components/BButtonGroup.vue'
import BCol from '@/components/BCol.vue'
import BRow from '@/components/BRow.vue'

const meta = {
  title: 'Components/Button',
  component: BButton,
  parameters: {
    vitest: {
      testFile: 'button.spec.ts',
      testResults: vitestResults,
    },
  },
} satisfies Meta<typeof BButton>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton },
    props: Object.keys(argTypes),
    template: `
    <div  class="flex gap-2">
        <b-button>Button</b-button>
        <b-button variant="danger">Button</b-button>
        <b-button variant="success">Button</b-button>
        <b-button variant="outline-primary">Button</b-button>
    </div>
    `,
  }),
}

export const ElementTypes: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton },
    props: Object.keys(argTypes),
    template: `
    <div class="flex gap-2">
        <b-button>I am a Button</b-button>
        <b-button href="#">I am a Link</b-button>
    </div>
    `,
  }),
}

export const Sizings: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BCol, BRow },
    props: Object.keys(argTypes),
    template: `
    <b-row>
        <b-col lg="4" class="pb-2"><b-button size="sm">Small Button</b-button></b-col>
        <b-col lg="4" class="pb-2"><b-button>Default Button</b-button></b-col>
        <b-col lg="4" class="pb-2"><b-button size="lg">Large Button</b-button></b-col>
    </b-row>
    `,
  }),
}

export const ColorVariant: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton },
    props: Object.keys(argTypes),
    template: `
    <div  class="flex gap-2">
        <b-button variant="primary">Primary</b-button>
        <b-button variant="secondary">Secondary</b-button>
        <b-button variant="success">Success</b-button>
        <b-button variant="danger">Danger</b-button>
        <b-button variant="warning">Warning</b-button>
        <b-button variant="info">Info</b-button>
        <b-button variant="light">Light</b-button>
        <b-button variant="dark">Dark</b-button>
    </div>
    `,
  }),
}

export const OutlineColorVariant: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton },
    props: Object.keys(argTypes),
    template: `
    <div  class="flex gap-2">
        <b-button variant="outline-primary">Primary</b-button>
        <b-button variant="outline-secondary">Secondary</b-button>
        <b-button variant="outline-success">Success</b-button>
        <b-button variant="outline-danger">Danger</b-button>
        <b-button variant="outline-warning">Warning</b-button>
        <b-button variant="outline-info">Info</b-button>
        <b-button variant="outline-light">Light</b-button>
        <b-button variant="outline-dark">Dark</b-button>
    </div>
    `,
  }),
}

export const LinkVariant: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton },
    props: Object.keys(argTypes),
    template: `
    <div>
        <b-button variant="link">Link</b-button>
    </div>
    `,
  }),
}

export const BlockLevelButtons: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton },
    props: Object.keys(argTypes),
    template: `
    <div>
        <b-button block variant="primary">Block Level Button</b-button>
    </div>
      `,
  }),
}

export const Pill: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton },
    props: Object.keys(argTypes),
    template: `
    <div class="flex gap-2">
        <b-button pill>Button</b-button>
        <b-button pill variant="primary">Button</b-button>
        <b-button pill variant="outline-secondary">Button</b-button>
        <b-button pill variant="success">Button</b-button>
        <b-button pill variant="outline-danger">Button</b-button>
        <b-button pill variant="info">Button</b-button>
    </div>
        `,
  }),
}

export const Squared: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton },
    props: Object.keys(argTypes),
    template: `
    <div class="flex gap-2">
  <b-button squared>Button</b-button>
  <b-button squared variant="primary">Button</b-button>
  <b-button squared variant="outline-secondary">Button</b-button>
  <b-button squared variant="success">Button</b-button>
  <b-button squared variant="outline-danger">Button</b-button>
  <b-button squared variant="info">Button</b-button>
</div>
          `,
  }),
}

export const Disabled: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton },
    props: Object.keys(argTypes),
    template: `
    <div class="flex gap-2">
        <b-button disabled size="lg" variant="primary">Disabled</b-button>
        <b-button disabled size="lg">Also Disabled</b-button>
    </div>
            `,
  }),
}

export const PressedStateAndToggling: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BButtonGroup },
    props: Object.keys(argTypes),
    template: `
    <div>
        <h5 class="font-semibold text-lg">Pressed and un-pressed state</h5>
        <b-button :pressed="true" variant="success">Always Pressed</b-button>
        <b-button :pressed="false" variant="success">Not Pressed</b-button>

        <h5 class="font-semibold text-lg mt-3">Toggleable Button</h5>
        <b-button :pressed.sync="myToggle" variant="primary">Toggle Me</b-button>
        <p>Pressed State: <strong>{{ myToggle }}</strong></p>

        <h5  class="font-semibold text-lg mt-3">In a button group</h5>
        <b-button-group size="sm">
          <b-button
              v-for="(btn, idx) in buttons"
              :key="idx"
              :pressed="btn.state"
              variant="primary"
              @click="btn.state = !btn.state"
          >
              {{ btn.caption }}
          </b-button>
        </b-button-group>
        <p>Pressed States: <strong>{{ btnStates }}</strong></p>
    </div>
    `,
    data() {
      return {
        myToggle: false,
        buttons: [
          { caption: 'Toggle 1', state: true },
          { caption: 'Toggle 2', state: false },
          { caption: 'Toggle 3', state: true },
          { caption: 'Toggle 4', state: false },
        ],
      }
    },
    computed: {
      btnStates() {
        return this.buttons.map((btn: { state: boolean }) => btn.state)
      },
    },
  }),
}
