import type { Meta, StoryObj } from '@storybook/vue3'
import vitestResults from '@/tests/unit/results.json'
import BLink from '@/components/BLink.vue'

const meta = {
  title: 'Components/Link',
  component: BLink,
  parameters: {
    vitest: {
      testFile: 'link.spec.ts',
      testResults: vitestResults,
    },
  },
  argTypes: {

  },
} satisfies Meta<typeof BLink>

export default meta
          type Story = StoryObj<typeof meta>

export const Link: Story = {
  render: (args, { argTypes }) => ({
    components: { BLink },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-link href="#foo">Link</b-link>
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

export const LinkDisabledState: Story = {
  render: (args, { argTypes }) => ({
    components: { BLink },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-link href="#foo" disabled>Disabled Link</b-link>
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
