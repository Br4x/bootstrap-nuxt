import type { Meta, StoryObj } from '@storybook/vue3'
import vitestResults from '@/tests/unit/results.json'
import BFormDatepicker from '@/components/BFormDatepicker.vue'
import BFormGroup from '@/components/BFormGroup.vue'
import BFormRadioGroup from '@/components/BFormRadioGroup.vue'
import BFormRadio from '@/components/BFormRadio.vue'
import BInputGroup from '@/components/BInputGroup.vue'
import BFormInput from '@/components/BFormInput.vue'
import BInputGroupAppend from '@/components/BInputGroupAppend.vue'
import BFormSelect from '@/components/BFormSelect.vue'
import BFormCheckbox from '@/components/BFormCheckbox.vue'

const meta = {
  title: 'Components/FormDatepicker',
  component: BFormDatepicker,
  parameters: {
    vitest: {
      testFile: 'form-datepicker.spec.ts',
      testResults: vitestResults,
    },
  },
  argTypes: {

  },
} satisfies Meta<typeof BFormDatepicker>

export default meta
          type Story = StoryObj<typeof meta>

export const Overview: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormDatepicker },
    props: Object.keys(argTypes),
    template: `
  <div>
    <label for="example-datepicker">Choose a date</label>
    <b-form-datepicker id="example-datepicker" v-model="value" class="mb-2"></b-form-datepicker>
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

export const DisabledAndReadonlyStates: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormGroup, BFormRadioGroup, BFormRadio, BFormDatepicker },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-group
      label="Select date picker interactive state"
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

    <b-form-datepicker
      id="ex-disabled-readonly"
      :disabled="disabled"
      :readonly="readonly"
    ></b-form-datepicker>
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

export const MinimumAndMaximumDates: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormDatepicker },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-datepicker v-model="value" :min="min" :max="max" locale="en"></b-form-datepicker>
  </div>
`,

    data() {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      // 15th two months prior
      const minDate = new Date(today)
      minDate.setMonth(minDate.getMonth() - 2)
      minDate.setDate(15)
      // 15th in two months
      const maxDate = new Date(today)
      maxDate.setMonth(maxDate.getMonth() + 2)
      maxDate.setDate(15)

      return {
        value: '',
        min: minDate,
        max: maxDate,
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

export const DisablingDates: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormDatepicker },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-datepicker v-model="value" :date-disabled-fn="dateDisabled" locale="en"></b-form-datepicker>
  </div>
`,

    data() {
      return {
        value: '',
      }
    },
    methods: {
      dateDisabled(ymd, date) {
        // Disable weekends (Sunday = `0`, Saturday = `6`) and
        // disable days that fall on the 13th of the month
        const weekday = date.getDay()
        const day = date.getDate()
        // Return `true` if the date should be disabled
        return weekday === 0 || weekday === 6 || day === 13
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
    components: { BFormDatepicker },
    props: Object.keys(argTypes),
    template: `
  <div>
    <label for="datepicker-invalid">Choose a date (invalid style)</label>
    <b-form-datepicker id="datepicker-invalid" :state="false" class="mb-2"></b-form-datepicker>
    <label for="datepicker-valid">Choose a date (valid style)</label>
    <b-form-datepicker id="datepicker-valid" :state="true"></b-form-datepicker>
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

export const ControlSizing: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormDatepicker },
    props: Object.keys(argTypes),
    template: `
  <div>
    <label for="datepicker-sm">Small date picker</label>
    <b-form-datepicker id="datepicker-sm" size="sm" locale="en" class="mb-2"></b-form-datepicker>
    <label for="datepicker-lg">Large date picker</label>
    <b-form-datepicker id="datepicker-lg" size="lg" locale="en"></b-form-datepicker>
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
    components: { BFormDatepicker },
    props: Object.keys(argTypes),
    template: `
  <div>
    <label for="datepicker-placeholder">Date picker with placeholder</label>
    <b-form-datepicker id="datepicker-placeholder" placeholder="Choose a date" locale="en"></b-form-datepicker>
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
    components: { BFormDatepicker },
    props: Object.keys(argTypes),
    template: `
  <div>
    <label for="datepicker-buttons">Date picker with optional footer buttons</label>
    <b-form-datepicker
      id="datepicker-buttons"
      today-button
      reset-button
      close-button
      locale="en"
    ></b-form-datepicker>
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
    components: { BInputGroup, BFormInput, BInputGroupAppend, BFormDatepicker },
    props: Object.keys(argTypes),
    template: `
  <div>
    <label for="example-input">Choose a date</label>
    <b-input-group class="mb-3">
      <b-form-input
        id="example-input"
        v-model="value"
        type="text"
        placeholder="YYYY-MM-DD"
        autocomplete="off"
      ></b-form-input>
      <b-input-group-append>
        <b-form-datepicker
          v-model="value"
          button-only
          right
          locale="en-US"
          aria-controls="example-input"
          @context="onContext"
        ></b-form-datepicker>
      </b-input-group-append>
    </b-input-group>
    <p class="mb-1">Value: '{{ value }}'</p>
    <p class="mb-1">Selected: '{{ selected }}'</p>
    <p>Formatted: '{{ formatted }}'</p>
  </div>
`,

    data() {
      return {
        value: '',
        formatted: '',
        selected: '',
      }
    },
    methods: {
      onContext(ctx) {
        // The date formatted in the locale, or the `label-no-date-selected` string
        this.formatted = ctx.selectedFormatted
        // The following will be an empty string until a valid date is entered
        this.selected = ctx.selectedYMD
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

export const DateStringFormat: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormDatepicker },
    props: Object.keys(argTypes),
    template: `
  <div>
    <label for="datepicker-dateformat1">Custom date format</label>
    <b-form-datepicker
      id="datepicker-dateformat1"
      :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }"
      locale="en"
    ></b-form-datepicker>

    <label class="mt-3" for="datepicker-dateformat2">Short date format</label>
    <b-form-datepicker
      id="datepicker-dateformat2"
      :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
      locale="en"
    ></b-form-datepicker>
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

export const FullWidthCalendarDropdown: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormDatepicker },
    props: Object.keys(argTypes),
    template: `
  <div>
    <label for="datepicker-full-width">Choose a date</label>
    <b-form-datepicker
      id="datepicker-full-width"
      v-model="value"
      menu-class="w-100"
      calendar-width="100%"
      class="mb-2"
    ></b-form-datepicker>
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
    components: { BFormSelect, BFormCheckbox, BFormDatepicker },
    props: Object.keys(argTypes),
    template: `
  <div>
    <label for="example-locales">Locale:</label>
    <b-form-select id="example-locales" v-model="locale" :options="locales" class="mb-2"></b-form-select>

    <label for="example-weekdays">Start weekday:</label>
    <b-form-select id="example-weekdays" v-model="weekday" :options="weekdays" class="mb-2"></b-form-select>

    <div>
      <b-form-checkbox v-model="showDecadeNav" switch inline class="my-2">
        Show decade navigation buttons
      </b-form-checkbox>

      <b-form-checkbox v-model="hideHeader" switch inline class="my-2">
        Hide calendar header
      </b-form-checkbox>
    </div>

    <label for="example-i18n-picker">Date picker:</label>
    <b-form-datepicker
      id="example-i18n-picker"
      v-model="value"
      v-bind="labels[locale] || {}"
      :locale="locale"
      :start-weekday="weekday"
      :show-decade-nav="showDecadeNav"
      :hide-header="hideHeader"
      class="mb-2"
     ></b-form-datepicker>
     <p>Value: <b>'{{ value }}'</b></p>
   </div>
`,

    data() {
      return {
        value: '',
        locale: 'en-US',
        showDecadeNav: false,
        hideHeader: false,
        locales: [
          { value: 'en-US', text: 'English US (en-US)' },
          { value: 'de', text: 'German (de)' },
          { value: 'ar-EG', text: 'Arabic Egyptian (ar-EG)' },
          { value: 'zh', text: 'Chinese (zh)' },
        ],
        weekday: 0,
        weekdays: [
          { value: 0, text: 'Sunday' },
          { value: 1, text: 'Monday' },
          { value: 6, text: 'Saturday' },
        ],
        labels: {
          'de': {
            labelPrevDecade: 'Vorheriges Jahrzehnt',
            labelPrevYear: 'Vorheriges Jahr',
            labelPrevMonth: 'Vorheriger Monat',
            labelCurrentMonth: 'Aktueller Monat',
            labelNextMonth: 'Nächster Monat',
            labelNextYear: 'Nächstes Jahr',
            labelNextDecade: 'Nächstes Jahrzehnt',
            labelToday: 'Heute',
            labelSelected: 'Ausgewähltes Datum',
            labelNoDateSelected: 'Kein Datum gewählt',
            labelCalendar: 'Kalender',
            labelNav: 'Kalendernavigation',
            labelHelp: 'Mit den Pfeiltasten durch den Kalender navigieren',
          },
          'ar-EG': {
            weekdayHeaderFormat: 'narrow',
            labelPrevDecade: 'العقد السابق',
            labelPrevYear: 'العام السابق',
            labelPrevMonth: 'الشهر السابق',
            labelCurrentMonth: 'الشهر الحالي',
            labelNextMonth: 'الشهر المقبل',
            labelNextYear: 'العام المقبل',
            labelNextDecade: 'العقد القادم',
            labelToday: 'اليوم',
            labelSelected: 'التاريخ المحدد',
            labelNoDateSelected: 'لم يتم اختيار تاريخ',
            labelCalendar: 'التقويم',
            labelNav: 'الملاحة التقويم',
            labelHelp: 'استخدم مفاتيح المؤشر للتنقل في التواريخ',
          },
          'zh': {
            weekdayHeaderFormat: 'narrow',
            labelPrevDecade: '过去十年',
            labelPrevYear: '上一年',
            labelPrevMonth: '上个月',
            labelCurrentMonth: '当前月份',
            labelNextMonth: '下个月',
            labelNextYear: '明年',
            labelNextDecade: '下一个十年',
            labelToday: '今天',
            labelSelected: '选定日期',
            labelNoDateSelected: '未选择日期',
            labelCalendar: '日历',
            labelNav: '日历导航',
            labelHelp: '使用光标键浏览日期',
          },
        },
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
