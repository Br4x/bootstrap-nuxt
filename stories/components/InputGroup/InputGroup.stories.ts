import type { Meta, StoryObj } from '@storybook/vue3'
import vitestResults from '@/tests/unit/results.json'
import BInputGroup from '@/components/B/InputGroup.vue'
import BFormInput from '@/components/B/FormInput.vue'
import BInputGroupText from '@/components/B/InputGroupText.vue'
import BInputGroupAppend from '@/components/B/InputGroupAppend.vue'
import BButton from '@/components/B/Button.vue'
import BDropdown from '@/components/B/Dropdown.vue'
import BDropdownItem from '@/components/B/DropdownItem.vue'
import BInputGroupPrepend from '@/components/B/InputGroupPrepend.vue'
import BIcon from '@/components/B/Icon.vue'
import BFormCheckbox from '@/components/B/FormCheckbox.vue'
import BFormRadio from '@/components/B/FormRadio.vue'

const meta = {
  title: 'Components/InputGroup',
  component: BInputGroup,
  parameters: {
    vitest: {
      testFile: 'input-group.test.tsx',
      testResults: vitestResults,
    },
  },
  argTypes: {

  },
} satisfies Meta<typeof BInputGroup>

export default meta
          type Story = StoryObj<typeof meta>

export const InputGroup: Story = {
  render: (args, { argTypes }) => ({
    components: { BInputGroup, BFormInput, BInputGroupText, BInputGroupAppend, BButton },
    props: Object.keys(argTypes),
    template: `
<div>
  <!-- Using props -->
  <b-input-group size="lg" prepend="$" append=".00">
    <b-form-input></b-form-input>
  </b-input-group>

  <!-- Using slots -->
  <b-input-group class="mt-3">
    <template #append>
      <b-input-group-text><strong class="text-danger">!</strong></b-input-group-text>
    </template>
    <b-form-input></b-form-input>
  </b-input-group>

  <!-- Using components -->
  <b-input-group prepend="Username" class="mt-3">
    <b-form-input></b-form-input>
    <b-input-group-append>
      <b-button variant="outline-success">Button</b-button>
      <b-button variant="info">Button</b-button>
    </b-input-group-append>
  </b-input-group>
</div>

<!-- b-input-group.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const UsingPrependAndAppendProps: Story = {
  render: (args, { argTypes }) => ({
    components: { BInputGroup, BFormInput },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-input-group prepend="$" append=".00">
    <b-form-input></b-form-input>
  </b-input-group>

  <b-input-group prepend="0" append="100" class="mt-3">
    <b-form-input type="range" min="0" max="100"></b-form-input>
  </b-input-group>
</div>

<!-- b-input-group-using-props.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const UsingNamedSlots: Story = {
  render: (args, { argTypes }) => ({
    components: { BInputGroup, BInputGroupText, BFormInput, BDropdown, BDropdownItem },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-input-group>
    <template #prepend>
      <b-input-group-text >Username</b-input-group-text>
    </template>
    <b-form-input></b-form-input>

    <template #append>
      <b-dropdown text="Dropdown" variant="success">
        <b-dropdown-item>Action A</b-dropdown-item>
        <b-dropdown-item>Action B</b-dropdown-item>
      </b-dropdown>
    </template>
  </b-input-group>
</div>

<!-- b-input-group-using-slots.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const UsingSubComponents: Story = {
  render: (args, { argTypes }) => ({
    components: { BInputGroup, BInputGroupPrepend, BButton, BFormInput, BInputGroupAppend, BInputGroupText, BIcon },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-input-group>
    <b-input-group-prepend>
      <b-button variant="outline-info">Button</b-button>
    </b-input-group-prepend>

    <b-form-input type="number" min="0.00"></b-form-input>

    <b-input-group-append>
      <b-button variant="outline-secondary">Button</b-button>
      <b-button variant="outline-primary">Button</b-button>
      <b-input-group-text>
        <b-icon icon="x" />
      </b-input-group-text>
    </b-input-group-append>
  </b-input-group>
</div>

<!-- b-input-group-addons-placement.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const NativeCheckboxAndRadioAddons: Story = {
  render: (args, { argTypes }) => ({
    components: { BInputGroup, BInputGroupPrepend, BFormInput },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-input-group class="mb-2">
    <b-input-group-prepend is-text>
      <input type="checkbox" aria-label="Checkbox for following text input">
    </b-input-group-prepend>
    <b-form-input aria-label="Text input with checkbox"></b-form-input>
  </b-input-group>

  <b-input-group>
    <b-input-group-prepend is-text>
      <input type="radio" aria-label="Radio for following text input">
    </b-input-group-prepend>
    <b-form-input aria-label="Text input with radio input"></b-form-input>
  </b-input-group>
</div>

<!-- b-input-group-checks-radios.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const CustomRadioCheckboxAndSwitchAddons: Story = {
  render: (args, { argTypes }) => ({
    components: { BInputGroup, BInputGroupPrepend, BFormCheckbox, BFormInput, BFormRadio },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-input-group class="mb-2">
    <b-input-group-prepend is-text>
      <b-form-checkbox class="mr-n2">
        <span class="sr-only">Checkbox for following text input</span>
      </b-form-checkbox>
    </b-input-group-prepend>
    <b-form-input aria-label="Text input with checkbox"></b-form-input>
  </b-input-group>

  <b-input-group class="mb-2">
    <b-input-group-prepend is-text>
      <b-form-radio class="mr-n2">
        <span class="sr-only">Radio for following text input</span>
      </b-form-radio>
    </b-input-group-prepend>
    <b-form-input aria-label="Text input with radio input"></b-form-input>
  </b-input-group>

  <b-input-group>
    <b-input-group-prepend is-text>
      <b-form-checkbox switch class="mr-n2">
        <span class="sr-only">Switch for following text input</span>
      </b-form-checkbox>
    </b-input-group-prepend>
    <b-form-input aria-label="Text input with switch"></b-form-input>
  </b-input-group>
</div>

<!-- b-input-group-custom-checks-radios.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const MultipleInputs: Story = {
  render: (args, { argTypes }) => ({
    components: { BInputGroup, BFormInput },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-input-group prepend="First and last name" class="mb-2">
    <b-form-input aria-label="First name"></b-form-input>
    <b-form-input aria-label="Last name"></b-form-input>
  </b-input-group>
</div>

<!-- input-group-multiple-inputs.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const MultipleAddons: Story = {
  render: (args, { argTypes }) => ({
    components: { BInputGroup, BInputGroupPrepend, BFormInput },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-input-group prepend="Item">
    <b-input-group-prepend is-text>
      <input type="checkbox" aria-label="Checkbox for following text input">
    </b-input-group-prepend>
    <b-input-group-prepend is-text><b>$</b></b-input-group-prepend>
    <b-form-input type="number" aria-label="Text input with checkbox"></b-form-input>
  </b-input-group>
</div>

<!-- b-input-group-multiple-addons.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const DropdownAddons: Story = {
  render: (args, { argTypes }) => ({
    components: { BInputGroup, BDropdown, BDropdownItem, BFormInput },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-input-group>
    <template #prepend>
      <b-dropdown text="Dropdown" variant="info">
        <b-dropdown-item>Action A</b-dropdown-item>
        <b-dropdown-item>Action B</b-dropdown-item>
      </b-dropdown>
    </template>

    <b-form-input></b-form-input>

    <template #append>
      <b-dropdown text="Dropdown" variant="outline-secondary" v-for="i in 2" :key="i">
        <b-dropdown-item>Action C</b-dropdown-item>
        <b-dropdown-item>Action D</b-dropdown-item>
      </b-dropdown>
    </template>
  </b-input-group>
</div>

<!-- b-input-group-dropdown.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const ControlSizing: Story = {
  render: (args, { argTypes }) => ({
    components: { BInputGroup, BFormInput, BInputGroupAppend, BButton },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-input-group
    v-for="size in ['sm','','lg']"
    :key="size"
    :size="size"
    class="mb-3"
    prepend="Label"
  >
    <b-form-input></b-form-input>
    <b-input-group-append>
      <b-button size="sm" text="Button" variant="success">Button</b-button>
    </b-input-group-append>
  </b-input-group>
</div>

<!-- b-input-group-size.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const SizingCustomRadioCheckboxAndSwitchAddons: Story = {
  render: (args, { argTypes }) => ({
    components: { BInputGroup, BFormInput, BInputGroupAppend, BFormCheckbox },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-input-group size="sm" prepend="Small" class="mb-2">
    <b-form-input aria-label="Small text input with custom switch"></b-form-input>
    <b-input-group-append is-text>
      <b-form-checkbox switch class="mr-n2 mb-n1">
        <span class="sr-only">Checkbox for previous text input</span>
      </b-form-checkbox>
    </b-input-group-append>
  </b-input-group>

  <b-input-group size="lg" prepend="Large" class="mb-2">
    <b-form-input aria-label="Large text input with switch"></b-form-input>
    <b-input-group-append is-text>
      <b-form-checkbox switch class="mr-n2">
        <span class="sr-only">Switch for previous text input</span>
      </b-form-checkbox>
    </b-input-group-append>
  </b-input-group>
</div>

<!-- b-input-group-custom-checks-radios-sizing.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}
