import type { Meta, StoryObj } from '@storybook/vue3'
import vitestResults from '@/tests/unit/results.json'
import BFormFile from '@/components/BFormFile.vue'
import BFormGroup from '@/components/BFormGroup.vue'
import BBadge from '@/components/BBadge.vue'
import BButton from '@/components/BButton.vue'

const meta = {
  title: 'Components/FormFile',
  component: BFormFile,
  parameters: {
    vitest: {
      testFile: 'form-file.spec.ts',
      testResults: vitestResults,
    },
  },
  argTypes: {

  },
} satisfies Meta<typeof BFormFile>

export default meta
          type Story = StoryObj<typeof meta>

export const FormFile: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormFile },
    props: Object.keys(argTypes),
    template: `
  <div>
    
    <b-form-file
      v-model="file1"
      :state="Boolean(file1)"
      placeholder="Choose a file or drop it here..."
      drop-placeholder="Drop file here..."
     />
    <div class="mt-3">Selected file: {{ file1 ? file1.name : '' }}</div>

    
    <b-form-file v-model="file2" class="mt-3" plain />
    <div class="mt-3">Selected file: {{ file2 ? file2.name : '' }}</div>
  </div>
`,

    data() {
      return {
        file1: null,
        file2: null,
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

export const LimitingToCertainFileTypes: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormFile },
    props: Object.keys(argTypes),
    template: `
<div>
  <!-- Accept all image formats by IANA media type wildcard-->
  <b-form-file accept="image/*" />

  
  <b-form-file accept="image/jpeg, image/png, image/gif" />

  
  <b-form-file accept=".jpg, .png, .gif" />
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

export const ControlSizing: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormGroup, BFormFile },
    props: Object.keys(argTypes),
    template: `
<div>
  <b-form-group label="Small:" label-cols-sm="2" label-size="sm">
    <b-form-file id="file-small" size="sm" />
  </b-form-group>

  <b-form-group label="Default:" label-cols-sm="2">
    <b-form-file id="file-default" />
  </b-form-group>

  <b-form-group label="Large:" label-cols-sm="2" label-size="lg">
    <b-form-file id="file-large" size="lg" />
  </b-form-group>
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

export const FileNameFormatterFunction: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormFile },
    props: Object.keys(argTypes),
    template: `
  <b-form-file multiple :file-name-formatter="formatNames" />
`,

    methods: {
      formatNames(files: File[]) {
        return files.length === 1 ? files[0].name : `${files.length} files selected`
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

export const FileNameFormattingViaScopedSlot: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormFile, BBadge },
    props: Object.keys(argTypes),
    template: `
  <b-form-file multiple>
   <template slot="file-name" slot-scope="{ names }">
     <b-badge variant="dark">{{ names[0] }}</b-badge>
     <b-badge v-if="names.length > 1" variant="dark" class="ml-1">
       + {{ names.length - 1 }} More files
     </b-badge>
    
     </template>
     </b-form-file>
   `,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const ClearingTheFileSelection: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormFile, BButton },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-file v-model="file" ref="file-input" class="mb-2" />

    <b-button @click="clearFiles" class="mr-2">Reset via method</b-button>
    <b-button @click="file = null">Reset via v-model</b-button>

    <p class="mt-2">Selected file: <b>{{ file ? file.name : '' }}</b></p>
  </div>
`,

    data() {
      return {
        file: null,
      }
    },
    methods: {
      clearFiles() {
        this.$refs['file-input'].reset()
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
