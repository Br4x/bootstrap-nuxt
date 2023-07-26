import type { Meta, StoryObj } from '@storybook/vue3'
import vitestResults from '@/tests/unit/results.json'
import BButton from '@/components/B/Button.vue'
import BCollapse from '@/components/B/Collapse.vue'
import BCard from '@/components/B/Card.vue'
import BCardHeader from '@/components/B/CardHeader.vue'
import BCardBody from '@/components/B/CardBody.vue'
import BCardText from '@/components/B/CardText.vue'

const meta = {
  title: 'Components/Collapse',
  component: BCollapse,
  parameters: {
    vitest: {
      testFile: 'collapse.test.tsx',
      testResults: vitestResults,
    },
  },
  argTypes: {

  },
} satisfies Meta<typeof BCollapse>

export default meta
          type Story = StoryObj<typeof meta>

export const Collapse: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BCollapse, BCard },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-button v-b-toggle.collapse-1 variant="primary">Toggle Collapse</b-button>
  <b-collapse id="collapse-1" class="mt-2">
    <b-card>
      <p class="card-text">Collapse contents Here</p>
      <b-button v-b-toggle.collapse-1-inner size="sm">Toggle Inner Collapse</b-button>
      <b-collapse id="collapse-1-inner" class="mt-2">
        <b-card>Hello!</b-card>
      </b-collapse>
    </b-card>
  </b-collapse>
</div>

<!-- b-collapse.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const Usage: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BCollapse, BCard },
    props: Object.keys(argTypes),
    template: `
<div>
  <!-- Using modifiers -->
  <b-button v-b-toggle.collapse-2 class="m-1">Toggle Collapse</b-button>

  <!-- Using value -->
  <b-button v-b-toggle="'collapse-2'" class="m-1">Toggle Collapse</b-button>

  <!-- Element to collapse -->
  <b-collapse id="collapse-2">
    <b-card>I am collapsible content!</b-card>
  </b-collapse>
</div>

<!-- b-collapse-usage.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const InitialVisibilityStartExpanded: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BCollapse, BCard },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-button v-b-toggle.collapse-3 class="m-1">Toggle Collapse</b-button>
  <b-collapse visible id="collapse-3">
    <b-card>I should start open!</b-card>
  </b-collapse>
</div>

<!-- b-collapse-visible.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const VModelSupport: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BCollapse, BCard },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-button
      :class="visible ? null : 'collapsed'"
      :aria-expanded="visible ? 'true' : 'false'"
      aria-controls="collapse-4"
      @click="visible = !visible"
    >
      Toggle Collapse
    </b-button>
    <b-collapse id="collapse-4" v-model="visible" class="mt-2">
      <b-card>I should start open!</b-card>
    </b-collapse>
  </div>
`,

    data() {
      return {
        visible: true,
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

export const TriggerMultipleCollapseElements: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BCollapse, BCard },
    props: Object.keys(argTypes),
    template: `
<div>
  <!-- Via multiple directive modifiers -->
  <b-button v-b-toggle.collapse-a.collapse-b>Toggle Collapse A and B</b-button>

  <!-- Via space separated string of IDs passed to directive value -->
  <b-button v-b-toggle="'collapse-a collapse-b'">Toggle Collapse A and B</b-button>

  <!-- Via array of string IDs passed to directive value -->
  <b-button v-b-toggle="['collapse-a', 'collapse-b']">Toggle Collapse A and B</b-button>

  <!-- Elements to collapse -->
  <b-collapse id="collapse-a" class="mt-2">
    <b-card>I am collapsible content A!</b-card>
  </b-collapse>
  <b-collapse id="collapse-b" class="mt-2">
    <b-card>I am collapsible content B!</b-card>
  </b-collapse>
</div>

<!-- b-collapse-trigger-multiple.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const AccordionSupport: Story = {
  render: (args, { argTypes }) => ({
    components: { BCard, BCardHeader, BButton, BCollapse, BCardBody, BCardText },
    props: Object.keys(argTypes),
    template: `
  <div class="accordion" role="tablist">
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-1 variant="info">Accordion 1</b-button>
      </b-card-header>
      <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-card-text>I start opened because <code>visible</code> is <code>true</code></b-card-text>
          <b-card-text>{{ text }}</b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>

    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-2 variant="info">Accordion 2</b-button>
      </b-card-header>
      <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-card-text>{{ text }}</b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>

    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-3 variant="info">Accordion 3</b-button>
      </b-card-header>
      <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-card-text>{{ text }}</b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
`,

    data() {
      return {
        text: `
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
          richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor
          brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
          tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
          assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
          wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher
          vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic
          synth nesciunt you probably haven't heard of them accusamus labore VHS.
        `,
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

export const HidingAndShowingContentInTheToggleButtonBasedOnCollapseState: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BCollapse },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-button v-b-toggle:my-collapse>
    <span class="when-open">Close</span><span class="when-closed">Open</span> My Collapse
  </b-button>
  <b-collapse id="my-collapse">
    <!-- Content here -->
  </b-collapse>
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
