import type { Meta, StoryObj } from '@storybook/vue3'
import BCardHeader from '@/components/B/CardHeader.vue'
import BCardText from '@/components/B/CardText.vue'
import BCard from '@/components/B/Card.vue'
import BButton from '@/components/B/Button.vue'
import BNavText from '@/components/B/NavText.vue'
import vitestResults from '@/tests/unit/results.json'
import BNav from '@/components/B/Nav.vue'
import BNavItem from '@/components/B/NavItem.vue'

const meta = {
  title: 'Components/Nav',
  component: BNav,
  parameters: {
    vitest: {
      testFile: 'Nav.test.tsx',
      testResults: vitestResults,
    },
  },
  argTypes: {
    justify: { action: { type: 'boolean' } },
    keyNav: { action: { type: 'boolean' } },
  },
} satisfies Meta<typeof BNav>

export default meta
type Story = StoryObj<typeof meta>

export const Navigation: Story = {
  render: (args: any, { argTypes }: any) => ({
    components: { BNavItem, BNav },
    props: Object.keys(argTypes),
    template: `
    <div>
        <b-nav>
            <b-nav-item active>Active</b-nav-item>
            <b-nav-item>Link</b-nav-item>
            <b-nav-item>Another Link</b-nav-item>
            <b-nav-item disabled>Disabled</b-nav-item>
        </b-nav>
    </div>
    `,
  }),
}

export const TabStyle: Story = {
  render: (args: any, { argTypes }: any) => ({
    components: { BNavItem, BNav },
    props: Object.keys(argTypes),
    template: `
    <div>
        <b-nav>
            <b-nav-item active>Active</b-nav-item>
            <b-nav-item>Link</b-nav-item>
            <b-nav-item>Another Link</b-nav-item>
            <b-nav-item disabled>Disabled</b-nav-item>
        </b-nav>
    </div>
      `,
  }),
}

export const PillStyle: Story = {
  render: (args: any, { argTypes }: any) => ({
    components: { BNavItem, BNav },
    props: Object.keys(argTypes),
    template: `
    <div>
        <b-nav pills>
            <b-nav-item active>Active</b-nav-item>
            <b-nav-item>Link</b-nav-item>
            <b-nav-item>Another Link</b-nav-item>
            <b-nav-item disabled>Disabled</b-nav-item>
        </b-nav>
    </div>
        `,
  }),
}

export const Small: Story = {
  render: (args: any, { argTypes }: any) => ({
    components: { BNavItem, BNav },
    props: Object.keys(argTypes),
    template: `
    <div>
        <b-nav small>
            <b-nav-item active>Active</b-nav-item>
            <b-nav-item>Link</b-nav-item>
            <b-nav-item>Another Link</b-nav-item>
            <b-nav-item disabled>Disabled</b-nav-item>
        </b-nav>
    </div>
          `,
  }),
}

export const Fill: Story = {
  render: (args: any, { argTypes }: any) => ({
    components: { BNavItem, BNav },
    props: Object.keys(argTypes),
    template: `
    <div>
        <b-nav tabs fill>
            <b-nav-item active>Active</b-nav-item>
            <b-nav-item>Link</b-nav-item>
            <b-nav-item>Link with a long name </b-nav-item>
            <b-nav-item disabled>Disabled</b-nav-item>
        </b-nav>
    </div>
            `,
  }),
}

export const Justified: Story = {
  render: (args: any, { argTypes }: any) => ({
    components: { BNavItem, BNav },
    props: Object.keys(argTypes),
    template: `
    <div>
        <b-nav tabs fill>
            <b-nav-item active>Active</b-nav-item>
            <b-nav-item>Link</b-nav-item>
            <b-nav-item>Link with a long name </b-nav-item>
            <b-nav-item disabled>Disabled</b-nav-item>
        </b-nav>
    </div>
              `,
  }),
}

export const Alignment: Story = {
  render: (args: any, { argTypes }: any) => ({
    components: { BNavItem, BNav },
    props: Object.keys(argTypes),
    template: `
    <div>
        <b-nav tabs align="center">
            <b-nav-item active>Active</b-nav-item>
            <b-nav-item>Link</b-nav-item>
            <b-nav-item>Link with a long name </b-nav-item>
            <b-nav-item disabled>Disabled</b-nav-item>
        </b-nav>
    </div>
                `,
  }),
}

export const VerticalVariation: Story = {
  render: (args: any, { argTypes }: any) => ({
    components: { BNavItem, BNav },
    props: Object.keys(argTypes),
    template: `
    <div>
        <b-nav vertical class="w-25">
            <b-nav-item active>Active</b-nav-item>
            <b-nav-item>Link</b-nav-item>
            <b-nav-item>Another Link</b-nav-item>
            <b-nav-item disabled>Disabled</b-nav-item>
        </b-nav>
    </div>
                  `,
  }),
}

export const DropdownSupport: Story = {
  render: (args: any, { argTypes }: any) => ({
    components: { BNavItem, BNav },
    props: Object.keys(argTypes),
    template: `
    <div>
        <b-nav pills>
            <b-nav-item active>Active</b-nav-item>
            <b-nav-item>Link</b-nav-item>
            <b-nav-item-dropdown
                id="my-nav-dropdown"
                text="Dropdown"
                toggle-class="nav-link-custom"
                right
            >
                <b-dropdown-item>One</b-dropdown-item>
                <b-dropdown-item>Two</b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item>Three</b-dropdown-item>
            </b-nav-item-dropdown>
        </b-nav>
    </div>
  `,
  }),
}

export const DropdownSupportWithToogleClass: Story = {
  render: (args: any, { argTypes }: any) => ({
    components: { BNavItem, BNav },
    props: Object.keys(argTypes),
    template: `
    <li id="my-nav-dropdown" class="nav-item b-nav-dropdown dropdown">
        <a
        role="button"
        href="#my-nav-dropdown"
        id="my-nav-dropdown__BV_button_"
        aria-haspopup="true"
        aria-expanded="false"
        class="nav-link dropdown-toggle nav-link-custom"
        />
        ...
    </li>
  `,
  }),
}

export const NavTextContent: Story = {
  render: (args: any, { argTypes }: any) => ({
    components: { BNavItem, BNav, BNavText },
    props: Object.keys(argTypes),
    template: `
    <div>
        <b-nav >
            <b-nav-item href="#1">Link 1</b-nav-item>
            <b-nav-item href="#2">Link 2</b-nav-item>
            <b-nav-text>Plain text</b-nav-text>
        </b-nav>
    </div>
    `,
  }),
}

export const NavInlineForms: Story = {
  render: (args: any, { argTypes }: any) => ({
    components: { BNavItem, BNav, BButton },
    props: Object.keys(argTypes),
    template: `
    <div>
        <b-nav pills>
            <b-nav-item href="#1" active>Link 1</b-nav-item>
            <b-nav-item href="#2">Link 2</b-nav-item>
            <b-nav-form @submit.stop.prevent="alert('Form Submitted')">
                <b-form-input aria-label="Input" class="mr-1"></b-form-input>
                <b-button type="submit">Ok</b-button>
            </b-nav-form>
        </b-nav>
    </div>
  `,
  }),
}

export const CardIntegration: Story = {
  render: (args: any, { argTypes }: any) => ({
    components: { BNavItem, BNav, BCard, BCardHeader, BCardText, BButton },
    props: Object.keys(argTypes),
    template: `
    <div>
        <b-card title="Card Title" no-body>
            <b-card-header header-tag="nav">
                <b-nav card-header tabs>
                <b-nav-item active>Active</b-nav-item>
                <b-nav-item>Inactive</b-nav-item>
                <b-nav-item disabled>Disabled</b-nav-item>
                </b-nav>
            </b-card-header>
        
            <b-card-body class="text-center">
                <b-card-text>
                With supporting text below as a natural lead-in to additional content.
                </b-card-text>
        
                <b-button variant="primary">Go somewhere</b-button>
            </b-card-body>
        </b-card>
    </div>
    `,
  }),
}
