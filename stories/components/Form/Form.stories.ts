import type { Meta, StoryObj } from '@storybook/vue3'
import vitestResults from '@/tests/unit/results.json'
import BForm from '@/components/B/Form.vue'
import BFormGroup from '@/components/B/FormGroup.vue'
import BFormInput from '@/components/B/FormInput.vue'
import BFormSelect from '@/components/B/FormSelect.vue'
import BFormCheckboxGroup from '@/components/B/FormCheckboxGroup.vue'
import BFormCheckbox from '@/components/B/FormCheckbox.vue'
import BButton from '@/components/B/Button.vue'
import BCard from '@/components/B/Card.vue'
import BInputGroup from '@/components/B/InputGroup.vue'
import BFormText from '@/components/B/FormText.vue'
import BFormInvalidFeedback from '@/components/B/FormInvalidFeedback.vue'
import BFormValidFeedback from '@/components/B/FormValidFeedback.vue'
import BFormDatalist from '@/components/B/FormDatalist.vue'

const meta = {
  title: 'Components/Form',
  component: BForm,
  parameters: {
    vitest: {
      testFile: 'form.test.tsx',
      testResults: vitestResults,
    },
  },
  argTypes: {

  },
} satisfies Meta<typeof BForm>

export default meta
          type Story = StoryObj<typeof meta>

export const IntroductionToFormsAndControls: Story = {
  render: (args, { argTypes }) => ({
    components: { BForm, BFormGroup, BFormInput, BFormSelect, BFormCheckboxGroup, BFormCheckbox, BButton, BCard },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.name"
          placeholder="Enter name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Food:" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="form.food"
          :options="foods"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-4" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          v-model="form.checked"
          id="checkboxes-4"
          :aria-describedby="ariaDescribedby"
        >
          <b-form-checkbox value="me">Check me out</b-form-checkbox>
          <b-form-checkbox value="that">Check that out</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
`,

    data() {
      return {
        form: {
          email: '',
          name: '',
          food: null,
          checked: [],
        },
        foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
        show: true,
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.food = null
        this.form.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
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

export const InlineForm: Story = {
  render: (args, { argTypes }) => ({
    components: { BForm, BFormInput, BInputGroup, BFormCheckbox, BButton },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-form inline>
    <label class="sr-only" for="inline-form-input-name">Name</label>
    <b-form-input
      id="inline-form-input-name"
      class="mb-2 mr-sm-2 mb-sm-0"
      placeholder="Jane Doe"
    ></b-form-input>

    <label class="sr-only" for="inline-form-input-username">Username</label>
    <b-input-group prepend="@" class="mb-2 mr-sm-2 mb-sm-0">
      <b-form-input id="inline-form-input-username" placeholder="Username"></b-form-input>
    </b-input-group>

    <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0">Remember me</b-form-checkbox>

    <b-button variant="primary">Save</b-button>
  </b-form>
</div>

<!-- b-form-inline.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const InlineForm1: Story = {
  render: (args, { argTypes }) => ({
    components: { BForm, BFormSelect, BFormCheckbox, BButton },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-form inline>
    <label class="mr-sm-2" for="inline-form-custom-select-pref">Preference</label>
    <b-form-select
      id="inline-form-custom-select-pref"
      class="mb-2 mr-sm-2 mb-sm-0"
      :options="[{ text: 'Choose...', value: null }, 'One', 'Two', 'Three']"
      :value="null"
    ></b-form-select>

    <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0">Remember my preference</b-form-checkbox>

    <b-button variant="primary">Save</b-button>
  </b-form>
</div>

<!-- b-form-inline-custom.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const FormTextHelper: Story = {
  render: (args, { argTypes }) => ({
    components: { BForm, BFormInput, BFormText },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-form @submit.stop.prevent>
    <label for="text-password">Password</label>
    <b-form-input type="password" id="text-password" aria-describedby="password-help-block"></b-form-input>
    <b-form-text id="password-help-block">
      Your password must be 8-20 characters long, contain letters and numbers, and must not
      contain spaces, special characters, or emoji.
    </b-form-text>
   </b-form>
</div>

<!-- b-form-help-text.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const FeedbackHelpers: Story = {
  render: (args, { argTypes }) => ({
    components: { BForm, BFormInput, BFormInvalidFeedback, BFormValidFeedback },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form  @submit.stop.prevent>
      <label for="feedback-user">User ID</label>
      <b-form-input v-model="userId" :state="validation" id="feedback-user"></b-form-input>
      <b-form-invalid-feedback :state="validation">
        Your user ID must be 5-12 characters long.
      </b-form-invalid-feedback>
      <b-form-valid-feedback :state="validation">
        Looks Good.
      </b-form-valid-feedback>
     </b-form>
  </div>
`,

    data() {
      return {
        userId: '',
      }
    },
    computed: {
      validation() {
        return this.userId.length > 4 && this.userId.length < 13
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

export const DatalistHelper: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormInput, BFormDatalist },
    props: Object.keys(argTypes),
    template: `
  <div>
    <label for="input-with-list">Input with datalist</label>
    <b-form-input list="input-list" id="input-with-list"></b-form-input>
    <b-form-datalist id="input-list" :options="options"></b-form-datalist>
  </div>
`,

    data() {
      return {
        options: ['Apple', 'Banana', 'Grape', 'Kiwi', 'Orange'],
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
