import type { Meta, StoryObj } from '@storybook/vue3'
import BInputGroup from '@/components/BInputGroup.vue'
import vitestResults from '@/tests/unit/results.json'
import BButtonToolbar from '@/components/BButtonToolbar.vue'
import BButton from '@/components/BButton.vue'
import BButtonGroup from '@/components/BButtonGroup.vue'
import BFormInput from '@/components/BFormInput.vue'
import BDropdown from '@/components/BDropdown.vue'
import BDropdownItem from '@/components/BDropdownItem.vue'

const meta = {
  title: 'Components/ButtonToolbar',
  component: BButtonToolbar,
  parameters: {
    vitest: {
      testFile: 'button-toolbar.spec.ts',
      testResults: vitestResults,
    },
  },
} satisfies Meta<typeof BButtonToolbar>

export default meta
type Story = StoryObj<typeof meta>

export const Example1: Story = {
  render: (args, { argTypes }) => ({
    components: { BButtonToolbar, BButton, BButtonGroup },
    props: Object.keys(argTypes),
    template: `
    <div>
      <b-button-toolbar key-nav aria-label="Toolbar with button groups">
        <b-button-group class="mx-1">
          <b-button>&laquo;</b-button>
          <b-button>&lsaquo;</b-button>
        </b-button-group>
        <b-button-group class="mx-1">
          <b-button>Edit</b-button>
          <b-button>Undo</b-button>
          <b-button>Redo</b-button>
        </b-button-group>
        <b-button-group class="mx-1">
          <b-button>&rsaquo;</b-button>
          <b-button>&raquo;</b-button>
        </b-button-group>
      </b-button-toolbar>
    </div>
    `,
  }),
}

export const Example2: Story = {
  render: (args, { argTypes }) => ({
    components: { BButtonToolbar, BButton, BButtonGroup, BFormInput, BInputGroup },
    props: Object.keys(argTypes),
    template: `
    <div>
      <b-button-toolbar aria-label="Toolbar with button groups and input groups">
        <b-button-group size="sm" class="mr-1">
          <b-button>Save</b-button>
          <b-button>Cancel</b-button>
        </b-button-group>
        <b-input-group size="sm" prepend="$" append=".00">
          <b-form-input value="100" class="text-right"></b-form-input>
        </b-input-group>
      </b-button-toolbar>
    </div>
    `,
  }),
}

export const Example3: Story = {
  render: (args, { argTypes }) => ({
    components: { BButtonToolbar, BButton, BButtonGroup, BDropdown, BDropdownItem },
    props: Object.keys(argTypes),
    template: `
    <div>
      <b-button-toolbar aria-label="Toolbar with button groups and dropdown menu">
        <b-button-group class="mx-1">
          <b-button>New</b-button>
          <b-button>Edit</b-button>
          <b-button>Undo</b-button>
        </b-button-group>
        <b-dropdown  dropend text="menu">
          <b-dropdown-item>Item 1</b-dropdown-item>
          <b-dropdown-item>Item 2</b-dropdown-item>
          <b-dropdown-item>Item 3</b-dropdown-item>
        </b-dropdown>
        <b-button-group class="mx-1">
          <b-button>Save</b-button>
          <b-button>Cancel</b-button>
        </b-button-group>
      </b-button-toolbar>
    </div>
    `,
  }),
}
