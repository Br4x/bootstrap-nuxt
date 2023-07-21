import type { Meta, StoryObj } from '@storybook/vue3'
import BCardBody from '@/components/B/CardBody.vue'
import BBadge from '@/components/B/Badge.vue'
import vitestResults from '@/tests/unit/results.json'
import BListGroup from '@/components/B/ListGroup.vue'
import BListGroupItem from '@/components/B/ListGroupItem.vue'
import BCard from '@/components/B/Card.vue'
import BCardGroup from '@/components/B/CardGroup.vue'

const meta = {
  title: 'Components/ListGroup',
  component: BListGroup,
  parameters: {
    vitest: {
      testFile: 'list-group.test.tsx',
      testResults: vitestResults,
    },
  },
  argTypes: {
    justify: { action: { type: 'boolean' } },
    keyNav: { action: { type: 'boolean' } },
  },
} satisfies Meta<typeof BListGroup>

export default meta
type Story = StoryObj<typeof meta>

export const ListGroup: Story = {
  render: (args, { argTypes }) => ({
    components: { BListGroupItem, BListGroup },
    props: Object.keys(argTypes),
    template: `
    <b-list-group>
        <b-list-group-item>Cras justo odio</b-list-group-item>
        <b-list-group-item>Dapibus ac facilisis in</b-list-group-item>
        <b-list-group-item>Morbi leo risus</b-list-group-item>
        <b-list-group-item>Porta ac consectetur ac</b-list-group-item>
        <b-list-group-item>Vestibulum at eros</b-list-group-item>
    </b-list-group>
    `,
  }),
}

export const ActiveItems: Story = {
  render: (args, { argTypes }) => ({
    components: { BListGroupItem, BListGroup },
    props: Object.keys(argTypes),
    template: `
    <b-list-group>
        <b-list-group-item>Cras justo odio</b-list-group-item>
        <b-list-group-item active>Dapibus ac facilisis in</b-list-group-item>
        <b-list-group-item>Morbi leo risus</b-list-group-item>
        <b-list-group-item>Porta ac consectetur ac</b-list-group-item>
        <b-list-group-item>Vestibulum at eros</b-list-group-item>
    </b-list-group>
      `,
  }),
}

export const DisabledItems: Story = {
  render: (args, { argTypes }) => ({
    components: { BListGroupItem, BListGroup },
    props: Object.keys(argTypes),
    template: `
    <b-list-group>
        <b-list-group-item disabled>Cras justo odio</b-list-group-item>
        <b-list-group-item>Dapibus ac facilisis in</b-list-group-item>
        <b-list-group-item>Morbi leo risus</b-list-group-item>
        <b-list-group-item disabled>Porta ac consectetur ac</b-list-group-item>
        <b-list-group-item>Vestibulum at eros</b-list-group-item>
    </b-list-group>
        `,
  }),
}

export const ActionableListGroupItems: Story = {
  render: (args, { argTypes }) => ({
    components: { BListGroupItem, BListGroup },
    props: Object.keys(argTypes),
    template: `
    <b-list-group>
        <b-list-group-item href="#some-link">Awesome link</b-list-group-item>
        <b-list-group-item href="#" active>Link with active state</b-list-group-item>
        <b-list-group-item href="#">Action links are easy</b-list-group-item>
        <b-list-group-item href="#foobar" disabled>Disabled link</b-list-group-item>
    </b-list-group>
          `,
  }),
}

export const ButtonGroupItems: Story = {
  render: (args, { argTypes }) => ({
    components: { BListGroupItem, BListGroup },
    props: Object.keys(argTypes),
    template: `
    <b-list-group>
        <b-list-group-item button>Button item</b-list-group-item>
        <b-list-group-item button>I am a button</b-list-group-item>
        <b-list-group-item button disabled>Disabled button</b-list-group-item>
        <b-list-group-item button>This is a button too</b-list-group-item>
    </b-list-group>
            `,
  }),
}

export const ContextualVariants: Story = {
  render: (args, { argTypes }) => ({
    components: { BListGroupItem, BListGroup },
    props: Object.keys(argTypes),
    template: `
    <b-list-group>
        <b-list-group-item>Default list group item</b-list-group-item>
        <b-list-group-item variant="primary">Primary list group item</b-list-group-item>
        <b-list-group-item variant="secondary">Secondary list group item</b-list-group-item>
        <b-list-group-item variant="success">Success list group item</b-list-group-item>
        <b-list-group-item variant="danger">Danger list group item</b-list-group-item>
        <b-list-group-item variant="warning">Warning list group item</b-list-group-item>
        <b-list-group-item variant="info">Info list group item</b-list-group-item>
        <b-list-group-item variant="light">Light list group item</b-list-group-item>
        <b-list-group-item variant="dark">Dark list group item</b-list-group-item>
    </b-list-group>
              `,
  }),
}

export const ActiveContextualVariants: Story = {
  render: (args, { argTypes }) => ({
    components: { BListGroupItem, BListGroup },
    props: Object.keys(argTypes),
    template: `
    <b-list-group>
        <b-list-group-item href="#">Default list group item</b-list-group-item>
        <b-list-group-item href="#" variant="primary">Primary list group item</b-list-group-item>
        <b-list-group-item href="#" variant="secondary">Secondary list group item</b-list-group-item>
        <b-list-group-item href="#" variant="success">Success list group item</b-list-group-item>
        <b-list-group-item href="#" variant="danger">Danger list group item</b-list-group-item>
        <b-list-group-item href="#" variant="warning">Warning list group item</b-list-group-item>
        <b-list-group-item href="#" variant="info">Info list group item</b-list-group-item>
        <b-list-group-item href="#" variant="light">Light list group item</b-list-group-item>
        <b-list-group-item href="#" variant="dark">Dark list group item</b-list-group-item>
    </b-list-group>
                `,
  }),
}

export const withBadges: Story = {
  render: (args, { argTypes }) => ({
    components: { BListGroupItem, BListGroup, BBadge },
    props: Object.keys(argTypes),
    template: `
    <b-list-group>
        <b-list-group-item class="d-flex justify-content-between align-items-center">
        Cras justo odio
        <b-badge variant="primary" pill>14</b-badge>
        </b-list-group-item>
    
        <b-list-group-item class="d-flex justify-content-between align-items-center">
        Dapibus ac facilisis in
        <b-badge variant="primary" pill>2</b-badge>
        </b-list-group-item>
    
        <b-list-group-item class="d-flex justify-content-between align-items-center">
        Morbi leo risus
        <b-badge variant="primary" pill>1</b-badge>
        </b-list-group-item>
    </b-list-group>
    `,
  }),
}

export const ListGroupsInsideCards: Story = {
  render: (args, { argTypes }) => ({
    components: { BListGroupItem, BListGroup, BCard, BCardGroup, BCardBody },
    props: Object.keys(argTypes),
    template: `
      <b-card-group deck>
          <b-card header="Card with list group">
              <b-list-group>
                <b-list-group-item href="#">Cras justo odio</b-list-group-item>
                <b-list-group-item href="#">Dapibus ac facilisis in</b-list-group-item>
                <b-list-group-item href="#">Vestibulum at eros</b-list-group-item>
              </b-list-group>
  
              <p class="card-text mt-2">
                Quis magna Lorem anim amet ipsum do mollit sit cillum voluptate ex nulla tempor. Laborum
                consequat non elit enim exercitation cillum aliqua consequat id aliqua. Esse ex consectetur
                mollit voluptate est in duis laboris ad sit ipsum anim Lorem.
              </p>
          </b-card>
  
          <b-card no-body header="Card with flush list group">
              <b-list-group flush>
                <b-list-group-item href="#">Cras justo odio</b-list-group-item>
                <b-list-group-item href="#">Dapibus ac facilisis in</b-list-group-item>
                <b-list-group-item href="#">Vestibulum at eros</b-list-group-item>
              </b-list-group>
  
              <b-card-body>
                Quis magna Lorem anim amet ipsum do mollit sit cillum voluptate ex nulla tempor. Laborum
                consequat non elit enim exercitation cillum aliqua consequat id aliqua. Esse ex consectetur
                mollit voluptate est in duis laboris ad sit ipsum anim Lorem.
              </b-card-body>
          </b-card>
      </b-card-group>
      `,
  }),
}

export const AlwaysHorizontalListGroups: Story = {
  render: (args, { argTypes }) => ({
    components: { BListGroupItem, BListGroup },
    props: Object.keys(argTypes),
    template: `
    <div>
        <b-list-group horizontal>
        <b-list-group-item>Cras justo odio</b-list-group-item>
        <b-list-group-item>Dapibus ac facilisis in</b-list-group-item>
        <b-list-group-item>Morbi leo risus</b-list-group-item>
        </b-list-group>
    </div>
        `,
  }),
}

export const HorizontalAtBreakpoints: Story = {
  render: (args, { argTypes }) => ({
    components: { BListGroupItem, BListGroup },
    props: Object.keys(argTypes),
    template: `
    <div>
        <b-list-group horizontal="md">
        <b-list-group-item>Cras justo odio</b-list-group-item>
        <b-list-group-item>Dapibus ac facilisis in</b-list-group-item>
        <b-list-group-item>Morbi leo risus</b-list-group-item>
        </b-list-group>
    </div>
          `,
  }),
}

export const withCustomContent: Story = {
  render: (args, { argTypes }) => ({
    components: { BListGroupItem, BListGroup },
    props: Object.keys(argTypes),
    template: `
    <b-list-group>
        <b-list-group-item href="#" active class="flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">List Group item heading</h5>
            <small>3 days ago</small>
        </div>
    
        <p class="mb-1">
            Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
        </p>
    
        <small>Donec id elit non mi porta.</small>
        </b-list-group-item>
    
        <b-list-group-item href="#" class="flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">List Group item heading</h5>
            <small class="text-muted">3 days ago</small>
        </div>
    
        <p class="mb-1">
            Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
        </p>
    
        <small class="text-muted">Donec id elit non mi porta.</small>
        </b-list-group-item>
    
        <b-list-group-item href="#" disabled class="flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Disabled List Group item</h5>
            <small class="text-muted">3 days ago</small>
        </div>
    
        <p class="mb-1">
            Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
        </p>
    
        <small class="text-muted">Donec id elit non mi porta.</small>
        </b-list-group-item>
    </b-list-group>
            `,
  }),
}
