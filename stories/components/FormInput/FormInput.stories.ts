import type { Meta, StoryObj } from '@storybook/vue3'
import vitestResults from '@/tests/unit/results.json'
import BFormInput from '@/components/B/FormInput.vue'
import BContainer from '@/components/B/Container.vue'
import BRow from '@/components/B/Row.vue'
import BCol from '@/components/B/Col.vue'
import BFormInvalidFeedback from '@/components/B/FormInvalidFeedback.vue'
import BFormText from '@/components/B/FormText.vue'
import BFormGroup from '@/components/B/FormGroup.vue'

const meta = {
  title: 'Components/FormInput',
  component: BFormInput,
  parameters: {
    vitest: {
      testFile: 'form-input.test.tsx',
      testResults: vitestResults,
    },
  },
  argTypes: {

  },
} satisfies Meta<typeof BFormInput>

export default meta
          type Story = StoryObj<typeof meta>

export const FormInput: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormInput },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-input v-model="text" placeholder="Enter your name"></b-form-input>
    <div class="mt-2">Value: {{ text }}</div>
  </div>
`,

    data() {
      return {
        text: '',
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

export const InputType: Story = {
  render: (args, { argTypes }) => ({
    components: { BContainer, BRow, BCol, BFormInput },
    props: Object.keys(argTypes),
    template: `
  <b-container fluid>
    <b-row class="my-1" v-for="type in types" :key="type">
      <b-col sm="3">
        <label :for="\`type-${type}\`">Type <code>{{ type }}</code>:</label>
      </b-col>
      <b-col sm="9">
        <b-form-input :id="\`type-${type}\`" :type="type"></b-form-input>
      </b-col>
    </b-row>
  </b-container>
`,

    data() {
      return {
        types: [
          'text',
          'number',
          'email',
          'password',
          'search',
          'url',
          'tel',
          'date',
          'time',
          'range',
          'color',
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

export const RangeTypeInput: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormInput },
    props: Object.keys(argTypes),
    template: `
  <div>
    <label for="range-1">Example range with min and max</label>
    <b-form-input id="range-1" v-model="value" type="range" min="0" max="5"></b-form-input>
    <div class="mt-2">Value: {{ value }}</div>
  </div>
`,

    data() {
      return {
        value: '2',
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

export const RangeTypeInput1: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormInput },
    props: Object.keys(argTypes),
    template: `
  <div>
    <label for="range-2">Example range with step value</label>
    <b-form-input id="range-2" v-model="value" type="range" min="0" max="5" step="0.5"></b-form-input>
    <div class="mt-2">Value: {{ value }}</div>
  </div>
`,

    data() {
      return {
        value: '2',
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
    components: { BContainer, BRow, BCol, BFormInput },
    props: Object.keys(argTypes),
    template: `
<b-container fluid>
  <b-row class="my-1">
    <b-col sm="2">
      <label for="input-small">Small:</label>
    </b-col>
    <b-col sm="10">
      <b-form-input id="input-small" size="sm" placeholder="Enter your name"></b-form-input>
    </b-col>
  </b-row>

  <b-row class="my-1">
    <b-col sm="2">
      <label for="input-default">Default:</label>
    </b-col>
    <b-col sm="10">
      <b-form-input id="input-default" placeholder="Enter your name"></b-form-input>
    </b-col>
  </b-row>

  <b-row class="my-1">
    <b-col sm="2">
      <label for="input-large">Large:</label>
    </b-col>
    <b-col sm="10">
      <b-form-input id="input-large" size="lg" placeholder="Enter your name"></b-form-input>
    </b-col>
  </b-row>
</b-container>

<!-- b-form-input-size.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const ContextualStates: Story = {
  render: (args, { argTypes }) => ({
    components: { BContainer, BRow, BCol, BFormInput },
    props: Object.keys(argTypes),
    template: `
<b-container fluid>
  <b-row class="my-1">
    <b-col sm="3">
      <label for="input-none">No State:</label>
    </b-col>
    <b-col sm="9">
      <b-form-input id="input-none" :state="null" placeholder="No validation"></b-form-input>
    </b-col>
  </b-row>

  <b-row class="my-1">
    <b-col sm="3">
      <label for="input-valid">Valid State:</label>
    </b-col>
    <b-col sm="9">
      <b-form-input id="input-valid" :state="true" placeholder="Valid input"></b-form-input>
    </b-col>
  </b-row>

  <b-row class="my-1">
    <b-col sm="3">
      <label for="input-invalid">Invalid State:</label>
    </b-col>
    <b-col sm="9">
      <b-form-input id="input-invalid" :state="false" placeholder="Invalid input"></b-form-input>
    </b-col>
  </b-row>
</b-container>

<!-- b-form-input-states.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const ContextualStates1: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormInput, BFormInvalidFeedback, BFormText },
    props: Object.keys(argTypes),
    template: `
  <div role="group">
    <label for="input-live">Name:</label>
    <b-form-input
      id="input-live"
      v-model="name"
      :state="nameState"
      aria-describedby="input-live-help input-live-feedback"
      placeholder="Enter your name"
      trim
    ></b-form-input>

    <!-- This will only be shown if the preceding input has an invalid state -->
    <b-form-invalid-feedback id="input-live-feedback">
      Enter at least 3 letters
    </b-form-invalid-feedback>

    <!-- This is a form text block (formerly known as help block) -->
    <b-form-text id="input-live-help">Your full name.</b-form-text>
  </div>
`,

    computed: {
      nameState() {
        return this.name.length > 2
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

export const FormatterSupport: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormGroup, BFormInput },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-group
      label="Text input with formatter (on input)"
      label-for="input-formatter"
      description="We will convert your name to lowercase instantly"
      class="mb-0"
    >
      <b-form-input
        id="input-formatter"
        v-model="text1"
        placeholder="Enter your name"
        :formatter="formatter"
      ></b-form-input>
    </b-form-group>
    <p><b>Value:</b> {{ text1 }}</p>

    <b-form-group
      label="Text input with lazy formatter (on blur)"
      label-for="input-lazy"
      description="This one is a little lazy!"
      class="mb-0"
    >
      <b-form-input
        id="input-lazy"
        v-model="text2"
        placeholder="Enter your name"
        lazy-formatter
        :formatter="formatter"
      ></b-form-input>
    </b-form-group>
    <p class="mb-0"><b>Value:</b> {{ text2 }}</p>
  </div>
`,

    data() {
      return {
        text1: '',
        text2: '',
      }
    },
    methods: {
      formatter(value) {
        return value.toLowerCase()
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

export const DatalistSupport: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormInput },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-input list="my-list-id"></b-form-input>

    <datalist id="my-list-id">
      <option>Manual Option</option>
      <option v-for="size in sizes">{{ size }}</option>
    </datalist>
  </div>
`,

    data() {
      return {
        sizes: ['Small', 'Medium', 'Large', 'Extra Large'],
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

export const DebounceSupport: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormInput },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-input v-model="value" type="text" debounce="500"></b-form-input>
    <div class="mt-2">Value: "{{ value }}"</div>
  </div>
`,

    data() {
      return {
        value: '',
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

export const UsingHtml5InputAsAnAlternative: Story = {
  render: (args, { argTypes }) => ({
    components: { },
    props: Object.keys(argTypes),
    template: `
  <div>
    <input v-model="value" type="text" class="form-control">
    <br>
    <p>Value: "{{ value }}"</p>
  </div>
`,

    data() {
      return {
        value: '',
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
