import type { Meta, StoryObj } from '@storybook/vue3'
import BDropdown from '@/components/BDropdown.vue'
import BDropdownDivider from '@/components/BDropdownDivider.vue'
import BDropdownItem from '@/components/BDropdownItem.vue'
import vitestResults from '@/tests/unit/results.json'
import BButtonGroup from '@/components/BButtonGroup.vue'
import BButton from '@/components/BButton.vue'

const meta = {
  title: 'Components/ButtonGroup',
  component: BButtonGroup,
  parameters: {
    vitest: {
      testFile: 'button-group.spec.ts',
      testResults: vitestResults,
    },
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
    components: { BButtonGroup, BButton, BDropdown, BDropdownDivider, BDropdownItem },
    props: Object.keys(argTypes),
    template: `
    <div>
        <b-button-group>
            <b-button>Button</b-button>
            <b-dropdown dropend text="Menu">
                <b-dropdown-item>Item 1</b-dropdown-item>
                <b-dropdown-item>Item 2</b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item>Item 3</b-dropdown-item>
            </b-dropdown>
            <b-dropdown dropend split text="Split Menu">
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
