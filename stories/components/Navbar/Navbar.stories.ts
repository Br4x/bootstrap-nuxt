import type { Meta, StoryObj } from '@storybook/vue3'
import vitestResults from '@/tests/unit/results.json'
import BNavbar from '@/components/B/Navbar.vue'
import BNavbarBrand from '@/components/B/NavbarBrand.vue'
import BNavbarToggle from '@/components/B/NavbarToggle.vue'
import BCollapse from '@/components/B/Collapse.vue'
import BNavbarNav from '@/components/B/NavbarNav.vue'
import BNavItem from '@/components/B/NavItem.vue'
import BNavForm from '@/components/B/NavForm.vue'
import BFormInput from '@/components/B/FormInput.vue'
import BButton from '@/components/B/Button.vue'
import BNavItemDropdown from '@/components/B/NavItemDropdown.vue'
import BDropdownItem from '@/components/B/DropdownItem.vue'
import BNavText from '@/components/B/NavText.vue'
import BInputGroup from '@/components/B/InputGroup.vue'
import BIcon from '@/components/B/Icon.vue'

const meta = {
  title: 'Components/Navbar',
  component: BNavbar,
  parameters: {
    vitest: {
      testFile: 'navbar.test.tsx',
      testResults: vitestResults,
    },
  },
  argTypes: {

  },
} satisfies Meta<typeof BNavbar>

export default meta
          type Story = StoryObj<typeof meta>

export const Navbar: Story = {
  render: (args, { argTypes }) => ({
    components: { BNavbar, BNavbarBrand, BNavbarToggle, BCollapse, BNavbarNav, BNavItem, BNavForm, BFormInput, BButton, BNavItemDropdown, BDropdownItem },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">NavBar</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#">Link</b-nav-item>
        <b-nav-item href="#" disabled>Disabled</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>

        <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>

<!-- b-navbar.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const BNavbarBrand: Story = {
  render: (args, { argTypes }) => ({
    components: { BNavbar, BNavbarBrand },
    props: Object.keys(argTypes),
    template: `
<div>
  <!-- As a link -->
  <b-navbar variant="faded" type="light">
    <b-navbar-brand href="#">BootstrapVue</b-navbar-brand>
  </b-navbar>
</div>

<!-- b-navbar-brand-link.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const BNavbarBrand1: Story = {
  render: (args, { argTypes }) => ({
    components: { BNavbar, BNavbarBrand },
    props: Object.keys(argTypes),
    template: `
<div>
  <!-- As a heading -->
  <b-navbar variant="faded" type="light">
    <b-navbar-brand tag="h1" class="mb-0">BootstrapVue</b-navbar-brand>
  </b-navbar>
</div>

<!-- b-navbar-brand-heading.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const BNavbarBrand2: Story = {
  render: (args, { argTypes }) => ({
    components: { BNavbar, BNavbarBrand },
    props: Object.keys(argTypes),
    template: `
<div>
  <!-- Just an image -->
  <b-navbar variant="faded" type="light">
    <b-navbar-brand href="#">
      <img src="https://placekitten.com/g/30/30" alt="Kitten">
    </b-navbar-brand>
  </b-navbar>
</div>

<!-- b-navbar-brand-image.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const BNavbarBrand3: Story = {
  render: (args, { argTypes }) => ({
    components: { BNavbar, BNavbarBrand },
    props: Object.keys(argTypes),
    template: `
<div>
  <!-- Image and text -->
  <b-navbar variant="faded" type="light">
    <b-navbar-brand href="#">
      <img src="https://placekitten.com/g/30/30" class="d-inline-block align-top" alt="Kitten">
      BootstrapVue
    </b-navbar-brand>
  </b-navbar>
</div>

<!-- b-navbar-brand-image-and-text.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const BNavText: Story = {
  render: (args, { argTypes }) => ({
    components: { BNavbar, BNavbarToggle, BNavbarBrand, BCollapse, BNavbarNav, BNavText },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-navbar toggleable="sm" type="light" variant="light">
    <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

    <b-navbar-brand>BootstrapVue</b-navbar-brand>

    <b-collapse id="nav-text-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-text>Navbar text</b-nav-text>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>

<!-- b-navbar-text.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const BNavItemDropdown: Story = {
  render: (args, { argTypes }) => ({
    components: { BNavbar, BNavbarNav, BNavItem, BNavItemDropdown, BDropdownItem },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-navbar type="dark" variant="dark">
    <b-navbar-nav>
      <b-nav-item href="#">Home</b-nav-item>

      <!-- Navbar dropdowns -->
      <b-nav-item-dropdown text="Lang" right>
        <b-dropdown-item href="#">EN</b-dropdown-item>
        <b-dropdown-item href="#">ES</b-dropdown-item>
        <b-dropdown-item href="#">RU</b-dropdown-item>
        <b-dropdown-item href="#">FA</b-dropdown-item>
      </b-nav-item-dropdown>

      <b-nav-item-dropdown text="User" right>
        <b-dropdown-item href="#">Account</b-dropdown-item>
        <b-dropdown-item href="#">Settings</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
</div>

<!-- b-navbar-dropdown.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const BNavForm: Story = {
  render: (args, { argTypes }) => ({
    components: { BNavbar, BNavForm, BFormInput, BButton },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-navbar type="light" variant="light">
    <b-nav-form>
      <b-form-input class="mr-sm-2" placeholder="Search"></b-form-input>
      <b-button variant="outline-success" class="my-2 my-sm-0" type="submit">Search</b-button>
    </b-nav-form>
  </b-navbar>
</div>

<!-- b-navbar-form.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const BNavForm1: Story = {
  render: (args, { argTypes }) => ({
    components: { BNavbar, BNavForm, BInputGroup, BFormInput },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-navbar type="light" variant="light">
    <b-nav-form>
      <b-input-group prepend="@">
        <b-form-input placeholder="Username"></b-form-input>
      </b-input-group>
    </b-nav-form>
  </b-navbar>
</div>

<!-- b-navbar-form-inputs.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const CustomNavbarToggle: Story = {
  render: (args, { argTypes }) => ({
    components: { BNavbar, BNavbarBrand, BNavbarToggle, BIcon, BCollapse, BNavbarNav, BNavItem },
    props: Object.keys(argTypes),
    template: `
  <b-navbar toggleable type="dark" variant="dark">
    <b-navbar-brand href="#">NavBar</b-navbar-brand>

    <b-navbar-toggle target="navbar-toggle-collapse">
      <template #default="{ expanded }">
        <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
        <b-icon v-else icon="chevron-bar-down"></b-icon>
      `,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}
