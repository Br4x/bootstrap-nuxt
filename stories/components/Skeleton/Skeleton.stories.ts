import type { Meta, StoryObj } from '@storybook/vue3'
import vitestResults from '@/tests/unit/results.json'
import BProgress from '@/components/BProgress.vue'
import BProgressBar from '@/components/BProgressBar.vue'
import BButton from '@/components/BButton.vue'
import BSkeletonWrapper from '@/components/BSkeletonWrapper.vue'
import BCard from '@/components/BCard.vue'
import BSkeleton from '@/components/BSkeleton.vue'
import BSkeletonTable from '@/components/BSkeletonTable.vue'
import BRow from '@/components/BRow.vue'
import BCol from '@/components/BCol.vue'
import BSkeletonImg from '@/components/BSkeletonImg.vue'
import BCardBody from '@/components/BCardBody.vue'
import BSkeletonIcon from '@/components/BSkeletonIcon.vue'

const meta = {
  title: 'Components/Skeleton',
  component: BSkeleton,
  parameters: {
    vitest: {
      testFile: 'skeleton.spec.ts',
      testResults: vitestResults,
    },
  },
  argTypes: {

  },
} satisfies Meta<typeof BSkeleton>

export default meta
          type Story = StoryObj<typeof meta>

export const Skeleton: Story = {
  render: (args, { argTypes }) => ({
    components: { BProgress, BProgressBar, BButton, BSkeletonWrapper, BCard, BSkeleton },
    props: Object.keys(argTypes),
    template: `
  <div>
    <div class="d-flex align-items-center mb-3">
      <b-progress class="w-100" :max="maxLoadingTime" height="1.5rem">
        <b-progress-bar :value="loadingTime" :label="\`\${((loadingTime / maxLoadingTime) * 100).toFixed(2)}%\`"></b-progress-bar>
      </b-progress>

      <b-button class="ml-3" @click="startLoading()">Reload</b-button>
    </div>

    <b-skeleton-wrapper :loading="loading">
      <template #loading>
        <b-card>
          <b-skeleton width="85%" />
          <b-skeleton width="55%" />
          <b-skeleton width="70%" />
        </b-card>
        </template>

      <b-card>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas viverra nunc sapien,
        non rhoncus elit tincidunt vitae. Vestibulum maximus, ligula eu feugiat molestie,
        massa diam imperdiet odio, vitae viverra ligula est id nisi. Aliquam ut molestie est.
        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
        turpis egestas. Phasellus at consequat dui. Aenean tristique sagittis quam,
        sit amet sollicitudin neque sodales in.
      </b-card>
    </b-skeleton-wrapper>
  </div>
      `,

    data() {
      return {
        loading: false,
        loadingTime: 0,
        maxLoadingTime: 3,
      }
    },
    watch: {
      loading(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.clearLoadingTimeInterval()

          if (newValue) {
            this.$_loadingTimeInterval = setInterval(() => {
              this.loadingTime++
            }, 1000)
          }
        }
      },
      loadingTime(newValue, oldValue) {
        if (newValue !== oldValue) {
          if (newValue === this.maxLoadingTime)
            this.loading = false
        }
      },
    },
    created() {
      this.$_loadingTimeInterval = null
    },
    mounted() {
      this.startLoading()
    },
    methods: {
      clearLoadingTimeInterval() {
        clearInterval(this.$_loadingTimeInterval)
        this.$_loadingTimeInterval = null
      },
      startLoading() {
        this.loading = true
        this.loadingTime = 0
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

export const Types: Story = {
  render: (args, { argTypes }) => ({
    components: { BSkeleton },
    props: Object.keys(argTypes),
    template: `
<h5>Text (default)</h5>
<b-skeleton />

<h5 class="mt-3">Avatar</h5>
<b-skeleton type="avatar" />

<h5 class="mt-3">Input</h5>
<b-skeleton type="input" />

<h5 class="mt-3">Button</h5>
<b-skeleton type="button" />
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const SkeletonAnimations: Story = {
  render: (args, { argTypes }) => ({
    components: { BCard, BSkeleton },
    props: Object.keys(argTypes),
    template: `
<h5>Wave (default)</h5>
<b-card>
  <b-skeleton animation="wave" width="85%" />
  <b-skeleton animation="wave" width="55%" />
  <b-skeleton animation="wave" width="70%" />
</b-card>

<h5 class="mt-3">Fade</h5>
<b-card>
  <b-skeleton animation="fade" width="85%" />
  <b-skeleton animation="fade" width="55%" />
  <b-skeleton animation="fade" width="70%" />
</b-card>

<h5 class="mt-3">Throb</h5>
<b-card>
  <b-skeleton animation="throb" width="85%" />
  <b-skeleton animation="throb" width="55%" />
  <b-skeleton animation="throb" width="70%" />
</b-card>

<h5 class="mt-3">None</h5>
<b-card>
  <b-skeleton animation width="85%" />
  <b-skeleton animation width="55%" />
  <b-skeleton animation width="70%" />
</b-card>
`,
    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const Table: Story = {
  render: (args, { argTypes }) => ({
    components: { BSkeletonTable },
    props: Object.keys(argTypes),
    template: `
    <b-skeleton-table
      :rows="5"
      :columns="4"
      :table-props="{ bordered: true, striped: true }"
    />
    `,
    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const Image: Story = {
  render: (args, { argTypes }) => ({
    components: { BRow, BCol, BSkeletonImg },
    props: Object.keys(argTypes),
    template: `
<b-row>
  <b-col>
    <b-skeleton-img></b-skeleton-img>
  </b-col>
  <b-col>
    <b-skeleton-img></b-skeleton-img>
  </b-col>
  <b-col cols="12" class="mt-3">
    <b-skeleton-img no-aspect height="150px"></b-skeleton-img>
  </b-col>
</b-row>


`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const CardImage: Story = {
  render: (args, { argTypes }) => ({
    components: { BRow, BCol, BCard, BSkeletonImg, BCardBody },
    props: Object.keys(argTypes),
    template: `
<b-row>
  <b-col cols="12" md="6">
    <h5>Image top</h5>
    <b-card no-body img-top>
      <b-skeleton-img card-img="top" aspect="3:1"></b-skeleton-img>
      <b-card-body>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas viverra nunc sapien,
        non rhoncus elit tincidunt vitae.
      </b-card-body>
    </b-card>
  </b-col>
  <b-col cols="12" md="6">
    <h5>Image bottom</h5>
    <b-card no-body img-bottom>
      <b-card-body>
        Vestibulum maximus, ligula eu feugiat molestie, massa diam imperdiet odio, vitae viverra
        ligula est id nisi. Aliquam ut molestie est.
      </b-card-body>
      <b-skeleton-img card-img="bottom" aspect="3:1"></b-skeleton-img>
    </b-card>
  </b-col>
</b-row>

<b-row class="mt-md-3">
  <b-col cols="12" md="6">
    <h5>Image left</h5>
    <b-card no-body img-left>
      <b-skeleton-img card-img="left" width="225px"></b-skeleton-img>
      <b-card-body>
        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
        egestas. Phasellus at consequat dui.
      </b-card-body>
    </b-card>
  </b-col>
  <b-col cols="12" md="6">
    <h5>Image right</h5>
    <b-card no-body img-right>
      <b-skeleton-img card-img="right" width="225px"></b-skeleton-img>
      <b-card-body>
        Aenean tristique sagittis quam, sit amet sollicitudin neque sodales in.
      </b-card-body>
    </b-card>
  </b-col>
</b-row>


`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const Icons: Story = {
  render: (args, { argTypes }) => ({
    components: { BSkeletonIcon },
    props: Object.keys(argTypes),
    template: `
<b-skeleton-icon
  class="w-6 w-6 i-carbon-user person"
  :icon-props="{ fontScale: 2 }"
></b-skeleton-icon>

<b-skeleton-icon
  class="w-6 w-6 i-carbon-user person-fill"
  :icon-props="{ fontScale: 2, variant: 'dark' }"
></b-skeleton-icon>


`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}
