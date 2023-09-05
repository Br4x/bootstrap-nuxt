import type { Meta, StoryObj } from '@storybook/vue3'
import vitestResults from '@/tests/unit/results.json'
import BNavbar from '@/components/BNavbar.vue'
import BNavbarBrand from '@/components/BNavbarBrand.vue'
import BNavbarToggle from '@/components/BNavbarToggle.vue'
import BCollapse from '@/components/BCollapse.vue'
import BNavbarNav from '@/components/BNavbarNav.vue'
import BNavItem from '@/components/BNavItem.vue'
import BNavForm from '@/components/BNavForm.vue'
import BFormInput from '@/components/BFormInput.vue'
import BButton from '@/components/BButton.vue'
import BNavItemDropdown from '@/components/BNavItemDropdown.vue'
import BDropdownItem from '@/components/BDropdownItem.vue'
import BNavText from '@/components/BNavText.vue'
import BInputGroup from '@/components/BInputGroup.vue'

const meta = {
  title: 'Components/Navbar',
  component: BNavbar,
  parameters: {
    vitest: {
      testFile: 'navbar.spec.ts',
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


`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const NavbarBrand: Story = {
  render: (args, { argTypes }) => ({
    components: { BNavbar, BNavbarBrand },
    props: Object.keys(argTypes),
    template: `
<div>
  
  <b-navbar variant="faded" type="light">
    <b-navbar-brand href="#">BootstrapVue</b-navbar-brand>
  </b-navbar>
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

export const BNavbarBrand1: Story = {
  render: (args, { argTypes }) => ({
    components: { BNavbar, BNavbarBrand },
    props: Object.keys(argTypes),
    template: `
<div>
  
  <b-navbar variant="faded" type="light">
    <b-navbar-brand tag="h1" class="mb-0">BootstrapVue</b-navbar-brand>
  </b-navbar>
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

export const BNavbarBrand2: Story = {
  render: (args, { argTypes }) => ({
    components: { BNavbar, BNavbarBrand },
    props: Object.keys(argTypes),
    template: `
<div>
  
  <b-navbar variant="faded" type="light">
    <b-navbar-brand href="#">
      <img src="https://placekitten.com/g/30/30" alt="Kitten" />
    </b-navbar-brand>
  </b-navbar>
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

export const BNavbarBrand3: Story = {
  render: (args, { argTypes }) => ({
    components: { BNavbar, BNavbarBrand },
    props: Object.keys(argTypes),
    template: `
<div>
  
  <b-navbar variant="faded" type="light">
    <b-navbar-brand href="#">
      <img src="https://placekitten.com/g/30/30" class="d-inline-block align-top" alt="Kitten" />
      BootstrapVue
    </b-navbar-brand>
  </b-navbar>
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

export const NavText: Story = {
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


`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const NavItemDropdown: Story = {
  render: (args, { argTypes }) => ({
    components: { BNavbar, BNavbarNav, BNavItem, BNavItemDropdown, BDropdownItem },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-navbar type="dark" variant="dark">
    <b-navbar-nav>
      <b-nav-item href="#">Home</b-nav-item>

      
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


`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const NavForm: Story = {
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
    components: { BNavbar, BNavbarBrand, BNavbarToggle, BCollapse, BNavbarNav, BNavItem },
    props: Object.keys(argTypes),
    template: `
  <b-navbar toggleable type="dark" variant="dark">
    <b-navbar-brand href="#">NavBar</b-navbar-brand>

    <b-navbar-toggle target="navbar-toggle-collapse">
      <template #default="{ expanded }">
        <i v-if="expanded" class="w-6 w-6 i-carbon-user chevron-bar-up" />
        <i v-else class="w-6 w-6 i-carbon-user chevron-bar-down" />
        </template>
    </b-navbar-toggle>

    <b-collapse id="navbar-toggle-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item href="#">Link 1</b-nav-item>
        <b-nav-item href="#">Link 2</b-nav-item>
        <b-nav-item href="#" disabled>Disabled</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
      `,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}
