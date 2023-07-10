import type { Meta, StoryObj } from '@storybook/vue3'
import vitestResults from '@/tests/unit/results.json'
import BBadge from '@/components/B/Badge.vue'

const meta = {
  title: 'Components/Badge',
  component: BBadge,
  parameters: {
    vitest: {
      testFile: 'badge.test.tsx',
      testResults: vitestResults,
    },
  },
  argTypes: {
    active: { action: { type: 'boolean' } },
    disabled: { action: { type: 'boolean' } },
    target: {
      control: {
        type: 'text',
      },
    },
    rel: {
      control: {
        type: 'text',
      },
    },
    href: {
      control: {
        type: 'text',
      },
    },
    show: { control: { type: 'boolean' } },
    variant: { control: 'select', options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'], defaultValue: 'primary' },
    pill: { action: { type: 'boolean' } },
    tag: {
      control: {
        type: 'text',
      },
    },
  },
} satisfies Meta<typeof BBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
  render: (_args, { _argTypes }) => ({
    components: { BBadge },
    template: `
    <div>
        <h2>Example heading <b-badge>New</b-badge></h2>
        <h3>Example heading <b-badge>New</b-badge></h3>
        <h4>Example heading <b-badge>New</b-badge></h4>
        <h5>Example heading <b-badge>New</b-badge></h5>
        <h6>Example heading <b-badge>New</b-badge></h6>
    </div>
    `,
  }),
}

export const LinkOrButton: Story = {
  render: (args, { argTypes }) => ({
    components: { BBadge },
    props: Object.keys(argTypes),
    template: `
    <div class="text-center flex gap-4">
        <b-button variant="primary">
        Notifications <b-badge variant="light">4</b-badge>
        </b-button>
    </div>
    `,
  }),
}

export const InsideButton: Story = {
  render: (args, { argTypes }) => ({
    components: { BBadge },
    props: Object.keys(argTypes),
    template: `
    <div class="text-center">
        <b-button variant="primary">
            Profile
            <b-badge variant="light">9 <span class="sr-only">unread messages</span></b-badge>
        </b-button>
    </div>
    `,
  }),
}

export const ContextualVariation: Story = {
  render: (args, { argTypes }) => ({
    components: { BBadge },
    props: Object.keys(argTypes),
    template: `
    <div class="flex gap-4">
        <b-badge variant="primary">Primary</b-badge>
        <b-badge variant="secondary">Secondary</b-badge>
        <b-badge variant="success">Success</b-badge>
        <b-badge variant="danger">Danger</b-badge>
        <b-badge variant="warning">Warning</b-badge>
        <b-badge variant="info">Info</b-badge>
        <b-badge variant="light">Light</b-badge>
        <b-badge variant="dark">Dark</b-badge>
    </div>
    `,
  }),
}

export const Pill: Story = {
  render: (args, { argTypes }) => ({
    components: { BBadge },
    props: Object.keys(argTypes),
    template: `
    <div class="flex gap-4">
        <b-badge pill variant="primary">Primary</b-badge>
        <b-badge pill variant="secondary">Secondary</b-badge>
        <b-badge pill variant="success">Success</b-badge>
        <b-badge pill variant="danger">Danger</b-badge>
        <b-badge pill variant="warning">Warning</b-badge>
        <b-badge pill variant="info">Info</b-badge>
        <b-badge pill variant="light">Light</b-badge>
        <b-badge pill variant="dark">Dark</b-badge>
    </div>
    `,
  }),
}

export const ActionableBadge: Story = {
  render: (args, { argTypes }) => ({
    components: { BBadge },
    props: Object.keys(argTypes),
    template: `
    <div>
        <b-badge href="#" variant="primary">Primary</b-badge>
        <b-badge href="#" variant="secondary">Secondary</b-badge>
        <b-badge href="#" variant="success">Success</b-badge>
        <b-badge href="#" variant="danger">Danger</b-badge>
        <b-badge href="#" variant="warning">Warning</b-badge>
        <b-badge href="#" variant="info">Info</b-badge>
        <b-badge href="#" variant="light">Light</b-badge>
        <b-badge href="#" variant="dark">Dark</b-badge>
    </div>
    `,
  }),
}
