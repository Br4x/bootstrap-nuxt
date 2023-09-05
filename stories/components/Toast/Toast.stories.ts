import type { Meta, StoryObj } from '@storybook/vue3'
import vitestResults from '@/tests/unit/results.json'
import BButton from '@/components/BButton.vue'
import BToast from '@/components/BToast.vue'
import BImg from '@/components/BImg.vue'
import BAlert from '@/components/BAlert.vue'

const meta = {
  title: 'Components/Toast',
  component: BToast,
  parameters: {
    vitest: {
      testFile: 'toast.spec.ts',
      testResults: vitestResults,
    },
  },
  argTypes: {

  },
} satisfies Meta<typeof BToast>

export default meta
          type Story = StoryObj<typeof meta>

export const Overview: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BToast },
    props: Object.keys(argTypes),
    template: `
  <div class="p-3 bg-secondary progress-bar-striped" style="min-height: 170px;">
    <b-button class="mb-2" variant="primary" @click="$bvToast.show('example-toast')">
      Show toast
    </b-button>
    <b-toast id="example-toast" title="BootstrapVue" static no-auto-hide>
      Hello, world! This is a toast message.
    </b-toast>
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

export const ToastsOnDemand: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-button @click="makeToast()">Show Toast</b-button>
    <b-button @click="makeToast(true)">Show Toast (appended)</b-button>
  </div>
`,

    data() {
      return {
        toastCount: 0,
      }
    },
    methods: {
      makeToast(append = false) {
        this.toastCount++
        this.$bvToast.toast(`This is toast number ${this.toastCount}`, {
          title: 'BootstrapVue Toast',
          autoHideDelay: 5000,
          appendToast: append,
        })
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

export const Variants: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-button @click="makeToast()" class="mb-2">Default</b-button>
    <b-button variant="primary" @click="makeToast('primary')" class="mb-2">Primary</b-button>
    <b-button variant="secondary" @click="makeToast('secondary')" class="mb-2">Secondary</b-button>
    <b-button variant="danger" @click="makeToast('danger')" class="mb-2">Danger</b-button>
    <b-button variant="warning" @click="makeToast('warning')" class="mb-2">Warning</b-button>
    <b-button variant="success" @click="makeToast('success')" class="mb-2">Success</b-button>
    <b-button variant="info" @click="makeToast('info')" class="mb-2">Info</b-button>
  </div>
`,

    methods: {
      makeToast(variant = null) {
        this.$bvToast.toast('Toast body content', {
          title: `Variant ${variant || 'default'}`,
          variant,
          solid: true,
        })
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

export const ToasterTarget: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-button @click="toast('b-toaster-top-right')" class="mb-2">b-toaster-top-right</b-button>
    <b-button @click="toast('b-toaster-top-left')" class="mb-2">b-toaster-top-left</b-button>
    <b-button @click="toast('b-toaster-top-center')" class="mb-2">b-toaster-top-center</b-button>
    <b-button @click="toast('b-toaster-top-full')" class="mb-2">b-toaster-top-full</b-button>
    <b-button @click="toast('b-toaster-bottom-right', true)" class="mb-2">b-toaster-bottom-right</b-button>
    <b-button @click="toast('b-toaster-bottom-left', true)" class="mb-2">b-toaster-bottom-left</b-button>
    <b-button @click="toast('b-toaster-bottom-center', true)" class="mb-2">b-toaster-bottom-center</b-button>
    <b-button @click="toast('b-toaster-bottom-full', true)" class="mb-2">b-toaster-bottom-full</b-button>
  </div>
`,

    data() {
      return {
        counter: 0,
      }
    },
    methods: {
      toast(toaster: any, append = false) {
        this.counter++
        this.$bvToast.toast(`Toast ${this.counter} body content`, {
          title: `Toaster ${toaster}`,
          toaster,
          solid: true,
          appendToast: append,
        })
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

export const CloseButton: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-button @click="showToast">Show Toast</b-button>
  </div>
`,

    data() {
      return {
        count: 0,
      }
    },
    methods: {
      showToast() {
        // Use a shorter name for `this.$createElement`
        const h = this.$createElement
        // Create a ID with a incremented count
        const id = `my-toast-${this.count++}`

        // Create the custom close button
        const $closeButton = h(
          'b-button',
          {
            on: { click: () => this.$bvToast.hide(id) },
          },
          'Close',
        )

        // Create the toast
        this.$bvToast.toast([$closeButton], {
          id,
          title: `Toast ${this.count}`,
          noCloseButton: true,
        })
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

export const Links: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-button @click="toast()">Toast with link</b-button>
  </div>
`,

    methods: {
      toast() {
        this.$bvToast.toast('Toast with action link', {
          href: '#foo',
          title: 'Example',
        })
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

export const BToastComponent: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BToast, BImg },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-button @click="$bvToast.show('my-toast')">Show toast</b-button>

    <b-toast id="my-toast" variant="warning" solid>
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
          <b-img blank blank-color="#ff5555" class="mr-2" width="12" height="12"></b-img>
          <strong class="mr-auto">Notice!</strong>
          <small class="text-muted mr-2">42 seconds ago</small>
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

export const AdvancedUsage: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-button @click="showToast">Show Toast with custom content</b-button>
  </div>
`,

    data() {
      return {
        count: 0,
      }
    },
    methods: {
      showToast() {
        // Use a shorter name for this.$createElement
        const h = this.$createElement
        // Increment the toast count
        this.count++
        // Create the message
        const vNodesMsg = h(
          'p',
          { class: ['text-center', 'mb-0'] },
          [
            h('b-spinner', { props: { type: 'grow', small: true } }),
            ' Flashy ',
            h('strong', 'toast'),
            ` message #${this.count} `,
            h('b-spinner', { props: { type: 'grow', small: true } }),
          ],
        )
        // Create the title
        const vNodesTitle = h(
          'div',
          { class: ['d-flex', 'flex-grow-1', 'align-items-baseline', 'mr-2'] },
          [
            h('strong', { class: 'mr-2' }, 'The Title'),
            h('small', { class: 'ml-auto text-italics' }, '5 minutes ago'),
          ],
        )
        // Pass the VNodes as an array for message and title
        this.$bvToast.toast([vNodesMsg], {
          title: [vNodesTitle],
          solid: true,
          variant: 'info',
        })
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

export const AlertsVersusToasts: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BAlert },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-button size="sm" @click="showBottom = !showBottom">
      {{ showBottom ? 'Hide' : 'Show' }} Fixed bottom Alert
    </b-button>
    <b-alert
      v-model="showBottom"
      class="position-fixed fixed-bottom m-0 rounded-0"
      style="z-index: 2000;"
      variant="warning"
      dismissible
    >
      Fixed position (bottom) alert!
    </b-alert>

    <b-button size="sm" @click="showTop = !showTop">
      {{ showTop ? 'Hide' : 'Show' }} Fixed top Alert
    </b-button>
    <b-alert
      v-model="showTop"
      class="position-fixed fixed-top m-0 rounded-0"
      style="z-index: 2000;"
      variant="success"
      dismissible
    >
      Fixed position (top) alert!
    </b-alert>
  </div>
`,

    data() {
      return {
        showBottom: false,
        showTop: false,
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
