import type { Meta, StoryObj } from '@storybook/vue3'
import vitestResults from '@/tests/unit/results.json'
import BButton from '@/components/BButton.vue'
import BSidebar from '@/components/BSidebar.vue'
import BImg from '@/components/BImg.vue'
import BNav from '@/components/BNav.vue'
import BNavItem from '@/components/BNavItem.vue'
import BFormGroup from '@/components/BFormGroup.vue'
import BFormSelect from '@/components/BFormSelect.vue'

const meta = {
  title: 'Components/Sidebar',
  component: BSidebar,
  parameters: {
    vitest: {
      testFile: 'sidebar.spec.ts',
      testResults: vitestResults,
    },
  },
  argTypes: {

  },
} satisfies Meta<typeof BSidebar>

export default meta
          type Story = StoryObj<typeof meta>

export const Overview: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BSidebar, BImg },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-button v-b-toggle.sidebar-1>Toggle Sidebar</b-button>
    <b-sidebar id="sidebar-1" title="Sidebar" shadow>
      <div class="px-3 py-2">
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
          in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </p>
        <b-img src="https://picsum.photos/500/500/?image=54" fluid thumbnail></b-img>
      </div>
    </b-sidebar>
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

export const Placement: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BSidebar, BImg },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-button v-b-toggle.sidebar-right>Toggle Sidebar</b-button>
    <b-sidebar id="sidebar-right" title="Sidebar" right shadow>
      <div class="px-3 py-2">
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
          in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </p>
        <b-img src="https://picsum.photos/500/500/?image=54" fluid thumbnail></b-img>
      </div>
    </b-sidebar>
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

export const Variants: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BSidebar, BImg },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-button v-b-toggle.sidebar-variant>Toggle Sidebar</b-button>
    <b-sidebar id="sidebar-variant" title="Sidebar" bg-variant="dark" text-variant="light" shadow>
      <div class="px-3 py-2">
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
          in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </p>
        <b-img src="https://picsum.photos/500/500/?image=54" fluid thumbnail></b-img>
      </div>
    </b-sidebar>
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

export const Borders: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BSidebar, BImg },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-button v-b-toggle.sidebar-border>Toggle Sidebar</b-button>
    <b-sidebar id="sidebar-border" sidebar-class="border-right border-danger">
      <div class="px-3 py-2">
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
          in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </p>
        <b-img src="https://picsum.photos/500/500/?image=54" fluid thumbnail></b-img>
      </div>
    </b-sidebar>
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

export const HidingTheDefaultHeader: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BSidebar, BNav, BNavItem },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-button v-b-toggle.sidebar-no-header>Toggle Sidebar</b-button>
    <b-sidebar id="sidebar-no-header" aria-labelledby="sidebar-no-header-title" no-header shadow>
      <template #default="{ hide }">
        <div class="p-3">
          <h4 id="sidebar-no-header-title">Custom header sidebar</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </p>
          <nav class="mb-3">
            <b-nav vertical>
              <b-nav-item active @click="hide">Active</b-nav-item>
              <b-nav-item href="#link-1" @click="hide">Link</b-nav-item>
              <b-nav-item href="#link-2" @click="hide">Another Link</b-nav-item>
            </b-nav>
          </nav>
          <b-button variant="primary" block @click="hide">Close Sidebar</b-button>
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

export const Footer: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BSidebar, BImg },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-button v-b-toggle.sidebar-footer>Toggle Sidebar</b-button>
    <b-sidebar id="sidebar-footer" aria-label="Sidebar with custom footer" no-header shadow>
      <template #footer="{ hide }">
       <div class="d-flex bg-dark text-light align-items-center px-3 py-2">
        <strong class="mr-auto">Footer</strong>
        <b-button size="sm" @click="hide">Close</b-button>
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

export const Backdrop: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BSidebar, BFormGroup, BFormSelect },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-button v-b-toggle.sidebar-backdrop>Toggle Sidebar</b-button>

    <b-sidebar
      id="sidebar-backdrop"
      title="Sidebar with backdrop"
      :backdrop-variant="variant"
      backdrop
      shadow
    >
      <div class="px-3 py-2">
        <b-form-group label="Backdrop variant" label-for="backdrop-variant">
          <b-form-select id="backdrop-variant" v-model="variant" :options="variants"></b-form-select>
        </b-form-group>
      </div>
    </b-sidebar>
  </div>
`,

    data() {
      return {
        variant: 'dark',
        variants: [
          'transparent',
          'white',
          'light',
          'dark',
          'primary',
          'secondary',
          'success',
          'danger',
          'warning',
          'info',
        ],
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
