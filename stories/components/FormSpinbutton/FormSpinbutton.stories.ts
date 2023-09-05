import type { Meta, StoryObj } from '@storybook/vue3'
import vitestResults from '@/tests/unit/results.json'
import BFormSpinbutton from '@/components/BFormSpinbutton.vue'
import BFormSelect from '@/components/BFormSelect.vue'
import BRow from '@/components/BRow.vue'
import BCol from '@/components/BCol.vue'

const meta = {
  title: 'Components/FormSpinbutton',
  component: BFormSpinbutton,
  parameters: {
    vitest: {
      testFile: 'form-spinbutton.spec.ts',
      testResults: vitestResults,
    },
  },
  argTypes: {

  },
} satisfies Meta<typeof BFormSpinbutton>

export default meta
          type Story = StoryObj<typeof meta>

export const Overview: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormSpinbutton },
    props: Object.keys(argTypes),
    template: `
  <div>
    <label for="demo-sb">Spin Button</label>
    <b-form-spinbutton id="demo-sb" v-model="value" min="1" max="100" />
    <p>Value: {{ value }}</p>
  </div>
`,

    data() {
      return {
        value: 50,
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

export const MinMaxAndStep: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormSpinbutton },
    props: Object.keys(argTypes),
    template: `
  <div>
    <label for="sb-step">Spin button with step of 0.25</label>
    <b-form-spinbutton
      id="sb-step"
      v-model="value"
      min="0"
      max="10"
      step="0.25"
     />
  </div>
`,

    data() {
      return {
        value: 0,
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

export const NumberWrapping: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormSpinbutton },
    props: Object.keys(argTypes),
    template: `
  <div>
    <label for="sb-wrap">Wrapping value spin button</label>
    <b-form-spinbutton id="sb-wrap" wrap min="1" max="25" placeholder="--" />
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

export const Size: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormSpinbutton },
    props: Object.keys(argTypes),
    template: `
  <div>
    <label for="sb-small">Spin button - Small size</label>
    <b-form-spinbutton id="sb-small" size="sm" placeholder="--" class="mb-2" />

    <label for="sb-default">Spin button - Default size</label>
    <b-form-spinbutton id="sb-default" placeholder="--" class="mb-2" />

    <label for="sb-large">Spin button - Large size</label>
    <b-form-spinbutton id="sb-large" size="lg" placeholder="--" class="mb-2" />
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

export const Inline: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormSpinbutton },
    props: Object.keys(argTypes),
    template: `
  <div>
    <label for="sb-inline">Inline spin button</label>
    <b-form-spinbutton id="sb-inline" v-model="value" inline />
  </div>
`,

    data() {
      return {
        value: 50,
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

export const Vertical: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormSpinbutton },
    props: Object.keys(argTypes),
    template: `
  <div>
    <label for="sb-vertical">Vertical spin button</label><br />
    <b-form-spinbutton id="sb-vertical" v-model="value" vertical />
  </div>
`,

    data() {
      return {
        value: 50,
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

export const NumberFormattingAndLocale: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormSelect, BFormSpinbutton },
    props: Object.keys(argTypes),
    template: `
  <div>
    <label for="sb-locales">Locale</label>
    <b-form-select id="sb-locales" v-model="locale" :options="locales"></b-form-select>
    <label for="sb-local" class="mt-2">Spin button with locale</label>
    <b-form-spinbutton
      id="sb-locale"
      v-model="value"
      :locale="locale"
      min="0"
      max="10"
      step="0.125"
     />
    <p>Value: {{ value }}</p>
  </div>
`,

    data() {
      return {
        value: 0,
        locale: 'fr-CA',
        locales: [
          { value: 'en', text: 'English' },
          { value: 'de', text: 'German' },
          { value: 'fr-CA', text: 'French (Canadian)' },
          { value: 'fa', text: 'Persian' },
          { value: 'ar-EG', text: 'Arabic (Egyptian)' },
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

export const NumberFormattingAndLocale1: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormSpinbutton },
    props: Object.keys(argTypes),
    template: `
  <div>
    <label for="sb-days" class="mt-2">Spin button with formatter</label>
    <b-form-spinbutton
      id="sb-days"
      v-model="value"
      :formatter-fn="dayFormatter"
      min="0"
      max="6"
      wrap
     />
    <p>Value: {{ value }}</p>
  </div>
`,

    data() {
      return {
        value: 0,
        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      }
    },
    methods: {
      dayFormatter(value: string) {
        return this.days[value]
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

export const DisabledAndReadonlyStates: Story = {
  render: (args, { argTypes }) => ({
    components: { BRow, BCol, BFormSpinbutton },
    props: Object.keys(argTypes),
    template: `
  <b-row>
    <b-col md="6" class="mb-2">
      <label for="sb-disabled">Disabled spin button</label>
      <b-form-spinbutton id="sb-disabled" v-model="value" disabled />
    </b-col>
    <b-col md="6" class="mb-2">
      <label for="sb-readonly" class="">Readonly spin button</label>
      <b-form-spinbutton id="sb-readonly" v-model="value" readonly />
    </b-col>
  </b-row>
`,

    data() {
      return {
        value: 50,
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

export const Events: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormSpinbutton },
    props: Object.keys(argTypes),
    template: `
  <div>
    <label for="sb-input">Spin button - input and change events</label>
    <b-form-spinbutton
      id="sb-input"
      v-model="value1"
      @change="value2 = $event"
      wrap
     />
    <p>Input event: {{ value1 }}</p>
    <p>Change event: {{ value2 }}</p>
  </div>
`,

    data() {
      return {
        value1: 0,
        value2: null,
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
