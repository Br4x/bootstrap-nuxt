import type { Meta, StoryObj } from '@storybook/vue3'
import vitestResults from '@/tests/unit/results.json'
import BCarousel from '@/components/B/Carousel.vue'
import BCarouselSlide from '@/components/B/CarouselSlide.vue'

const meta = {
  title: 'Components/Carousel',
  component: BCarousel,
  parameters: {
    vitest: {
      testFile: 'carousel.test.tsx',
      testResults: vitestResults,
    },
  },
  argTypes: {

  },
} satisfies Meta<typeof BCarousel>

export default meta
          type Story = StoryObj<typeof meta>

export const Carousel: Story = {
  render: (args, { argTypes }) => ({
    components: { BCarousel, BCarouselSlide },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Text slides with image -->
      <b-carousel-slide
        caption="First slide"
        text="Nulla vitae elit libero, a pharetra augue mollis interdum."
        img-src="https://picsum.photos/1024/480/?image=52"
      ></b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54">
        <h1>Hello world!</h1>
      </b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58"></b-carousel-slide>

      <!-- Slides with img slot -->
      <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
      <b-carousel-slide>
        <template #img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="480"
            src="https://picsum.photos/1024/480/?image=55"
            alt="image slot"
          >
        `,

    data() {
      return {
        slide: 0,
        sliding: null,
      }
    },
    methods: {
      onSlideStart() {
        this.sliding = true
      },
      onSlideEnd() {
        this.sliding = false
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

export const CrossfadeAnimation: Story = {
  render: (args, { argTypes }) => ({
    components: { BCarousel, BCarouselSlide },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-carousel
    id="carousel-fade"
    style="text-shadow: 0px 0px 2px #000"
    fade
    indicators
    img-width="1024"
    img-height="480"
  >
    <b-carousel-slide
      caption="First Slide"
      img-src="https://picsum.photos/1024/480/?image=10"
    ></b-carousel-slide>
    <b-carousel-slide
      caption="Second Slide"
      img-src="https://picsum.photos/1024/480/?image=12"
    ></b-carousel-slide>
    <b-carousel-slide
      caption="Third Slide"
      img-src="https://picsum.photos/1024/480/?image=22"
    ></b-carousel-slide>
  </b-carousel>
</div>

<!-- b-carousel-fade.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const DisableAnimation: Story = {
  render: (args, { argTypes }) => ({
    components: { BCarousel, BCarouselSlide },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-carousel
    id="carousel-no-animation"
    style="text-shadow: 0px 0px 2px #000"
    no-animation
    indicators
    img-width="1024"
    img-height="480"
  >
    <b-carousel-slide
      caption="First Slide"
      img-src="https://picsum.photos/1024/480/?image=10"
    ></b-carousel-slide>
    <b-carousel-slide
      caption="Second Slide"
      img-src="https://picsum.photos/1024/480/?image=12"
    ></b-carousel-slide>
    <b-carousel-slide
      caption="Third Slide"
      img-src="https://picsum.photos/1024/480/?image=22"
    ></b-carousel-slide>
    <b-carousel-slide
      caption="Fourth Slide"
      img-src="https://picsum.photos/1024/480/?image=23"
    ></b-carousel-slide>
  </b-carousel>
</div>

<!-- b-carousel-no-animation.vue -->
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const ProgrammaticSlideControl: Story = {
  render: (args, { argTypes }) => ({
    components: { BCarousel },
    props: Object.keys(argTypes),
    template: `
  <b-carousel ref="myCarousel" .... >
    <!-- slides go here -->
  </b-carousel>
`,

    // ...
    methods: {
      prev() {
        this.$refs.myCarousel.prev()
      },
      next() {
        this.$refs.myCarousel.next()
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
