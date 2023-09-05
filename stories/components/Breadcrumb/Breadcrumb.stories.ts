import type { Meta, StoryObj } from '@storybook/vue3'
import vitestResults from '@/tests/unit/results.json'
import BBreadcrumb from '@/components/BBreadcrumb.vue'
import BBreadcrumbItem from '@/components/BBreadcrumbItem.vue'

const meta = {
  title: 'Components/Breadcrumb',
  component: BBreadcrumb,
  parameters: {
    vitest: {
      testFile: 'breadcrumb.spec.ts',
      testResults: vitestResults,
    },
  },
} satisfies Meta<typeof BBreadcrumb>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
  render: (args, { argTypes }) => ({
    components: { BBreadcrumb },
    props: Object.keys(argTypes),
    template: '<b-breadcrumb :items="items" />',
    data() {
      return {
        items: [
          {
            text: 'Admin',
            href: '#',
          },
          {
            text: 'Manage',
            href: '#',
          },
          {
            text: 'Library',
            active: true,
          },
        ],
      }
    },
  }),
}

export const ManuallyPlaced: Story = {
  render: (args, { argTypes }) => ({
    components: { BBreadcrumb, BBreadcrumbItem },
    props: Object.keys(argTypes),
    template: `
    <b-breadcrumb>
        <b-breadcrumb-item href="#home">
        <i class="i-ph-house-fill block float-left mr-2 w-6 h-6" aria-hidden="true" />
        Home
        </b-breadcrumb-item>
        <b-breadcrumb-item href="#foo">Foo</b-breadcrumb-item>
        <b-breadcrumb-item href="#bar">Bar</b-breadcrumb-item>
        <b-breadcrumb-item active>Baz</b-breadcrumb-item>
    </b-breadcrumb>
  `,
    data() {
      return {
        items: [
          {
            text: 'Admin',
            href: '#',
          },
          {
            text: 'Manage',
            href: '#',
          },
          {
            text: 'Library',
            active: true,
          },
        ],
      }
    },
  }),
}
