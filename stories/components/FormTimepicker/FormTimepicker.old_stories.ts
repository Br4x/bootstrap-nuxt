import type { Meta, StoryObj } from '@storybook/vue3'
import vitestResults from '@/tests/unit/results.json'
import BFormTimepicker from '@/components/BFormTimepicker.vue'
import BFormGroup from '@/components/BFormGroup.vue'
import BFormRadioGroup from '@/components/BFormRadioGroup.vue'
import BFormRadio from '@/components/BFormRadio.vue'
import BInputGroup from '@/components/BInputGroup.vue'
import BFormInput from '@/components/BFormInput.vue'
import BInputGroupAppend from '@/components/BInputGroupAppend.vue'
import BRow from '@/components/BRow.vue'
import BCol from '@/components/BCol.vue'
import BFormSelect from '@/components/BFormSelect.vue'

const meta = {
  title: 'Components/FormTimepicker',
  component: BFormTimepicker,
  parameters: {
    vitest: {
      testFile: 'form-timepicker.spec.ts',
      testResults: vitestResults,
    },
  },
  argTypes: {

  },
} satisfies Meta<typeof BFormTimepicker>

export default meta
          type Story = StoryObj<typeof meta>

export const Overview: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormTimepicker },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-timepicker v-model="value" locale="en"></b-form-timepicker>
    <div class="mt-2">Value: '{{ value }}'</div>
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

export const DisabledAndReadonlyStates: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormGroup, BFormRadioGroup, BFormRadio, BFormTimepicker },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-group
      label="Select time picker interactive state"
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

    <b-form-timepicker
      id="ex-disabled-readonly"
      :disabled="disabled"
      :readonly="readonly"
    ></b-form-timepicker>
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

export const ValidationStates: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormTimepicker },
    props: Object.keys(argTypes),
    template: `
  <div>
    <label for="timepicker-invalid">Choose a time (invalid style)</label>
    <b-form-timepicker id="datepicker-invalid" :state="false" class="mb-2"></b-form-timepicker>

    <label for="timepicker-valid">Choose a time (valid style)</label>
    <b-form-timepicker id="datepicker-valid" :state="true"></b-form-timepicker>
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

export const EnablingOfSecondsSpinbutton: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormTimepicker },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-timepicker v-model="value" show-seconds locale="en"></b-form-timepicker>
    <div class="mt-2">Value: '{{ value }}'</div>
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

export const ControlSizing: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormTimepicker },
    props: Object.keys(argTypes),
    template: `
  <div>
    <label for="timepicker-sm">Small time picker</label>
    <b-form-timepicker id="timepicker-sm" size="sm" locale="en" class="mb-2"></b-form-timepicker>

    <label for="timepicker-lg">Large time picker</label>
    <b-form-timepicker id="timepicker-lg" size="lg" locale="en"></b-form-timepicker>
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

export const Placeholder: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormTimepicker },
    props: Object.keys(argTypes),
    template: `
  <div>
    <label for="timepicker-placeholder">Time picker with placeholder</label>
    <b-form-timepicker id="timepicker-placeholder" placeholder="Choose a time" locale="en"></b-form-timepicker>
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

export const OptionalControls: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormTimepicker },
    props: Object.keys(argTypes),
    template: `
  <div>
    <label for="timepicker-buttons">Time picker with optional footer buttons</label>
    <b-form-timepicker
      id="timepicker-buttons"
      now-button
      reset-button
      locale="en"
    ></b-form-timepicker>
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

export const ButtonOnlyMode: Story = {
  render: (args, { argTypes }) => ({
    components: { BInputGroup, BFormInput, BInputGroupAppend, BFormTimepicker },
    props: Object.keys(argTypes),
    template: `
  <div>
    <label for="example-input">Choose a time</label>
    <b-input-group class="mb-3">
      <b-form-input
        id="example-input"
        v-model="value"
        type="text"
        placeholder="HH:mm:ss"
      ></b-form-input>
      <b-input-group-append>
        <b-form-timepicker
          v-model="value"
          button-only
          right
          show-seconds
          locale="en"
          aria-controls="example-input"
        ></b-form-timepicker>
      </b-input-group-append>
    </b-input-group>
    <p>Value: '{{ value }}'</p>
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

export const Internationalization: Story = {
  render: (args, { argTypes }) => ({
    components: { BRow, BCol, BFormSelect, BFormTimepicker },
    props: Object.keys(argTypes),
    template: `
  <b-row>
    <b-col cols="12" class="mb-3">
      <label for="example-locales">Locale:</label>
      <b-form-select id="example-locales" v-model="locale" :options="locales"></b-form-select>
    </b-col>
    <b-col md="6">
      <b-form-timepicker
        v-model="value"
        v-bind="labels[locale] || {}"
        :locale="locale"
        show-seconds
        @context="onContext"
      ></b-form-timepicker>
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
            labelCloseButton: 'Schließen',
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
            labelCloseButton: 'قريب',
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
            labelCloseButton: '关',
          },
        },
      }
    },
    methods: {
      onContext(ctx) {
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
