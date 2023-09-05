import type { Meta, StoryObj } from '@storybook/vue3'
import vitestResults from '@/tests/unit/results.json'
import BPagination from '@/components/BPagination.vue'
import BTable from '@/components/BTable.vue'
import BSpinner from '@/components/BSpinner.vue'

const meta = {
  title: 'Components/Pagination',
  component: BPagination,
  parameters: {
    vitest: {
      testFile: 'pagination.spec.ts',
      testResults: vitestResults,
    },
  },
  argTypes: {

  },
} satisfies Meta<typeof BPagination>

export default meta
          type Story = StoryObj<typeof meta>

export const Overview: Story = {
  render: (args, { argTypes }) => ({
    components: { BPagination, BTable },
    props: Object.keys(argTypes),
    template: `
  <div class="overflow-auto">
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    />

    <p class="mt-3">Current Page: {{ currentPage }}</p>

    <b-table
      id="my-table"
      :items="items"
      :per-page="perPage"
      :current-page="currentPage"
      small
    />
  </div>
`,

    data() {
      return {
        perPage: 3,
        currentPage: 1,
        items: [
          { id: 1, first_name: 'Fred', last_name: 'Flintstone' },
          { id: 2, first_name: 'Wilma', last_name: 'Flintstone' },
          { id: 3, first_name: 'Barney', last_name: 'Rubble' },
          { id: 4, first_name: 'Betty', last_name: 'Rubble' },
          { id: 5, first_name: 'Pebbles', last_name: 'Flintstone' },
          { id: 6, first_name: 'Bamm Bamm', last_name: 'Rubble' },
          { id: 7, first_name: 'The Great', last_name: 'Gazzoo' },
          { id: 8, first_name: 'Rockhead', last_name: 'Slate' },
          { id: 9, first_name: 'Pearl', last_name: 'Slaghoople' },
        ],
      }
    },
    computed: {
      rows() {
        return this.items.length
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

export const ButtonContent: Story = {
  render: (args, { argTypes }) => ({
    components: { BPagination, BSpinner },
    props: Object.keys(argTypes),
    template: `
  <div class="overflow-auto">
    
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      first-text="First"
      prev-text="Prev"
      next-text="Next"
      last-text="Last"
    />

    
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      first-text="⏮"
      prev-text="⏪"
      next-text="⏩"
      last-text="⏭"
      class="mt-4"
    />

    
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      class="mt-4"
    >
      <template #first-text><span class="text-success">First</span></template>
      <template #prev-text><span class="text-danger">Prev</span></template>
      <template #next-text><span class="text-warning">Next</span></template>
      <template #last-text><span class="text-info">Last</span></template>
      <template #ellipsis-text>
        <b-spinner small type="grow"></b-spinner>
        <b-spinner small type="grow"></b-spinner>
        <b-spinner small type="grow"></b-spinner>
      </template>
      <template #page="{ page, active }">
        <b v-if="active">{{ page }}</b>
        <i v-else>{{ page }}</i>
      </template>
    </b-pagination>
  </div>`,

    data() {
      return {
        rows: 100,
        perPage: 10,
        currentPage: 1,
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

export const GotoFirstlastButtonType: Story = {
  render: (args, { argTypes }) => ({
    components: { BPagination },
    props: Object.keys(argTypes),
    template: `
  <div class="overflow-auto">
    <div>
      <h6>Goto first button number</h6>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        first-number
      />
    </div>

    <div class="mt-3">
      <h6>Goto last button number</h6>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        last-number
      />
    </div>

    <div class="mt-3">
      <h6>Goto first and last button number</h6>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        first-number
        last-number
      />
    </div>
  </div>
`,

    data() {
      return {
        rows: 100,
        perPage: 1,
        currentPage: 5,
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

export const ButtonSize: Story = {
  render: (args, { argTypes }) => ({
    components: { BPagination },
    props: Object.keys(argTypes),
    template: `
  <div class="overflow-auto">
    <div>
      <h6>Small</h6>
      <b-pagination v-model="currentPage" :total-rows="rows" size="sm"/>
    </div>

    <div class="mt-3">
      <h6>Default</h6>
      <b-pagination v-model="currentPage" :total-rows="rows"/>
    </div>

    <div class="mt-3">
      <h6>Large</h6>
      <b-pagination v-model="currentPage" :total-rows="rows" size="lg"/>
    </div>
  </div>
`,

    data() {
      return {
        rows: 100,
        currentPage: 1,
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

export const PillStyle: Story = {
  render: (args, { argTypes }) => ({
    components: { BPagination },
    props: Object.keys(argTypes),
    template: `
  <div class="overflow-auto">
    <div>
      <h6>Small Pills</h6>
      <b-pagination v-model="currentPage" pills :total-rows="rows" size="sm"/>
    </div>

    <div class="mt-3">
      <h6>Default Pills</h6>
      <b-pagination v-model="currentPage" pills :total-rows="rows"/>
    </div>

    <div class="mt-3">
      <h6>Large Pills</h6>
      <b-pagination v-model="currentPage" pills :total-rows="rows" size="lg"/>
    </div>
  </div>
`,

    data() {
      return {
        rows: 100,
        currentPage: 1,
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

export const Alignment: Story = {
  render: (args, { argTypes }) => ({
    components: { BPagination },
    props: Object.keys(argTypes),
    template: `
  <div class="overflow-auto">
    <div>
      <h6>Left alignment (default)</h6>
      <b-pagination v-model="currentPage" :total-rows="rows"/>
    </div>

    <div class="mt-3">
      <h6 class="text-center">Center alignment</h6>
      <b-pagination v-model="currentPage" :total-rows="rows" align="center"/>
    </div>

    <div class="mt-3">
      <h6 class="text-right">Right (end) alignment</h6>
      <b-pagination v-model="currentPage" :total-rows="rows" align="right"/>
    </div>

    <div class="mt-3">
      <h6 class="text-center">Fill alignment</h6>
      <b-pagination v-model="currentPage" :total-rows="rows" align="fill"/>
    </div>
  </div>
`,

    data() {
      return {
        rows: 100,
        currentPage: 3,
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
