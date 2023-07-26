import type { Meta, StoryObj } from '@storybook/vue3'
import vitestResults from '@/tests/unit/results.json'
import BDropdown from '@/components/B/Dropdown.vue'
import BDropdownItem from '@/components/B/DropdownItem.vue'
import BDropdownDivider from '@/components/B/DropdownDivider.vue'
import BDropdownItemButton from '@/components/B/DropdownItemButton.vue'
import BDropdownText from '@/components/B/DropdownText.vue'
import BDropdownForm from '@/components/B/DropdownForm.vue'
import BFormGroup from '@/components/B/FormGroup.vue'
import BFormInput from '@/components/B/FormInput.vue'
import BFormCheckbox from '@/components/B/FormCheckbox.vue'
import BButton from '@/components/B/Button.vue'
import BDropdownGroup from '@/components/B/DropdownGroup.vue'
import BDropdownHeader from '@/components/B/DropdownHeader.vue'

const meta = {
  title: 'Components/Dropdown',
  component: BDropdown,
  parameters: {
    vitest: {
      testFile: 'dropdown.test.tsx',
      testResults: vitestResults,
    },
  },
  argTypes: {

  },
} satisfies Meta<typeof BDropdown>

export default meta
          type Story = StoryObj<typeof meta>

export const Dropdown: Story = {
  render: (args, { argTypes }) => ({
    components: { BDropdown, BDropdownItem, BDropdownDivider },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-dropdown id="dropdown-1" text="Dropdown Button" class="m-md-2">
    <b-dropdown-item>First Action</b-dropdown-item>
    <b-dropdown-item>Second Action</b-dropdown-item>
    <b-dropdown-item>Third Action</b-dropdown-item>
    <b-dropdown-divider></b-dropdown-divider>
    <b-dropdown-item active>Active action</b-dropdown-item>
    <b-dropdown-item disabled>Disabled action</b-dropdown-item>
  </b-dropdown>
</div>

<!-- b-dropdown.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const ButtonContent: Story = {
  render: (args, { argTypes }) => ({
    components: { BDropdown, BDropdownItem },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-dropdown text="Button text via Prop">
    <b-dropdown-item href="#">An item</b-dropdown-item>
    <b-dropdown-item href="#">Another item</b-dropdown-item>
  </b-dropdown>

  <b-dropdown>
    <template #button-content>
      Custom <strong>Content</strong> with <em>HTML</em> via Slot
    </template>
    <b-dropdown-item href="#">An item</b-dropdown-item>
    <b-dropdown-item href="#">Another item</b-dropdown-item>
  </b-dropdown>
</div>

<!-- b-dropdown-button-content.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const MenuAlignment: Story = {
  render: (args, { argTypes }) => ({
    components: { BDropdown, BDropdownItem },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-dropdown id="dropdown-left" text="Left align" variant="primary" class="m-2">
    <b-dropdown-item href="#">Action</b-dropdown-item>
    <b-dropdown-item href="#">Another action</b-dropdown-item>
    <b-dropdown-item href="#">Something else here</b-dropdown-item>
  </b-dropdown>

  <b-dropdown id="dropdown-right" right text="Right align" variant="primary" class="m-2">
    <b-dropdown-item href="#">Action</b-dropdown-item>
    <b-dropdown-item href="#">Another action</b-dropdown-item>
    <b-dropdown-item href="#">Something else here</b-dropdown-item>
  </b-dropdown>
</div>

<!-- b-dropdown-right.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const Dropup: Story = {
  render: (args, { argTypes }) => ({
    components: { BDropdown, BDropdownItem },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-dropdown id="dropdown-dropup" dropup text="Drop-Up" variant="primary" class="m-2">
    <b-dropdown-item href="#">Action</b-dropdown-item>
    <b-dropdown-item href="#">Another action</b-dropdown-item>
    <b-dropdown-item href="#">Something else here</b-dropdown-item>
  </b-dropdown>
</div>

<!-- b-dropdown-dropup.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const DropRightOrLeft: Story = {
  render: (args, { argTypes }) => ({
    components: { BDropdown, BDropdownItem },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-dropdown id="dropdown-dropright" dropright text="Drop-Right" variant="primary" class="m-2">
    <b-dropdown-item href="#">Action</b-dropdown-item>
    <b-dropdown-item href="#">Another action</b-dropdown-item>
    <b-dropdown-item href="#">Something else here</b-dropdown-item>
  </b-dropdown>

  <b-dropdown id="dropdown-dropleft" dropleft text="Drop-Left" variant="primary" class="m-2">
    <b-dropdown-item href="#">Action</b-dropdown-item>
    <b-dropdown-item href="#">Another action</b-dropdown-item>
    <b-dropdown-item href="#">Something else here</b-dropdown-item>
  </b-dropdown>
</div>

<!-- b-dropdown-dropright-dropleft.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const MenuOffset: Story = {
  render: (args, { argTypes }) => ({
    components: { BDropdown, BDropdownItem },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-dropdown id="dropdown-offset" offset="25" text="Offset Dropdown" class="m-2">
    <b-dropdown-item href="#">Action</b-dropdown-item>
    <b-dropdown-item href="#">Another action</b-dropdown-item>
    <b-dropdown-item href="#">Something else here</b-dropdown-item>
  </b-dropdown>
</div>

<!-- b-dropdown-offset.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const SplitButtonSupport: Story = {
  render: (args, { argTypes }) => ({
    components: { BDropdown, BDropdownItem },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-dropdown split text="Split Dropdown" class="m-2">
    <b-dropdown-item href="#">Action</b-dropdown-item>
    <b-dropdown-item href="#">Another action</b-dropdown-item>
    <b-dropdown-item href="#">Something else here...</b-dropdown-item>
  </b-dropdown>
</div>

<!-- b-dropdown-split.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const SplitButtonLinkSupport: Story = {
  render: (args, { argTypes }) => ({
    components: { BDropdown, BDropdownItem },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-dropdown split split-href="#foo/bar" text="Split Link" class="m-2">
    <b-dropdown-item href="#">Action</b-dropdown-item>
    <b-dropdown-item href="#">Another action</b-dropdown-item>
    <b-dropdown-item href="#">Something else here...</b-dropdown-item>
  </b-dropdown>
</div>

<!-- b-dropdown-split-link.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const Sizing: Story = {
  render: (args, { argTypes }) => ({
    components: { BDropdown, BDropdownItemButton },
    props: Object.keys(argTypes),
    template: `
<div>
  <div>
    <b-dropdown size="lg" text="Large" class="m-2">
      <b-dropdown-item-button>Action</b-dropdown-item-button>
      <b-dropdown-item-button>Another action</b-dropdown-item-button>
      <b-dropdown-item-button>Something else here</b-dropdown-item-button>
    </b-dropdown>

    <b-dropdown size="lg" split text="Large Split" class="m-2">
      <b-dropdown-item-button>Action</b-dropdown-item-button>
      <b-dropdown-item-button>Another action</b-dropdown-item-button>
      <b-dropdown-item-button>Something else here...</b-dropdown-item-button>
    </b-dropdown>
  </div>
  <div>
    <b-dropdown size="sm" text="Small" class="m-2">
      <b-dropdown-item-button>Action</b-dropdown-item-button>
      <b-dropdown-item-button>Another action</b-dropdown-item-button>
      <b-dropdown-item-button>Something else here...</b-dropdown-item-button>
    </b-dropdown>

    <b-dropdown size="sm" split text="Small Split" class="m-2">
      <b-dropdown-item-button>Action</b-dropdown-item-button>
      <b-dropdown-item-button>Another action</b-dropdown-item-button>
      <b-dropdown-item-button>Something else here...</b-dropdown-item-button>
    </b-dropdown>
  </div>
</div>

<!-- b-dropdown-sizes.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const DropdownColorVariants: Story = {
  render: (args, { argTypes }) => ({
    components: { BDropdown, BDropdownItem },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-dropdown text="Primary" variant="primary" class="m-2">
    <b-dropdown-item href="#">Action</b-dropdown-item>
    <b-dropdown-item href="#">Another action</b-dropdown-item>
    <b-dropdown-item href="#">Something else here</b-dropdown-item>
  </b-dropdown>

  <b-dropdown text="Success" variant="success" class="m-2">
    <b-dropdown-item href="#">Action</b-dropdown-item>
    <b-dropdown-item href="#">Another action</b-dropdown-item>
    <b-dropdown-item href="#">Something else here</b-dropdown-item>
  </b-dropdown>

  <b-dropdown text="Outline Danger" variant="outline-danger" class="m-2">
    <b-dropdown-item href="#">Action</b-dropdown-item>
    <b-dropdown-item href="#">Another action</b-dropdown-item>
    <b-dropdown-item href="#">Something else here</b-dropdown-item>
  </b-dropdown>
</div>

<!-- b-dropdown-variants.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const SplitButtonColorVariant: Story = {
  render: (args, { argTypes }) => ({
    components: { BDropdown, BDropdownItem },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-dropdown
    split
    split-variant="outline-primary"
    variant="primary"
    text="Split Variant Dropdown"
    class="m-2"
  >
    <b-dropdown-item href="#">Action</b-dropdown-item>
    <b-dropdown-item href="#">Another action</b-dropdown-item>
    <b-dropdown-item href="#">Something else here...</b-dropdown-item>
  </b-dropdown>
</div>

<!-- b-dropdown-split-variant.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const BlockLevelDropdowns: Story = {
  render: (args, { argTypes }) => ({
    components: { BDropdown, BDropdownItem },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-dropdown text="Block Level Dropdown" block variant="primary" class="m-2">
    <b-dropdown-item href="#">Action</b-dropdown-item>
    <b-dropdown-item href="#">Another action</b-dropdown-item>
    <b-dropdown-item href="#">Something else here</b-dropdown-item>
  </b-dropdown>

  <b-dropdown
    text="Block Level Split Dropdown"
    block
    split
    split-variant="outline-primary"
    variant="primary"
    class="m-2"
  >
    <b-dropdown-item href="#">Action</b-dropdown-item>
    <b-dropdown-item href="#">Another action</b-dropdown-item>
    <b-dropdown-item href="#">Something else here...</b-dropdown-item>
  </b-dropdown>
</div>

<!-- b-dropdown-block.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const BlockLevelDropdowns1: Story = {
  render: (args, { argTypes }) => ({
    components: { BDropdown, BDropdownItem },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-dropdown
    text="Block Level Dropdown Menu"
    block
    variant="primary"
    class="m-2"
    menu-class="w-100"
  >
    <b-dropdown-item href="#">Action</b-dropdown-item>
    <b-dropdown-item href="#">Another action</b-dropdown-item>
    <b-dropdown-item href="#">Something else here</b-dropdown-item>
  </b-dropdown>
</div>

<!-- b-dropdown-block-menu.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const HiddenCaret: Story = {
  render: (args, { argTypes }) => ({
    components: { BDropdown, BDropdownItem },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-dropdown size="lg"  variant="link" toggle-class="text-decoration-none" no-caret>
    <template #button-content>
      &#x1f50d;<span class="sr-only">Search</span>
    </template>
    <b-dropdown-item href="#">Action</b-dropdown-item>
    <b-dropdown-item href="#">Another action</b-dropdown-item>
    <b-dropdown-item href="#">Something else here...</b-dropdown-item>
  </b-dropdown>
</div>

<!-- b-dropdown-hidden-caret.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const BDropdownItemButton: Story = {
  render: (args, { argTypes }) => ({
    components: { BDropdown, BDropdownItemButton },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-dropdown id="dropdown-buttons" text="Dropdown using buttons as menu items" class="m-2">
    <b-dropdown-item-button>I'm a button</b-dropdown-item-button>
    <b-dropdown-item-button active>I'm a active button</b-dropdown-item-button>
    <b-dropdown-item-button disabled>I'm a button, but disabled!</b-dropdown-item-button>
    <b-dropdown-item-button>I don't look like a button, but I am!</b-dropdown-item-button>
  </b-dropdown>
</div>

<!-- b-dropdown-item-button.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const BDropdownDivider: Story = {
  render: (args, { argTypes }) => ({
    components: { BDropdown, BDropdownItemButton, BDropdownDivider },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-dropdown id="dropdown-divider" text="Dropdown with divider" class="m-2">
    <b-dropdown-item-button>First item</b-dropdown-item-button>
    <b-dropdown-item-button>Second item</b-dropdown-item-button>
    <b-dropdown-divider></b-dropdown-divider>
    <b-dropdown-item-button>Separated Item</b-dropdown-item-button>
  </b-dropdown>
</div>

<!-- b-dropdown-divider.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const BDropdownText: Story = {
  render: (args, { argTypes }) => ({
    components: { BDropdown, BDropdownText, BDropdownDivider, BDropdownItemButton },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-dropdown id="dropdown-text" text="Dropdown with text" class="m-2">
    <b-dropdown-text style="width: 240px;">
      Some example text that's free-flowing within the dropdown menu.
    </b-dropdown-text>
    <b-dropdown-text>And this is more example text.</b-dropdown-text>
    <b-dropdown-divider></b-dropdown-divider>
    <b-dropdown-item-button>First item</b-dropdown-item-button>
    <b-dropdown-item-button>Second Item</b-dropdown-item-button>
  </b-dropdown>
</div>

<!-- b-dropdown-text.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const BDropdownForm: Story = {
  render: (args, { argTypes }) => ({
    components: { BDropdown, BDropdownForm, BFormGroup, BFormInput, BFormCheckbox, BButton, BDropdownDivider, BDropdownItemButton },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-dropdown id="dropdown-form" text="Dropdown with form" ref="dropdown" class="m-2">
      <b-dropdown-form>
        <b-form-group label="Email" label-for="dropdown-form-email" @submit.stop.prevent>
          <b-form-input
            id="dropdown-form-email"
            size="sm"
            placeholder="email@example.com"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Password" label-for="dropdown-form-password">
          <b-form-input
            id="dropdown-form-password"
            type="password"
            size="sm"
            placeholder="Password"
          ></b-form-input>
        </b-form-group>

        <b-form-checkbox class="mb-3">Remember me</b-form-checkbox>
        <b-button variant="primary" size="sm" @click="onClick">Sign In</b-button>
      </b-dropdown-form>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item-button>New around here? Sign up</b-dropdown-item-button>
      <b-dropdown-item-button>Forgot Password?</b-dropdown-item-button>
    </b-dropdown>
  </div>
`,

    methods: {
      onClick() {
        // Close the menu and (by passing true) return focus to the toggle button
        this.$refs.dropdown.hide(true)
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

export const BDropdownGroup: Story = {
  render: (args, { argTypes }) => ({
    components: { BDropdown, BDropdownItemButton, BDropdownDivider, BDropdownGroup },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-dropdown id="dropdown-grouped" text="Dropdown with group" class="m-2">
    <b-dropdown-item-button>
      Non-grouped Item
    </b-dropdown-item-button>
    <b-dropdown-divider></b-dropdown-divider>
    <b-dropdown-group id="dropdown-group-1" header="Group 1">
      <b-dropdown-item-button>First Grouped item</b-dropdown-item-button>
      <b-dropdown-item-button>Second Grouped Item</b-dropdown-item-button>
    </b-dropdown-group>
    <b-dropdown-group id="dropdown-group-2" header="Group 2">
      <b-dropdown-item-button>First Grouped item</b-dropdown-item-button>
      <b-dropdown-item-button>Second Grouped Item</b-dropdown-item-button>
    </b-dropdown-group>
    <b-dropdown-divider></b-dropdown-divider>
    <b-dropdown-item-button>
      Another Non-grouped Item
    </b-dropdown-item-button>
  </b-dropdown>
</div>

<!-- b-dropdown-group.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const BDropdownHeader: Story = {
  render: (args, { argTypes }) => ({
    components: { BDropdown, BDropdownHeader, BDropdownItemButton },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-dropdown id="dropdown-header" text="Dropdown with header" class="m-2">
    <b-dropdown-header id="dropdown-header-label">
      Dropdown header
    </b-dropdown-header>
    <b-dropdown-item-button aria-describedby="dropdown-header-label">
      First item
    </b-dropdown-item-button>
    <b-dropdown-item-button aria-describedby="dropdown-header-label">
      Second Item
    </b-dropdown-item-button>
  </b-dropdown>
</div>

<!-- b-dropdown-header.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const HeadersAndAccessibility: Story = {
  render: (args, { argTypes }) => ({
    components: { BDropdown, BDropdownHeader, BDropdownItemButton, BDropdownDivider },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-dropdown id="dropdown-aria" text="Dropdown ARIA" variant="primary" class="m-2">
    <b-dropdown-header id="dropdown-header-1">Groups</b-dropdown-header>
    <b-dropdown-item-button aria-describedby="dropdown-header-1">Add</b-dropdown-item-button>
    <b-dropdown-item-button aria-describedby="dropdown-header-1">Delete</b-dropdown-item-button>

    <b-dropdown-header id="dropdown-header-2">Users</b-dropdown-header>
    <b-dropdown-item-button aria-describedby="dropdown-header-2">Add</b-dropdown-item-button>
    <b-dropdown-item-button aria-describedby="dropdown-header-2">Delete</b-dropdown-item-button>

    <b-dropdown-divider></b-dropdown-divider>

    <b-dropdown-item-button>
      Something <strong>not</strong> associated with Users
    </b-dropdown-item-button>

  </b-dropdown>
</div>

<!-- b-dropdown-aria.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}
