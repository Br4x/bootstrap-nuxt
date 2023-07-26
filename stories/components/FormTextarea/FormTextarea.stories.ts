import type { Meta, StoryObj } from '@storybook/vue3'
import vitestResults from '@/tests/unit/results.json'
import BFormTextarea from '@/components/B/FormTextarea.vue'
import BContainer from '@/components/B/Container.vue'
import BRow from '@/components/B/Row.vue'
import BCol from '@/components/B/Col.vue'
import BFormGroup from '@/components/B/FormGroup.vue'

const meta = {
  title: 'Components/FormTextarea',
  component: BFormTextarea,
  parameters: {
    vitest: {
      testFile: 'form-textarea.test.tsx',
      testResults: vitestResults,
    },
  },
  argTypes: {

  },
} satisfies Meta<typeof BFormTextarea>

export default meta
          type Story = StoryObj<typeof meta>

export const FormTextarea: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormTextarea },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-textarea
      id="textarea"
      v-model="text"
      placeholder="Enter something..."
      rows="3"
      max-rows="6"
    ></b-form-textarea>

    <pre class="mt-3 mb-0">{{ text }}</pre>
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

export const ControlSizing: Story = {
  render: (args, { argTypes }) => ({
    components: { BContainer, BRow, BCol, BFormTextarea },
    props: Object.keys(argTypes),
    template: `
<b-container fluid>
  <b-row>
    <b-col sm="2">
      <label for="textarea-small">Small:</label>
    </b-col>
    <b-col sm="10">
      <b-form-textarea
        id="textarea-small"
        size="sm"
        placeholder="Small textarea"
      ></b-form-textarea>
    </b-col>
  </b-row>

  <b-row class="mt-2">
    <b-col sm="2">
      <label for="textarea-default">Default:</label>
    </b-col>
    <b-col sm="10">
      <b-form-textarea
        id="textarea-default"
        placeholder="Default textarea"
      ></b-form-textarea>
    </b-col>
  </b-row>

  <b-row class="mt-2">
    <b-col sm="2">
      <label for="textarea-large">Large:</label>
    </b-col>
    <b-col sm="10">
      <b-form-textarea
        id="textarea-large"
        size="lg"
        placeholder="Large textarea"
      ></b-form-textarea>
    </b-col>
  </b-row>
</b-container>

<!-- b-form-textarea-sizes.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const DisplayedRows: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormTextarea },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-form-textarea
    id="textarea-rows"
    placeholder="Tall textarea"
    rows="8"
  ></b-form-textarea>
</div>

<!-- b-form-textarea-rows.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const DisableResizeHandle: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormTextarea },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-form-textarea
    id="textarea-no-resize"
    placeholder="Fixed height textarea"
    rows="3"
    no-resize
  ></b-form-textarea>
</div>

<!-- b-form-textarea-no-resize.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const AutoHeight: Story = {
  render: (args, { argTypes }) => ({
    components: { BContainer, BRow, BCol, BFormTextarea },
    props: Object.keys(argTypes),
    template: `
<b-container fluid>
  <b-row>
    <b-col sm="2">
      <label for="textarea-auto-height">Auto height:</label>
    </b-col>
    <b-col sm="10">
      <b-form-textarea
        id="textarea-auto-height"
        placeholder="Auto height textarea"
        rows="3"
        max-rows="8"
      ></b-form-textarea>
    </b-col>
  </b-row>

  <b-row class="mt-2">
    <b-col sm="2">
      <label for="textarea-no-auto-shrink">No auto-shrink:</label>
    </b-col>
    <b-col sm="10">
      <b-form-textarea
        id="textarea-no-auto-shrink"
        placeholder="Auto height (no-shrink) textarea"
        rows="3"
        max-rows="8"
        no-auto-shrink
      ></b-form-textarea>
    </b-col>
  </b-row>
</b-container>

<!-- b-form-textarea-auto-height.vue -->
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
    components: { BFormTextarea },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-textarea
      id="textarea-state"
      v-model="text"
      :state="text.length >= 10"
      placeholder="Enter at least 10 characters"
      rows="3"
    ></b-form-textarea>
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

export const FormatterSupport: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormGroup, BFormTextarea },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-group
      label="Textarea with formatter (on input)"
      label-for="textarea-formatter"
      description="We will convert your text to lowercase instantly"
      class="mb-0"
    >
      <b-form-textarea
        id="textarea-formatter"
        v-model="text1"
        placeholder="Enter your text"
        :formatter="formatter"
      ></b-form-textarea>
    </b-form-group>
    <p style="white-space: pre-line"><b>Value:</b> {{ text1 }}</p>

    <b-form-group
      label="Textarea with lazy formatter (on blur)"
      label-for="textarea-lazy"
      description="This one is a little lazy!"
      class="mb-0"
    >
      <b-form-textarea
        id="textarea-lazy"
        v-model="text2"
        placeholder="Enter your text"
        lazy-formatter
        :formatter="formatter"
      ></b-form-textarea>
    </b-form-group>
    <p class="mb-0" style="white-space: pre-line"><b>Value:</b> {{ text2 }}</p>
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

export const ReadonlyPlainText: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormTextarea },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-textarea id="textarea-plaintext" plaintext :value="text"></b-form-textarea>
  </div>
`,

    data() {
      return {
        text: 'This is some text.\nIt is read only and doesn\'t look like an input.',
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
    components: { BFormTextarea },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-textarea v-model="value" debounce="500" rows="3" max-rows="5"></b-form-textarea>
    <pre class="mt-2 mb-0">{{ value }}</pre>
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
