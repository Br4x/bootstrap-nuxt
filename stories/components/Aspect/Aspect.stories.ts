import type { Meta, StoryObj } from '@storybook/vue3'
import vitestResults from '@/tests/unit/results.json'
import BFormGroup from '@/components/B/FormGroup.vue'
import BFormSelect from '@/components/B/FormSelect.vue'
import BCard from '@/components/B/Card.vue'
import BAspect from '@/components/B/Aspect.vue'

const meta = {
  title: 'Components/Aspect',
  component: BAspect,
  parameters: {
    vitest: {
      testFile: 'aspect.test.tsx',
      testResults: vitestResults,
    },
  },
  argTypes: {

  },
} satisfies Meta<typeof BAspect>

export default meta
          type Story = StoryObj<typeof meta>

export const Overview: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormGroup, BFormSelect, BCard, BAspect },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-group label="Aspect ratio" label-for="ratio" label-cols-md="auto" class="mb-3">
      <b-form-select id="ratio" v-model="aspect" :options="aspects"></b-form-select>
    </b-form-group>
    <b-card>
      <b-aspect :aspect="aspect">
        This will always be an aspect of "{{ aspect }}",
        except when the content is too tall.
      </b-aspect>
    </b-card>
  </div>
`,

    data() {
      return {
        aspect: '16:9',
        aspects: [
          { text: '4:3 (SD)', value: '4:3' },
          { text: '1:1 (Square)', value: '1:1' },
          { text: '16:9 (HD)', value: '16:9' },
          { text: '1.85:1 (Widescreen)', value: '1.85:1' },
          { text: '2:1 (Univisium/Superscope)', value: '2:1' },
          { text: '21:9 (Anamorphic)', value: '21:9' },
          { text: '1.43:1 (IMAX)', value: '1.43:1' },
          { text: '3:2 (35mm Film)', value: '3:2' },
          { text: '3:1 (APS-P)', value: '3:1' },
          { text: '4/3 (Same as 4:3)', value: 4 / 3 },
          { text: '16/9 (Same as 16:9)', value: 16 / 9 },
          { text: '3 (Same as 3:1)', value: 3 },
          { text: '2 (Same as 2:1)', value: 2 },
          { text: '1.85 (Same as 1.85:1)', value: 1.85 },
          { text: '1.5', value: 1.5 },
          { text: '1 (Same as 1:1)', value: 1 },
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
