import type { Meta, StoryObj } from '@storybook/vue3'
import vitestResults from '@/tests/unit/results.json'
import BRow from '@/components/BRow.vue'
import BCol from '@/components/BCol.vue'
import BCalendar from '@/components/BCalendar.vue'
import BFormGroup from '@/components/BFormGroup.vue'
import BFormRadioGroup from '@/components/BFormRadioGroup.vue'
import BFormRadio from '@/components/BFormRadio.vue'
import BButton from '@/components/BButton.vue'
import BFormSelect from '@/components/BFormSelect.vue'
import BFormCheckbox from '@/components/BFormCheckbox.vue'

const meta = {
  title: 'Components/Calendar',
  component: BCalendar,
  parameters: {
    vitest: {
      testFile: 'calendar.spec.ts',
      testResults: vitestResults,
    },
  },
  argTypes: {

  },
} satisfies Meta<typeof BCalendar>

export default meta
          type Story = StoryObj<typeof meta>

export const Overview: Story = {
  render: (args, { argTypes }) => ({
    components: { BRow, BCol, BCalendar },
    props: Object.keys(argTypes),
    template: `
  <b-row>
    <b-col md="auto">
      <b-calendar v-model="value" @context="onContext" locale="en-US"></b-calendar>
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

export const DisabledAndReadonlyStates: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormGroup, BFormRadioGroup, BFormRadio, BCalendar },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-group label="Select calendar interactive state" v-slot="{ ariaDescribedby }">
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

    <b-calendar
      id="ex-disabled-readonly"
      :disabled="disabled"
      :readonly="readonly"
    ></b-calendar>
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
    components: { BCalendar },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-calendar v-model="value" :min="min" :max="max" locale="en"></b-calendar>
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
    components: { BCalendar },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-calendar v-model="value" :date-disabled-fn="dateDisabled" locale="en"></b-calendar>
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

export const Variants: Story = {
  render: (args, { argTypes }) => ({
    components: { BCalendar },
    props: Object.keys(argTypes),
    template: `
  <b-calendar
    selected-variant="success"
    today-variant="info"
    nav-button-variant="primary"
  ></b-calendar>
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const Width: Story = {
  render: (args, { argTypes }) => ({
    components: { BCalendar },
    props: Object.keys(argTypes),
    template: `
  <b-calendar block locale="en-US"></b-calendar>
`,

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
    components: { BCalendar },
    props: Object.keys(argTypes),
    template: `
  <div>
    <p>Custom date format:</p>
    <b-calendar
      :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }"
      locale="en"
    ></b-calendar>
    <p class="mt-3">Short date format:</p>
    <b-calendar
      :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
      locale="en"
    ></b-calendar>
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

export const BorderAndPadding: Story = {
  render: (args, { argTypes }) => ({
    components: { BCalendar },
    props: Object.keys(argTypes),
    template: `
  <b-calendar class="border rounded p-2" locale="en"></b-calendar>
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
    components: { BCalendar, BButton },
    props: Object.keys(argTypes),
    template: `
  <b-calendar v-model="value" value-as-date locale="en">
    <div class="d-flex" dir="ltr">
      <b-button
        size="sm"
        variant="outline-danger"
        v-if="value"
        @click="clearDate"
      >
        Clear date
      </b-button>
      <b-button
        size="sm"
        variant="outline-primary"
        class="ml-auto"
        @click="setToday"
      >
        Set Today
      </b-button>
    </div>
  </b-calendar>
`,

    data() {
      return {
        value: null,
      }
    },
    methods: {
      setToday() {
        const now = new Date()
        this.value = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      },
      clearDate() {
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

export const AddingCssClassesToSpecificDates: Story = {
  render: (args, { argTypes }) => ({
    components: { BCalendar },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-calendar v-model="value" :date-info-fn="dateClass" locale="en"></b-calendar>
  </div>
`,

    data() {
      return {
        value: '',
      }
    },
    methods: {
      dateClass(ymd, date) {
        const day = date.getDate()
        return day >= 10 && day <= 20 ? 'table-info' : ''
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
    components: { BRow, BCol, BFormSelect, BFormCheckbox, BCalendar },
    props: Object.keys(argTypes),
    template: `
  <b-row>
    <b-col cols="12" class="mb-3">
      <label for="example-locales">Locale:</label>
      <b-form-select id="example-locales" v-model="locale" :options="locales"></b-form-select>
      <label for="example-weekdays" class="mt-2">Start weekday:</label>
      <b-form-select id="example-weekdays" v-model="weekday" :options="weekdays"></b-form-select>
      <b-form-checkbox v-model="showDecadeNav" switch inline class="my-2">
        Show decade navigation buttons
      </b-form-checkbox>
      <b-form-checkbox v-model="hideHeader" switch inline class="my-2">
        Hide the date header
      </b-form-checkbox>
    </b-col>
    <b-col md="auto">
      <b-calendar
        v-model="value"
        v-bind="labels[locale] || {}"
        :locale="locale"
        :start-weekday="weekday"
        :hide-header="hideHeader"
        :show-decade-nav="showDecadeNav"
        @context="onContext"
      ></b-calendar>
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
        showDecadeNav: false,
        hideHeader: false,
        locale: 'en-US',
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
