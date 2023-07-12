import type { Meta, StoryObj } from '@storybook/vue3'
import vitestResults from '@/tests/unit/results.json'
import BRow from '@/components/B/Row.vue'

const meta = {
  title: 'Components/Row',
  component: BRow,
  parameters: {
    vitest: {
      testFile: 'row.test.tsx',
      testResults: vitestResults,
    },
  },
  argTypes: {
    cols: {
      control: {
        type: 'text',
        defaultValue: null,
      },
    },
    colsXs: {
      control: {
        type: 'text',
        defaultValue: null,
      },
    },
    colsSm: {
      control: {
        type: 'text',
        defaultValue: null,
      },
    },
    colsMd: {
      control: {
        type: 'text',
        defaultValue: null,
      },
    },
    colsLg: {
      control: {
        type: 'text',
        defaultValue: null,
      },
    },
    colsXl: {
      control: {
        type: 'text',
        defaultValue: null,
      },
    },
    alignContent: { control: 'select', options: ['start', 'center', 'end', 'around', 'between'], defaultValue: null },
    alignH: { control: 'select', options: ['start', 'center', 'end', 'around', 'between'], defaultValue: null },
    alignV: { control: 'select', options: ['start', 'center', 'end', 'baseline', 'stretch'], defaultValue: null },
    noGutters: { action: { type: 'boolean' } },
    tag: {
      control: {
        type: 'text',
        defaultValue: 'div',
      },
    },
    justify: { action: { type: 'boolean' } },
    keyNav: { action: { type: 'boolean' } },
  },
} satisfies Meta<typeof BRow>

export default meta
type Story = StoryObj<typeof meta>

export const Example1: Story = {
  render: (args, { argTypes }) => ({
    components: { BRow },
    props: Object.keys(argTypes),
    template: `
    <div>
      <b-row cols="1" cols-sm="2" cols-md="4" cols-lg="6"> 
        <div>hoho</div>
        <div>hoho</div>
        <div>hoho</div>
        <div>hoho</div>
      </b-row>
    </div>
    `,
  }),
}
