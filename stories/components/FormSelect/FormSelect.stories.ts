import type { Meta, StoryObj } from '@storybook/vue3'
import vitestResults from '@/tests/unit/results.json'
import BFormSelect from '@/components/B/FormSelect.vue'
import BFormSelectOption from '@/components/B/FormSelectOption.vue'
import BFormSelectOptionGroup from '@/components/B/FormSelectOptionGroup.vue'

const meta = {
  title: 'Components/FormSelect',
  component: BFormSelect,
  parameters: {
    vitest: {
      testFile: 'form-select.test.tsx',
      testResults: vitestResults,
    },
  },
  argTypes: {

  },
} satisfies Meta<typeof BFormSelect>

export default meta
          type Story = StoryObj<typeof meta>

export const FormSelect: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormSelect },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-select v-model="selected" :options="options"></b-form-select>
    <b-form-select v-model="selected" :options="options" size="sm" class="mt-3"></b-form-select>
    <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
  </div>
`,

    data() {
      return {
        selected: null,
        options: [
          { value: null, text: 'Please select an option' },
          { value: 'a', text: 'This is First option' },
          { value: 'b', text: 'Selected Option' },
          { value: { C: '3PO' }, text: 'This is an option with object value' },
          { value: 'd', text: 'This one is disabled', disabled: true },
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

export const FormSelect1: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormSelect },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-select v-model="selected" :options="options"></b-form-select>
    <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
  </div>
`,

    data() {
      return {
        selected: null,
        options: [
          { value: null, text: 'Please select an option' },
          { value: 'a', text: 'This is First option' },
          { value: 'b', text: 'Selected Option', disabled: true },
          {
            label: 'Grouped options',
            options: [
              { value: { C: '3PO' }, text: 'Option with object value' },
              { value: { R: '2D2' }, text: 'Another option with object value' },
            ],
          },
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

export const FormSelect2: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormSelect, BFormSelectOption, BFormSelectOptionGroup },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-select v-model="selected" class="mb-3">
      <b-form-select-option :value="null">Please select an option</b-form-select-option>
      <b-form-select-option value="a">Option A</b-form-select-option>
      <b-form-select-option value="b" disabled>Option B (disabled)</b-form-select-option>
      <b-form-select-option-group label="Grouped options">
        <b-form-select-option :value="{ C: '3PO' }">Option with object value</b-form-select-option>
        <b-form-select-option :value="{ R: '2D2' }">Another option with object value</b-form-select-option>
      </b-form-select-option-group>
    </b-form-select>

    <div class="mt-2">Selected: <strong>{{ selected }}</strong></div>
  </div>
`,

    data() {
      return {
        selected: null,
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

export const FormSelect3: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormSelect, BFormSelectOption },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-select v-model="selected" :options="options" class="mb-3">
      <!-- This slot appears above the options from 'options' prop -->
      <template #first>
        <b-form-select-option :value="null" disabled>-- Please select an option --</b-form-select-option>
      `,

    data() {
      return {
        selected: null,
        options: [
          { value: 'A', text: 'Option A (from options prop)' },
          { value: 'B', text: 'Option B (from options prop)' },
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

export const ChangingTheOptionFieldNames: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormSelect },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-select
      v-model="selected"
      :options="options"
      class="mb-3"
      value-field="item"
      text-field="name"
      disabled-field="notEnabled"
    ></b-form-select>

    <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
  </div>
`,

    data() {
      return {
        selected: 'A',
        options: [
          { item: 'A', name: 'Option A' },
          { item: 'B', name: 'Option B' },
          { item: 'D', name: 'Option C', notEnabled: true },
          { item: { d: 1 }, name: 'Option D' },
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

export const OptionNotes: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormSelect, BFormSelectOption },
    props: Object.keys(argTypes),
    template: `
<b-form-select v-model="selected" :options="options">
  <template #first>
    <b-form-select-option value="" disabled>-- Please select an option --</b-form-select-option>
  </template>
</b-form-select>
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const ValueInSingleMode: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormSelect },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-select v-model="selected" :options="options"></b-form-select>
    <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
  </div>
`,

    data() {
      return {
        selected: null,
        options: [
          { value: null, text: 'Please select some item' },
          { value: 'a', text: 'This is First option' },
          { value: 'b', text: 'Default Selected Option' },
          { value: 'c', text: 'This is another option' },
          { value: 'd', text: 'This one is disabled', disabled: true },
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

export const SelectSizingDisplayedRows: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormSelect },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-select v-model="selected" :options="options" :select-size="4"></b-form-select>
    <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
  </div>
`,

    data() {
      return {
        selected: null,
        options: [
          { value: null, text: 'Please select some item' },
          { value: 'a', text: 'This is option a' },
          { value: 'b', text: 'Default Selected Option b' },
          { value: 'c', text: 'This is option c' },
          { value: 'd', text: 'This one is disabled', disabled: true },
          { value: 'e', text: 'This is option e' },
          { value: 'e', text: 'This is option f' },
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

export const ValueInMultipleMode: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormSelect },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-select v-model="selected" :options="options" multiple :select-size="4"></b-form-select>
    <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
  </div>
`,

    data() {
      return {
        selected: ['b'], // Array reference
        options: [
          { value: 'a', text: 'This is First option' },
          { value: 'b', text: 'Default Selected Option' },
          { value: 'c', text: 'This is another option' },
          { value: 'd', text: 'This one is disabled', disabled: true },
          { value: 'e', text: 'This is option e' },
          { value: 'f', text: 'This is option f' },
          { value: 'g', text: 'This is option g' },
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
