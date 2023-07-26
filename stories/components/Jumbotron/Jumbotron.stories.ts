import type { Meta, StoryObj } from '@storybook/vue3'
import vitestResults from '@/tests/unit/results.json'
import BJumbotron from '@/components/B/Jumbotron.vue'
import BButton from '@/components/B/Button.vue'

const meta = {
  title: 'Components/Jumbotron',
  component: BJumbotron,
  parameters: {
    vitest: {
      testFile: 'jumbotron.test.tsx',
      testResults: vitestResults,
    },
  },
  argTypes: {

  },
} satisfies Meta<typeof BJumbotron>

export default meta
          type Story = StoryObj<typeof meta>

export const Jumbotron: Story = {
  render: (args, { argTypes }) => ({
    components: { BJumbotron, BButton },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-jumbotron header="BootstrapVue" lead="Bootstrap v4 Components for Vue.js 2">
    <p>For more information visit website</p>
    <b-button variant="primary" href="#">More Info</b-button>
  </b-jumbotron>
</div>

<!-- b-jumbotron.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const Jumbotron1: Story = {
  render: (args, { argTypes }) => ({
    components: { BJumbotron, BButton },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-jumbotron>
    <template #header>BootstrapVue</template>

    <template #lead>
      This is a simple hero unit, a simple jumbotron-style component for calling extra attention to
      featured content or information.
    </template>

    <hr class="my-4">

    <p>
      It uses utility classes for typography and spacing to space content out within the larger
      container.
    </p>

    <b-button variant="primary" href="#">Do Something</b-button>
    <b-button variant="success" href="#">Do Something Else</b-button>
  </b-jumbotron>
</div>

<!-- b-jumbotron-using-slots.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const Variants: Story = {
  render: (args, { argTypes }) => ({
    components: { BJumbotron },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-jumbotron bg-variant="info" text-variant="white" border-variant="dark">
    <template #header>BootstrapVue</template>

    <template #lead>
      This is a simple hero unit, a simple jumbotron-style component for calling extra attention to
      featured content or information.
    </template>

    <hr class="my-4">

    <p>
      It uses utility classes for typography and spacing to space content out within the larger
      container.
    </p>
  </b-jumbotron>
</div>

<!-- b-jumbotron-variants.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}
