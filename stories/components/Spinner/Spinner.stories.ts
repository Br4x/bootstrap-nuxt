import type { Meta, StoryObj } from '@storybook/vue3'
import vitestResults from '@/tests/unit/results.json'
import BSpinner from '@/components/BSpinner.vue'
import BButton from '@/components/BButton.vue'

const meta = {
  title: 'Components/Spinner',
  component: BSpinner,
  parameters: {
    vitest: {
      testFile: 'spinner.spec.ts',
      testResults: vitestResults,
    },
  },
  argTypes: {

  },
} satisfies Meta<typeof BSpinner>

export default meta
          type Story = StoryObj<typeof meta>

export const Spinner: Story = {
  render: (args, { argTypes }) => ({
    components: { BSpinner },
    props: Object.keys(argTypes),
    template: `
<div class="text-center">
  <b-spinner label="Spinning"></b-spinner>
  <b-spinner type="grow" label="Spinning"></b-spinner>
  <b-spinner variant="primary" label="Spinning"></b-spinner>
  <b-spinner variant="primary" type="grow" label="Spinning"></b-spinner>
  <b-spinner variant="success" label="Spinning"></b-spinner>
  <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
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

export const BorderSpinner: Story = {
  render: (args, { argTypes }) => ({
    components: { BSpinner },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-spinner label="Loading..."></b-spinner>
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

export const GrowSpinner: Story = {
  render: (args, { argTypes }) => ({
    components: { BSpinner },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-spinner type="grow" label="Loading..."></b-spinner>
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

export const SpinnerColorVariants: Story = {
  render: (args, { argTypes }) => ({
    components: { BSpinner },
    props: Object.keys(argTypes),
    template: `
  <div>
    <div class="text-center mb-3 d-flex justify-content-between">
      <b-spinner
        v-for="variant in variants"
        :variant="variant"
        :key="variant"
      ></b-spinner>
    </div>

    <div class="text-center d-flex justify-content-between">
      <b-spinner
        v-for="variant in variants"
        :variant="variant"
        :key="variant"
        type="grow"
      ></b-spinner>
    </div>
  </div>
`,

    data() {
      return {
        variants: ['primary', 'secondary', 'danger', 'warning', 'success', 'info', 'light', 'dark'],
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

export const Size: Story = {
  render: (args, { argTypes }) => ({
    components: { BSpinner },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-spinner small label="Small Spinner"></b-spinner>
  <b-spinner small label="Small Spinner" type="grow"></b-spinner>
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

export const Size1: Story = {
  render: (args, { argTypes }) => ({
    components: { BSpinner },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
  <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner" type="grow"></b-spinner>
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

export const Margin: Story = {
  render: (args, { argTypes }) => ({
    components: { BSpinner },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-spinner class="m-5" label="Busy"></b-spinner>
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

export const Flex: Story = {
  render: (args, { argTypes }) => ({
    components: { BSpinner },
    props: Object.keys(argTypes),
    template: `
<div>
  <div class="d-flex justify-content-center mb-3">
    <b-spinner label="Loading..."></b-spinner>
  </div>

  <div class="d-flex align-items-center">
    <strong>Loading...</strong>
    <b-spinner class="ml-auto"></b-spinner>
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

export const Floats: Story = {
  render: (args, { argTypes }) => ({
    components: { BSpinner },
    props: Object.keys(argTypes),
    template: `
<div class="clearfix">
  <b-spinner class="float-right" label="Floated Right"></b-spinner>
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

export const TextAlign: Story = {
  render: (args, { argTypes }) => ({
    components: { BSpinner },
    props: Object.keys(argTypes),
    template: `
<div class="text-center">
  <b-spinner variant="primary" label="Text Centered"></b-spinner>
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

export const SpinnersInButtons: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BSpinner },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-button variant="primary" disabled>
    <b-spinner small></b-spinner>
    <span class="sr-only">Loading...</span>
  </b-button>

  <b-button variant="primary" disabled>
    <b-spinner small type="grow"></b-spinner>
    Loading...
  </b-button>
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
