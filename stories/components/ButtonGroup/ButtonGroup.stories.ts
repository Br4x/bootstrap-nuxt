import type { Meta, StoryObj } from '@storybook/vue3'
import vitestResults from '@/tests/unit/results.json'
import BButtonGroup from '@/components/B/ButtonGroup.vue'
import BButton from '@/components/B/Button.vue'

const meta = {
  title: 'Components/ButtonGroup',
  component: BButtonGroup,
  parameters: {
    vitest: {
      testFile: 'button-group.test.tsx',
      testResults: vitestResults,
    },
  },
  argTypes: {
    ariaRole: {
      control: {
        type: 'text',
      },
    },
    size: {
      control: {
        type: 'text',
      },
    },
    tag: {
      control: {
        type: 'text',
      },
    },
    vertical: { action: { type: 'boolean' } },
  },
} satisfies Meta<typeof BButtonGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
  render: (args, { argTypes }) => ({
    components: { BButtonGroup, BButton },
    props: Object.keys(argTypes),
    template: `
    <div>
    <div>
        <b-button-group>
        <b-button>Button 1</b-button>
        <b-button>Button 2</b-button>
        <b-button>Button 3</b-button>
        </b-button-group>
    </div>
    <div class="mt-3">
        <b-button-group>
        <b-button variant="success">Success</b-button>
        <b-button variant="info">Info</b-button>
        <b-button variant="warning">Warning</b-button>
        </b-button-group>
    </div>
    </div>
    `,
  }),
}

export const Sizing: Story = {
  render: (args, { argTypes }) => ({
    components: { BButtonGroup, BButton },
    props: Object.keys(argTypes),
    template: `
    <div>
        <div>
            <b-button-group>
            <b-button>Button 1</b-button>
            <b-button>Button 2</b-button>
            <b-button>Button 3</b-button>
            </b-button-group>
        </div>
        <div class="mt-3">
            <b-button-group size="sm">
            <b-button>Left</b-button>
            <b-button>Middle</b-button>
            <b-button>Right</b-button>
            </b-button-group>
        </div>
        <div class="mt-3">
            <b-button-group size="lg">
            <b-button>Left</b-button>
            <b-button>Middle</b-button>
            <b-button>Right</b-button>
            </b-button-group>
        </div>
    </div>
    `,
  }),
}

export const VerticalVariation: Story = {
  render: (args, { argTypes }) => ({
    components: { BButtonGroup, BButton },
    props: Object.keys(argTypes),
    template: `
    <div>
        <b-button-group vertical>
            <b-button>Top</b-button>
            <b-button>Middle</b-button>
            <b-button>Bottom</b-button>
        </b-button-group>
    </div>
    `,
  }),
}

export const DropdownSupport: Story = {
  render: (args, { argTypes }) => ({
    components: { BButtonGroup, BButton },
    props: Object.keys(argTypes),
    template: `
    <div>
        <b-button-group>
            <b-button>Button</b-button>
            <b-dropdown right text="Menu">
                <b-dropdown-item>Item 1</b-dropdown-item>
                <b-dropdown-item>Item 2</b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item>Item 3</b-dropdown-item>
            </b-dropdown>
            <b-dropdown right split text="Split Menu">
                <b-dropdown-item>Item 1</b-dropdown-item>
                <b-dropdown-item>Item 2</b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item>Item 3</b-dropdown-item>
            </b-dropdown>
        </b-button-group>
    </div>
    `,
  }),
}
