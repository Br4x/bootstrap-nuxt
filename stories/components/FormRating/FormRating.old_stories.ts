import type { Meta, StoryObj } from '@storybook/vue3'
import vitestResults from '@/tests/unit/results.json'
import BFormRating from '@/components/BFormRating.vue'
import BInputGroup from '@/components/BInputGroup.vue'
import BInputGroupPrepend from '@/components/BInputGroupPrepend.vue'
import BButton from '@/components/BButton.vue'
import BInputGroupAppend from '@/components/BInputGroupAppend.vue'
import BInputGroupText from '@/components/BInputGroupText.vue'
import BFormSelect from '@/components/BFormSelect.vue'

const meta = {
  title: 'Components/FormRating',
  component: BFormRating,
  parameters: {
    vitest: {
      testFile: 'form-rating.spec.ts',
      testResults: vitestResults,
    },
  },
  argTypes: {

  },
} satisfies Meta<typeof BFormRating>

export default meta
          type Story = StoryObj<typeof meta>

export const Overview: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormRating },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-rating v-model="value"></b-form-rating>
    <p class="mt-2">Value: {{ value }}</p>
  </div>
`,

    data() {
      return {
        value: null,
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

export const Overview1: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormRating },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-rating v-model="value" readonly></b-form-rating>
    <p class="mt-2">Value: {{ value }}</p>
  </div>
`,

    data() {
      return {
        value: 2.567,
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

export const VariantAndColor: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormRating },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-rating v-model="value" variant="warning" class="mb-2"></b-form-rating>
    <b-form-rating v-model="value" variant="success" class="mb-2"></b-form-rating>
    <b-form-rating v-model="value" variant="danger" class="mb-2"></b-form-rating>
    <b-form-rating v-model="value" variant="primary" class="mb-2"></b-form-rating>
    <b-form-rating v-model="value" variant="info" class="mb-2"></b-form-rating>
    <p class="mt-2">Value: {{ value }}</p>
  </div>
`,

    data() {
      return {
        value: 3,
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

export const VariantAndColor1: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormRating },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-rating v-model="value" color="indigo" class="mb-2"></b-form-rating>
    <b-form-rating v-model="value" color="#ff00ff" class="mb-2"></b-form-rating>
    <b-form-rating v-model="value" color="rgb(64, 192, 128)" class="mb-2"></b-form-rating>
    <b-form-rating v-model="value" color="rgba(64, 192, 128, 0.75)" class="mb-2"></b-form-rating>
    <p class="mt-2">Value: {{ value }}</p>
  </div>
`,

    data() {
      return {
        value: null,
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

export const NumberOfStars: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormRating },
    props: Object.keys(argTypes),
    template: `
  <div>
    <label for="rating-10">Rating with 10 stars:</label>
    <b-form-rating id="rating-10" v-model="value10" stars="10"></b-form-rating>
    <p class="mt-2">Value: {{ value10 }}</p>

    <label for="rating-7">Rating with 7 stars:</label>
    <b-form-rating id="rating-7" v-model="value7" stars="7"></b-form-rating>
    <p class="mt-2">Value: {{ value7 }}</p>
  </div>
`,

    data() {
      return {
        value10: null,
        value7: null,
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

export const ShowValue: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormRating },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-rating v-model="value" show-value></b-form-rating>
    <p class="mt-2">Value: {{ value }}</p>
  </div>
`,

    data() {
      return {
        value: 4,
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

export const ShowValue1: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormRating },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-rating v-model="value" readonly show-value precision="2"></b-form-rating>
    <p class="mt-2">Value: {{ value }}</p>
  </div>
`,

    data() {
      return {
        value: 3.555,
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

export const ShowMaximumValue: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormRating },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-rating
      v-model="value"
      readonly
      show-value
      show-value-max
      precision="2"
    ></b-form-rating>
    <p class="mt-2">Value: {{ value }}</p>
  </div>
`,

    data() {
      return {
        value: 3.555,
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
    components: { BFormRating },
    props: Object.keys(argTypes),
    template: `
  <div>
    <label for="rating-sm">Small rating</label>
    <b-form-rating id="rating-sm" v-model="value" size="sm"></b-form-rating>

    <label for="rating-md" class="mt-3">Default rating (medium)</label>
    <b-form-rating id="rating-md" v-model="value"></b-form-rating>

    <label for="rating-lg" class="mt-3">Large rating</label>
    <b-form-rating id="rating-lg" v-model="value" size="lg"></b-form-rating>

    <p class="mt-2">Value: {{ value }}</p>
  </div>
`,

    data() {
      return {
        value: null,
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

export const InlineMode: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormRating },
    props: Object.keys(argTypes),
    template: `
  <div>
    <label for="rating-inline">Inline rating:</label>
    <b-form-rating id="rating-inline" inline value="4"></b-form-rating>
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

export const Borderless: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormRating },
    props: Object.keys(argTypes),
    template: `
  <div>
    <label for="rating-sm-no-border">Small rating with no border</label>
    <b-form-rating id="rating-sm-no-border" v-model="value" no-border size="sm"></b-form-rating>

    <label for="rating-md-no-border" class="mt-3">Default rating (medium) with no border</label>
    <b-form-rating id="rating-md-no-border" v-model="value" no-border></b-form-rating>

    <label for="rating-lg-no-border" class="mt-3">Large rating with no border</label>
    <b-form-rating id="rating-lg-no-border" v-model="value" no-border size="lg"></b-form-rating>

    <p class="mt-2">Value: {{ value }}</p>
  </div>
`,

    data() {
      return {
        value: null,
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

export const Disabled: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormRating },
    props: Object.keys(argTypes),
    template: `
  <div>
    <label for="rating-disabled">Disabled rating</label>
    <b-form-rating id="rating-disabled" value="2.75" disabled></b-form-rating>
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

export const Readonly: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormRating },
    props: Object.keys(argTypes),
    template: `
  <div>
    <label for="rating-readonly">Readonly rating</label>
    <b-form-rating
      id="rating-readonly"
      value="3.6536"
      readonly
      show-value
      precision="3"
    ></b-form-rating>
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

export const ClearButton: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormRating },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-rating v-model="value" show-clear show-value></b-form-rating>
    <p class="mt-2">Value: {{ value }}</p>
  </div>
`,

    data() {
      return {
        value: 2.5,
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

export const Icons: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormRating },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-rating
      icon-empty="heart"
      icon-half="heart-half"
      icon-full="heart-fill"
      icon-clear="slash-circle"
      show-clear
      variant="danger"
    ></b-form-rating>
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

export const UsingInInputGroups: Story = {
  render: (args, { argTypes }) => ({
    components: { BInputGroup, BInputGroupPrepend, BButton, BFormRating, BInputGroupAppend, BInputGroupText },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-input-group>
      <b-input-group-prepend>
        <b-button @click="value = null">Clear</b-button>
      </b-input-group-prepend>
      <b-form-rating v-model="value" color="#ff8800"></b-form-rating>
      <b-input-group-append>
        <b-input-group-text class="justify-content-center" style="min-width: 3em;">
          {{ value }}
        </b-input-group-text>
      </b-input-group-append>
    </b-input-group>
  </div>
`,

    data() {
      return {
        value: null,
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

export const Internationalization: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormSelect, BFormRating },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-select v-model="locale" :options="locales" class="mb-2"></b-form-select>
    <b-form-rating v-model="value" :locale="locale" show-value precision="1"></b-form-rating>
    <p class="mt-2">Value: {{ value }}</p>
  </div>
`,

    data() {
      return {
        value: 3.5,
        locale: 'en-US',
        locales: [
          { text: 'English US (en-US)', value: 'en-US' },
          { text: 'French (fr)', value: 'fr' },
          { text: 'Persian (fa)', value: 'fa' },
          { text: 'Arabic Egyptian (ar-EG)', value: 'ar-EG' },
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
