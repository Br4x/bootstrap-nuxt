import type { Meta, StoryObj } from '@storybook/vue3'
import vitestResults from '@/tests/unit/results.json'
import BPaginationNav from '@/components/B/PaginationNav.vue'
import BSpinner from '@/components/B/Spinner.vue'

const meta = {
  title: 'Components/PaginationNav',
  component: BPaginationNav,
  parameters: {
    vitest: {
      testFile: 'pagination-nav.test.tsx',
      testResults: vitestResults,
    },
  },
  argTypes: {

  },
} satisfies Meta<typeof BPaginationNav>

export default meta
          type Story = StoryObj<typeof meta>

export const Overview: Story = {
  render: (args, { argTypes }) => ({
    components: { BPaginationNav },
    props: Object.keys(argTypes),
    template: `
  <div class="overflow-auto">
    <b-pagination-nav :link-gen="linkGen" :number-of-pages="10" use-router></b-pagination-nav>
  </div>
`,

    methods: {
      linkGen(pageNum) {
        return pageNum === 1 ? '?' : `?page=${pageNum}`
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

export const PageNumberGeneration: Story = {
  render: (args, { argTypes }) => ({
    components: { BPaginationNav },
    props: Object.keys(argTypes),
    template: `
  <div class="overflow-auto">
    <b-pagination-nav
      :link-gen="linkGen"
      :page-gen="pageGen"
      :number-of-pages="links.length"
    ></b-pagination-nav>
  </div>
`,

    data() {
      return {
        links: ['#foo', '#bar', '#baz', '#faz'],
      }
    },
    methods: {
      linkGen(pageNum) {
        return this.links[pageNum - 1]
      },
      pageGen(pageNum) {
        return this.links[pageNum - 1].slice(1)
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

export const ProvidingAnArrayOfPages: Story = {
  render: (args, { argTypes }) => ({
    components: { BPaginationNav },
    props: Object.keys(argTypes),
    template: `
  <b-pagination-nav :pages="pages1" use-router></b-pagination-nav>
  <b-pagination-nav :pages="pages2" use-router></b-pagination-nav>
  <b-pagination-nav :pages="pages3" use-router></b-pagination-nav>
`,

    data() {
      return {
      // Simple array of strings
        pages1: ['?page=1', '?page=2', '?page=3'],
        // Array of objects with string links
        pages2: [
          { link: '?page=1', text: 'One' },
          { link: '?page=2', text: 'Two' },
          { link: '?page=3', text: 'Three' },
        ],
        // Array of objects with router `to` locations
        pages3: [
          { link: { query: { page: 1 } }, text: 'Page 1' },
          { link: { query: { page: 2 } }, text: 'Page 2' },
          { link: { query: { page: 3 } }, text: 'Page 3' },
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

export const ButtonContent: Story = {
  render: (args, { argTypes }) => ({
    components: { BPaginationNav, BSpinner },
    props: Object.keys(argTypes),
    template: `
  <div class="overflow-auto">
    <!-- Use text in props -->
    <b-pagination-nav
      number-of-pages="10"
      base-url="#"
      first-text="First"
      prev-text="Prev"
      next-text="Next"
      last-text="Last"
    ></b-pagination-nav>

    <!-- Use emojis in props -->
    <b-pagination-nav
      number-of-pages="10"
      base-url="#"
      first-text="⏮"
      prev-text="⏪"
      next-text="⏩"
      last-text="⏭"
      class="mt-4"
    ></b-pagination-nav>

    <!-- Use HTML and sub-components in slots -->
    <b-pagination-nav
      number-of-pages="10"
      base-url="#"
      class="mt-4"
    >
      <template #first-text><span class="text-success">First</span>`,

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
    components: { BPaginationNav },
    props: Object.keys(argTypes),
    template: `
  <div class="overflow-auto">
    <div>
      <h6>Goto first button number</h6>
      <b-pagination-nav
        v-model="currentPage"
        :number-of-pages="pages"
        base-url="#"
        first-number
      ></b-pagination-nav>
    </div>

    <div class="mt-3">
      <h6>Goto last button number</h6>
      <b-pagination-nav
        v-model="currentPage"
        :number-of-pages="pages"
        base-url="#"
        last-number
      ></b-pagination-nav>
    </div>

    <div class="mt-3">
      <h6>Goto first and last button number</h6>
      <b-pagination-nav
        v-model="currentPage"
        :number-of-pages="pages"
        base-url="#"
        first-number
        last-number
      ></b-pagination-nav>
    </div>
  </div>
`,

    data() {
      return {
        pages: 100,
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
    components: { BPaginationNav },
    props: Object.keys(argTypes),
    template: `
  <div class="overflow-auto">
    <div>
      <h6>Small</h6>
      <b-pagination-nav size="sm" number-of-pages="10" base-url="#"></b-pagination-nav>
    </div>

    <div class="mt-3">
      <h6>Default</h6>
      <b-pagination-nav number-of-pages="10" base-url="#"></b-pagination-nav>
    </div>

    <div class="mt-3">
      <h6>Large</h6>
      <b-pagination-nav size="lg" number-of-pages="10" base-url="#"></b-pagination-nav>
    </div>
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

export const PillStyle: Story = {
  render: (args, { argTypes }) => ({
    components: { BPaginationNav },
    props: Object.keys(argTypes),
    template: `
  <div class="overflow-auto">
    <div>
      <h6>Small Pills</h6>
      <b-pagination-nav pills size="sm" number-of-pages="10" base-url="#"></b-pagination-nav>
    </div>

    <div class="mt-3">
      <h6>Default Pills</h6>
      <b-pagination-nav pills number-of-pages="10" base-url="#"></b-pagination-nav>
    </div>

    <div class="mt-3">
      <h6>Large Pills</h6>
      <b-pagination-nav pills size="lg" number-of-pages="10" base-url="#"></b-pagination-nav>
    </div>
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

export const Alignment: Story = {
  render: (args, { argTypes }) => ({
    components: { BPaginationNav },
    props: Object.keys(argTypes),
    template: `
  <div class="overflow-auto">
    <div>
      <h6>Left alignment (default)</h6>
      <b-pagination-nav number-of-pages="10" base-url="#"></b-pagination-nav>
    </div>

    <div class="mt-3">
      <h6 class="text-center">Center alignment</h6>
      <b-pagination-nav number-of-pages="10" base-url="#" align="center"></b-pagination-nav>
    </div>

    <div class="mt-3">
      <h6 class="text-right">Right (end) alignment</h6>
      <b-pagination-nav number-of-pages="10" base-url="#" align="right"></b-pagination-nav>
    </div>

    <div class="mt-3">
      <h6 class="text-center">Fill alignment</h6>
      <b-pagination-nav number-of-pages="10" base-url="#" align="fill"></b-pagination-nav>
    </div>
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
