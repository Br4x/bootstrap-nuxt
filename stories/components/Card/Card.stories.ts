import type { Meta, StoryObj } from '@storybook/vue3'
import BCardSubTitle from '@/components/B/CardSubtitle.vue'
import BCardTitle from '@/components/B/CardTitle.vue'
import BButton from '@/components/B/Button.vue'
import BCardFooter from '@/components/B/CardFooter.vue'
import BCardImg from '@/components/B/CardImg.vue'
import BCardGroup from '@/components/B/CardGroup.vue'
import BLink from '@/components/B/Link.vue'
import BCardText from '@/components/B/CardText.vue'
import vitestResults from '@/tests/unit/results.json'
import BCard from '@/components/B/Card.vue'
import BCardBody from '@/components/B/CardBody.vue'

const meta = {
  title: 'Components/Card',
  component: BCard,
  parameters: {
    vitest: {
      testFile: 'card.test.tsx',
      testResults: vitestResults,
    },
  },
} satisfies Meta<typeof BCard>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
  render: (args, { argTypes }) => ({
    components: { BCard, BCardText, BButton },
    props: Object.keys(argTypes),
    template: `
    <div>
        <b-card
        title="Card Title"
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
        >
            <b-card-text>
                Some quick example text to build on the card title and make up the bulk of the card's content.
            </b-card-text>
    
            <b-button href="#" variant="primary">Go somewhere</b-button>
        </b-card>
    </div>
  `,
  }),
}

export const Body: Story = {
  render: (args, { argTypes }) => ({
    components: { BCard },
    props: Object.keys(argTypes),
    template: `
    <div>
        <b-card class="text-center">
            <div class="bg-secondary text-light">
                This is some content within the default <samp>&lt;b-card-body&gt;</samp> block of the
                <samp>&lt;b-card&gt;</samp> component. Notice the padding between the card's border and this
                gray <samp>&lt;div&gt;</samp>.
            </div>
        </b-card>
    </div>  
    `,
  }),
}

export const NoBody: Story = {
  render: (args, { argTypes }) => ({
    components: { BCard },
    props: Object.keys(argTypes),
    template: `
    <div>
        <b-card no-body class="text-center">
        <div class="bg-secondary text-light">
            This is some content without the default <samp>&lt;b-card-body&gt;</samp> section. Notice the
            lack of padding between the card's border and this gray <samp>&lt;div&gt;</samp>.
        </div>
        </b-card>
    </div> 
      `,
  }),
}

export const TitlesTextAndLinks: Story = {
  render: (args, { argTypes }) => ({
    components: { BCard, BCardText, BLink },
    props: Object.keys(argTypes),
    template: `
    <div>
        <b-card title="Card title" sub-title="Card subtitle">
            <b-card-text>
                Some quick example text to build on the <em>card title</em> and make up the bulk of the card's
                content.
            </b-card-text>
        
            <b-card-text>A second paragraph of text in the card.</b-card-text>
        
            <a href="#" class="card-link">Card link</a>
            <b-link href="#" class="card-link">Another link</b-link>
        </b-card>
    </div>
        `,
  }),
}

export const Images: Story = {
  render: (args, { argTypes }) => ({
    components: { BCard, BCardText, BCardGroup },
    props: Object.keys(argTypes),
    template: `
    <div>
        <div>
            <h4>Top and Bottom</h4>
            <b-card-group deck>
                <b-card img-src="https://placekitten.com/1000/300" img-alt="Card image" img-top>
                    <b-card-text>
                        Some quick example text to build on the card and make up the bulk of the card's content.
                    </b-card-text>
                </b-card>
        
                <b-card img-src="https://placekitten.com/1000/300" img-alt="Card image" img-bottom>
                    <b-card-text>
                        Some quick example text to build on the card and make up the bulk of the card's content.
                    </b-card-text>
                </b-card>
            </b-card-group>
        </div>
        <div class="mt-4">
            <h4>Left and Right (or Start and End)</h4>
            <b-card img-src="https://placekitten.com/300/300" img-alt="Card image" img-left class="mb-3">
                <b-card-text>
                    Some quick example text to build on the card and make up the bulk of the card's content.
                </b-card-text>
            </b-card>
        
            <b-card img-src="https://placekitten.com/300/300" img-alt="Card image" img-right>
                <b-card-text>
                    Some quick example text to build on the card and make up the bulk of the card's content.
                </b-card-text>
            </b-card>
        </div>
    </div>
          `,
  }),
}

export const OverlayImage: Story = {
  render: (args, { argTypes }) => ({
    components: { BCard, BCardText },
    props: Object.keys(argTypes),
    template: `
    <div>
        <b-card
        overlay
        img-src="https://picsum.photos/900/250/?image=3"
        img-alt="Card Image"
        text-variant="white"
        title="Image Overlay"
        sub-title="Subtitle"
        >
            <b-card-text>
                Some quick example text to build on the card and make up the bulk of the card's content.
            </b-card-text>
        </b-card>
    </div>
            `,
  }),
}

export const HeaderAndFooter: Story = {
  render: (args, { argTypes }) => ({
    components: { BCard, BCardText, BButton, BCardGroup },
    props: Object.keys(argTypes),
    template: `
    <div>
    <b-card-group deck>
      <b-card
        header="featured"
        header-tag="header"
        footer="Card Footer"
        footer-tag="footer"
        title="Title"
      >
        <b-card-text>Header and footers using props.</b-card-text>
        <b-button href="#" variant="primary">Go somewhere</b-button>
      </b-card>
  
      <b-card title="Title" header-tag="header" footer-tag="footer">
        <template #header>
          <h6 class="mb-0">Header Slot</h6>
        </template>
        <b-card-text>Header and footers using slots.</b-card-text>
        <b-button href="#" variant="primary">Go somewhere</b-button>
        <template #footer>
          <em>Footer Slot</em>
        </template>
      </b-card>
    </b-card-group>
  </div>
              `,
  }),
}

export const KitchenSinkExample: Story = {
  render: (args, { argTypes }) => ({
    components: { BCard, BCardText, BCardImg, BCardBody, BCardFooter, BCardTitle, BCardSubTitle },
    props: Object.keys(argTypes),
    template: `
    <div>
        <b-card
        no-body
        style="max-width: 20rem;"
        img-src="https://placekitten.com/380/200"
        img-alt="Image"
        img-top
        >
            <template #header>
                <h4 class="mb-0">Hello World</h4>
            </template>
        
            <b-card-body>
                <b-card-title>Card Title</b-card-title>
                <b-card-sub-title class="mb-2">Card Sub Title</b-card-sub-title>
                <b-card-text>
                Some quick example text to build on the card title and make up the bulk of the card's
                content.
                </b-card-text>
            </b-card-body>
        
            <b-list-group flush>
                <b-list-group-item>Cras justo odio</b-list-group-item>
                <b-list-group-item>Dapibus ac facilisis in</b-list-group-item>
                <b-list-group-item>Vestibulum at eros</b-list-group-item>
            </b-list-group>
        
            <b-card-body>
                <a href="#" class="card-link">Card link</a>
                <a href="#" class="card-link">Another link</a>
            </b-card-body>
        
            <b-card-footer>This is a footer</b-card-footer>
        
            <b-card-img src="https://placekitten.com/480/210" alt="Image" bottom/>
        </b-card>
    </div>
                `,
  }),
}

export const HorizontalCardLayout: Story = {
  render: (args, { argTypes }) => ({
    components: { BCard, BCardText, BCardImg, BCardBody, BCardFooter },
    props: Object.keys(argTypes),
    template: `
    <div>
        <b-card no-body class="overflow-hidden" style="max-width: 540px;">
        <b-row no-gutters>
            <b-col md="6">
                <b-card-img src="https://picsum.photos/400/400/?image=20" alt="Image" class="rounded-0"/>
            </b-col>
            <b-col md="6">
                <b-card-body title="Horizontal Card">
                    <b-card-text>
                        This is a wider card with supporting text as a natural lead-in to additional content.
                        This content is a little bit longer.
                    </b-card-text>
                </b-card-body>
            </b-col>
        </b-row>
        </b-card>
    </div>
                  `,
  }),
}
