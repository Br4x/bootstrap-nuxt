import type { Meta, StoryObj } from '@storybook/vue3'
import vitestResults from '@/tests/unit/results.json'
import BFormGroup from '@/components/B/FormGroup.vue'
import BFormRadio from '@/components/B/FormRadio.vue'
import BFormRadioGroup from '@/components/B/FormRadioGroup.vue'
import BFormInvalidFeedback from '@/components/B/FormInvalidFeedback.vue'
import BFormValidFeedback from '@/components/B/FormValidFeedback.vue'

const meta = {
  title: 'Components/FormRadio',
  component: BFormRadio,
  parameters: {
    vitest: {
      testFile: 'form-radio.test.tsx',
      testResults: vitestResults,
    },
  },
  argTypes: {

  },
} satisfies Meta<typeof BFormRadio>

export default meta
          type Story = StoryObj<typeof meta>

export const IndividualRadios: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormGroup, BFormRadio },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-group label="Individual radios" v-slot="{ ariaDescribedby }">
      <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="A">Option A</b-form-radio>
      <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="B">Option B</b-form-radio>
    </b-form-group>

    <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
  </div>
`,

    data() {
      return {
        selected: '',
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

export const GroupedRadios: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormGroup, BFormRadioGroup, BFormRadio },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-group label="Radios using options" v-slot="{ ariaDescribedby }">
      <b-form-radio-group
        id="radio-group-1"
        v-model="selected"
        :options="options"
        :aria-describedby="ariaDescribedby"
        name="radio-options"
      ></b-form-radio-group>
    </b-form-group>

    <b-form-group label="Radios using sub-components" v-slot="{ ariaDescribedby }">
      <b-form-radio-group
        id="radio-group-2"
        v-model="selected"
        :aria-describedby="ariaDescribedby"
        name="radio-sub-component"
      >
        <b-form-radio value="first">Toggle this custom radio</b-form-radio>
        <b-form-radio value="second">Or toggle this other custom radio</b-form-radio>
        <b-form-radio value="third" disabled>This one is Disabled</b-form-radio>
        <b-form-radio :value="{ fourth: 4 }">This is the 4th radio</b-form-radio>
      </b-form-radio-group>
    </b-form-group>

    <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
  </div>
`,

    data() {
      return {
        selected: 'first',
        options: [
          { text: 'Toggle this custom radio', value: 'first' },
          { text: 'Or toggle this other custom radio', value: 'second' },
          { text: 'This one is Disabled', value: 'third', disabled: true },
          { text: 'This is the 4th radio', value: { fourth: 4 } },
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

export const GroupedRadios1: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormGroup, BFormRadioGroup, BFormRadio },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-group label="Radios using options and slots" v-slot="{ ariaDescribedby }">
      <b-form-radio-group
        id="radio-slots"
        v-model="selected"
        :options="options"
        :aria-describedby="ariaDescribedby"
        name="radio-options-slots"
      >
        <!-- Radios in this slot will appear first -->
        <template #first>
          <b-form-radio value="first">Toggle this custom radio from slot first</b-form-radio>
        `,

    data() {
      return {
        selected: '',
        options: [
          { text: 'Or toggle this other custom radio', value: 'second' },
          { text: 'Third radio', value: 'third' },
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
    components: { BFormRadioGroup },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-radio-group
      v-model="selected"
      :options="options"
      class="mb-3"
      value-field="item"
      text-field="name"
      disabled-field="notEnabled"
    ></b-form-radio-group>
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

export const InlineOrStackedRadios: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormGroup, BFormRadioGroup },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-group label="Inline radios (default)" v-slot="{ ariaDescribedby }">
      <b-form-radio-group
        v-model="selected"
        :options="options"
        :aria-describedby="ariaDescribedby"
        name="radio-inline"
      ></b-form-radio-group>
    </b-form-group>

    <b-form-group label="Stacked radios" v-slot="{ ariaDescribedby }">
      <b-form-radio-group
        v-model="selected"
        :options="options"
        :aria-describedby="ariaDescribedby"
        name="radios-stacked"
        stacked
      ></b-form-radio-group>
    </b-form-group>

    <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
  </div>
`,

    data() {
      return {
        selected: 'first',
        options: [
          { text: 'First radio', value: 'first' },
          { text: 'Second radio', value: 'second' },
          { text: 'Third radio', value: 'third' },
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

export const ControlSizing: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormRadio },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-form-radio name="radio-size" size="sm">Small</b-form-radio>
  <b-form-radio name="radio-size">Default</b-form-radio>
  <b-form-radio name="radio-size" size="lg">Large</b-form-radio>
</div>

<!-- form-radio-sizes.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const ButtonStyleRadios: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormGroup, BFormRadioGroup },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-group label="Button style radios" v-slot="{ ariaDescribedby }">
      <b-form-radio-group
        id="btn-radios-1"
        v-model="selected"
        :options="options"
        :aria-describedby="ariaDescribedby"
        name="radios-btn-default"
        buttons
      ></b-form-radio-group>
    </b-form-group>

    <b-form-group
      label="Button style radios with outline-primary variant and size lg"
      v-slot="{ ariaDescribedby }"
    >
      <b-form-radio-group
        id="btn-radios-2"
        v-model="selected"
        :options="options"
        :aria-describedby="ariaDescribedby"
        button-variant="outline-primary"
        size="lg"
        name="radio-btn-outline"
        buttons
      ></b-form-radio-group>
    </b-form-group>

    <b-form-group label="Stacked button style radios" v-slot="{ ariaDescribedby }">
      <b-form-radio-group
        id="btn-radios-3"
        v-model="selected"
        :options="options"
        :aria-describedby="ariaDescribedby"
        name="radio-btn-stacked"
        buttons
        stacked
      ></b-form-radio-group>
    </b-form-group>
  </div>
`,

    data() {
      return {
        selected: 'radio1',
        options: [
          { text: 'Radio 1', value: 'radio1' },
          { text: 'Radio 3', value: 'radio2' },
          { text: 'Radio 3 (disabled)', value: 'radio3', disabled: true },
          { text: 'Radio 4', value: 'radio4' },
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

export const NonCustomStyleRadioInputsPlain: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormGroup, BFormRadioGroup },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-group label="Plain inline radios" v-slot="{ ariaDescribedby }">
      <b-form-radio-group
        v-model="selected"
        :options="options"
        :aria-describedby="ariaDescribedby"
        name="plain-inline"
        plain
      ></b-form-radio-group>
    </b-form-group>

    <b-form-group label="Plain stacked radios" v-slot="{ ariaDescribedby }">
      <b-form-radio-group
        v-model="selected"
        :options="options"
        :aria-describedby="ariaDescribedby"
        name="plain-stacked"
        plain
        stacked
      ></b-form-radio-group>
    </b-form-group>
  </div>
`,

    data() {
      return {
        selected: 'first',
        options: [
          { text: 'First radio', value: 'first' },
          { text: 'Second radio', value: 'second' },
          { text: 'Third radio', value: 'third' },
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

export const ContextualStateWithFeedbackExample: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormRadioGroup, BFormInvalidFeedback, BFormValidFeedback },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-radio-group v-model="value" :options="options" :state="state" name="radio-validation">
      <b-form-invalid-feedback :state="state">Please select one</b-form-invalid-feedback>
      <b-form-valid-feedback :state="state">Thank you</b-form-valid-feedback>
    </b-form-radio-group>
  </div>
`,

    data() {
      return {
        value: null,
        options: [
          { text: 'First radio', value: 'first' },
          { text: 'Second radio', value: 'second' },
          { text: 'Third radio', value: 'third' },
        ],
      }
    },
    computed: {
      state() {
        return Boolean(this.value)
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
