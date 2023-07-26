import type { Meta, StoryObj } from '@storybook/vue3'
import vitestResults from '@/tests/unit/results.json'
import BImg from '@/components/B/Img.vue'
import BContainer from '@/components/B/Container.vue'
import BRow from '@/components/B/Row.vue'
import BCol from '@/components/B/Col.vue'
import BImgLazy from '@/components/B/ImgLazy.vue'

const meta = {
  title: 'Components/Image',
  component: BImg,
  parameters: {
    vitest: {
      testFile: 'image.test.tsx',
      testResults: vitestResults,
    },
  },
  argTypes: {

  },
} satisfies Meta<typeof BImg>

export default meta
          type Story = StoryObj<typeof meta>

export const ResponsiveImages: Story = {
  render: (args, { argTypes }) => ({
    components: { BImg },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-img src="https://picsum.photos/1024/400/?image=41" fluid alt="Responsive image"></b-img>
</div>

<!-- b-img-fluid.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const ResponsiveImages1: Story = {
  render: (args, { argTypes }) => ({
    components: { BImg },
    props: Object.keys(argTypes),
    template: `
<div>
  <h5>Small image with <code>fluid</code>:</h5>
  <b-img src="https://picsum.photos/300/150/?image=41" fluid alt="Fluid image"></b-img>

  <h5 class="my-3">Small image with <code>fluid-grow</code>:</h5>
  <b-img src="https://picsum.photos/300/150/?image=41" fluid-grow alt="Fluid-grow image"></b-img>
</div>

<!-- b-img-fluid-grow.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const ImageThumbnails: Story = {
  render: (args, { argTypes }) => ({
    components: { BContainer, BRow, BCol, BImg },
    props: Object.keys(argTypes),
    template: `
<b-container fluid class="p-4 bg-dark">
  <b-row>
    <b-col>
      <b-img thumbnail fluid src="https://picsum.photos/250/250/?image=54" alt="Image 1"></b-img>
    </b-col>
    <b-col>
      <b-img thumbnail fluid src="https://picsum.photos/250/250/?image=58" alt="Image 2"></b-img>
    </b-col>
    <b-col>
      <b-img thumbnail fluid src="https://picsum.photos/250/250/?image=59" alt="Image 3"></b-img>
    </b-col>
  </b-row>
</b-container>

<!-- b-img-thumbnail.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const RoundedCorners: Story = {
  render: (args, { argTypes }) => ({
    components: { BImg },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-img v-bind="mainProps" rounded alt="Rounded image"></b-img>
    <b-img v-bind="mainProps" rounded="top" alt="Top-rounded image"></b-img>
    <b-img v-bind="mainProps" rounded="right" alt="Right-rounded image"></b-img>
    <b-img v-bind="mainProps" rounded="bottom" alt="Bottom-rounded image"></b-img>
    <b-img v-bind="mainProps" rounded="left" alt="Left-rounded image"></b-img>
    <b-img v-bind="mainProps" rounded="circle" alt="Circle image"></b-img>
    <b-img v-bind="mainProps" rounded="0" alt="Not rounded image"></b-img>
  </div>
`,

    data() {
      return {
        mainProps: { blank: true, blankColor: '#777', width: 75, height: 75, class: 'm1' },
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

export const AligningImages: Story = {
  render: (args, { argTypes }) => ({
    components: { BImg },
    props: Object.keys(argTypes),
    template: `
<div class="clearfix">
  <b-img left src="https://picsum.photos/125/125/?image=58" alt="Left image"></b-img>
  <b-img right src="https://picsum.photos/125/125/?image=58" alt="Right image"></b-img>
</div>

<!-- b-img-left-right.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const AligningImages1: Story = {
  render: (args, { argTypes }) => ({
    components: { BImg },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-img center src="https://picsum.photos/125/125/?image=58" alt="Center image"></b-img>
</div>

<!-- b-img-center.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const BlankOrSolidColorImages: Story = {
  render: (args, { argTypes }) => ({
    components: { BImg },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-img v-bind="mainProps" alt="Transparent image"></b-img>
    <b-img v-bind="mainProps" blank-color="#777" alt="HEX shorthand color image (#777)"></b-img>
    <b-img v-bind="mainProps" blank-color="red" alt="Named color image (red)"></b-img>
    <b-img v-bind="mainProps" blank-color="black" alt="Named color image (black)"></b-img>
    <b-img v-bind="mainProps" blank-color="#338833" alt="HEX color image"></b-img>
    <b-img v-bind="mainProps" blank-color="rgba(128, 255, 255, 0.5)" alt="RGBa color image"></b-img>
    <b-img v-bind="mainProps" blank-color="#88f" alt="HEX shorthand color (#88f)"></b-img>
  </div>
`,

    data() {
      return {
        mainProps: { blank: true, width: 75, height: 75, class: 'm1' },
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

export const Usage: Story = {
  render: (args, { argTypes }) => ({
    components: { BImgLazy },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-img-lazy v-bind="mainProps" :src="getImageUrl(80)" alt="Image 1"></b-img-lazy>
    <b-img-lazy v-bind="mainProps" :src="getImageUrl(82)" alt="Image 2"></b-img-lazy>
    <b-img-lazy v-bind="mainProps" :src="getImageUrl(84)" alt="Image 3"></b-img-lazy>
    <b-img-lazy v-bind="mainProps" :src="getImageUrl(85)" alt="Image 4"></b-img-lazy>
    <b-img-lazy v-bind="mainProps" :src="getImageUrl(88)" alt="Image 5"></b-img-lazy>
    <b-img-lazy v-bind="mainProps" :src="getImageUrl(90)" alt="Image 6"></b-img-lazy>
    <b-img-lazy v-bind="mainProps" :src="getImageUrl(92)" alt="Image 7"></b-img-lazy>
    <b-img-lazy v-bind="mainProps" :src="getImageUrl(94)" alt="Image 8"></b-img-lazy>
  </div>
`,

    data() {
      return {
        mainProps: {
          center: true,
          fluidGrow: true,
          blank: true,
          blankColor: '#bbb',
          width: 600,
          height: 400,
          class: 'my-5',
        },
      }
    },
    methods: {
      getImageUrl(imageId) {
        const { width, height } = this.mainProps
        return `https://picsum.photos/${width}/${height}/?image=${imageId}`
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
