import type { Meta, StoryObj } from '@storybook/vue3'
import vitestResults from '@/tests/unit/results.json'
import BAlert from '@/components/B/Alert.vue'
import BButton from '@/components/B/Button.vue'

const meta = {
  title: 'Components/Alert',
  component: BAlert,
  parameters: {
    vitest: {
      testFile: 'alert.test.tsx',
      testResults: vitestResults,
    },
  },
  argTypes: {
    show: { control: { type: 'boolean' } },
    variant: { control: 'select', options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'], defaultValue: 'primary' },
    fade: { action: { type: 'boolean' } },
    dismissible: { action: { type: 'boolean' } },
    dismissLabel: {
      control: {
        type: 'text',
      },
    },
  },
} satisfies Meta<typeof BAlert>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
  render: (args, { argTypes }) => ({
    components: { BAlert, BButton },
    props: Object.keys(argTypes),
    template: `
    <div>
    <b-alert v-bind="args">
      You can test props with the controls on this one
    </b-alert>

    <b-alert show>
      Default Alert
    </b-alert>

    <b-alert variant="success" show>
      Success Alert
    </b-alert>

    <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
      Dismissible Alert!
    </b-alert>

    <b-alert
      :show="dismissCountDown"
      dismissible
      variant="warning"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
    >
      <p>This alert will dismiss after {{ dismissCountDown }} seconds...</p>
      <b-progress
        variant="warning"
        :max="dismissSecs"
        :value="dismissCountDown"
        height="4px"
      />
    </b-alert>

    <b-button variant="info" class="m-1" @click="showAlert">
      Show alert with count-down timer
    </b-button>
    <b-button variant="info" class="m-1" @click="showDismissibleAlert = true">
      Show dismissible alert ({{ showDismissibleAlert ? 'visible' : 'hidden' }})
    </b-button>
  </div>
    `,
    data() {
      return {
        dismissSecs: 10,
        dismissCountDown: 0,
        showDismissibleAlert: false,
      }
    },
    methods: {
      countDownChanged(dismissCountDown: number) {
        this.dismissCountDown = dismissCountDown
      },
      showAlert() {
        this.dismissCountDown = this.dismissSecs
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

export const ContextualVariants: Story = {
  render: (args, { argTypes }) => ({
    components: { BAlert },
    props: Object.keys(argTypes),
    template: `
    <div>
      <b-alert show variant="primary">Primary Alert</b-alert>
      <b-alert show variant="secondary">Secondary Alert</b-alert>
      <b-alert show variant="success">Success Alert</b-alert>
      <b-alert show variant="danger">Danger Alert</b-alert>
      <b-alert show variant="warning">Warning Alert</b-alert>
      <b-alert show variant="info">Info Alert</b-alert>
      <b-alert show variant="light">Light Alert</b-alert>
      <b-alert show variant="dark">Dark Alert</b-alert>
    </div>
    `,
  }),
}

export const AdditionalContent: Story = {
  render: (args, { argTypes }) => ({
    components: { BAlert },
    props: Object.keys(argTypes),
    template: `
    <div>
      <b-alert show variant="success">
        <h4 class="alert-heading">Well done!</h4>
        <p>
          Aww yeah, you successfully read this important alert message. This example text is going to
          run a bit longer so that you can see how spacing within an alert works with this kind of
          content.
        </p>
        <hr>
        <p class="mb-0">
          Whenever you need to, be sure to use margin utilities to keep things nice and tidy.
        </p>
      </b-alert>
    </div>
    `,
  }),
}

export const AlertLinks: Story = {
  render: (args, { argTypes }) => ({
    components: { BAlert },
    props: Object.keys(argTypes),
    template: `
    <div>
      <b-alert show variant="primary"><a href="#" class="alert-link">Primary Alert</a></b-alert>
      <b-alert show variant="secondary"><a href="#" class="alert-link">Secondary Alert</a></b-alert>
      <b-alert show variant="success"><a href="#" class="alert-link">Success Alert</a></b-alert>
      <b-alert show variant="danger"><a href="#" class="alert-link">Danger Alert</a></b-alert>
      <b-alert show variant="warning"><a href="#" class="alert-link">Warning Alert</a></b-alert>
      <b-alert show variant="info"><a href="#" class="alert-link">Info Alert</a></b-alert>
      <b-alert show variant="light"><a href="#" class="alert-link">Light Alert</a></b-alert>
      <b-alert show variant="dark"><a href="#" class="alert-link">Dark Alert</a></b-alert>
    </div>
    `,
  }),
}

export const AlertDismissible: Story = {
  render: (args, { argTypes }) => ({
    components: { BAlert },
    props: Object.keys(argTypes),
    template: `
    <div>
      <b-alert show dismissible>
        Dismissible Alert! Click the close button over there <b>&rArr;</b>
      </b-alert>
    </div>
    `,
  }),
}

export const AutoDismissible: Story = {
  render: (args, { argTypes }) => ({
    components: { BAlert, BButton },
    props: Object.keys(argTypes),
    template: `
    <div>
      <b-alert
        :show="dismissCountDown"
        dismissible
        variant="warning"
        @dismissed="dismissCountDown=0"
        @dismiss-count-down="countDownChanged"
      >
        This alert will dismiss after {{ dismissCountDown }} seconds...
      </b-alert>
      <b-button @click="showAlert" variant="info" class="m-1">
        Show alert with count-down timer
      </b-button>
    </div>
    `,
    data() {
      return {
        dismissSecs: 5,
        dismissCountDown: 0,
      }
    },
    methods: {
      countDownChanged(dismissCountDown: number) {
        this.dismissCountDown = dismissCountDown
      },
      showAlert() {
        this.dismissCountDown = this.dismissSecs
      },
    },
    setup() {
      return { args }
    },
  }),
}

export const FadingAlerts: Story = {
  render: (args, { argTypes }) => ({
    components: { BAlert, BButton },
    props: Object.keys(argTypes),
    template: `
    <div>
      <b-alert show dismissible fade>Dismissible Alert!</b-alert>

      <b-alert
        variant="danger"
        dismissible
        fade
        :show="showDismissibleAlert"
        @dismissed="showDismissibleAlert=false"
      >
        Dismissible Alert!
      </b-alert>

      <b-alert
        :show="dismissCountDown"
        dismissible
        fade
        variant="warning"
        @dismiss-count-down="countDownChanged"
      >
        This alert will dismiss after {{ dismissCountDown }} seconds...
      </b-alert>

      <b-button @click="showAlert" variant="info" class="m-1">
        Show alert with count-down timer
      </b-button>
      <b-button @click="showDismissibleAlert=true" variant="info" class="m-1">
        Show dismissible alert ({{ showDismissibleAlert ? 'visible' : 'hidden' }})
      </b-button>
    </div>
    `,
    data() {
      return {
        dismissSecs: 5,
        dismissCountDown: 0,
        showDismissibleAlert: false,
      }
    },
    methods: {
      countDownChanged(dismissCountDown: number) {
        this.dismissCountDown = dismissCountDown
      },
      showAlert() {
        this.dismissCountDown = this.dismissSecs
      },
    },
  }),
}
