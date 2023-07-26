import type { Meta, StoryObj } from '@storybook/vue3'
import vitestResults from '@/tests/unit/results.json'
import BCard from '@/components/B/Card.vue'
import BMedia from '@/components/B/Media.vue'
import BImg from '@/components/B/Img.vue'
import BMediaAside from '@/components/B/MediaAside.vue'
import BMediaBody from '@/components/B/MediaBody.vue'

const meta = {
  title: 'Components/Media',
  component: BMedia,
  parameters: {
    vitest: {
      testFile: 'media.test.tsx',
      testResults: vitestResults,
    },
  },
  argTypes: {

  },
} satisfies Meta<typeof BMedia>

export default meta
          type Story = StoryObj<typeof meta>

export const Media: Story = {
  render: (args, { argTypes }) => ({
    components: { BCard, BMedia, BImg },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-card>
    <b-media>
      <template #aside>
        <b-img blank blank-color="#ccc" width="64" alt="placeholder"></b-img>
      </template>

      <h5 class="mt-0">Media Title</h5>
      <p>
        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.
        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc
        ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
      </p>
      <p>
        Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque
        penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </p>

      <b-media>
        <template #aside>
          <b-img blank blank-color="#ccc" width="64" alt="placeholder"></b-img>
        </template>

        <h5 class="mt-0">Nested Media</h5>
        <p class="mb-0">
          Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in
          faucibus.
        </p>
      </b-media>
    </b-media>
  </b-card>
</div>

<!-- b-media.vue -->
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
    components: { BMedia },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-media>
    <template #aside>
      <img src="..." alt="Media Aside">
    </template>

    <h2>Media Body</h2>
    <p>Some text</p>

    <!-- b-[Optional: add media children here for nesting] -->
  </b-media>
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

export const NoBodyWithSubComponents: Story = {
  render: (args, { argTypes }) => ({
    components: { BCard, BMedia, BMediaAside, BImg, BMediaBody },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-card>
    <b-media no-body>
      <b-media-aside vertical-align="center">
        <b-img blank blank-color="#ccc" width="64" height="128" alt="placeholder"></b-img>
      </b-media-aside>

      <b-media-body>
        <h5 class="mt-0">Media Title</h5>
        <p>
          Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
          sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce
          condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
        </p>
        <p class="mb-0">
          Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis
          natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        </p>

        <b-media>
          <template #aside>
            <b-img blank blank-color="#ccc" width="64" alt="placeholder"></b-img>
          </template>
          <h5 class="mt-0">Nested Media</h5>
          Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in
          faucibus.
        </b-media>
      </b-media-body>
    </b-media>
  </b-card>
</div>

<!-- b-media-no-body.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const Order: Story = {
  render: (args, { argTypes }) => ({
    components: { BMedia, BImg },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-media right-align vertical-align="center">
    <template #aside>
      <b-img blank blank-color="#ccc" width="80" alt="placeholder"></b-img>
    </template>
    <h5 class="mt-0 mb-1">Media object</h5>
    <p class="mb-0">
      Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.
      Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac
      nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
    </p>
  </b-media>
</div>

<!-- b-media-order.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const MediaList: Story = {
  render: (args, { argTypes }) => ({
    components: { BMedia, BImg },
    props: Object.keys(argTypes),
    template: `
<div>
  <ul class="list-unstyled">
    <b-media tag="li">
      <template #aside>
        <b-img blank blank-color="#abc" width="64" alt="placeholder"></b-img>
      </template>
      <h5 class="mt-0 mb-1">List-based media object</h5>
      <p class="mb-0">
        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.
        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc
        ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
      </p>
    </b-media>

    <b-media tag="li" class="my-4">
      <template #aside>
       <b-img blank blank-color="#cba" width="64" alt="placeholder"></b-img>
      </template>

      <h5 class="mt-0 mb-1">List-based media object</h5>
      <p class="mb-0">
        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.
        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc
        ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
      </p>
    </b-media>

    <b-media tag="li">
      <template #aside>
        <b-img blank blank-color="#bac" width="64" alt="placeholder"></b-img>
      </template>

      <h5 class="mt-0 mb-1">List-based media object</h5>
      <p class="mb-0">
        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.
        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc
        ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
      </p>
    </b-media>
  </ul>
</div>

<!-- b-media-list.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}
