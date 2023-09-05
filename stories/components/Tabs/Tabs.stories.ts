import type { Meta, StoryObj } from '@storybook/vue3'
import vitestResults from '@/tests/unit/results.json'
import BTabs from '@/components/BTabs.vue'
import BTab from '@/components/BTab.vue'
import BCard from '@/components/BCard.vue'
import BCardText from '@/components/BCardText.vue'
import BCardImg from '@/components/BCardImg.vue'
import BCardFooter from '@/components/BCardFooter.vue'
import BCardTitle from '@/components/BCardTitle.vue'
import BNavItem from '@/components/BNavItem.vue'
import BSpinner from '@/components/BSpinner.vue'
import BAlert from '@/components/BAlert.vue'
import BButtonGroup from '@/components/BButtonGroup.vue'
import BButton from '@/components/BButton.vue'

const meta = {
  title: 'Components/Tabs',
  component: BTabs,
  parameters: {
    vitest: {
      testFile: 'tabs.spec.ts',
      testResults: vitestResults,
    },
  },
  argTypes: {

  },
} satisfies Meta<typeof BTabs>

export default meta
          type Story = StoryObj<typeof meta>

export const BasicUsage: Story = {
  render: (args, { argTypes }) => ({
    components: { BTabs, BTab },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-tabs content-class="mt-3">
    <b-tab title="First" active><p>I'm the first tab</p></b-tab>
    <b-tab title="Second"><p>I'm the second tab</p></b-tab>
    <b-tab title="Disabled" disabled><p>I'm a disabled tab!</p></b-tab>
  </b-tabs>
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

export const CardsIntegration: Story = {
  render: (args, { argTypes }) => ({
    components: { BCard, BTabs, BTab, BCardText },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-card no-body>
    <b-tabs card>
      <b-tab title="Tab 1" active>
        <b-card-text>Tab contents 1</b-card-text>
      </b-tab>
      <b-tab title="Tab 2">
        <b-card-text>Tab contents 2</b-card-text>
      </b-tab>
    </b-tabs>
  </b-card>
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

export const CardsIntegration1: Story = {
  render: (args, { argTypes }) => ({
    components: { BCard, BTabs, BTab, BCardImg, BCardFooter, BCardTitle, BCardText },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-card no-body>
    <b-tabs card>
      <b-tab no-body title="Picture 1">
        <b-card-img bottom src="https://picsum.photos/600/200/?image=21" alt="Image 21"></b-card-img>
        <b-card-footer>Picture 1 footer</b-card-footer>
      </b-tab>

      <b-tab no-body title="Picture 2">
        <b-card-img bottom src="https://picsum.photos/600/200/?image=25" alt="Image 25"></b-card-img>
        <b-card-footer>Picture 2 footer</b-card-footer>
      </b-tab>

      <b-tab no-body title="Picture 3">
        <b-card-img bottom src="https://picsum.photos/600/200/?image=26" alt="Image 26"></b-card-img>
        <b-card-footer>Picture 3 footer</b-card-footer>
      </b-tab>

      <b-tab title="Text">
        <b-card-title>This tab does not have the <code>no-body</code> prop set</b-card-title>
        <b-card-text>
          Quis magna Lorem anim amet ipsum do mollit sit cillum voluptate ex nulla tempor. Laborum
          consequat non elit enim exercitation cillum aliqua consequat id aliqua. Esse ex
          consectetur mollit voluptate est in duis laboris ad sit ipsum anim Lorem. Incididunt
          veniam velit elit elit veniam Lorem aliqua quis ullamco deserunt sit enim elit aliqua
          esse irure.
        </b-card-text>
      </b-tab>
    </b-tabs>
  </b-card>
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

export const PillsVariant: Story = {
  render: (args, { argTypes }) => ({
    components: { BCard, BTabs, BTab, BCardText },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-card no-body>
    <b-tabs pills card>
      <b-tab title="Tab 1" active><b-card-text>Tab contents 1</b-card-text></b-tab>
      <b-tab title="Tab 2"><b-card-text>Tab contents 2</b-card-text></b-tab>
    </b-tabs>
  </b-card>
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

export const Fill: Story = {
  render: (args, { argTypes }) => ({
    components: { BTabs, BTab },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-tabs content-class="mt-3" fill>
    <b-tab title="First" active><p>I'm the first tab</p></b-tab>
    <b-tab title="Second"><p>I'm the second tab</p></b-tab>
    <b-tab title="Very, very long title"><p>I'm the tab with the very, very long title</p></b-tab>
    <b-tab title="Disabled" disabled><p>I'm a disabled tab!</p></b-tab>
  </b-tabs>
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

export const Justified: Story = {
  render: (args, { argTypes }) => ({
    components: { BTabs, BTab },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-tabs content-class="mt-3" justified>
    <b-tab title="First" active><p>I'm the first tab</p></b-tab>
    <b-tab title="Second"><p>I'm the second tab</p></b-tab>
    <b-tab title="Very, very long title"><p>I'm the tab with the very, very long title</p></b-tab>
    <b-tab title="Disabled" disabled><p>I'm a disabled tab!</p></b-tab>
  </b-tabs>
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

export const Alignment: Story = {
  render: (args, { argTypes }) => ({
    components: { BTabs, BTab },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-tabs content-class="mt-3" align="center">
    <b-tab title="First" active><p>I'm the first tab</p></b-tab>
    <b-tab title="Second"><p>I'm the second tab</p></b-tab>
    <b-tab title="Disabled" disabled><p>I'm a disabled tab!</p></b-tab>
  </b-tabs>
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

export const BottomPlacementOfTabControls: Story = {
  render: (args, { argTypes }) => ({
    components: { BCard, BTabs, BTab, BCardText },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-card no-body>
    <b-tabs pills card end>
      <b-tab title="Tab 1" active><b-card-text>Tab contents 1</b-card-text></b-tab>
      <b-tab title="Tab 2"><b-card-text>Tab contents 2</b-card-text></b-tab>
    </b-tabs>
  </b-card>
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

export const VerticalTabs: Story = {
  render: (args, { argTypes }) => ({
    components: { BCard, BTabs, BTab, BCardText },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-card no-body>
    <b-tabs pills card vertical>
      <b-tab title="Tab 1" active><b-card-text>Tab contents 1</b-card-text></b-tab>
      <b-tab title="Tab 2"><b-card-text>Tab contents 2</b-card-text></b-tab>
      <b-tab title="Tab 3"><b-card-text>Tab contents 3</b-card-text></b-tab>
    </b-tabs>
  </b-card>
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

export const VerticalTabs1: Story = {
  render: (args, { argTypes }) => ({
    components: { BCard, BTabs, BTab, BCardText },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-card no-body>
    <b-tabs pills card vertical end>
      <b-tab title="Tab 1" active><b-card-text>Tab contents 1</b-card-text></b-tab>
      <b-tab title="Tab 2"><b-card-text>Tab contents 2</b-card-text></b-tab>
      <b-tab title="Tab 3"><b-card-text>Tab contents 3</b-card-text></b-tab>
    </b-tabs>
  </b-card>
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

export const VerticalTabs2: Story = {
  render: (args, { argTypes }) => ({
    components: { BCard, BTabs, BTab, BCardText },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-card no-body>
    <b-tabs pills card vertical nav-wrapper-class="w-50">
      <b-tab title="Tab 1" active><b-card-text>Tab contents 1</b-card-text></b-tab>
      <b-tab title="Tab 2"><b-card-text>Tab contents 2</b-card-text></b-tab>
      <b-tab title="Tab 3"><b-card-text>Tab contents 3</b-card-text></b-tab>
    </b-tabs>
  </b-card>
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

export const ActiveClasses: Story = {
  render: (args, { argTypes }) => ({
    components: { BTabs, BTab },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-tabs
    active-nav-item-class="font-weight-bold text-uppercase text-danger"
    active-tab-class="font-weight-bold text-success"
    content-class="mt-3"
  >
    <b-tab title="First" active><p>I'm the first tab</p></b-tab>
    <b-tab title="Second"><p>I'm the second tab</p></b-tab>
    <b-tab title="Disabled" disabled><p>I'm a disabled tab!</p></b-tab>
  </b-tabs>
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

export const AddTabsWithoutContent: Story = {
  render: (args, { argTypes }) => ({
    components: { BTabs, BNavItem },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-tabs>
    
    <template #tabs-end>
      <b-nav-item href="#" role="presentation" @click="() => {}">Another tab</b-nav-item>
      <li role="presentation" class="nav-item align-self-center">Plain text</li>
    </template>
  </b-tabs>
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

export const AddCustomContentToTabTitle: Story = {
  render: (args, { argTypes }) => ({
    components: { BTabs, BTab, BSpinner },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-tabs>
    <b-tab active>
      <template #title>
        <b-spinner type="grow" small></b-spinner> I'm <i>custom</i> <strong>title</strong>
      </template>
      <p class="p-3">Tab contents 1</p>
    </b-tab>

    <b-tab>
      <template #title>
        <b-spinner type="border" small></b-spinner> Tab 2
      </template>
      <p class="p-3">Tab contents 2</p>
    </b-tab>
  </b-tabs>
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

export const ApplyCustomClassesToTheGeneratedNavTabsOrPills: Story = {
  render: (args, { argTypes }) => ({
    components: { BCard, BTabs, BTab },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-card no-body>
      <b-tabs v-model="tabIndex" card>
        <b-tab title="Tab 1" :title-link-class="linkClass(0)">Tab contents 1</b-tab>
        <b-tab title="Tab 2" :title-link-class="linkClass(1)">Tab contents 2</b-tab>
        <b-tab title="Tab 3" :title-link-class="linkClass(2)">Tab contents 3</b-tab>
      </b-tabs>
    </b-card>
  </div>
`,

    data() {
      return {
        tabIndex: 0,
      }
    },
    methods: {
      linkClass(idx: any) {
        if (this.tabIndex === idx)
          return ['bg-primary', 'text-light']

        else
          return ['bg-light', 'text-info']
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

export const LazyLoadingTabContent: Story = {
  render: (args, { argTypes }) => ({
    components: { BTabs, BTab, BAlert },
    props: Object.keys(argTypes),
    template: `
<b-tabs content-class="mt-3">
  
  <b-tab title="Regular tab"><b-alert show>I'm always mounted</b-alert></b-tab>

  
  
  <b-tab title="Lazy tab" lazy><b-alert show>I'm lazy mounted!</b-alert></b-tab>
</b-tabs>


`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const LazyLoadingTabContent1: Story = {
  render: (args, { argTypes }) => ({
    components: { BTabs, BTab, BAlert },
    props: Object.keys(argTypes),
    template: `
<b-tabs content-class="mt-3" lazy>
  <b-tab title="Tab 1"><b-alert show>I'm lazy mounted!</b-alert></b-tab>
  <b-tab title="Tab 2"><b-alert show>I'm lazy mounted too!</b-alert></b-tab>
</b-tabs>


`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const ExternalControlsUsingVModel: Story = {
  render: (args, { argTypes }) => ({
    components: { BCard, BTabs, BTab, BButtonGroup, BButton },
    props: Object.keys(argTypes),
    template: `
  <div>
    
    <b-card no-body>
      <b-tabs v-model="tabIndex" small card>
        <b-tab title="General">I'm the first fading tab</b-tab>
        <b-tab title="Edit profile">
          I'm the second tab
          <b-card>I'm the card in tab</b-card>
        </b-tab>
        <b-tab title="Premium Plan" disabled>Sibzamini!</b-tab>
        <b-tab title="Info">I'm the last tab</b-tab>
      </b-tabs>
    </b-card>

    <!-- Control buttons-->
    <div class="text-center">
      <b-button-group class="mt-2">
        <b-button @click="tabIndex--">Previous</b-button>
        <b-button @click="tabIndex++">Next</b-button>
      </b-button-group>

      <div class="text-muted">Current Tab: {{ tabIndex }}</div>
    </div>
  </div>
`,

    data() {
      return {
        tabIndex: 1,
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

export const DynamicTabsTabsEndSlot: Story = {
  render: (args, { argTypes }) => ({
    components: { BCard, BTabs, BTab, BButton, BNavItem },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-card no-body>
      <b-tabs card>
        <!-- Render Tabs, supply a unique \`key\` to each tab -->
        <b-tab v-for="i in tabs" :key="'dyn-tab-' + i" :title="'Tab ' + i">
          Tab contents {{ i }}
          <b-button size="sm" variant="danger" class="float-right" @click="closeTab(i)">
            Close tab
          </b-button>
        </b-tab>

        <!-- New Tab Button (Using tabs-end slot) -->
        <template #tabs-end>
          <b-nav-item role="presentation" @click.prevent="newTab" href="#"><b>+</b></b-nav-item>
        `,

    data() {
      return {
        tabs: [],
        tabCounter: 0,
      }
    },
    methods: {
      closeTab(x: any) {
        for (let i = 0; i < this.tabs.length; i++) {
          if (this.tabs[i] === x)
            this.tabs.splice(i, 1)
        }
      },
      newTab() {
        this.tabs.push(this.tabCounter++)
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
