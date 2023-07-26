import type { Meta, StoryObj } from '@storybook/vue3'
import vitestResults from '@/tests/unit/results.json'
import BProgress from '@/components/B/Progress.vue'
import BProgressBar from '@/components/B/ProgressBar.vue'
import BButton from '@/components/B/Button.vue'

const meta = {
  title: 'Components/Progress',
  component: BProgress,
  parameters: {
    vitest: {
      testFile: 'progress.test.tsx',
      testResults: vitestResults,
    },
  },
  argTypes: {

  },
} satisfies Meta<typeof BProgress>

export default meta
          type Story = StoryObj<typeof meta>

export const Progress: Story = {
  render: (args, { argTypes }) => ({
    components: { BProgress, BProgressBar, BButton },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-progress :value="value" :max="max" show-progress animated></b-progress>
    <b-progress class="mt-2" :max="max" show-value>
      <b-progress-bar :value="value * (6 / 10)" variant="success"></b-progress-bar>
      <b-progress-bar :value="value * (2.5 / 10)" variant="warning"></b-progress-bar>
      <b-progress-bar :value="value * (1.5 / 10)" variant="danger"></b-progress-bar>
    </b-progress>

    <b-button class="mt-3" @click="randomValue">Click me</b-button>
  </div>
`,

    data() {
      return {
        value: 45,
        max: 100,
      }
    },
    methods: {
      randomValue() {
        this.value = Math.random() * this.max
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

export const Labels: Story = {
  render: (args, { argTypes }) => ({
    components: { BProgress },
    props: Object.keys(argTypes),
    template: `
  <div>
    <h5>No label</h5>
    <b-progress :value="value" :max="max" class="mb-3"></b-progress>

    <h5>Value label</h5>
    <b-progress :value="value" :max="max" show-value class="mb-3"></b-progress>

    <h5>Progress label</h5>
    <b-progress :value="value" :max="max" show-progress class="mb-3"></b-progress>

    <h5>Value label with precision</h5>
    <b-progress :value="value" :max="max" :precision="2" show-value class="mb-3"></b-progress>

    <h5>Progress label with precision</h5>
    <b-progress :value="value" :max="max" :precision="2" show-progress class="mb-3"></b-progress>
  </div>
`,

    data() {
      return {
        value: 33.333333333,
        max: 50,
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

export const CustomProgressLabel: Story = {
  render: (args, { argTypes }) => ({
    components: { BProgress, BProgressBar },
    props: Object.keys(argTypes),
    template: `
  <div>
    <h5>Custom label via default slot</h5>
    <b-progress :max="max" height="2rem">
      <b-progress-bar :value="value">
        <span>Progress: <strong>{{ value.toFixed(2) }} / {{ max }}</strong></span>
      </b-progress-bar>
    </b-progress>

    <h5 class="mt-3">Custom label via property</h5>
    <b-progress :max="max">
      <b-progress-bar :value="value" :label="\`${((value / max) * 100).toFixed(2)}%\`"></b-progress-bar>
    </b-progress>

    <h5 class="mt-3">Custom label via property (HTML support)</h5>
    <b-progress :max="max">
      <b-progress-bar :value="value" :label-html="\`<del>${value}</del>\`"></b-progress-bar>
    </b-progress>
  </div>
`,

    data() {
      return {
        value: 33.333333333,
        max: 50,
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

export const WidthAndHeight: Story = {
  render: (args, { argTypes }) => ({
    components: { BProgress },
    props: Object.keys(argTypes),
    template: `
  <div>
    <h5>Default width</h5>
    <b-progress :value="value" class="mb-3"></b-progress>

    <h5>Custom widths</h5>
    <b-progress :value="value" class="w-75 mb-2"></b-progress>
    <b-progress :value="value" class="w-50 mb-2"></b-progress>
    <b-progress :value="value" class="w-25"></b-progress>
  </div>
`,

    data() {
      return {
        value: 75,
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

export const WidthAndHeight1: Story = {
  render: (args, { argTypes }) => ({
    components: { BProgress },
    props: Object.keys(argTypes),
    template: `
  <div>
    <h5>Default height</h5>
    <b-progress :value="value" show-progress class="mb-3"></b-progress>

    <h5>Custom heights</h5>
    <b-progress height="2rem" :value="value" show-progress class="mb-2"></b-progress>
    <b-progress height="20px" :value="value" show-progress class="mb-2"></b-progress>
    <b-progress height="2px" :value="value"></b-progress>
  </div>
`,

    data() {
      return {
        value: 75,
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

export const SolidBackgroundVariants: Story = {
  render: (args, { argTypes }) => ({
    components: { BProgress },
    props: Object.keys(argTypes),
    template: `
  <div>
    <div v-for="bar in bars" class="row mb-1">
      <div class="col-sm-2">{{ bar.variant }}:</div>
      <div class="col-sm-10 pt-1">
        <b-progress :value="bar.value" :variant="bar.variant" :key="bar.variant"></b-progress>
      </div>
    </div>
  </div>
`,

    data() {
      return {
        bars: [
          { variant: 'success', value: 75 },
          { variant: 'info', value: 75 },
          { variant: 'warning', value: 75 },
          { variant: 'danger', value: 75 },
          { variant: 'primary', value: 75 },
          { variant: 'secondary', value: 75 },
          { variant: 'dark', value: 75 },
        ],
        timer: null,
      }
    },
    mounted() {
      this.timer = setInterval(() => {
        this.bars.forEach(bar => (bar.value = 25 + Math.random() * 75))
      }, 2000)
    },
    beforeDestroy() {
      clearInterval(this.timer)
      this.timer = null
    },
    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const StripedBackgrounds: Story = {
  render: (args, { argTypes }) => ({
    components: { BProgress, BButton },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-progress :value="25" variant="success" :striped="striped"></b-progress>
    <b-progress :value="50" variant="info" :striped="striped" class="mt-2"></b-progress>
    <b-progress :value="75" variant="warning" :striped="striped" class="mt-2"></b-progress>
    <b-progress :value="100" variant="danger" :striped="striped" class="mt-2"></b-progress>

    <b-button variant="secondary" @click="striped = !striped" class="mt-3">
      {{ striped ? 'Remove' : 'Add' }} Striped
    </b-button>
  </div>
`,

    data() {
      return {
        striped: true,
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

export const AnimatedBackgrounds: Story = {
  render: (args, { argTypes }) => ({
    components: { BProgress, BButton },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-progress :value="25" variant="success" striped :animated="animate"></b-progress>
    <b-progress :value="50" variant="info" striped :animated="animate" class="mt-2"></b-progress>
    <b-progress :value="75" variant="warning" striped :animated="animate" class="mt-2"></b-progress>
    <b-progress :value="100" variant="danger" :animated="animate" class="mt-3"></b-progress>

    <b-button variant="secondary" @click="animate = !animate" class="mt-3">
      {{ animate ? 'Stop' : 'Start' }} Animation
    </b-button>
  </div>
`,

    data() {
      return {
        animate: true,
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

export const MultipleBars: Story = {
  render: (args, { argTypes }) => ({
    components: { BProgress, BProgressBar },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-progress :max="max" class="mb-3">
      <b-progress-bar variant="primary" :value="values[0]"></b-progress-bar>
      <b-progress-bar variant="success" :value="values[1]"></b-progress-bar>
      <b-progress-bar variant="info" :value="values[2]"></b-progress-bar>
    </b-progress>

    <b-progress show-progress :max="max" class="mb-3">
      <b-progress-bar variant="primary" :value="values[0]"></b-progress-bar>
      <b-progress-bar variant="success" :value="values[1]"></b-progress-bar>
      <b-progress-bar variant="info" :value="values[2]"></b-progress-bar>
    </b-progress>

    <b-progress show-value striped :max="max" class="mb-3">
      <b-progress-bar variant="primary" :value="values[0]"></b-progress-bar>
      <b-progress-bar variant="success" :value="values[1]"></b-progress-bar>
      <b-progress-bar variant="info" :value="values[2]"></b-progress-bar>
    </b-progress>

    <b-progress :max="max">
      <b-progress-bar variant="primary" :value="values[0]" show-progress></b-progress-bar>
      <b-progress-bar variant="success" :value="values[1]" animated show-progress></b-progress-bar>
      <b-progress-bar variant="info" :value="values[2]" striped show-progress></b-progress-bar>
    </b-progress>
  </div>
`,

    data() {
      return {
        values: [15, 30, 20],
        max: 100,
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
