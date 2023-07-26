import type { Meta, StoryObj } from '@storybook/vue3'
import vitestResults from '@/tests/unit/results.json'
import BRow from '@/components/B/Row.vue'
import BCol from '@/components/B/Col.vue'
import BTime from '@/components/B/Time.vue'
import BFormGroup from '@/components/B/FormGroup.vue'
import BFormRadioGroup from '@/components/B/FormRadioGroup.vue'
import BFormRadio from '@/components/B/FormRadio.vue'
import BButton from '@/components/B/Button.vue'
import BFormSelect from '@/components/B/FormSelect.vue'

const meta = {
  title: 'Components/Time',
  component: BTime,
  parameters: {
    vitest: {
      testFile: 'time.test.tsx',
      testResults: vitestResults,
    },
  },
  argTypes: {

  },
} satisfies Meta<typeof BTime>

export default meta
          type Story = StoryObj<typeof meta>

export const Overview: Story = {
  render: (args, { argTypes }) => ({
    components: { BRow, BCol, BTime },
    props: Object.keys(argTypes),
    template: `
  <b-row>
    <b-col md="auto">
      <b-time v-model="value" locale="en" @context="onContext"></b-time>
    </b-col>
    <b-col>
      <p>Value: <b>'{{ value }}'</b></p>
      <p class="mb-0">Context:</p>
      <pre class="small">{{ context }}</pre>
    </b-col>
  </b-row>
`,

    data() {
      return {
        value: '',
        context: null,
      }
    },
    methods: {
      onContext(ctx: any) {
        this.context = ctx
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
    components: { BFormGroup, BFormRadioGroup, BFormRadio, BTime },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-group
      label="Select time interactive state"
      v-slot="{ ariaDescribedby }"
    >
      <b-form-radio-group
        v-model="state"
        :aria-describedby="ariaDescribedby"
        aria-controls="ex-disabled-readonly"
      >
        <b-form-radio value="disabled">Disabled</b-form-radio>
        <b-form-radio value="readonly">Readonly</b-form-radio>
        <b-form-radio value="normal">Normal</b-form-radio>
      </b-form-radio-group>
    </b-form-group>

    <b-time
      id="ex-disabled-readonly"
      :disabled="disabled"
      :readonly="readonly"
    ></b-time>
  </div>
`,

    data() {
      return {
        state: 'disabled',
      }
    },
    computed: {
      disabled() {
        return this.state === 'disabled'
      },
      readonly() {
        return this.state === 'readonly'
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

export const EnablingOfSecondsSpinbutton: Story = {
  render: (args, { argTypes }) => ({
    components: { BTime },
    props: Object.keys(argTypes),
    template: `
  <b-time v-model="value" show-seconds locale="en"></b-time>
  <div class="mt-2">Value: '{{ value }}'</div>
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

export const BorderAndPadding: Story = {
  render: (args, { argTypes }) => ({
    components: { BTime },
    props: Object.keys(argTypes),
    template: `
  <b-time class="border rounded p-2" locale="en"></b-time>
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const DefaultSlot: Story = {
  render: (args, { argTypes }) => ({
    components: { BTime, BButton },
    props: Object.keys(argTypes),
    template: `
  <b-time v-model="value" show-seconds locale="en">
    <div class="d-flex" dir="ltr">
      <b-button
        size="sm"
        variant="outline-danger"
        v-if="value"
        @click="clearTime"
      >
        Clear time
      </b-button>
      <b-button
        size="sm"
        variant="outline-primary"
        class="ml-auto"
        @click="setNow"
      >
        Set Now
      </b-button>
    </div>
  </b-time>
`,

    data() {
      return {
        value: null,
      }
    },
    methods: {
      setNow() {
        const now = new Date()
        // Grab the HH:mm:ss part of the time string
        this.value = now.toTimeString().slice(0, 8)
      },
      clearTime() {
        this.value = ''
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

export const Internationalization: Story = {
  render: (args, { argTypes }) => ({
    components: { BRow, BCol, BFormSelect, BTime },
    props: Object.keys(argTypes),
    template: `
  <b-row>
    <b-col cols="12" class="mb-3">
      <label for="example-locales">Locale:</label>
      <b-form-select id="example-locales" v-model="locale" :options="locales"></b-form-select>
    </b-col>
    <b-col md="auto">
      <b-time
        v-model="value"
        v-bind="labels[locale] || {}"
        :locale="locale"
        show-seconds
        @context="onContext"
      ></b-time>
    </b-col>
    <b-col>
      <p>Value: <b>'{{ value }}'</b></p>
      <p class="mb-0">Context:</p>
      <pre class="small">{{ context }}</pre>
   </b-col>
  </b-row>
`,

    data() {
      return {
        value: '',
        context: null,
        locale: 'en-US',
        locales: [
          { value: 'en-US', text: 'English US (en-US)' },
          { value: 'de', text: 'German (de)' },
          { value: 'ar-EG', text: 'Arabic Egyptian (ar-EG)' },
          { value: 'zh', text: 'Chinese (zh)' },
        ],
        labels: {
          'de': {
            labelHours: 'Stunden',
            labelMinutes: 'Minuten',
            labelSeconds: 'Sekunden',
            labelIncrement: 'Erhöhen',
            labelDecrement: 'Verringern',
            labelSelected: 'Ausgewählte Zeit',
            labelNoTimeSelected: 'Keine Zeit ausgewählt',
          },
          'ar-EG': {
            labelHours: 'ساعات',
            labelMinutes: 'الدقائق',
            labelSeconds: 'ثواني',
            labelAmpm: 'صباحا مساء',
            labelAm: 'ص',
            labelPm: 'م',
            labelIncrement: 'زيادة',
            labelDecrement: 'إنقاص',
            labelSelected: 'الوقت المحدد',
            labelNoTimeSelected: 'لا وقت المختار',
          },
          'zh': {
            labelHours: '小时',
            labelMinutes: '分钟',
            labelSeconds: '秒',
            labelAmpm: '上午下午',
            labelAm: '上午',
            labelPm: '下午',
            labelIncrement: '增量',
            labelDecrement: '减量',
            labelSelected: '选定时间',
            labelNoTimeSelected: '没有选择时间',
          },
        },
      }
    },
    methods: {
      onContext(ctx: any) {
        this.context = ctx
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
