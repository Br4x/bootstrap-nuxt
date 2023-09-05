import type { Meta, StoryObj } from '@storybook/vue3'
import vitestResults from '@/tests/unit/results.json'
import BOverlay from '@/components/BOverlay.vue'
import BCard from '@/components/BCard.vue'
import BCardText from '@/components/BCardText.vue'
import BButton from '@/components/BButton.vue'
import BRow from '@/components/BRow.vue'
import BCol from '@/components/BCol.vue'
import BFormGroup from '@/components/BFormGroup.vue'
import BFormSelect from '@/components/BFormSelect.vue'
import BInputGroup from '@/components/BInputGroup.vue'
import BFormInput from '@/components/BFormInput.vue'
import BInputGroupAppend from '@/components/BInputGroupAppend.vue'
import BImg from '@/components/BImg.vue'
import BMedia from '@/components/BMedia.vue'
import BSpinner from '@/components/BSpinner.vue'
import BForm from '@/components/BForm.vue'
import BInputGroupPrepend from '@/components/BInputGroupPrepend.vue'
import BFormFile from '@/components/BFormFile.vue'
import BProgress from '@/components/BProgress.vue'

const meta = {
  title: 'Components/Overlay',
  component: BOverlay,
  parameters: {
    vitest: {
      testFile: 'overlay.spec.ts',
      testResults: vitestResults,
    },
  },
  argTypes: {

  },
} satisfies Meta<typeof BOverlay>

export default meta
          type Story = StoryObj<typeof meta>

export const Overview: Story = {
  render: (args, { argTypes }) => ({
    components: { BOverlay, BCard, BCardText, BButton },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-overlay :show="show" rounded="sm">
      <b-card title="Card with overlay" :aria-hidden="show ? 'true' : null">
        <b-card-text>Laborum consequat non elit enim exercitation cillum.</b-card-text>
        <b-card-text>Click the button to toggle the overlay:</b-card-text>
        <b-button :disabled="show" variant="primary" @click="show = true">
          Show overlay
        </b-button>
      </b-card>
    </b-overlay>
    <b-button class="mt-3" @click="show = !show">Toggle overlay</b-button>
  </div>
`,

    data() {
      return {
        show: false,
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

export const OverlayBackdropColor: Story = {
  render: (args, { argTypes }) => ({
    components: { BRow, BCol, BFormGroup, BFormSelect, BInputGroup, BFormInput, BInputGroupAppend, BOverlay, BCard, BCardText, BButton },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-row>
      <b-col lg="6" aria-controls="overlay-background">
        <b-form-group label="Variant" label-for="bg-variant" label-cols-sm="4" label-cols-lg="12">
          <b-form-select id="bg-variant" v-model="variant" :options="variants"></b-form-select>
        </b-form-group>

        <b-form-group label="Opacity" label-for="bg-opacity" label-cols-sm="4" label-cols-lg="12">
          <b-input-group>
            <b-form-input
              id="bg-opacity"
              v-model="opacity"
              type="range"
              number
              min="0"
              max="1"
              step="0.01"
            ></b-form-input>
            <b-input-group-append is-text class="text-monospace">
              {{ opacity.toFixed(2) }}
            </b-input-group-append>
          </b-input-group>
        </b-form-group>

        <b-form-group label="Blur" label-for="bg-blur" label-cols-sm="4" label-cols-lg="12">
          <b-form-select id="bg-blur" v-model="blur" :options="blurs"></b-form-select>
        </b-form-group>
      </b-col>

      <b-col lg="6">
        <b-overlay
          id="overlay-background"
          show
          :variant="variant"
          :opacity="opacity"
          :blur="blur"
          rounded="sm"
        >
          <b-card title="Card with overlay" aria-hidden="true">
            <b-card-text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </b-card-text>

            <b-button disabled variant="primary">Button</b-button>
          </b-card>
        </b-overlay>
      </b-col>
    </b-row>
  </div>
`,

    data() {
      return {
        variant: 'light',
        opacity: 0.85,
        blur: '2px',
        variants: [
          'transparent',
          'white',
          'light',
          'dark',
          'primary',
          'secondary',
          'success',
          'danger',
          'warning',
          'info',
        ],
        blurs: [
          { text: 'None', value: '' },
          '1px',
          '2px',
          '5px',
          '0.5em',
          '1rem',
        ],
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

export const DefaultSpinnerStyling: Story = {
  render: (args, { argTypes }) => ({
    components: { BOverlay, BCard, BCardText, BButton },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-overlay
      show
      spinner-variant="primary"
      spinner-type="grow"
      spinner-small
      rounded="sm"
      style="max-width: 320px;"
    >
      <b-card title="Card with spinner style" aria-hidden="true">
        <b-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </b-card-text>
        <b-button disabled variant="primary">Button</b-button>
      </b-card>
    </b-overlay>
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

export const OverlayCornerRounding: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BRow, BCol, BOverlay, BImg },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-button @click="show = !show">Toggle overlay</b-button>
    <b-row class="text-center mt-3">
      <b-col md="6">
        <p>With rounding</p>
        <b-overlay :show="show" class="d-inline-block" rounded="circle">
          <b-img thumbnail rounded="circle" fluid src="https://picsum.photos/200/200/?image=54" alt="Image 1"></b-img>
        </b-overlay>
      </b-col>
      <b-col md="6">
        <p>Without rounding</p>
        <b-overlay :show="show" class="d-inline-block">
          <b-img thumbnail rounded="circle" fluid src="https://picsum.photos/200/200/?image=54" alt="Image 1"></b-img>
        </b-overlay>
      </b-col>
    </b-row>
  </div>
`,

    data() {
      return {
        show: true,
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

export const CustomOverlayContent: Story = {
  render: (args, { argTypes }) => ({
    components: { BOverlay, BCard, BCardText, BButton },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-overlay :show="show" rounded="sm" @shown="onShown" @hidden="onHidden">
      <b-card title="Card with custom overlay content" :aria-hidden="show ? 'true' : null">
        <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
        <b-card-text>Click the button to toggle the overlay:</b-card-text>
        <b-button ref="show" :disabled="show" variant="primary" @click="show = true">
          Show overlay
        </b-button>
      </b-card>
      <template #overlay>
        <div class="text-center">
          <i class="w-6 w-6 i-carbon-user stopwatch" font-scale="3" animation="cylon" />
          <p id="cancel-label">Please wait...</p>
          <b-button
            ref="cancel"
            variant="outline-danger"
            size="sm"
            aria-describedby="cancel-label"
            @click="show = false"
          >
            Cancel
          </b-button>
        </div>
        </template>
    </b-overlay>
  </div>
      `,

    data() {
      return {
        show: false,
      }
    },
    methods: {
      onShown() {
        // Focus the cancel button when the overlay is showing
        this.$refs.cancel.focus()
      },
      onHidden() {
        // Focus the show button when the overlay is removed
        this.$refs.show.focus()
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

export const OverlayContentCentering: Story = {
  render: (args, { argTypes }) => ({
    components: { BOverlay, BCard, BCardText, BButton },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-overlay no-center show rounded="sm">
      <template #overlay>
        <i
          class="w-10 w-10 i-carbon-watch stopwatch absolute top-0 right-0 bg-info"
          shift-v="8"
          shift-h="8"
         />
         </template>
      <b-card title="Card with no-center overlay" aria-hidden="true">
        <b-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
        </b-card-text>
        <b-button disabled variant="primary">Button</b-button>
      </b-card>
    </b-overlay>
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

export const NonWrappingMode: Story = {
  render: (args, { argTypes }) => ({
    components: { BCard, BCardText, BButton, BOverlay },
    props: Object.keys(argTypes),
    template: `
  <div>
    <div class="position-relative p-4 bg-info">
      <p class="text-light font-weight-bold">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <b-card title="Card with parent overlay">
        <b-card-text>Laborum consequat non elit enim exercitation cillum.</b-card-text>
        <b-card-text>Click the button to toggle the overlay:</b-card-text>
        <b-button :disabled="show" variant="primary" @click="show = true">
          Show overlay
        </b-button>
      </b-card>
      <p class="text-light font-weight-bold mb-0">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <b-overlay :show="show" no-wrap>
      </b-overlay>
    </div>
    <b-button class="mt-3" @click="show = !show">Toggle overlay</b-button>
  </div>
`,

    data() {
      return {
        show: false,
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

export const NonWrappingMode1: Story = {
  render: (args, { argTypes }) => ({
    components: { BCard, BMedia, BImg, BOverlay, BButton },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-card header="Card header" footer="Card footer">
      <b-media>
        <template #aside>
          <b-img
            thumbnail
            rounded="circle"
            src="https://picsum.photos/72/72/?image=58"
            alt="Image"
          />
          </template>
        <p class="mb-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </b-media>
      <b-overlay :show="show" no-wrap></b-overlay>
    </b-card>
    <b-button @click="show = !show" class="mt-3">Toggle overlay</b-button>
  </div>
        `,

    data() {
      return {
        show: true,
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

export const LoadingButton: Story = {
  render: (args, { argTypes }) => ({
    components: { BOverlay, BButton },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-overlay
      :show="busy"
      rounded
      opacity="0.6"
      spinner-small
      spinner-variant="primary"
      class="d-inline-block"
      @hidden="onHidden"
    >
      <b-button
        ref="button"
        :disabled="busy"
        variant="primary"
        @click="onClick"
      >
        Do something
      </b-button>
    </b-overlay>
  </div>
`,

    data() {
      return {
        busy: false,
        timeout: null,
      }
    },
    beforeDestroy() {
      this.clearTimeout()
    },
    methods: {
      clearTimeout() {
        if (this.timeout) {
          clearTimeout(this.timeout)
          this.timeout = null
        }
      },
      setTimeout(callback: Function) {
        this.clearTimeout()
        this.timeout = setTimeout(() => {
          this.clearTimeout()
          callback()
        }, 5000)
      },
      onHidden() {
        // Return focus to the button once hidden
        this.$refs.button.focus()
      },
      onClick() {
        this.busy = true
        // Simulate an async request
        this.setTimeout(() => {
          this.busy = false
        })
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

export const BusyStateInputGroup: Story = {
  render: (args, { argTypes }) => ({
    components: { BOverlay, BSpinner, BInputGroup, BFormInput, BInputGroupAppend, BButton },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-overlay :show="busy" rounded="lg" opacity="0.6" @hidden="onHidden">
      <template #overlay>
        <div class="d-flex align-items-center">
          <b-spinner small type="grow" variant="secondary"></b-spinner>
          <b-spinner type="grow" variant="dark"></b-spinner>
          <b-spinner small type="grow" variant="secondary"></b-spinner>
          
          <span class="sr-only">Please wait...</span>
        </div>
        </template>
      <b-input-group size="lg" :aria-hidden="busy ? 'true' : null">
        <b-form-input v-model="value" :disabled="busy"></b-form-input>
        <b-input-group-append>
          <b-button ref="button" :disabled="busy" variant="primary"  @click="onClick">
            Do something
          </b-button>
        </b-input-group-append>
      </b-input-group>
    </b-overlay>
  </div>
      `,

    data() {
      return {
        value: 'Some value',
        busy: false,
        timeout: null,
      }
    },
    beforeDestroy() {
      this.clearTimeout()
    },
    methods: {
      clearTimeout() {
        if (this.timeout) {
          clearTimeout(this.timeout)
          this.timeout = null
        }
      },
      setTimeout(callback: Function) {
        this.clearTimeout()
        this.timeout = setTimeout(() => {
          this.clearTimeout()
          callback()
        }, 5000)
      },
      onHidden() {
        // Return focus to the button
        this.$refs.button.focus()
      },
      onClick() {
        this.busy = true
        // Simulate an async request
        this.setTimeout(() => {
          this.busy = false
        })
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

export const FormConfirmationPromptAndUploadStatus: Story = {
  render: (args, { argTypes }) => ({
    components: { BForm, BFormGroup, BInputGroup, BInputGroupPrepend, BFormInput, BFormFile, BButton, BOverlay, BProgress },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form class="position-relative p-3" @submit.prevent="onSubmit">
      <b-form-group label="Name" label-for="form-name" label-cols-lg="2">
        <b-input-group>
          <b-input-group-prepend is-text>
            <i class="w-6 w-6 i-carbon-user person-fill" />
          </b-input-group-prepend>
          <b-form-input id="form-name" :disabled="busy"></b-form-input>
        </b-input-group>
      </b-form-group>

      <b-form-group label="Email" label-for="form-mail" label-cols-lg="2">
        <b-input-group>
          <b-input-group-prepend is-text>
            <i class="w-6 w-6 i-carbon-user envelope-fill" />
          </b-input-group-prepend>
          <b-form-input id="form-email" type="email" :disabled="busy"></b-form-input>
        </b-input-group>
      </b-form-group>

      <b-form-group label="Image" label-for="form-image" label-cols-lg="2">
        <b-input-group>
          <b-input-group-prepend is-text>
            <i class="w-6 w-6 i-carbon-user image-fill" />
          </b-input-group-prepend>
          <b-form-file id="form-image" :disabled="busy" accept="image/*"></b-form-file>
        </b-input-group>
      </b-form-group>

      <div class="d-flex justify-content-center">
         <b-button ref="submit" type="submit" :disabled="busy">Submit</b-button>
      </div>

      <b-overlay :show="busy" no-wrap @shown="onShown" @hidden="onHidden">
        <template #overlay>
          <div v-if="processing" class="text-center p-4 bg-primary text-light rounded">
            <i class="w-6 w-6 i-carbon-user cloud-upload" font-scale="4" />
            <div class="mb-3">Processing...</div>
            <b-progress
              min="1"
              max="20"
              :value="counter"
              variant="success"
              height="3px"
              class="mx-n4 rounded-0"
            ></b-progress>
          </div>
          <div
            v-else
            ref="dialog"
            tabindex="-1"
            role="dialog"
            aria-modal="false"
            aria-labelledby="form-confirm-label"
            class="text-center p-3"
          >
            <p><strong id="form-confirm-label">Are you sure?</strong></p>
            <div class="d-flex">
              <b-button variant="outline-danger" class="mr-3" @click="onCancel">
                Cancel
              </b-button>
              <b-button variant="outline-success" @click="onOK">OK</b-button>
            </div>
          </div>
          </template>
      </b-overlay>
    </b-form>
  </div>
        `,

    data() {
      return {
        busy: false,
        processing: false,
        counter: 1,
        interval: null,
      }
    },
    beforeDestroy() {
      this.clearInterval()
    },
    methods: {
      clearInterval() {
        if (this.interval) {
          clearInterval(this.interval)
          this.interval = null
        }
      },
      onShown() {
        // Focus the dialog prompt
        this.$refs.dialog.focus()
      },
      onHidden() {
        // In this case, we return focus to the submit button
        // You may need to alter this based on your application requirements
        this.$refs.submit.focus()
      },
      onSubmit() {
        this.processing = false
        this.busy = true
      },
      onCancel() {
        this.busy = false
      },
      onOK() {
        this.counter = 1
        this.processing = true
        // Simulate an async request
        this.clearInterval()
        this.interval = setInterval(() => {
          if (this.counter < 20) {
            this.counter = this.counter + 1
          }
          else {
            this.clearInterval()
            this.$nextTick(() => {
              this.busy = this.processing = false
            })
          }
        }, 350)
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
