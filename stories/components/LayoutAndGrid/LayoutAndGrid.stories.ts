import type { Meta, StoryObj } from '@storybook/vue3'
import BContainer from '@/components/BContainer.vue'
import vitestResults from '@/tests/unit/results.json'
import BRow from '@/components/BRow.vue'
import BCol from '@/components/BCol.vue'

const meta = {
  title: 'Components/LayoutAndGrid',
  component: BRow,
  parameters: {
    vitest: {
      testFile: 'row.spec.ts',
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

export const HowItWorks: Story = {
  render: (args: any, { argTypes }: any) => ({
    components: { BRow, BCol, BContainer },
    props: Object.keys(argTypes),
    template: `
    <b-container>
      <b-row>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4">1 of 3</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4">2 of 3</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4">3 of 3</b-col>
      </b-row>
    </b-container>
    `,
  }),
}

export const EqualWidthColumns: Story = {
  render: (args: any, { argTypes }: any) => ({
    components: { BRow, BCol, BContainer },
    props: Object.keys(argTypes),
    template: `
    <b-container>
      <b-row>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4">1 of 2</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4">2 of 2</b-col>
      </b-row>

      <b-row class="mt-4">
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4">1 of 3</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4">2 of 3</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4">3 of 3</b-col>
      </b-row>
    </b-container>
    `,
  }),
}

export const EqualWidthMultiLines: Story = {
  render: (args: any, { argTypes }: any) => ({
    components: { BRow, BCol, BContainer },
    props: Object.keys(argTypes),
    template: `
    <b-container>
      <b-row>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4">Column</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4">Column</b-col>
        <div class="w-full"></div>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4">Column</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4">Column</b-col>
      </b-row>
    </b-container>
    `,
  }),
}

export const SettingOneColumnWidth: Story = {
  render: (args: any, { argTypes }: any) => ({
    components: { BRow, BCol, BContainer },
    props: Object.keys(argTypes),
    template: `
    <b-container>
      <b-row class="text-center">
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4">1 of 3</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4" cols="8">2 of 3 (wider)</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4">3 of 3</b-col>
      </b-row>

      <b-row class="text-center mt-4">
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4">1 of 3</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4" cols="5">2 of 3 (wider)</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4">3 of 3</b-col>
      </b-row>
    </b-container>
    `,
  }),
}

export const VariableWidthContent: Story = {
  render: (args: any, { argTypes }: any) => ({
    components: { BRow, BCol, BContainer },
    props: Object.keys(argTypes),
    template: `
    <b-container>
      <b-row class="md:justify-center">
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4" col lg="2">1 of 3</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4" cols="12" md="auto">Variable width content</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4" col lg="2">3 of 3</b-col>
      </b-row>

      <b-row class="mt-4">
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4">1 of 3</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4" cols="12" md="auto">Variable width content</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4" col lg="2">3 of 3</b-col>
      </b-row>
    </b-container>
    `,
  }),
}

export const AllBreakpoints: Story = {
  render: (args: any, { argTypes }: any) => ({
    components: { BRow, BCol, BContainer },
    props: Object.keys(argTypes),
    template: `
    <b-container>
      <b-row>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4">col</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4">col</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4">col</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4">col</b-col>
      </b-row>

      <b-row class="mt-4">
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4" cols="8">col-8</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4" cols="4">col-4</b-col>
      </b-row>
    </b-container>
    `,
  }),
}

export const StackedToHorizontal: Story = {
  render: (args: any, { argTypes }: any) => ({
    components: { BRow, BCol, BContainer },
    props: Object.keys(argTypes),
    template: `
    <b-container>
      <b-row>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4" sm="8">col-sm-8</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4" sm="4">col-sm-4</b-col>
      </b-row>

      <b-row class="mt-4">
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4" sm>col-sm</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4" sm>col-sm</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4" sm>col-sm</b-col>
      </b-row>
    </b-container>
    `,
  }),
}

export const MixAndMatch: Story = {
  render: (args: any, { argTypes }: any) => ({
    components: { BRow, BCol, BContainer },
    props: Object.keys(argTypes),
    template: `
    <b-container>
      
      <b-row>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4" cols="12" md="8">cols="12" md="8"</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4" cols="6" md="4">cols="6" md="4"</b-col>
      </b-row>

      <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
      <b-row class="mt-4">
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4" cols="6" md="4">cols="6" md="4"</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4" cols="6" md="4">cols="6" md="4"</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4" cols="6" md="4">cols="6" md="4"</b-col>
      </b-row>

      <!-- Columns are always 50% wide, on mobile and desktop -->
      <b-row class="mt-4">
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4" cols="6">cols="6"</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4" cols="6">cols="6"</b-col>
      </b-row>
    </b-container>
    `,
  }),
}

export const VerticalAlignment: Story = {
  render: (args: any, { argTypes }: any) => ({
    components: { BRow, BCol, BContainer },
    props: Object.keys(argTypes),
    template: `
    <b-container>
      <span class="block my-4 w-full capitalize text-lg font-semibold">start</span>
      <b-row class="bg-red-100 min-h-[10rem]" align-v="start">
        <b-col class="border-1 border-red-400 bg-red-200 p-4">One of three columns</b-col>
        <b-col class="border-1 border-red-400 bg-red-200 p-4">One of three columns</b-col>
        <b-col class="border-1 border-red-400 bg-red-200 p-4">One of three columns</b-col>
      </b-row>

      <span class="block my-4 w-full capitalize text-lg font-semibold">center</span>

      <b-row class="bg-red-100 min-h-[10rem]" align-v="center">
        <b-col class="border-1 border-red-400 bg-red-200 p-4">One of three columns</b-col>
        <b-col class="border-1 border-red-400 bg-red-200 p-4">One of three columns</b-col>
        <b-col class="border-1 border-red-400 bg-red-200 p-4">One of three columns</b-col>
      </b-row>

      <span class="block my-4 w-full capitalize text-lg font-semibold">end</span>

      <b-row class="bg-red-100 min-h-[10rem]" align-v="end">
        <b-col class="border-1 border-red-400 bg-red-200 p-4">One of three columns</b-col>
        <b-col class="border-1 border-red-400 bg-red-200 p-4">One of three columns</b-col>
        <b-col class="border-1 border-red-400 bg-red-200 p-4">One of three columns</b-col>
      </b-row>

      <span class="block my-4 w-full capitalize text-lg font-semibold">baseline</span>

      <b-row class="bg-red-100 min-h-[10rem]" align-v="baseline">
        <b-col class="border-1 border-red-400 bg-red-200 p-4" style="font-size: 0.75rem;">One of three columns</b-col>
        <b-col class="border-1 border-red-400 bg-red-200 p-4">One of three columns</b-col>
        <b-col class="border-1 border-red-400 bg-red-200 p-4" style="font-size: 1.25rem;">One of three columns</b-col>
      </b-row>

      <span class="block my-4 w-full capitalize text-lg font-semibold">stretch</span>

      <b-row class="bg-red-100 min-h-[10rem]" align-v="stretch">
        <b-col class="border-1 border-red-400 bg-red-200 p-4">One of three columns</b-col>
        <b-col class="border-1 border-red-400 bg-red-200 p-4">One of three columns</b-col>
        <b-col class="border-1 border-red-400 bg-red-200 p-4">One of three columns</b-col>
      </b-row>
    </b-container>
    `,
  }),
}

export const SelfAlignment: Story = {
  render: (args: any, { argTypes }: any) => ({
    components: { BRow, BCol, BContainer },
    props: Object.keys(argTypes),
    template: `
    <b-container>
      <b-row class="bg-red-100 min-h-[10rem]">
        <b-col class="border-1 border-red-400 bg-red-200 p-3" align-self="start">One of three columns</b-col>
        <b-col class="border-1 border-red-400 bg-red-200 p-3" align-self="center">One of three columns</b-col>
        <b-col class="border-1 border-red-400 bg-red-200 p-3" align-self="end">One of three columns</b-col>
      </b-row>
      <b-row class="bg-red-100 min-h-[10rem] mt-4">
        <b-col class="border-1 border-red-400 bg-red-200 p-4" align-self="baseline">One of two columns</b-col>
        <b-col class="border-1 border-red-400 bg-red-200 p-4" align-self="stretch">One of two  columns</b-col>
      </b-row>
    </b-container>
    `,
  }),
}

export const HorizontalAlignment: Story = {
  render: (args: any, { argTypes }: any) => ({
    components: { BRow, BCol, BContainer },
    props: Object.keys(argTypes),
    template: `
    <b-container class="bv-example-row">
      <b-row align-h="start">
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4" cols="4">One of two columns</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4" cols="4">One of two columns</b-col>
      </b-row>
    
      <b-row class="mt-4" align-h="center">
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4" cols="4">One of two columns</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4" cols="4">One of two columns</b-col>
      </b-row>
    
      <b-row class="mt-4" align-h="end">
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4" cols="4">One of two columns</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4" cols="4">One of two columns</b-col>
      </b-row>
    
      <b-row class="mt-4" align-h="around">
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4" cols="4">One of two columns</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4" cols="4">One of two columns</b-col>
      </b-row>
    
      <b-row class="mt-4" align-h="between">
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4" cols="4">One of two columns</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4" cols="4">One of two columns</b-col>
      </b-row>
    </b-container>
    `,
  }),
}

export const OrderingColumns: Story = {
  render: (args: any, { argTypes }: any) => ({
    components: { BRow, BCol, BContainer },
    props: Object.keys(argTypes),
    template: `
    <b-container fluid>
      <b-row class="mb-3">
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4">First in DOM, no order applied</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4" order="5">Second in DOM, with a larger order</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4" order="1">Third in DOM, with an order of 1</b-col>
      </b-row>

      <b-row class="mb-3">
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4" order="6">First in DOM, with order of 6</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4" order="1">Second in DOM, with an order of 1</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4">Third in DOM, no order applied</b-col>
      </b-row>
    </b-container>
    `,
  }),
}

export const OffsettingColumns: Story = {
  render: (args: any, { argTypes }: any) => ({
    components: { BRow, BCol, BContainer },
    props: Object.keys(argTypes),
    template: `
    <b-container fluid class="bv-example-row">
      <b-row>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4" md="4">md="4"</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4" md="4" offset-md="4">md="4" offset-md="4"</b-col>
      </b-row>

      <b-row>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4" md="3" offset-md="3">md="3" offset-md="3"</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4" md="3" offset-md="3">md="3" offset-md="3"</b-col>
      </b-row>

      <b-row>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4" md="6" offset-md="3">md="6" offset-md="3"</b-col>
      </b-row>
    </b-container>
    `,
  }),
}

export const ResetOffsetForLargerBreakPoints: Story = {
  render: (args: any, { argTypes }: any) => ({
    components: { BRow, BCol, BContainer },
    props: Object.keys(argTypes),
    template: `
    <b-container fluid class="bv-example-row">
      <b-row>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4" sm="5" md="6">sm="5" md="6"</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4" sm="5" offset-sm="2" md="6" offset-md="0">sm="5" offset-sm="2" md="6" offset-md="0"</b-col>
      </b-row>

      <b-row>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4" sm="6" md="5" lg="6">sm="6" md="5" lg="6"</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4" sm="6" md="5" offset-md="2" lg="6" offset-lg="0">sm="6" md="5" offset-md="2" col-lg="6" offset-lg="0"</b-col>
      </b-row>
    </b-container>
    `,
  }),
}

export const MarginUtilitiesOnColumns: Story = {
  render: (args: any, { argTypes }: any) => ({
    components: { BRow, BCol, BContainer },
    props: Object.keys(argTypes),
    template: `
    <b-container fluid class="text-light text-center">
      <b-row class="mb-3">
        <b-col md="4" class="p-3 bg-info">md="4"</b-col>
        <b-col md="4" class="ml-auto p-3 bg-info">md="4" .ml-auto</b-col>
      </b-row>

      <b-row class="mb-3">
        <b-col md="3" class="md:ml-auto p-3 bg-info">md="3" .ml-md-auto</b-col>
        <b-col md="3" class="md:ml-auto p-3 bg-info">md="3" .ml-md-auto</b-col>
      </b-row>

      <b-row>
        <b-col cols="auto" class="mr-auto p-3 bg-info">cols="auto" .mr-auto</b-col>
        <b-col cols="auto" class="p-3 bg-info">cols="auto"</b-col>
      </b-row>
    </b-container>
    `,
  }),
}

export const NestingGrid: Story = {
  render: (args: any, { argTypes }: any) => ({
    components: { BRow, BCol, BContainer },
    props: Object.keys(argTypes),
    template: `
    <b-container fluid>
      <b-row>
        <b-col class="border-1 border-gray-200 bg-gray-100 p-4" sm="9">
          Level 1: sm="9"
          <b-row>
            <b-col class="border-1 border-gray-400 bg-gray-200 p-4" cols="8" sm="6">Level 2: cols="8" sm="6"</b-col>
            <b-col class="border-1 border-gray-400 bg-gray-200 p-4" cols="4" sm="6">Level 2: cols="4" sm="6"</b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
    `,
  }),
}

export const RowColumns: Story = {
  render: (args: any, { argTypes }: any) => ({
    components: { BRow, BCol, BContainer },
    props: Object.keys(argTypes),
    template: `
    <b-container class="mb-3">
      <b-row cols="2">
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4">Column</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4">Column</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4">Column</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4">Column</b-col>
      </b-row>
    </b-container>

    <b-container class="bv-example-row mb-3">
      <b-row cols="3" class="mt-4">
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4">Column</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4">Column</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4">Column</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4">Column</b-col>
      </b-row>
    </b-container>

    <b-container class="bv-example-row mb-3">
      <b-row cols="4" class="mt-4">
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4">Column</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4">Column</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4">Column</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4">Column</b-col>
      </b-row>
    </b-container>

    <b-container class="bv-example-row">
      <b-row cols="4" class="mt-4">
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4">Column</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4">Column</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4" cols="6">Column</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4">Column</b-col>
      </b-row>
    </b-container>
    `,
  }),
}

export const RowColumnsWithBreakpoints: Story = {
  render: (args: any, { argTypes }: any) => ({
    components: { BRow, BCol, BContainer },
    props: Object.keys(argTypes),
    template: `
    <b-container class="bv-example-row">
      <b-row cols="1" cols-sm="2" cols-md="4" cols-lg="6">
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4">Column</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4">Column</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4">Column</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4">Column</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4">Column</b-col>
        <b-col class="border-1 border-gray-400 bg-gray-200 p-4">Column</b-col>
      </b-row>
    </b-container>
    `,
  }),
}
