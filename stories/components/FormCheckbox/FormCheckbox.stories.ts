import type { Meta, StoryObj } from '@storybook/vue3'
import vitestResults from '@/tests/unit/results.json'
import BFormCheckbox from '@/components/BFormCheckbox.vue'
import BFormGroup from '@/components/BFormGroup.vue'
import BFormCheckboxGroup from '@/components/BFormCheckboxGroup.vue'
import BFormInvalidFeedback from '@/components/BFormInvalidFeedback.vue'
import BFormValidFeedback from '@/components/BFormValidFeedback.vue'
import BButton from '@/components/BButton.vue'

const meta = {
  title: 'Components/FormCheckbox',
  component: BFormCheckbox,
  parameters: {
    vitest: {
      testFile: 'form-checkbox.spec.ts',
      testResults: vitestResults,
    },
  },
  argTypes: {

  },
} satisfies Meta<typeof BFormCheckbox>

export default meta
          type Story = StoryObj<typeof meta>

export const FormCheckbox: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormCheckbox },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-checkbox
      id="checkbox-1"
      v-model="status"
      name="checkbox-1"
      value="accepted"
      unchecked-value="not_accepted"
    >
      I accept the terms and use
    </b-form-checkbox>

    <div>State: <strong>{{ status }}</strong></div>
  </div>
`,

    data() {
      return {
        status: 'not_accepted',
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

export const FormCheckbox1: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormGroup, BFormCheckboxGroup, BFormCheckbox },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-group label="Using options array:" v-slot="{ ariaDescribedby }">
      <b-form-checkbox-group
        id="checkbox-group-1"
        v-model="selected"
        :options="options"
        :aria-describedby="ariaDescribedby"
        name="flavour-1"
      />
    </b-form-group>

    <b-form-group label="Using sub-components:" v-slot="{ ariaDescribedby }">
      <b-form-checkbox-group
        id="checkbox-group-2"
        v-model="selected"
        :aria-describedby="ariaDescribedby"
        name="flavour-2"
      >
        <b-form-checkbox value="orange">Orange</b-form-checkbox>
        <b-form-checkbox value="apple">Apple</b-form-checkbox>
        <b-form-checkbox value="pineapple">Pineapple</b-form-checkbox>
        <b-form-checkbox value="grape">Grape</b-form-checkbox>
      </b-form-checkbox-group>
    </b-form-group>

    <div>Selected: <strong>{{ selected }}</strong></div>
  </div>
`,

    data() {
      return {
        selected: [], // Must be an array reference!
        options: [
          { text: 'Orange', value: 'orange' },
          { text: 'Apple', value: 'apple' },
          { text: 'Pineapple', value: 'pineapple' },
          { text: 'Grape', value: 'grape' },
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
    components: { BFormCheckboxGroup },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-checkbox-group
      v-model="selected"
      :options="options"
      class="mb-3"
      value-field="item"
      text-field="name"
      disabled-field="notEnabled"
    />
    <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
  </div>
`,

    data() {
      return {
        selected: [],
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

export const InlineAndStackedCheckboxes: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormGroup, BFormCheckboxGroup, BFormCheckbox },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-group
      label="Form-checkbox-group inline checkboxes (default)"
      v-slot="{ ariaDescribedby }"
    >
      <b-form-checkbox-group
        v-model="selected"
        :options="options"
        :aria-describedby="ariaDescribedby"
        name="flavour-1a"
      />
    </b-form-group>

    <b-form-group
      label="Form-checkbox-group stacked checkboxes"
      v-slot="{ ariaDescribedby }"
    >
      <b-form-checkbox-group
        v-model="selected"
        :options="options"
        :aria-describedby="ariaDescribedby"
        name="flavour-2a"
        stacked
      />
    </b-form-group>

    <b-form-group
      label="Individual stacked checkboxes (default)"
      v-slot="{ ariaDescribedby }"
    >
      <b-form-checkbox
        v-for="option in options"
        v-model="selected"
        :key="option.value"
        :value="option.value"
        :aria-describedby="ariaDescribedby"
        name="flavour-3a"
      >
        {{ option.text }}
      </b-form-checkbox>
    </b-form-group>

    <b-form-group
      label="Individual inline checkboxes"
      v-slot="{ ariaDescribedby }"
    >
      <b-form-checkbox
        v-for="option in options"
        v-model="selected"
        :key="option.value"
        :value="option.value"
        :aria-describedby="ariaDescribedby"
        name="flavour-4a"
        inline
      >
        {{ option.text }}
      </b-form-checkbox>
    </b-form-group>
  </div>
`,

    data() {
      return {
        selected: [], // Must be an array reference!
        options: [
          { text: 'Orange', value: 'orange' },
          { text: 'Apple', value: 'apple' },
          { text: 'Pineapple', value: 'pineapple' },
          { text: 'Grape', value: 'grape' },
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
    components: { BFormCheckbox },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-form-checkbox size="sm">Small</b-form-checkbox>
  <b-form-checkbox>Default</b-form-checkbox>
  <b-form-checkbox size="lg">Large</b-form-checkbox>
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

export const IndividualCheckboxButtonStyle: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormCheckbox },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-checkbox v-model="checked1" name="check-button" button>
      Button Checkbox <b>(Checked: {{ checked1 }})</b>
    </b-form-checkbox>
    <b-form-checkbox v-model="checked2" name="check-button" button button-variant="info">
      Button Checkbox <b>(Checked: {{ checked2 }})</b>
    </b-form-checkbox>
  </div>
`,

    data() {
      return {
        checked1: false,
        checked2: false,
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

export const GroupedButtonStyleCheckboxes: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormGroup, BFormCheckboxGroup },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-group
      label="Button-group style checkboxes"
      v-slot="{ ariaDescribedby }"
    >
      <b-form-checkbox-group
        v-model="selected"
        :options="options"
        :aria-describedby="ariaDescribedby"
        name="buttons-1"
        buttons
      />
    </b-form-group>

    <b-form-group
      label="Button-group style checkboxes with variant primary and large buttons"
      v-slot="{ ariaDescribedby }"
    >
      <b-form-checkbox-group
        v-model="selected"
        :options="options"
        :aria-describedby="ariaDescribedby"
        buttons
        button-variant="primary"
        size="lg"
        name="buttons-2"
      />
    </b-form-group>

    <b-form-group
      label="Stacked (vertical) button-group style checkboxes"
      v-slot="{ ariaDescribedby }"
    >
      <b-form-checkbox-group
        v-model="selected"
        :options="options"
        :aria-describedby="ariaDescribedby"
        stacked
        buttons
      />
    </b-form-group>
  </div>
`,

    data() {
      return {
        selected: [], // Must be an array reference!
        options: [
          { text: 'Orange', value: 'orange' },
          { text: 'Apple', value: 'apple' },
          { text: 'Pineapple', value: 'pineapple' },
          { text: 'Grape', value: 'grape' },
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

export const IndividualCheckboxSwitchStyle: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormCheckbox },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-checkbox v-model="checked" name="check-button" switch>
      Switch Checkbox <b>(Checked: {{ checked }})</b>
    </b-form-checkbox>
  </div>
`,

    data() {
      return {
        checked: false,
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

export const GroupedSwitchStyleCheckboxes: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormGroup, BFormCheckboxGroup },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-group
      label="Inline switch style checkboxes"
      v-slot="{ ariaDescribedby }"
    >
      <b-form-checkbox-group
        v-model="selected"
        :options="options"
        :aria-describedby="ariaDescribedby"
        switches
      />
    </b-form-group>

    <b-form-group
      label="Stacked (vertical) switch style checkboxes"
      v-slot="{ ariaDescribedby }"
    >
      <b-form-checkbox-group
        v-model="selected"
        :options="options"
        :aria-describedby="ariaDescribedby"
        switches
        stacked
      />
    </b-form-group>
  </div>
`,

    data() {
      return {
        selected: [], // Must be an array reference!
        options: [
          { text: 'Red', value: 'red' },
          { text: 'Green', value: 'green' },
          { text: 'Yellow (disabled)', value: 'yellow', disabled: true },
          { text: 'Blue', value: 'blue' },
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

export const SwitchSizing: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormCheckbox },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-form-checkbox switch size="sm">Small</b-form-checkbox>
  <b-form-checkbox switch>Default</b-form-checkbox>
  <b-form-checkbox switch size="lg">Large</b-form-checkbox>
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

export const NonCustomCheckInputsPlain: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormGroup, BFormCheckboxGroup },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-group label="Plain inline checkboxes" v-slot="{ ariaDescribedby }">
      <b-form-checkbox-group
        v-model="selected"
        :options="options"
        :aria-describedby="ariaDescribedby"
        plain
      />
    </b-form-group>

    <b-form-group label="Plain stacked checkboxes" v-slot="{ ariaDescribedby }">
      <b-form-checkbox-group
        v-model="selected"
        :options="options"
        :aria-describedby="ariaDescribedby"
        plain
        stacked
      />
    </b-form-group>
  </div>
`,

    data() {
      return {
        selected: [], // Must be an array reference!
        options: [
          { text: 'Orange', value: 'orange' },
          { text: 'Apple', value: 'apple' },
          { text: 'Pineapple', value: 'pineapple' },
          { text: 'Grape', value: 'grape' },
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

export const ContextualStateAndValidationExample: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormCheckboxGroup, BFormInvalidFeedback, BFormValidFeedback },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-checkbox-group
      v-model="value"
      :options="options"
      :state="state"
      name="checkbox-validation"
    >
      <b-form-invalid-feedback :state="state">Please select two</b-form-invalid-feedback>
      <b-form-valid-feedback :state="state">Thank you</b-form-valid-feedback>
    </b-form-checkbox-group>
  </div>
`,

    data() {
      return {
        value: [],
        options: [
          { text: 'First Check', value: 'first' },
          { text: 'Second Check', value: 'second' },
          { text: 'Third Check', value: 'third' },
        ],
      }
    },
    computed: {
      state() {
        return this.value.length === 2
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

export const IndeterminateTriStateSupport: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormCheckbox, BButton },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-checkbox v-model="checked" :indeterminate.sync="indeterminate">
      Click me to see what happens
    </b-form-checkbox>

    <div class="mt-3">
      Checked: <strong>{{ checked }}</strong><br />
      Indeterminate: <strong>{{ indeterminate }}</strong>
    </div>

    <b-button @click="toggleIndeterminate">Toggle Indeterminate State</b-button>
  </div>
`,

    data() {
      return {
        checked: true,
        indeterminate: true,
      }
    },
    methods: {
      toggleIndeterminate() {
        this.indeterminate = !this.indeterminate
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

export const IndeterminateTriStateSupport1: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormGroup, BFormCheckbox, BFormCheckboxGroup },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-group>
      <template #label>
        <b>Choose your flavours:</b><br />
        <b-form-checkbox
          v-model="allSelected"
          :indeterminate="indeterminate"
          aria-describedby="flavours"
          aria-controls="flavours"
          @change="toggleAll"
        >
          {{ allSelected ? 'Un-select All' : 'Select All' }}
        </b-form-checkbox>
        </template>
        </b-form-group>
        </div>
      `,

    data() {
      return {
        flavours: ['Orange', 'Grape', 'Apple', 'Lime', 'Very Berry'],
        selected: [],
        allSelected: false,
        indeterminate: false,
      }
    },
    methods: {
      toggleAll(checked: any) {
        this.selected = checked ? this.flavours.slice() : []
      },
    },
    watch: {
      selected(newValue) {
        // Handle changes in individual flavour checkboxes
        if (newValue.length === 0) {
          this.indeterminate = false
          this.allSelected = false
        }
        else if (newValue.length === this.flavours.length) {
          this.indeterminate = false
          this.allSelected = true
        }
        else {
          this.indeterminate = true
          this.allSelected = false
        }
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
