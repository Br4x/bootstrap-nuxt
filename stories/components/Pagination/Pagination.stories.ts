import type { Meta, StoryObj } from '@storybook/vue3'
import vitestResults from '@/tests/unit/results.json'
import BPagination from '@/components/B/Pagination.vue'
import BTable from '@/components/B/Table.vue'
import BSpinner from '@/components/B/Spinner.vue'

const meta = {
  title: 'Components/Pagination',
  component: BPagination,
  parameters: {
    vitest: {
      testFile: 'pagination.test.tsx',
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
    ></b-pagination>

    <p class="mt-3">Current Page: {{ currentPage }}</p>

    <b-table
      id="my-table"
      :items="items"
      :per-page="perPage"
      :current-page="currentPage"
      small
    ></b-table>
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
    <!-- Use text in props -->
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      first-text="First"
      prev-text="Prev"
      next-text="Next"
      last-text="Last"
    ></b-pagination>

    <!-- Use emojis in props -->
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      first-text="⏮"
      prev-text="⏪"
      next-text="⏩"
      last-text="⏭"
      class="mt-4"
    ></b-pagination>

    <!-- Use HTML and sub-components in slots -->
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      class="mt-4"
    >
      <template #first-text><span class="text-success">First</span>`,

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
      ></b-pagination>
    </div>

    <div class="mt-3">
      <h6>Goto last button number</h6>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        last-number
      ></b-pagination>
    </div>

    <div class="mt-3">
      <h6>Goto first and last button number</h6>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        first-number
        last-number
      ></b-pagination>
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
      <b-pagination v-model="currentPage" :total-rows="rows" size="sm"></b-pagination>
    </div>

    <div class="mt-3">
      <h6>Default</h6>
      <b-pagination v-model="currentPage" :total-rows="rows"></b-pagination>
    </div>

    <div class="mt-3">
      <h6>Large</h6>
      <b-pagination v-model="currentPage" :total-rows="rows" size="lg"></b-pagination>
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
      <b-pagination v-model="currentPage" pills :total-rows="rows" size="sm"></b-pagination>
    </div>

    <div class="mt-3">
      <h6>Default Pills</h6>
      <b-pagination v-model="currentPage" pills :total-rows="rows"></b-pagination>
    </div>

    <div class="mt-3">
      <h6>Large Pills</h6>
      <b-pagination v-model="currentPage" pills :total-rows="rows" size="lg"></b-pagination>
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
      <b-pagination v-model="currentPage" :total-rows="rows"></b-pagination>
    </div>

    <div class="mt-3">
      <h6 class="text-center">Center alignment</h6>
      <b-pagination v-model="currentPage" :total-rows="rows" align="center"></b-pagination>
    </div>

    <div class="mt-3">
      <h6 class="text-right">Right (end) alignment</h6>
      <b-pagination v-model="currentPage" :total-rows="rows" align="right"></b-pagination>
    </div>

    <div class="mt-3">
      <h6 class="text-center">Fill alignment</h6>
      <b-pagination v-model="currentPage" :total-rows="rows" align="fill"></b-pagination>
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
