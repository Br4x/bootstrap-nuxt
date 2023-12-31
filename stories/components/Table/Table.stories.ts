import type { Meta, StoryObj } from '@storybook/vue3'
import vitestResults from '@/tests/unit/results.json'
import BTable from '@/components/BTable.vue'
import BFormGroup from '@/components/BFormGroup.vue'
import BFormCheckbox from '@/components/BFormCheckbox.vue'
import BFormRadioGroup from '@/components/BFormRadioGroup.vue'
import BFormRadio from '@/components/BFormRadio.vue'
import BFormSelect from '@/components/BFormSelect.vue'
import BButton from '@/components/BButton.vue'
import BSpinner from '@/components/BSpinner.vue'
import BTr from '@/components/BTr.vue'
import BTh from '@/components/BTh.vue'
import BCard from '@/components/BCard.vue'
import BRow from '@/components/BRow.vue'
import BCol from '@/components/BCol.vue'
import BTableSimple from '@/components/BTableSimple.vue'
import BThead from '@/components/BThead.vue'
import BTbody from '@/components/BTbody.vue'
import BTd from '@/components/BTd.vue'
import BTfoot from '@/components/BTfoot.vue'
import BContainer from '@/components/BContainer.vue'
import BInputGroup from '@/components/BInputGroup.vue'
import BFormInput from '@/components/BFormInput.vue'
import BInputGroupAppend from '@/components/BInputGroupAppend.vue'
import BFormCheckboxGroup from '@/components/BFormCheckboxGroup.vue'
import BPagination from '@/components/BPagination.vue'
import BModal from '@/components/BModal.vue'

const meta = {
  title: 'Components/Table',
  component: BTable,
  parameters: {
    vitest: {
      testFile: 'table.spec.ts',
      testResults: vitestResults,
    },
  },
  argTypes: {

  },
} satisfies Meta<typeof BTable>

export default meta
type Story = StoryObj<typeof meta>

export const Table: Story = {
  render: (args, { argTypes }) => ({
    components: { BTable },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-table striped hover :items="items" />
  </div>
`,

    data() {
      return {
        items: [
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { age: 38, first_name: 'Jami', last_name: 'Carney' },
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

export const ItemsRecordData: Story = {
  render: (args, { argTypes }) => ({
    components: { BTable },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-table hover :items="items" />
  </div>
`,

    data() {
      return {
        items: [
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          {
            age: 89,
            first_name: 'Geneva',
            last_name: 'Wilson',
            _rowVariant: 'danger',
          },
          {
            age: 40,
            first_name: 'Thor',
            last_name: 'MacDonald',
            _cellVariants: { age: 'info', first_name: 'warning' },
          },
          { age: 29, first_name: 'Dick', last_name: 'Dunlap' },
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

export const FieldsAsASimpleArray: Story = {
  render: (args, { argTypes }) => ({
    components: { BTable },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-table striped hover :items="items" :fields="fields" />
  </div>
`,

    data() {
      return {
        // Note `isActive` is left out and will not appear in the rendered table
        fields: ['first_name', 'last_name', 'age'],
        items: [
          { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' },
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

export const FieldsAsAnArrayOfObjects: Story = {
  render: (args, { argTypes }) => ({
    components: { BTable },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-table striped hover :items="items" :fields="fields" />
  </div>
`,

    data() {
      return {
        // Note 'isActive' is left out and will not appear in the rendered table
        fields: [
          {
            key: 'last_name',
            sortable: true,
          },
          {
            key: 'first_name',
            sortable: false,
          },
          {
            key: 'age',
            label: 'Person age',
            sortable: true,
            // Variant applies to the whole column, including the header and footer
            variant: 'danger',
          },
        ],
        items: [
          { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' },
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

export const TableStyling: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormGroup, BFormCheckbox, BFormRadioGroup, BFormRadio, BFormSelect, BTable },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-group label="Table Options" label-cols-lg="2" v-slot="{ ariaDescribedby }">
      <b-form-checkbox v-model="striped" :aria-describedby="ariaDescribedby" inline>Striped</b-form-checkbox>
      <b-form-checkbox v-model="bordered" :aria-describedby="ariaDescribedby" inline>Bordered</b-form-checkbox>
      <b-form-checkbox v-model="borderless" :aria-describedby="ariaDescribedby" inline>Borderless</b-form-checkbox>
      <b-form-checkbox v-model="outlined" :aria-describedby="ariaDescribedby" inline>Outlined</b-form-checkbox>
      <b-form-checkbox v-model="small" :aria-describedby="ariaDescribedby" inline>Small</b-form-checkbox>
      <b-form-checkbox v-model="hover" :aria-describedby="ariaDescribedby" inline>Hover</b-form-checkbox>
      <b-form-checkbox v-model="dark" :aria-describedby="ariaDescribedby" inline>Dark</b-form-checkbox>
      <b-form-checkbox v-model="fixed" :aria-describedby="ariaDescribedby" inline>Fixed</b-form-checkbox>
      <b-form-checkbox v-model="footClone" :aria-describedby="ariaDescribedby" inline>Foot Clone</b-form-checkbox>
      <b-form-checkbox v-model="noCollapse" :aria-describedby="ariaDescribedby" inline>No border collapse</b-form-checkbox>
    </b-form-group>

    <b-form-group label="Head Variant" label-cols-lg="2" v-slot="{ ariaDescribedby }">
      <b-form-radio-group
        v-model="headVariant"
        :aria-describedby="ariaDescribedby"
        class="mt-lg-2"
      >
        <b-form-radio :value="null" inline>None</b-form-radio>
        <b-form-radio value="light" inline>Light</b-form-radio>
        <b-form-radio value="dark" inline>Dark</b-form-radio>
      </b-form-radio-group>
    </b-form-group>

    <b-form-group label="Table Variant" label-for="table-style-variant" label-cols-lg="2">
      <b-form-select
        id="table-style-variant"
        v-model="tableVariant"
        :options="tableVariants"
      >
        <template #first>
          <option value="">-- None --</option>
          </template>
      </b-form-select>
    </b-form-group>

    <b-table
      :striped="striped"
      :bordered="bordered"
      :borderless="borderless"
      :outlined="outlined"
      :small="small"
      :hover="hover"
      :dark="dark"
      :fixed="fixed"
      :foot-clone="footClone"
      :no-border-collapse="noCollapse"
      :items="items"
      :fields="fields"
      :head-variant="headVariant"
      :table-variant="tableVariant"
     />
  </div>
        `,

    data() {
      return {
        fields: ['first_name', 'last_name', 'age'],
        items: [
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
        ],
        tableVariants: [
          'primary',
          'secondary',
          'info',
          'danger',
          'warning',
          'success',
          'light',
          'dark',
        ],
        striped: false,
        bordered: false,
        borderless: false,
        outlined: false,
        small: false,
        hover: false,
        dark: false,
        fixed: false,
        footClone: false,
        headVariant: null,
        tableVariant: '',
        noCollapse: false,
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

export const RowStylingAndAttributes: Story = {
  render: (args, { argTypes }) => ({
    components: { BTable },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-table :items="items" :fields="fields" :tbody-tr-class="rowClass" />
  </div>
`,

    data() {
      return {
        fields: ['first_name', 'last_name', 'age'],
        items: [
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald', status: 'awesome' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
        ],
      }
    },
    methods: {
      rowClass(item: { status: string }, type: string) {
        if (!item || type !== 'row')
          return
        if (item.status === 'awesome')
          return 'table-success'
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

export const ResponsiveTables: Story = {
  render: (args, { argTypes }) => ({
    components: { BTable },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-table responsive :items="items" />
  </div>
`,

    data() {
      return {
        items: [
          {
            heading1: 'table cell',
            heading2: 'table cell',
            heading3: 'table cell',
            heading4: 'table cell',
            heading5: 'table cell',
            heading6: 'table cell',
            heading7: 'table cell',
            heading8: 'table cell',
            heading9: 'table cell',
            heading10: 'table cell',
            heading11: 'table cell',
            heading12: 'table cell',
          },
          {
            heading1: 'table cell',
            heading2: 'table cell',
            heading3: 'table cell',
            heading4: 'table cell',
            heading5: 'table cell',
            heading6: 'table cell',
            heading7: 'table cell',
            heading8: 'table cell',
            heading9: 'table cell',
            heading10: 'table cell',
            heading11: 'table cell',
            heading12: 'table cell',
          },
          {
            heading1: 'table cell',
            heading2: 'table cell',
            heading3: 'table cell',
            heading4: 'table cell',
            heading5: 'table cell',
            heading6: 'table cell',
            heading7: 'table cell',
            heading8: 'table cell',
            heading9: 'table cell',
            heading10: 'table cell',
            heading11: 'table cell',
            heading12: 'table cell',
          },
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

export const StackedTables: Story = {
  render: (args, { argTypes }) => ({
    components: { BTable },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-table stacked :items="items" />
  </div>
`,

    data() {
      return {
        items: [
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
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

export const TableCaption: Story = {
  render: (args, { argTypes }) => ({
    components: { BTable },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-table :items="items" :fields="fields">
      <template #table-caption>This is a table caption.</template>
      </b-table>
    </div>`,

    data() {
      return {
        fields: ['first_name', 'last_name', 'age'],
        items: [
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
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

export const TableCaption1: Story = {
  render: (args, { argTypes }) => ({
    components: { BTable },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-table :items="items" :fields="fields" caption-top>
      <template #table-caption>This is a table caption at the top.</template>
      </b-table>
    </div>`,

    data() {
      return {
        fields: ['first_name', 'last_name', 'age'],
        items: [
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
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

export const TableColgroup: Story = {
  render: (args, { argTypes }) => ({
    components: { BTable },
    props: Object.keys(argTypes),
    template: `
    <b-table fixed responsive :items="items" :fields="fields">
    <template #table-colgroup="scope">
      <col
        v-for="field in scope.fields"
        :key="field.key"
        :style="{ width: field.key === 'foo' ? '120px' : '180px' }"
      />
    </template>
    <!-- additional table slots here if needed -->
  </b-table>
`,
    data() {
      return {
        fields: ['first_name', 'last_name', 'foo'],
        items: [
          { foo: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { foo: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { foo: 89, first_name: 'Geneva', last_name: 'Wilson' },
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

export const TableBusyState: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BTable, BSpinner },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-button @click="toggleBusy">Toggle Busy State</b-button>

    <b-table :items="items" :busy="isBusy" class="mt-3" outlined>
      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
        </template>
        </b-table>
      </div>
      `,

    data() {
      return {
        isBusy: false,
        items: [
          { first_name: 'Dickerson', last_name: 'MacDonald', age: 40 },
          { first_name: 'Larsen', last_name: 'Shaw', age: 21 },
          { first_name: 'Geneva', last_name: 'Wilson', age: 89 },
          { first_name: 'Jami', last_name: 'Carney', age: 38 },
        ],
      }
    },
    methods: {
      toggleBusy() {
        this.isBusy = !this.isBusy
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

export const ScopedFieldSlots: Story = {
  render: (args, { argTypes }) => ({
    components: { BTable },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-table small :fields="fields" :items="items" responsive="sm">
      
      <template #cell(index)="data">
        {{ data.index + 1 }}
        </template>

      <!-- A custom formatted column -->
      <template #cell(name)="data">
        <b class="text-info">{{ data.value.last.toUpperCase() }}</b>, <b>{{ data.value.first }}</b>
      </template>

      <!-- A virtual composite column -->
      <template #cell(nameage)="data">
        {{ data.item.name.first }} is {{ data.item.age }} years old
      </template>

      <!-- Optional default data cell scoped slot -->
      <template #cell()="data">
        <i>{{ data.value }}</i>
      </template>
    </b-table>
  </div>
      `,

    data() {
      return {
        fields: [
          // A virtual column that doesn't exist in items
          'index',
          // A column that needs custom formatting
          { key: 'name', label: 'Full Name' },
          // A regular column
          'age',
          // A regular column
          'sex',
          // A virtual column made up from two fields
          { key: 'nameage', label: 'First name and age' },
        ],
        items: [
          { name: { first: 'John', last: 'Doe' }, sex: 'Male', age: 42 },
          { name: { first: 'Jane', last: 'Doe' }, sex: 'Female', age: 36 },
          { name: { first: 'Rubin', last: 'Kincade' }, sex: 'Male', age: 73 },
          { name: { first: 'Shirley', last: 'Partridge' }, sex: 'Female', age: 62 },
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

export const DisplayingRawHtml: Story = {
  render: (args, { argTypes }) => ({
    components: { BTable },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-table :items="items">
      <template #cell(html)="data">
        <span v-html="data.value" />
        </template>
    </b-table>
  </div>
      `,

    data() {
      return {
        items: [
          {
            text: 'This is <i>escaped</i> content',
            html: 'This is <i>raw <strong>HTML</strong></i> <span style="color:red">content</span>',
          },
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

export const FormatterCallback: Story = {
  render: (args, { argTypes }) => ({
    components: { BTable },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-table :fields="fields" :items="items">
      <template #cell(name)="data">
        <!-- \`data.value\` is the value after formatted by the Formatter -->
        {{ data.value}}
        <!--<a :href="\`#\${data.value.replace(/[^a-z]+/i, '-').toLowerCase()}\`">{{ data.value }}</a>-->
        </template>
    </b-table>
  </div>
      `,

    data() {
      return {
        fields: [
          {
            // A column that needs custom formatting,
            // calling formatter 'fullName' in this app
            key: 'name',
            label: 'Full Name',
            formatter: 'fullName',
          },
          // A regular column
          'age',
          {
            // A regular column with custom formatter
            key: 'sex',
            formatter: (value: string) => {
              return value.charAt(0).toUpperCase()
            },
          },
          {
            // A virtual column with custom formatter
            key: 'birthYear',
            label: 'Calculated Birth Year',
            formatter: (value: any, key: any, item: { age: number }) => {
              return new Date().getFullYear() - item.age
            },
          },
        ],
        items: [
          { name: { first: 'John', last: 'Doe' }, sex: 'Male', age: 42 },
          { name: { first: 'Jane', last: 'Doe' }, sex: 'Female', age: 36 },
          { name: { first: 'Rubin', last: 'Kincade' }, sex: 'male', age: 73 },
          { name: { first: 'Shirley', last: 'Partridge' }, sex: 'female', age: 62 },
        ],
      }
    },
    methods: {
      fullName(value: { first: any; last: any }) {
        return `${value.first} ${value.last}`
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

export const HeaderAndFooterCustomRenderingViaScopedSlots: Story = {
  render: (args, { argTypes }) => ({
    components: { BTable },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-table :fields="fields" :items="items" foot-clone>
      
      <template #cell(name)="data">
        {{ data.value.first }} {{ data.value.last }}
        </template>

      <!-- A custom formatted header cell for field 'name' -->
      <template #head(name)="data">
        <span class="text-info">{{ data.label.toUpperCase() }}</span>
      </template>

      <!-- A custom formatted footer cell for field 'name' -->
      <template #foot(name)="data">
        <span class="text-danger">{{ data.label }}</span>
      </template>

      <!-- Default fall-back custom formatted footer cell -->
      <template #foot()="data">
        <i>{{ data.label }}</i>
      </template>
    </b-table>
  </div>
      `,

    data() {
      return {
        fields: [
          // A column that needs custom formatting
          { key: 'name', label: 'Full Name' },
          // A regular column
          'age',
          // A regular column
          'sex',
        ],
        items: [
          { name: { first: 'John', last: 'Doe' }, sex: 'Male', age: 42 },
          { name: { first: 'Jane', last: 'Doe' }, sex: 'Female', age: 36 },
          { name: { first: 'Rubin', last: 'Kincade' }, sex: 'Male', age: 73 },
          { name: { first: 'Shirley', last: 'Partridge' }, sex: 'Female', age: 62 },
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

export const AddingAdditionalRowsToTheHeader: Story = {
  render: (args, { argTypes }) => ({
    components: { BTable, BTr, BTh },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-table
      :items="items"
      :fields="fields"
      responsive="sm"
    >
      <template #thead-top="data">
        <b-tr>
          <b-th colspan="2"><span class="sr-only">Name and ID</span></b-th>
          <b-th variant="secondary">Type 1</b-th>
          <b-th variant="primary" colspan="3">Type 2</b-th>
          <b-th variant="danger">Type 3</b-th>
        </b-tr>
        </template>
    </b-table>
  </div>
      `,

    data() {
      return {
        items: [
          { name: 'Stephen Hawking', id: 1, type1: false, type2a: true, type2b: false, type2c: false, type3: false },
          { name: 'Johnny Appleseed', id: 2, type1: false, type2a: true, type2b: true, type2c: false, type3: false },
          { name: 'George Washington', id: 3, type1: false, type2a: false, type2b: false, type2c: false, type3: true },
          { name: 'Albert Einstein', id: 4, type1: true, type2a: false, type2b: false, type2c: true, type3: false },
          { name: 'Isaac Newton', id: 5, type1: true, type2a: true, type2b: false, type2c: true, type3: false },
        ],
        fields: [
          'name',
          { key: 'id', label: 'ID' },
          { key: 'type1', label: 'Type 1' },
          { key: 'type2a', label: 'Type 2A' },
          { key: 'type2b', label: 'Type 2B' },
          { key: 'type2c', label: 'Type 2C' },
          { key: 'type3', label: 'Type 3' },
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

export const CustomEmptyAndEmptyfilteredRenderingViaSlots: Story = {
  render: (args, { argTypes }) => ({
    components: { BTable },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-table :fields="fields" :items="items" show-empty>
    <template #empty="scope">
      <h4>{{ scope.emptyText }}</h4>
    </template>
    <template #emptyfiltered="scope">
      <h4>{{ scope.emptyFilteredText }}</h4>
    </template>
  </b-table>
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

export const StickyHeaders: Story = {
  render: (args, { argTypes }) => ({
    components: { BTable },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-table sticky-header :items="items" head-variant="light" />
  </div>
`,

    data() {
      return {
        items: [
          { heading1: 'table cell', heading2: 'table cell', heading3: 'table cell' },
          { heading1: 'table cell', heading2: 'table cell', heading3: 'table cell' },
          { heading1: 'table cell', heading2: 'table cell', heading3: 'table cell' },
          { heading1: 'table cell', heading2: 'table cell', heading3: 'table cell' },
          { heading1: 'table cell', heading2: 'table cell', heading3: 'table cell' },
          { heading1: 'table cell', heading2: 'table cell', heading3: 'table cell' },
          { heading1: 'table cell', heading2: 'table cell', heading3: 'table cell' },
          { heading1: 'table cell', heading2: 'table cell', heading3: 'table cell' },
          { heading1: 'table cell', heading2: 'table cell', heading3: 'table cell' },
          { heading1: 'table cell', heading2: 'table cell', heading3: 'table cell' },
          { heading1: 'table cell', heading2: 'table cell', heading3: 'table cell' },
          { heading1: 'table cell', heading2: 'table cell', heading3: 'table cell' },
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

export const StickyColumns: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormCheckbox, BTable },
    props: Object.keys(argTypes),
    template: `
  <div>
    <div class="mb-2">
      <b-form-checkbox v-model="stickyHeader" inline>Sticky header</b-form-checkbox>
      <b-form-checkbox v-model="noCollapse" inline>No border collapse</b-form-checkbox>
    </div>
    <b-table
      :sticky-header="stickyHeader"
      :no-border-collapse="noCollapse"
      responsive
      :items="items"
      :fields="fields"
    >
      <!-- We are using utility class \`text-nowrap\` to help illustrate horizontal scrolling -->
      <template #head(id)="scope">
        <div class="text-nowrap">Row ID</div>
        </template>
        <template #head()="scope">
          <div class="text-nowrap">
            Heading {{ scope.label }}
          </div>
        </template>
      </b-table>
    </div>
      `,

    data() {
      return {
        stickyHeader: true,
        noCollapse: false,
        fields: [
          { key: 'id', stickyColumn: true, isRowHeader: true, variant: 'primary' },
          'a',
          'b',
          { key: 'c', stickyColumn: true, variant: 'info' },
          'd',
          'e',
          'f',
          'g',
          'h',
          'i',
          'j',
          'k',
          'l',
        ],
        items: [
          { id: 1, a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9, k: 10, l: 11 },
          { id: 2, a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9, k: 10, l: 11 },
          { id: 3, a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9, k: 10, l: 11 },
          { id: 4, a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9, k: 10, l: 11 },
          { id: 5, a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9, k: 10, l: 11 },
          { id: 6, a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9, k: 10, l: 11 },
          { id: 7, a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9, k: 10, l: 11 },
          { id: 8, a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9, k: 10, l: 11 },
          { id: 9, a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9, k: 10, l: 11 },
          { id: 10, a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9, k: 10, l: 11 },
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

export const RowDetailsSupport: Story = {
  render: (args, { argTypes }) => ({
    components: { BTable, BButton, BFormCheckbox, BCard, BRow, BCol },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-table :items="items" :fields="fields" striped responsive="sm">
      <template #cell(show_details)="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
        </b-button>

        <b-form-checkbox v-model="row.detailsShowing" @change="row.toggleDetails">
          Details via check
        </b-form-checkbox>
        </template>

      <template #row-details="row">
        <b-card>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Age:</b></b-col>
            <b-col>{{ row.item.age }}</b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Is Active:</b></b-col>
            <b-col>{{ row.item.isActive }}</b-col>
          </b-row>

          <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
        </b-card>
      </template>
    </b-table>
  </div>
      `,

    data() {
      return {
        fields: ['first_name', 'last_name', 'show_details'],
        items: [
          { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          {
            isActive: false,
            age: 89,
            first_name: 'Geneva',
            last_name: 'Wilson',
            _showDetails: true,
          },
          { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' },
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

export const RowSelectSupport: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormGroup, BFormSelect, BTable, BButton },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-group
      label="Selection mode:"
      label-for="table-select-mode-select"
      label-cols-md="4"
    >
      <b-form-select
        id="table-select-mode-select"
        v-model="selectMode"
        :options="modes"
        class="mb-3"
      />
    </b-form-group>

    <b-table
      :items="items"
      :fields="fields"
      :select-mode="selectMode"
      responsive="sm"
      ref="selectableTable"
      selectable
      @row-selected="onRowSelected"
    >
      
      <template #cell(selected)="{ rowSelected }">
        <template v-if="rowSelected">
          <span aria-hidden="true">&check;</span>
          <span class="sr-only">Selected</span>
        </template>
        <template v-else>
          <span aria-hidden="true">&nbsp;</span>
          <span class="sr-only">Not selected</span>
        </template>
      </template>
    </b-table>
    <p>
      <b-button size="sm" @click="selectAllRows">Select all</b-button>
      <b-button size="sm" @click="clearSelected">Clear selected</b-button>
      <b-button size="sm" @click="selectThirdRow">Select 3rd row</b-button>
      <b-button size="sm" @click="unselectThirdRow">Unselect 3rd row</b-button>
    </p>
    <p>
      Selected Rows:<br />
      {{ selected }}
    </p>
  </div>
        `,

    data() {
      return {
        modes: ['multi', 'single', 'range'],
        fields: ['selected', 'isActive', 'age', 'first_name', 'last_name'],
        items: [
          { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' },
        ],
        selectMode: 'multi',
        selected: [],
      }
    },
    methods: {
      onRowSelected(items: any) {
        this.selected = items
      },
      selectAllRows() {
        this.$refs.selectableTable.selectAllRows()
      },
      clearSelected() {
        this.$refs.selectableTable.clearSelected()
      },
      selectThirdRow() {
        // Rows are indexed from 0, so the third row is index 2
        this.$refs.selectableTable.selectRow(2)
      },
      unselectThirdRow() {
        // Rows are indexed from 0, so the third row is index 2
        this.$refs.selectableTable.unselectRow(2)
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

export const TableBodyTransitionSupport: Story = {
  render: (args, { argTypes }) => ({
    components: { BTable },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-table
      id="table-transition-example"
      :items="items"
      :fields="fields"
      striped
      small
      primary-key="a"
      :tbody-transition-props="transProps"
     />
  </div>
`,

    data() {
      return {
        transProps: {
          // Transition name
          name: 'flip-list',
        },
        items: [
          { a: 2, b: 'Two', c: 'Moose' },
          { a: 1, b: 'Three', c: 'Dog' },
          { a: 3, b: 'Four', c: 'Cat' },
          { a: 4, b: 'One', c: 'Mouse' },
        ],
        fields: [
          { key: 'a', sortable: true },
          { key: 'b', sortable: true },
          { key: 'c', sortable: true },
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

export const Sorting: Story = {
  render: (args, { argTypes }) => ({
    components: { BTable },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-table
      :items="items"
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      responsive="sm"
     />

    <div>
      Sorting By: <b>{{ sortBy }}</b>, Sort Direction:
      <b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b>
    </div>
  </div>
`,

    data() {
      return {
        sortBy: 'age',
        sortDesc: false,
        fields: [
          { key: 'last_name', sortable: true },
          { key: 'first_name', sortable: true },
          { key: 'age', sortable: true },
          { key: 'isActive', sortable: false },
        ],
        items: [
          { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' },
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

export const SortIconAlignment: Story = {
  render: (args, { argTypes }) => ({
    components: { BTable },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-table
      :items="items"
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      sort-icon-left
      responsive="sm"
     />

    <div>
      Sorting By: <b>{{ sortBy }}</b>, Sort Direction:
      <b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b>
    </div>
  </div>
`,

    data() {
      return {
        sortBy: 'age',
        sortDesc: false,
        fields: [
          { key: 'last_name', sortable: true },
          { key: 'first_name', sortable: true },
          { key: 'age', sortable: true },
          { key: 'isActive', sortable: false },
        ],
        items: [
          { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' },
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

export const InternalSortingAndLocaleHandling: Story = {
  render: (args, { argTypes }) => ({
    components: { BTable },
    props: Object.keys(argTypes),
    template: `
<b-table :sort-compare-options="{ numeric: true, sensitivity: 'base' }" />
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const AutomatedTableBusyState: Story = {
  render: (args, { argTypes }) => ({
    components: { BTable },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-table
      id="my-table"
      :busy.sync="isBusy"
      :items="myProvider"
      :fields="fields"
     />
  </div>
`,

    data() {
      return {
        isBusy: false,
      }
    },
    methods: {
      async myProvider() {
        // Here we don't set isBusy prop, so busy state will be
        // handled by table itself
        // this.isBusy = true
        const response: any = await $fetch('/some/url')

        return response?.data?.items
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

export const ForceRefreshingOfTableData: Story = {
  render: (args, { argTypes }) => ({
    components: { BTable },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-table ref="table" />
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

export const DetectionOfSortingChange: Story = {
  render: (args, { argTypes }) => ({
    components: { BTable },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-table @sort-changed="sortingChanged" />
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

export const DetectionOfSortingChange1: Story = {
  render: (args, { argTypes }) => ({
    components: { BTable },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-table :sort-by.sync="mySortBy" :sort-desc.sync="mySortDesc" />
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

export const SimpleTables: Story = {
  render: (args, { argTypes }) => ({
    components: { BTableSimple, BThead, BTr, BTh, BTbody, BTd, BTfoot },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-table-simple hover small caption-top responsive>
    <caption>Items sold in August, grouped by Country and City:</caption>
    <colgroup><col /><col /></colgroup>
    <colgroup><col /><col /><col/></colgroup>
    <colgroup><col /><col /></colgroup>
    <b-thead head-variant="dark">
      <b-tr>
        <b-th colspan="2">Region</b-th>
        <b-th colspan="3">Clothes</b-th>
        <b-th colspan="2">Accessories</b-th>
      </b-tr>
      <b-tr>
        <b-th>Country</b-th>
        <b-th>City</b-th>
        <b-th>Trousers</b-th>
        <b-th>Skirts</b-th>
        <b-th>Dresses</b-th>
        <b-th>Bracelets</b-th>
        <b-th>Rings</b-th>
      </b-tr>
    </b-thead>
    <b-tbody>
      <b-tr>
        <b-th rowspan="3">Belgium</b-th>
        <b-th class="text-right">Antwerp</b-th>
        <b-td>56</b-td>
        <b-td>22</b-td>
        <b-td>43</b-td>
        <b-td variant="success">72</b-td>
        <b-td>23</b-td>
      </b-tr>
      <b-tr>
        <b-th class="text-right">Gent</b-th>
        <b-td>46</b-td>
        <b-td variant="warning">18</b-td>
        <b-td>50</b-td>
        <b-td>61</b-td>
        <b-td variant="danger">15</b-td>
      </b-tr>
      <b-tr>
        <b-th class="text-right">Brussels</b-th>
        <b-td>51</b-td>
        <b-td>27</b-td>
        <b-td>38</b-td>
        <b-td>69</b-td>
        <b-td>28</b-td>
      </b-tr>
      <b-tr>
        <b-th rowspan="2">The Netherlands</b-th>
        <b-th class="text-right">Amsterdam</b-th>
        <b-td variant="success">89</b-td>
        <b-td>34</b-td>
        <b-td>69</b-td>
        <b-td>85</b-td>
        <b-td>38</b-td>
      </b-tr>
      <b-tr>
        <b-th class="text-right">Utrecht</b-th>
        <b-td>80</b-td>
        <b-td variant="danger">12</b-td>
        <b-td>43</b-td>
        <b-td>36</b-td>
        <b-td variant="warning">19</b-td>
      </b-tr>
    </b-tbody>
    <b-tfoot>
      <b-tr>
        <b-td colspan="7" variant="secondary" class="text-right">
          Total Rows: <b>5</b>
        </b-td>
      </b-tr>
    </b-tfoot>
  </b-table-simple>
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

export const SimpleTablesAndStackedMode: Story = {
  render: (args, { argTypes }) => ({
    components: { BTableSimple, BThead, BTr, BTh, BTbody, BTd, BTfoot },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-table-simple hover small caption-top stacked>
    <caption>Items sold in August, grouped by Country and City:</caption>
    <colgroup><col /><col /></colgroup>
    <colgroup><col /><col /><col /></colgroup>
    <colgroup><col /><col /></colgroup>
    <b-thead head-variant="dark">
      <b-tr>
        <b-th colspan="2">Region</b-th>
        <b-th colspan="3">Clothes</b-th>
        <b-th colspan="2">Accessories</b-th>
      </b-tr>
      <b-tr>
        <b-th>Country</b-th>
        <b-th>City</b-th>
        <b-th>Trousers</b-th>
        <b-th>Skirts</b-th>
        <b-th>Dresses</b-th>
        <b-th>Bracelets</b-th>
        <b-th>Rings</b-th>
      </b-tr>
    </b-thead>
    <b-tbody>
      <b-tr>
        <b-th rowspan="3" class="text-center">Belgium (3 Cities)</b-th>
        <b-th stacked-heading="City" class="text-left">Antwerp</b-th>
        <b-td stacked-heading="Clothes: Trousers">56</b-td>
        <b-td stacked-heading="Clothes: Skirts">22</b-td>
        <b-td stacked-heading="Clothes: Dresses">43</b-td>
        <b-td stacked-heading="Accessories: Bracelets" variant="success">72</b-td>
        <b-td stacked-heading="Accessories: Rings">23</b-td>
      </b-tr>
      <b-tr>
        <b-th stacked-heading="City">Gent</b-th>
        <b-td stacked-heading="Clothes: Trousers">46</b-td>
        <b-td stacked-heading="Clothes: Skirts" variant="warning">18</b-td>
        <b-td stacked-heading="Clothes: Dresses">50</b-td>
        <b-td stacked-heading="Accessories: Bracelets">61</b-td>
        <b-td stacked-heading="Accessories: Rings" variant="danger">15</b-td>
      </b-tr>
      <b-tr>
        <b-th stacked-heading="City">Brussels</b-th>
        <b-td stacked-heading="Clothes: Trousers">51</b-td>
        <b-td stacked-heading="Clothes: Skirts">27</b-td>
        <b-td stacked-heading="Clothes: Dresses">38</b-td>
        <b-td stacked-heading="Accessories: Bracelets">69</b-td>
        <b-td stacked-heading="Accessories: Rings">28</b-td>
      </b-tr>
      <b-tr>
        <b-th rowspan="2" class="text-center">The Netherlands (2 Cities)</b-th>
        <b-th stacked-heading="City">Amsterdam</b-th>
        <b-td stacked-heading="Clothes: Trousers" variant="success">89</b-td>
        <b-td stacked-heading="Clothes: Skirts">34</b-td>
        <b-td stacked-heading="Clothes: Dresses">69</b-td>
        <b-td stacked-heading="Accessories: Bracelets">85</b-td>
        <b-td stacked-heading="Accessories: Rings">38</b-td>
      </b-tr>
      <b-tr>
        <b-th stacked-heading="City">Utrecht</b-th>
        <b-td stacked-heading="Clothes: Trousers">80</b-td>
        <b-td stacked-heading="Clothes: Skirts" variant="danger">12</b-td>
        <b-td stacked-heading="Clothes: Dresses">43</b-td>
        <b-td stacked-heading="Accessories: Bracelets">36</b-td>
        <b-td stacked-heading="Accessories: Rings" variant="warning">19</b-td>
      </b-tr>
    </b-tbody>
    <b-tfoot>
      <b-tr>
        <b-td colspan="7" variant="secondary" class="text-right">
          Total Rows: <b>5</b>
        </b-td>
      </b-tr>
    </b-tfoot>
  </b-table-simple>
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

export const SimpleTablesAndStickyColumns: Story = {
  render: (args, { argTypes }) => ({
    components: { BTableSimple, BThead, BTr, BTh, BTbody, BTd, BTfoot },
    props: Object.keys(argTypes),
    template: `
<b-table-simple responsive>
  <b-thead>
    <b-tr>
      <b-th sticky-column>Sticky Column Header</b-th>
      <b-th>Heading 1</b-th>
      <b-th>Heading 2</b-th>
      <b-th>Heading 3</b-th>
      <b-th>Heading 4</b-th>
    </b-tr>
  </b-thead>
  <b-tbody>
    <b-tr>
      <b-th sticky-column>Sticky Column Row Header</b-th>
      <b-td>Cell</b-td>
      <b-td>Cell</b-td>
      <b-td>Cell</b-td>
      <b-td>Cell</b-td>
    </b-tr>
    <b-tr>
      <b-th sticky-column>Sticky Column Row Header</b-th>
      <b-td>Cell</b-td>
      <b-td>Cell</b-td>
      <b-td>Cell</b-td>
      <b-td>Cell</b-td>
    </b-tr>
  </b-tbody>
  <b-tfoot>
    <b-tr>
      <b-th sticky-column>Sticky Column Footer</b-th>
      <b-th>Heading 1</b-th>
      <b-th>Heading 2</b-th>
      <b-th>Heading 3</b-th>
      <b-th>Heading 4</b-th>
    </b-tr>
  </b-tfoot>
</b-table-simple>
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const CompleteExample: Story = {
  render: (args, { argTypes }) => ({
    components: { BContainer, BRow, BCol, BFormGroup, BInputGroup, BFormSelect, BFormInput, BInputGroupAppend, BButton, BFormCheckboxGroup, BFormCheckbox, BPagination, BTable, BCard, BModal },
    props: Object.keys(argTypes),
    template: `
    <template>
    <b-container fluid>
      <!-- User Interface controls -->
      <b-row>
        <b-col lg="6" class="my-1">
          <b-form-group
            label="Sort"
            label-for="sort-by-select"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            class="mb-0"
            v-slot="{ ariaDescribedby }"
          >
            <b-input-group size="sm">
              <b-form-select
                id="sort-by-select"
                v-model="sortBy"
                :options="sortOptions"
                :aria-describedby="ariaDescribedby"
                class="w-75"
              >
                <template #first>
                  <option value="">-- none --</option>
                </template>
              </b-form-select>
  
              <b-form-select
                v-model="sortDesc"
                :disabled="!sortBy"
                :aria-describedby="ariaDescribedby"
                size="sm"
                class="w-25"
              >
                <option :value="false">Asc</option>
                <option :value="true">Desc</option>
              </b-form-select>
            </b-input-group>
          </b-form-group>
        </b-col>
  
        <b-col lg="6" class="my-1">
          <b-form-group
            label="Initial sort"
            label-for="initial-sort-select"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            class="mb-0"
          >
            <b-form-select
              id="initial-sort-select"
              v-model="sortDirection"
              :options="['asc', 'desc', 'last']"
              size="sm"
            ></b-form-select>
          </b-form-group>
        </b-col>
  
        <b-col lg="6" class="my-1">
          <b-form-group
            label="Filter"
            label-for="filter-input"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            class="mb-0"
          >
            <b-input-group size="sm">
              <b-form-input
                id="filter-input"
                v-model="filter"
                type="search"
                placeholder="Type to Search"
              ></b-form-input>
  
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
  
        <b-col lg="6" class="my-1">
          <b-form-group
            v-model="sortDirection"
            label="Filter On"
            description="Leave all unchecked to filter on all data"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            class="mb-0"
            v-slot="{ ariaDescribedby }"
          >
            <b-form-checkbox-group
              v-model="filterOn"
              :aria-describedby="ariaDescribedby"
              class="mt-1"
            >
              <b-form-checkbox value="name">Name</b-form-checkbox>
              <b-form-checkbox value="age">Age</b-form-checkbox>
              <b-form-checkbox value="isActive">Active</b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
        </b-col>
  
        <b-col sm="5" md="6" class="my-1">
          <b-form-group
            label="Per page"
            label-for="per-page-select"
            label-cols-sm="6"
            label-cols-md="4"
            label-cols-lg="3"
            label-align-sm="right"
            label-size="sm"
            class="mb-0"
          >
            <b-form-select
              id="per-page-select"
              v-model="perPage"
              :options="pageOptions"
              size="sm"
            ></b-form-select>
          </b-form-group>
        </b-col>
  
        <b-col sm="7" md="6" class="my-1">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-0"
          ></b-pagination>
        </b-col>
      </b-row>
  
      <!-- Main table element -->
      <b-table
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :filter-included-fields="filterOn"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        stacked="md"
        show-empty
        small
        @filtered="onFiltered"
      >
        <template #cell(name)="row">
          {{ row.value.first }} {{ row.value.last }}
        </template>
  
        <template #cell(actions)="row">
          <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
            Info modal
          </b-button>
          <b-button size="sm" @click="row.toggleDetails">
            {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
          </b-button>
        </template>
  
        <template #row-details="row">
          <b-card>
            <ul>
              <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
            </ul>
          </b-card>
        </template>
      </b-table>
  
      <!-- Info modal -->
      <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
        <pre>{{ infoModal.content }}</pre>
      </b-modal>
    </b-container>
  </template>
              `,

    data() {
      return {
        items: [
          { isActive: true, age: 40, name: { first: 'Dickerson', last: 'Macdonald' } },
          { isActive: false, age: 21, name: { first: 'Larsen', last: 'Shaw' } },
          {
            isActive: false,
            age: 9,
            name: { first: 'Mini', last: 'Navarro' },
            _rowVariant: 'success',
          },
          { isActive: false, age: 89, name: { first: 'Geneva', last: 'Wilson' } },
          { isActive: true, age: 38, name: { first: 'Jami', last: 'Carney' } },
          { isActive: false, age: 27, name: { first: 'Essie', last: 'Dunlap' } },
          { isActive: true, age: 40, name: { first: 'Thor', last: 'Macdonald' } },
          {
            isActive: true,
            age: 87,
            name: { first: 'Larsen', last: 'Shaw' },
            _cellVariants: { age: 'danger', isActive: 'warning' },
          },
          { isActive: false, age: 26, name: { first: 'Mitzi', last: 'Navarro' } },
          { isActive: false, age: 22, name: { first: 'Genevieve', last: 'Wilson' } },
          { isActive: true, age: 38, name: { first: 'John', last: 'Carney' } },
          { isActive: false, age: 29, name: { first: 'Dick', last: 'Dunlap' } },
        ],
        fields: [
          { key: 'name', label: 'Person full name', sortable: true, sortDirection: 'desc' },
          { key: 'age', label: 'Person age', sortable: true, class: 'text-center' },
          {
            key: 'isActive',
            label: 'Is Active',
            formatter: (value: any) => {
              return value ? 'Yes' : 'No'
            },
            sortable: true,
            sortByFormatted: true,
            filterByFormatted: true,
          },
          { key: 'actions', label: 'Actions' },
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, { value: 100, text: 'Show a lot' }],
        sortBy: '',
        sortDesc: '',
        sortDirection: 'asc',
        filter: null,
        filterOn: [],
        infoModal: {
          id: 'info-modal',
          title: '',
          content: '',
        },
      }
    },
    computed: {
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter((f: { sortable: any }) => f.sortable)
          .map((f: { label: any; key: any }) => {
            return { text: f.label, value: f.key }
          })
      },
    },
    mounted() {
      // Set the initial number of items
      this.totalRows = this.items.length
    },
    methods: {
      info(item: any, index: any, button: any) {
        this.infoModal.title = `Row index: ${index}`
        this.infoModal.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
      },
      onFiltered(filteredItems: string | any[]) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
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
