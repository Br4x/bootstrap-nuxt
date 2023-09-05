import type { Meta, StoryObj } from '@storybook/vue3'
import vitestResults from '@/tests/unit/results.json'
import BButton from '@/components/BButton.vue'
import BModal from '@/components/BModal.vue'
import BFormGroup from '@/components/BFormGroup.vue'
import BFormInput from '@/components/BFormInput.vue'
import BContainer from '@/components/BContainer.vue'
import BRow from '@/components/BRow.vue'
import BCol from '@/components/BCol.vue'
import BFormSelect from '@/components/BFormSelect.vue'

const meta = {
  title: 'Components/Modal',
  component: BModal,
  parameters: {
    vitest: {
      testFile: 'modal.spec.ts',
      testResults: vitestResults,
    },
  },
  argTypes: {

  },
} satisfies Meta<typeof BModal>

export default meta
          type Story = StoryObj<typeof meta>

export const Modal: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BModal },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-button v-b-modal.modal-1>Launch demo modal</b-button>

  <b-modal id="modal-1" title="BootstrapVue">
    <p class="my-4">Hello from modal!</p>
  </b-modal>
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

export const UsingVBModalDirective: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BModal },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-button v-b-modal.my-modal>Show Modal</b-button>
  <b-button v-b-modal="'my-modal'">Show Modal</b-button>
  <b-modal id="my-modal">Hello From My Modal!</b-modal>
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

export const UsingThisbvmodalshowAndThisbvmodalhideInstanceMethods: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BModal },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-button id="show-btn" @click="$bvModal.show('bv-modal-example')">Open Modal</b-button>

  <b-modal id="bv-modal-example" hide-footer>
    <template #modal-title>
      Using <code>$bvModal</code> Methods
    </template>
    <div class="d-block text-center">
      <h3>Hello From This Modal!</h3>
    </div>
    <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Close Me</b-button>
  </b-modal>
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

export const UsingShowHideAndToggleComponentMethods: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BModal },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-button id="show-btn" @click="showModal">Open Modal</b-button>
    <b-button id="toggle-btn" @click="toggleModal">Toggle Modal</b-button>

    <b-modal ref="my-modal" hide-footer title="Using Component Methods">
      <div class="d-block text-center">
        <h3>Hello From My Modal!</h3>
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-button>
      <b-button class="mt-2" variant="outline-warning" block @click="toggleModal">Toggle Me</b-button>
    </b-modal>
  </div>
`,

    methods: {
      showModal() {
        this.$refs['my-modal'].show()
      },
      hideModal() {
        this.$refs['my-modal'].hide()
      },
      toggleModal() {
        // We pass the ID of the button that we want to return focus to
        // when the modal has hidden
        this.$refs['my-modal'].toggle('#toggle-btn')
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

export const UsingVModelProperty: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BModal },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-button @click="modalShow = !modalShow">Open Modal</b-button>

    <b-modal v-model="modalShow">Hello From Modal!</b-modal>
  </div>
`,

    data() {
      return {
        modalShow: false,
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

export const EmittingEventsOnRoot: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BModal },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-button @click="showModal" ref="btnShow">Open Modal</b-button>
  <b-button @click="toggleModal" ref="btnToggle">Toggle Modal</b-button>

  <b-modal id="modal-1">
    <div class="d-block">Hello From My Modal!</div>
    <b-button @click="hideModal">Close Me</b-button>
    <b-button @click="toggleModal">Toggle Me</b-button>
  </b-modal>
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

export const PreventClosing: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BModal, BFormGroup, BFormInput },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-button v-b-modal.modal-prevent-closing>Open Modal</b-button>

    <div class="mt-3">
      Submitted Names:
      <div v-if="submittedNames.length === 0">--</div>
      <ul v-else class="mb-0 pl-3">
        <li v-for="name in submittedNames">{{ name }}</li>
      </ul>
    </div>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Submit Your Name"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
          :state="nameState"
        >
          <b-form-input
            id="name-input"
            v-model="name"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
`,

    data() {
      return {
        name: '',
        nameState: null,
        submittedNames: [],
      }
    },
    methods: {
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid
        return valid
      },
      resetModal() {
        this.name = ''
        this.nameState = null
      },
      handleOk(bvModalEvent: Event) {
        // Prevent modal from closing
        bvModalEvent.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },
      handleSubmit() {
        // Exit when the form isn't valid
        if (!this.checkFormValidity())
          return

        // Push the name to submitted names
        this.submittedNames.push(this.name)
        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
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

export const TooltipsAndPopovers: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BModal },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-button v-b-modal.modalPopover>Show Modal</b-button>

  <b-modal id="modalPopover" title="Modal with Popover" ok-only>
    <p>
      This
      <b-button v-b-popover="'Popover inside a modal!'" title="Popover">Button</b-button>
      triggers a popover on click.
    </p>
    <p>
      This <a href="#" v-b-tooltip title="Tooltip in a modal!">Link</a> will show a tooltip on
      hover.
    </p>
  </b-modal>
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

export const ModalSizing: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BModal },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-button v-b-modal.modal-xl variant="primary">xl modal</b-button>
  <b-button v-b-modal.modal-lg variant="primary">lg modal</b-button>
  <b-button v-b-modal.modal-sm variant="primary">sm modal</b-button>

  <b-modal id="modal-xl" size="xl" title="Extra Large Modal">Hello Extra Large Modal!</b-modal>
  <b-modal id="modal-lg" size="lg" title="Large Modal">Hello Large Modal!</b-modal>
  <b-modal id="modal-sm" size="sm" title="Small Modal">Hello Small Modal!</b-modal>
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

export const ScrollingLongContent: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BModal },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-button v-b-modal.modal-tall>Launch overflowing modal</b-button>

  <b-modal id="modal-tall" title="Overflowing Content">
    <p class="my-4" v-for="i in 20" :key="i">
      Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
      in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
    </p>
  </b-modal>
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

export const ScrollingLongContent1: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BModal },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-button v-b-modal.modal-scrollable>Launch scrolling modal</b-button>

  <b-modal id="modal-scrollable" scrollable title="Scrollable Content">
    <p class="my-4" v-for="i in 20" :key="i">
      Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
      in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
    </p>
  </b-modal>
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

export const VerticallyCenteredModal: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BModal },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-button v-b-modal.modal-center>Launch centered modal</b-button>

  <b-modal id="modal-center" centered title="BootstrapVue">
    <p class="my-4">Vertically centered modal!</p>
  </b-modal>
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

export const Variants: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BModal, BContainer, BRow, BCol, BFormSelect },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-button @click="show=true" variant="primary">Show Modal</b-button>

    <b-modal
      v-model="show"
      title="Modal Variants"
      :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant"
      :body-bg-variant="bodyBgVariant"
      :body-text-variant="bodyTextVariant"
      :footer-bg-variant="footerBgVariant"
      :footer-text-variant="footerTextVariant"
    >
      <b-container fluid>
        <b-row class="mb-1 text-center">
          <b-col cols="3"></b-col>
          <b-col>Background</b-col>
          <b-col>Text</b-col>
        </b-row>

        <b-row class="mb-1">
          <b-col cols="3">Header</b-col>
          <b-col>
            <b-form-select
              v-model="headerBgVariant"
              :options="variants"
            ></b-form-select>
          </b-col>
          <b-col>
            <b-form-select
              v-model="headerTextVariant"
              :options="variants"
            ></b-form-select>
          </b-col>
        </b-row>

        <b-row class="mb-1">
          <b-col cols="3">Body</b-col>
          <b-col>
            <b-form-select
              v-model="bodyBgVariant"
              :options="variants"
            ></b-form-select>
          </b-col>
          <b-col>
            <b-form-select
              v-model="bodyTextVariant"
              :options="variants"
            ></b-form-select>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="3">Footer</b-col>
          <b-col>
            <b-form-select
              v-model="footerBgVariant"
              :options="variants"
            ></b-form-select>
          </b-col>
          <b-col>
            <b-form-select
              v-model="footerTextVariant"
              :options="variants"
            ></b-form-select>
          </b-col>
        </b-row>
      </b-container>

      <template #modal-footer>
        <div class="w-100">
          <p class="float-left">Modal Footer Content</p>
          <b-button
            variant="primary"
            size="sm"
            class="float-right"
            @click="show=false"
          >
            Close
          </b-button>
        </div>
        </template>
    </b-modal>
  </div>
      `,

    data() {
      return {
        show: false,
        variants: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark'],
        headerBgVariant: 'dark',
        headerTextVariant: 'light',
        bodyBgVariant: 'light',
        bodyTextVariant: 'dark',
        footerBgVariant: 'warning',
        footerTextVariant: 'dark',
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

export const HidingTheBackdrop: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BModal },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-button v-b-modal.modal-no-backdrop>Open modal</b-button>

  <b-modal id="modal-no-backdrop" hide-backdrop content-class="shadow" title="BootstrapVue">
    <p class="my-2">
      We've added the utility class <code>'shadow'</code>
      to the modal content for added effect.
    </p>
  </b-modal>
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

export const FooterButtonSizing: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BModal },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-button v-b-modal.modal-footer-sm>Small Footer Buttons</b-button>
  <b-button v-b-modal.modal-footer-lg>Large Footer Buttons</b-button>

  <b-modal id="modal-footer-sm" title="BootstrapVue" button-size="sm">
    <p class="my-2">This modal has small footer buttons</p>
  </b-modal>

  <b-modal id="modal-footer-lg" title="BootstrapVue" button-size="lg">
    <p class="my-2">This modal has large footer buttons</p>
  </b-modal>
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

export const ExampleModalUsingCustomScopedSlots: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BModal },
    props: Object.keys(argTypes),
    template: `
  <b-button @click="$bvModal.show('modal-scoped')">Open Modal</b-button>

  <b-modal id="modal-scoped">
    <template #modal-header="{ close }">
      
      <b-button size="sm" variant="outline-danger" @click="close()">
        Close Modal
      </b-button>
      <h5>Modal Header</h5>
      </template>

    <template #default="{ hide }">
      <p>Modal Body with button</p>
      <b-button @click="hide()">Hide Modal</b-button>
    </template>

    <template #modal-footer="{ ok, cancel, hide }">
      <b>Custom Footer</b>
      <!-- Emulate built in modal footer ok and cancel button actions -->
      <b-button size="sm" variant="success" @click="ok()">
        OK
      </b-button>
      <b-button size="sm" variant="danger" @click="cancel()">
        Cancel
      </b-button>
      <!-- Button with custom close trigger value -->
      <b-button size="sm" variant="outline-secondary" @click="hide('forget')">
        Forget it
      </b-button>
    </template>
  </b-modal>
    `,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const MultipleModalSupport: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton, BModal },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-button v-b-modal.modal-multi-1>Open First Modal</b-button>

  <b-modal id="modal-multi-1" size="lg" title="First Modal" ok-only no-stacking>
    <p class="my-2">First Modal</p>
    <b-button v-b-modal.modal-multi-2>Open Second Modal</b-button>
  </b-modal>

  <b-modal id="modal-multi-2" title="Second Modal" ok-only>
    <p class="my-2">Second Modal</p>
    <b-button v-b-modal.modal-multi-3 size="sm">Open Third Modal</b-button>
  </b-modal>

  <b-modal id="modal-multi-3" size="sm" title="Third Modal" ok-only>
    <p class="my-1">Third Modal</p>
  </b-modal>
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

export const OkMessageBox: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton },
    props: Object.keys(argTypes),
    template: `
  <div>
    <div class="mb-2">
     <b-button @click="showMsgBoxOne">Simple msgBoxOk</b-button>
     Return value: {{ String(boxOne) }}
    </div>
    <div class="mb-1">
     <b-button @click="showMsgBoxTwo">msgBoxOk with options</b-button>
     Return value: {{ String(boxTwo) }}
    </div>
  </div>
`,

    data() {
      return {
        boxOne: '',
        boxTwo: '',
      }
    },
    methods: {
      showMsgBoxOne() {
        this.boxOne = ''
        this.$bvModal.msgBoxOk('Action completed')
          .then((value: string) => {
            this.boxOne = value
          })
      },
      showMsgBoxTwo() {
        this.boxTwo = ''
        this.$bvModal.msgBoxOk('Data was submitted successfully', {
          title: 'Confirmation',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'success',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
          centered: true,
        })
          .then((value: string) => {
            this.boxTwo = value
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

export const ConfirmMessageBox: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton },
    props: Object.keys(argTypes),
    template: `
  <div>
    <div class="mb-2">
     <b-button @click="showMsgBoxOne">Simple msgBoxConfirm</b-button>
     Return value: {{ String(boxOne) }}
    </div>
    <div class="mb-1">
     <b-button @click="showMsgBoxTwo">msgBoxConfirm with options</b-button>
     Return value: {{ String(boxTwo) }}
    </div>
  </div>
`,

    data() {
      return {
        boxOne: '',
        boxTwo: '',
      }
    },
    methods: {
      showMsgBoxOne() {
        this.boxOne = ''
        this.$bvModal.msgBoxConfirm('Are you sure?')
          .then((value: string) => {
            this.boxOne = value
          })
      },
      showMsgBoxTwo() {
        this.boxTwo = ''
        this.$bvModal.msgBoxConfirm('Please confirm that you want to delete everything.', {
          title: 'Please Confirm',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'YES',
          cancelTitle: 'NO',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true,
        })
          .then((value: string) => {
            this.boxTwo = value
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

export const MessageBoxAdvancedUsage: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-button @click="showMsgOk">Show OK message box with custom content</b-button>
  </div>
`,

    methods: {
      showMsgOk() {
        const h = this.$createElement
        // Using HTML string
        const titleVNode = h('div', { domProps: { innerHTML: 'Title from <i>HTML<i> string' } })
        // More complex structure
        const messageVNode = h('div', { class: ['foobar'] }, [
          h('p', { class: ['text-center'] }, [
            ' Flashy ',
            h('strong', 'msgBoxOk'),
            ' message ',
          ]),
          h('p', { class: ['text-center'] }, [h('b-spinner')]),
          h('b-img', {
            props: {
              src: 'https://picsum.photos/id/20/250/250',
              thumbnail: true,
              center: true,
              fluid: true,
              rounded: 'circle',
            },
          }),
        ])
        // We must pass the generated VNodes as arrays
        this.$bvModal.msgBoxOk([messageVNode], {
          title: [titleVNode],
          buttonSize: 'sm',
          centered: true,
          size: 'sm',
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

export const AutoFocusOnOpen: Story = {
  render: (args, { argTypes }) => ({
    components: { BModal, BButton, BFormInput },
    props: Object.keys(argTypes),
    template: `
<b-modal @shown="focusMyElement">
  <div>
    <b-button>I Don't Have Focus</b-button>
  </div>

  <div>
    <b-form-input></b-form-input>
  </div>

  <div>
    
    <b-form-input ref="focusThis"></b-form-input>
  </div>

  <div>
    <b-form-input></b-form-input>
  </div>
</b-modal>
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const SpecifyReturnFocusViaEvent: Story = {
  render: (args, { argTypes }) => ({
    components: { BButton },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-button @click="$root.$emit('bv::show::modal', 'modal-1', $event.target)">Open Modal</b-button>
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

export const KeyboardNavigation: Story = {
  render: (args, { argTypes }) => ({
    components: { BModal },
    props: Object.keys(argTypes),
    template: `
<b-modal
  id="some-modal-id"
  title="Modal with TinyMCE Editor"
  ignore-enforce-focus-selector=".tox-tinymce-aux, .moxman-window, .tam-assetmanager-root"
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
