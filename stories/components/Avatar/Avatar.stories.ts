import type { Meta, StoryObj } from '@storybook/vue3'
import BListGroupItem from '@/components/BListGroupItem.vue'
import BListGroup from '@/components/BListGroup.vue'
import vitestResults from '@/tests/unit/results.json'
import BAvatar from '@/components/BAvatar.vue'
import BAvatarGroup from '@/components/BAvatarGroup.vue'
import BBadge from '@/components/BBadge.vue'

const meta = {
  title: 'Components/Avatar',
  component: BAvatar,
  parameters: {
    vitest: {
      testFile: 'avatar.spec.ts',
      testResults: vitestResults,
    },
  },
} satisfies Meta<typeof BAvatar>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
  render: (args, { argTypes }) => ({
    components: { BAvatar, BBadge, BListGroup, BListGroupItem },
    props: Object.keys(argTypes),
    template: `
    <div>
      <p>Using stand-alone:</p>
      <div class="mb-4">
        <b-avatar />
        <b-avatar variant="primary" text="BV"/>
        <b-avatar variant="info" src="https://placekitten.com/300/300"/>
        <b-avatar variant="success" class="w-6 w-6 i-carbon-user people-fill"/>
      </div>
      <p>Using in components (list group) example:</p>
      <b-list-group style="max-width: 300px;">
        <b-list-group-item class="flex items-center">
          <b-avatar class="mr-3"/>
          <span class="mr-auto">J. Circlehead</span>
          <b-badge>5</b-badge>
        </b-list-group-item>
        <b-list-group-item class="flex items-center">
          <b-avatar variant="primary" text="BV" class="mr-3"/>
          <span class="mr-auto">BootstrapVue</span>
          <b-badge>12</b-badge>
        </b-list-group-item>
        <b-list-group-item class="flex items-center">
          <b-avatar variant="info" src="https://placekitten.com/300/300" class="mr-3"/>
          <span class="mr-auto">Super Kitty</span>
          <b-badge>9</b-badge>
        </b-list-group-item>
        <b-list-group-item class="flex items-center">
          <b-avatar variant="success" class="w-6 w-6 i-carbon-user people-fill mr-3"/>
          <span class="mr-auto">ACME group</span>
          <b-badge>7</b-badge>
        </b-list-group-item>
      </b-list-group>
    </div>
    `,
  }),
}

export const ImageContent: Story = {
  render: (args, { argTypes }) => ({
    components: { BAvatar },
    props: Object.keys(argTypes),
    template: `
    <div class="mb-2">
        <b-avatar src="https://placekitten.com/300/300"/>
        <b-avatar src="https://placekitten.com/300/300" size="6rem"/>
    </div>
    `,
  }),
}

export const IconContent: Story = {
  render: (args, { argTypes }) => ({
    components: { BAvatar },
    props: Object.keys(argTypes),
    template: `
    <div class="mb-2 inline-flex gap-2">
        <b-avatar class="w-6 w-6 i-carbon-user people-fill"/>
        <b-avatar class="w-6 w-6 i-carbon-user star-fill"/>
        <b-avatar class="w-6 w-6 i-carbon-user music-note"/>
        <b-avatar class="w-6 w-6 i-carbon-user star-fill" size="4em"/>
    </div>
    `,
  }),
}

export const TextContent: Story = {
  render: (args, { argTypes }) => ({
    components: { BAvatar },
    props: Object.keys(argTypes),
    template: `
    <div class="mb-2 inline-flex gap-2">
        <b-avatar text="BV"/>
        <b-avatar text="a"/>
        <b-avatar text="Foo"/>
        <b-avatar text="BV" size="4rem"/>
    </div>
    `,
  }),
}

export const CustomContent: Story = {
  render: (args, { argTypes }) => ({
    components: { BAvatar },
    props: Object.keys(argTypes),
    template: `
    <b-avatar><i class="i-carbon-card w-6 w-6" /></b-avatar>
    `,
  }),
}

export const MultiLineExample: Story = {
  render: (args, { argTypes }) => ({
    components: { BAvatar },
    props: Object.keys(argTypes),
    template: `
    <div class="mb-2 inline-flex gap-2">
    <b-avatar size="4em">Hello<br />World</b-avatar>
    <b-avatar size="4em">你好<br />世界</b-avatar>
  </div>
    `,
  }),
}

export const Variants: Story = {
  render: (args, { argTypes }) => ({
    components: { BAvatar },
    props: Object.keys(argTypes),
    template: `
    <div class="mb-2 inline-flex gap-2">
        <b-avatar variant="secondary"/>
        <b-avatar variant="primary"/>
        <b-avatar variant="dark"/>
        <b-avatar variant="light"/>
        <b-avatar variant="success"/>
        <b-avatar variant="danger"/>
        <b-avatar variant="warning"/>
        <b-avatar variant="info"/>
    </div>
      `,
  }),
}

export const Sizing: Story = {
  render: (args, { argTypes }) => ({
    components: { BAvatar },
    props: Object.keys(argTypes),
    template: `
      <div class="mb-2 inline-flex gap-2">
        <b-avatar/>
        <b-avatar size="sm"/>
        <b-avatar size="lg"/>
        <b-avatar :size="24"/>
        <b-avatar size="3em"/>
        <b-avatar size="72px"/>
    </div>
        `,
  }),
}

export const Square: Story = {
  render: (args, { argTypes }) => ({
    components: { BAvatar },
    props: Object.keys(argTypes),
    template: `
    <div>
        <b-avatar square/>
    </div>
          `,
  }),
}

export const Rounding: Story = {
  render: (args, { argTypes }) => ({
    components: { BAvatar },
    props: Object.keys(argTypes),
    template: `
    <div class="mb-2 inline-flex gap-2">
      <b-avatar rounded="sm"/>
      <b-avatar rounded/>
      <b-avatar rounded="lg"/>
      <b-avatar rounded="top"/>
      <b-avatar rounded="left"/>
      <b-avatar rounded="right"/>
      <b-avatar rounded="bottom"/>
    </div>
            `,
  }),
}

export const Button: Story = {
  render: (args, { argTypes }) => ({
    components: { BAvatar, BListGroup, BListGroupItem },
    props: Object.keys(argTypes),
    template: `
    <b-list-group>
        <b-list-group-item>
            <b-avatar button @click="onClick" variant="primary" text="FF" class="align-baseline"/>
            Button Text Avatar
        </b-list-group-item>
        <b-list-group-item>
            <b-avatar button @click="onClick" src="https://placekitten.com/300/300"/>
            Button Image Avatar
        </b-list-group-item>
        <b-list-group-item>
            <b-avatar button @click="onClick" class="w-6 w-6 i-carbon-user align-center"/>
            Button Icon Avatar
        </b-list-group-item>
    </b-list-group>
    `,
    methods: {
      onClick() {
        this.$bvModal.msgBoxOk('User name: Fred Flintstone', {
          title: 'User Info',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'success',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
        })
      },
    },
  }),
}

export const Link: Story = {
  render: (args, { argTypes }) => ({
    components: { BAvatar, BListGroup, BListGroupItem },
    props: Object.keys(argTypes),
    template: `
    <b-list-group>
        <b-list-group-item>
            <b-avatar href="#foo" variant="primary" text="FF" class="align-baseline"/>
            Link Text Avatar
        </b-list-group-item>
        <b-list-group-item>
            <b-avatar href="#bar" src="https://placekitten.com/300/300"/>
            Link Image Avatar
        </b-list-group-item>
        <b-list-group-item>
            <b-avatar href="#baz" class="w-6 w-6 i-carbon-user align-center"/>
            Link Icon Avatar
        </b-list-group-item>
    </b-list-group>`,
  }),
}

export const BadgeAvatars: Story = {
  render: (args, { argTypes }) => ({
    components: { BAvatar },
    props: Object.keys(argTypes),
    template: `
    <div class="mb-2 inline-flex gap-2">
        <b-avatar badge/>
        <b-avatar badge badge-variant="danger" src="https://placekitten.com/300/300"/>    
        <b-avatar badge badge-variant="warning" class="w-6 w-6 i-carbon-user people-fill"/>
        <b-avatar badge badge-variant="success" src="https://placekitten.com/300/300"/>
        <b-avatar badge badge-variant="dark" text="BV"/>
        <b-avatar square badge badge-variant="dark" text="BV"/>
    </div>`,
  }),
}

export const BadgeContent: Story = {
  render: (args, { argTypes }) => ({
    components: { BAvatar },
    props: Object.keys(argTypes),
    template: `
    <div class="mb-2 inline-flex gap-2">
        <b-avatar badge="BV"/>
        <b-avatar badge="7" variant="primary" badge-variant="dark"/>
        <b-avatar badge-variant="info" src="https://placekitten.com/300/300">
        <template #badge><i class="w-6 w-6 i-carbon-user star-fill" /></template>
        </b-avatar>
    </div>`,
  }),
}

export const BadgePositioning: Story = {
  render: (args, { argTypes }) => ({
    components: { BAvatar },
    props: Object.keys(argTypes),
    template: `
    <div class="mb-2 inline-flex gap-2">
        <b-avatar badge/>
        <b-avatar badge badge-left/>
        <b-avatar badge badge-top/>
        <b-avatar badge badge-left badge-top/>
    </div>`,
  }),
}

export const BadgeOffset: Story = {
  render: (args, { argTypes }) => ({
    components: { BAvatar },
    props: Object.keys(argTypes),
    template: `
    <div class="mb-2 inline-flex gap-2">
        <b-avatar badge/>
        <b-avatar badge badge-offset="-0.5em"/>
        <b-avatar badge badge-offset="-2px"/>
        <b-avatar badge badge-offset="2px"/>
        <b-avatar badge badge-top/>
        <b-avatar badge badge-top badge-offset="-0.5em"/>
        <b-avatar badge badge-top badge-offset="-2px"/>
        <b-avatar badge badge-top badge-offset="2px"/>
    </div>`,
  }),
}

export const AvatarGroups: Story = {
  render: (args, { argTypes }) => ({
    components: { BAvatar, BAvatarGroup },
    props: Object.keys(argTypes),
    template: `
    <div class="mb-2 inline-flex gap-2">
        <b-avatar-group size="60px" rounded>
            <b-avatar/>
            <b-avatar text="BV" variant="primary"/>
            <b-avatar src="https://placekitten.com/300/300" variant="info"/>
            <b-avatar text="OK" variant="danger"/>
            <b-avatar variant="warning"/>
            <b-avatar src="https://placekitten.com/320/320" variant="dark"/>
            <b-avatar class="w-6 w-6 i-carbon-user music-note" variant="success"/>
        </b-avatar-group>
    </div>`,
  }),
}

export const GroupSize: Story = {
  render: (args, { argTypes }) => ({
    components: { BAvatar, BAvatarGroup },
    props: Object.keys(argTypes),
    template: `
    <div class="mb-2 inline-flex gap-2">
        <b-avatar-group size="5rem">
            <b-avatar/>
            <b-avatar/>
            <b-avatar/>
            <b-avatar/>
            <b-avatar/>
        </b-avatar-group>
    </div>`,
  }),
}

export const GroupVariant: Story = {
  render: (args, { argTypes }) => ({
    components: { BAvatar, BAvatarGroup },
    props: Object.keys(argTypes),
    template: `
    <div class="mb-2 inline-flex gap-2">
        <b-avatar-group variant="success">
            <b-avatar/>
            <b-avatar variant="info"/>
            <b-avatar/>
            <b-avatar/>
            <b-avatar/>
        </b-avatar-group>
    </div>`,
  }),
}

export const GroupRounding: Story = {
  render: (args, { argTypes }) => ({
    components: { BAvatar, BAvatarGroup },
    props: Object.keys(argTypes),
    template: `
    <div class="mb-2 inline-flex gap-2">
        <b-avatar-group rounded="lg">
            <b-avatar/>
            <b-avatar/>
            <b-avatar/>
            <b-avatar/>
            <b-avatar/>
        </b-avatar-group>
    </div>`,
  }),
}

export const GroupOverlap: Story = {
  render: (args, { argTypes }) => ({
    components: { BAvatar, BAvatarGroup },
    props: Object.keys(argTypes),
    template: `
    <div class="mb-2 inline-flex gap-2">
        <b-avatar-group overlap="0.65">
            <b-avatar/>
            <b-avatar/>
            <b-avatar/>
            <b-avatar/>
            <b-avatar/>
        </b-avatar-group>
  </div>`,
  }),
}
