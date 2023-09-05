import type { Meta, StoryObj } from '@storybook/vue3'
import vitestResults from '@/tests/unit/results.json'
import BFormGroup from '@/components/BFormGroup.vue'
import BFormInput from '@/components/BFormInput.vue'
import BCard from '@/components/BCard.vue'
import BFormRadioGroup from '@/components/BFormRadioGroup.vue'

const meta = {
  title: 'Components/FormGroup',
  component: BFormGroup,
  parameters: {
    vitest: {
      testFile: 'form-group.spec.ts',
      testResults: vitestResults,
    },
  },
  argTypes: {

  },
} satisfies Meta<typeof BFormGroup>

export default meta
          type Story = StoryObj<typeof meta>

export const FormGroup: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormGroup, BFormInput },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-group
      id="fieldset-1"
      description="Let us know your name."
      label="Enter your name"
      label-for="input-1"
      valid-feedback="Thank you!"
      :invalid-feedback="invalidFeedback"
      :state="state"
    >
      <b-form-input id="input-1" v-model="name" :state="state" trim></b-form-input>
    </b-form-group>
  </div>
`,

    computed: {
      state() {
        return this.name.length >= 4
      },
      invalidFeedback() {
        if (this.name.length > 0)
          return 'Enter at least 4 characters.'

        return 'Please enter something.'
      },
    },
    data() {
      return {
        name: '',
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

export const HorizontalLayout: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormGroup, BFormInput },
    props: Object.keys(argTypes),
    template: `
<div>
  <div>
    <b-form-group
      id="fieldset-horizontal"
      label-cols-sm="4"
      label-cols-lg="3"
      content-cols-sm
      content-cols-lg="7"
      description="Let us know your name."
      label="Enter your name"
      label-for="input-horizontal"
    >
      <b-form-input id="input-horizontal"></b-form-input>
    </b-form-group>
  </div>
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

export const LabelSize: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormGroup, BFormInput },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-form-group label-cols="4" label-cols-lg="2" label-size="sm" label="Small" label-for="input-sm">
    <b-form-input id="input-sm" size="sm"></b-form-input>
  </b-form-group>

  <b-form-group label-cols="4" label-cols-lg="2" label="Default" label-for="input-default">
    <b-form-input id="input-default"></b-form-input>
  </b-form-group>

  <b-form-group label-cols="4" label-cols-lg="2" label-size="lg" label="Large" label-for="input-lg">
    <b-form-input id="input-lg" size="lg"></b-form-input>
  </b-form-group>
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

export const NestedFormGroups: Story = {
  render: (args, { argTypes }) => ({
    components: { BCard, BFormGroup, BFormInput, BFormRadioGroup },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-card bg-variant="light">
    <b-form-group
      label-cols-lg="3"
      label="Shipping Address"
      label-size="lg"
      label-class="font-weight-bold pt-0"
      class="mb-0"
    >
      <b-form-group
        label="Street:"
        label-for="nested-street"
        label-cols-sm="3"
        label-align-sm="right"
      >
        <b-form-input id="nested-street"></b-form-input>
      </b-form-group>

      <b-form-group
        label="City:"
        label-for="nested-city"
        label-cols-sm="3"
        label-align-sm="right"
      >
        <b-form-input id="nested-city"></b-form-input>
      </b-form-group>

      <b-form-group
        label="State:"
        label-for="nested-state"
        label-cols-sm="3"
        label-align-sm="right"
      >
        <b-form-input id="nested-state"></b-form-input>
      </b-form-group>

      <b-form-group
        label="Country:"
        label-for="nested-country"
        label-cols-sm="3"
        label-align-sm="right"
      >
        <b-form-input id="nested-country"></b-form-input>
      </b-form-group>

      <b-form-group
        label="Ship via:"
        label-cols-sm="3"
        label-align-sm="right"
        class="mb-0"
        v-slot="{ ariaDescribedby }"
      >
        <b-form-radio-group
          class="pt-2"
          :options="['Air', 'Courier', 'Mail']"
          :aria-describedby="ariaDescribedby"
        ></b-form-radio-group>
      </b-form-group>
    </b-form-group>
  </b-card>
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
