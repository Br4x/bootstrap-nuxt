import type { Meta, StoryObj } from '@storybook/vue3'
import BListGroupItem from '@/components/BListGroupItem.vue'
import BListGroup from '@/components/BListGroup.vue'
import BRow from '@/components/BRow.vue'
import BCol from '@/components/BCol.vue'
import BCardSubTitle from '@/components/BCardSubtitle.vue'
import BCardTitle from '@/components/BCardTitle.vue'
import BButton from '@/components/BButton.vue'
import BCardFooter from '@/components/BCardFooter.vue'
import BCardImg from '@/components/BCardImg.vue'
import BCardGroup from '@/components/BCardGroup.vue'
import BLink from '@/components/BLink.vue'
import BCardText from '@/components/BCardText.vue'
import vitestResults from '@/tests/unit/results.json'
import BCard from '@/components/BCard.vue'
import BCardBody from '@/components/BCardBody.vue'
import BNav from '@/components/BNav.vue'
import BNavItem from '@/components/BNavItem.vue'

const meta = {
  title: 'Components/Card',
  component: BCard,
  parameters: {
    vitest: {
      testFile: 'card.spec.ts',
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
    <div class="flex flex-col gap-4">
        <div>
            <h4 class="w-full text-2xl mb-2">Top and Bottom</h4>
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
        <div>
            <h4 class="w-full text-2xl my-4">Left and Right (or Start and End)</h4>
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
          <b>Header Slot</b>
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
    components: { BCard, BCardText, BCardImg, BCardBody, BCardFooter, BCardTitle, BCardSubTitle, BListGroup, BListGroupItem },
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
    components: { BCard, BCardText, BCardImg, BCardBody, BCardFooter, BCol, BRow },
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

export const TextVariants: Story = {
  render: (args, { argTypes }) => ({
    components: { BCard, BCardText, BButton },
    props: Object.keys(argTypes),
    template: `
    <b-card bg-variant="dark" text-variant="white" title="Card Title">
      <b-card-text>
        With supporting text below as a natural lead-in to additional content.
      </b-card-text>
      <b-button href="#" variant="primary">Go somewhere</b-button>
    </b-card>
    `,
  }),
}

export const SolidVariants: Story = {
  render: (args, { argTypes }) => ({
    components: { BCard, BCardText, BCardGroup },
    props: Object.keys(argTypes),
    template: `
    <div>
      <div>
        <b-card-group deck>
          <b-card bg-variant="primary" text-variant="white" header="Primary" class="text-center">
            <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
          </b-card>

          <b-card bg-variant="secondary" text-variant="white" header="Secondary" class="text-center">
            <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
          </b-card>

          <b-card bg-variant="success" text-variant="white" header="Success" class="text-center">
            <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
          </b-card>
        </b-card-group>
      </div>
      <div class="mt-3">
        <b-card-group deck>
          <b-card bg-variant="info" text-variant="white" header="Info" class="text-center">
            <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
          </b-card>

          <b-card bg-variant="warning" text-variant="white" header="Warning" class="text-center">
            <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
          </b-card>

          <b-card bg-variant="danger" text-variant="white" header="Danger" class="text-center">
            <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
          </b-card>
        </b-card-group>
      </div>
      <div class="mt-3">
        <b-card-group deck>
          <b-card bg-variant="light" header="Light" class="text-center">
            <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
          </b-card>

          <b-card bg-variant="dark" header="Dark" text-variant="white" class="text-center">
            <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
          </b-card>

          <b-card header="Default" class="text-center">
            <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
          </b-card>
        </b-card-group>
      </div>
    </div>
    `,
  }),
}

export const Bordered: Story = {
  render: (args, { argTypes }) => ({
    components: { BCard, BCardText, BCardGroup },
    props: Object.keys(argTypes),
    template: `
    <div>
      <div>
        <b-card-group deck>
          <b-card
            border-variant="primary"
            header="Primary"
            header-bg-variant="primary"
            header-text-variant="white"
            align="center"
          >
            <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
          </b-card>

          <b-card
            border-variant="secondary"
            header="Secondary"
            header-border-variant="secondary"
            align="center"
          >
            <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
          </b-card>

          <b-card border-variant="success" header="Success" align="center">
            <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
          </b-card>
        </b-card-group>
      </div>
      <div class="mt-3">
        <b-card-group deck>
          <b-card border-variant="info" header="Info" align="center">
            <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
          </b-card>

          <b-card
            border-variant="warning"
            header="Warning"
            header-bg-variant="transparent"
            align="center"
          >
            <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
          </b-card>

          <b-card
            border-variant="danger"
            header="Danger"
            header-border-variant="danger"
            header-text-variant="danger"
            align="center"
          >
            <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
          </b-card>
        </b-card-group>
      </div>
      <div class="mt-3">
        <b-card-group deck class="mb-3">
          <b-card border-variant="light" header="Light" class="text-center">
            <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
          </b-card>

          <b-card border-variant="dark" header="Dark" align="center">
            <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
          </b-card>
        </b-card-group>
      </div>
    </div>
    `,
  }),
}

export const HeaderAndFooterVariants: Story = {
  render: (args, { argTypes }) => ({
    components: { BCard, BCardText, BCardGroup },
    props: Object.keys(argTypes),
    template: `
    <div>
      <b-card
        header="Card Header"
        header-text-variant="white"
        header-tag="header"
        header-bg-variant="dark"
        footer="Card Footer"
        footer-tag="footer"
        footer-bg-variant="success"
        footer-border-variant="dark"
        title="Title"
        style="max-width: 20rem;"
      >
        <b-card-text>Header and footers variants.</b-card-text>
      </b-card>
    </div>
    `,
  }),
}

export const NavIntegration: Story = {
  render: (args, { argTypes }) => ({
    components: { BCard, BCardText, BCardGroup, BNav, BNavItem, BButton },
    props: Object.keys(argTypes),
    template: `
    <div>
      <b-card title="Card Title" body-class="text-center" header-tag="nav">
        <template #header>
          <b-nav card-header tabs>
            <b-nav-item active>Active</b-nav-item>
            <b-nav-item>Inactive</b-nav-item>
            <b-nav-item disabled>Disabled</b-nav-item>
          </b-nav>
        </template>

        <b-card-text>
          With supporting text below as a natural lead-in to additional content.
        </b-card-text>

        <b-button variant="primary">Go somewhere</b-button>
      </b-card>
    </div>
    `,
  }),
}
