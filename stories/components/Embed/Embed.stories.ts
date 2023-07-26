import type { Meta, StoryObj } from '@storybook/vue3'
import vitestResults from '@/tests/unit/results.json'
import BEmbed from '@/components/B/Embed.vue'

const meta = {
  title: 'Components/Embed',
  component: BEmbed,
  parameters: {
    vitest: {
      testFile: 'embed.test.tsx',
      testResults: vitestResults,
    },
  },
  argTypes: {

  },
} satisfies Meta<typeof BEmbed>

export default meta
          type Story = StoryObj<typeof meta>

export const Embed: Story = {
  render: (args, { argTypes }) => ({
    components: { BEmbed },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-embed
    type="iframe"
    aspect="16by9"
    src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"
    allowfullscreen
  ></b-embed>
</div>

<!-- b-embed.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const AttributesAndChildElements: Story = {
  render: (args, { argTypes }) => ({
    components: { BEmbed },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-embed type="video" aspect="4by3" controls poster="poster.png">
    <source src="dev-stories.webm" type="video/webm">
    <source src="dev-stories.mp4" type="video/mp4">
  </b-embed>
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
