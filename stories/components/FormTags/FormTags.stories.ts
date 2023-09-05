import type { Meta, StoryObj } from '@storybook/vue3'
import vitestResults from '@/tests/unit/results.json'
import BFormTags from '@/components/BFormTags.vue'
import BFormText from '@/components/BFormText.vue'
import BFormGroup from '@/components/BFormGroup.vue'
import BInputGroup from '@/components/BInputGroup.vue'
import BInputGroupAppend from '@/components/BInputGroupAppend.vue'
import BButton from '@/components/BButton.vue'
import BCard from '@/components/BCard.vue'
import BFormInput from '@/components/BFormInput.vue'
import BFormTag from '@/components/BFormTag.vue'
import BFormSelect from '@/components/BFormSelect.vue'
import BFormCheckbox from '@/components/BFormCheckbox.vue'
import BFormInvalidFeedback from '@/components/BFormInvalidFeedback.vue'
import BDropdown from '@/components/BDropdown.vue'
import BDropdownForm from '@/components/BDropdownForm.vue'
import BDropdownDivider from '@/components/BDropdownDivider.vue'
import BDropdownItemButton from '@/components/BDropdownItemButton.vue'
import BDropdownText from '@/components/BDropdownText.vue'

const meta = {
  title: 'Components/FormTags',
  component: BFormTags,
  parameters: {
    vitest: {
      testFile: 'form-tags.spec.ts',
      testResults: vitestResults,
    },
  },
  argTypes: {

  },
} satisfies Meta<typeof BFormTags>

export default meta
          type Story = StoryObj<typeof meta>

export const BasicUsage: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormTags },
    props: Object.keys(argTypes),
    template: `
  <div>
    <label for="tags-basic">Type a new tag and press enter</label>
    <b-form-tags input-id="tags-basic" v-model="value" />
    <p class="mt-2">Value: {{ value }}</p>
  </div>
`,

    data() {
      return {
        value: ['apple', 'orange'],
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

export const TagCreationUsingSeparators: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormTags },
    props: Object.keys(argTypes),
    template: `
  <div>
    <label for="tags-separators">Enter tags separated by space, comma or semicolon</label>
    <b-form-tags
      input-id="tags-separators"
      v-model="value"
      separator=" ,;"
      placeholder="Enter new tags separated by space, comma or semicolon"
      no-add-on-enter
     />
    <p class="mt-2">Value: {{ value }}</p>
  </div>
`,

    data() {
      return {
        value: ['one', 'two'],
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

export const LastTagRemovalViaBackspaceKeypress: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormTags, BFormText },
    props: Object.keys(argTypes),
    template: `
  <div>
    <label for="tags-remove-on-delete">Enter new tags separated by space</label>
    <b-form-tags
      input-id="tags-remove-on-delete"
      :input-attrs="{ 'aria-describedby': 'tags-remove-on-delete-help' }"
      v-model="value"
      separator=" "
      placeholder="Enter new tags separated by space"
      remove-on-delete
      no-add-on-enter
     />
    <b-form-text id="tags-remove-on-delete-help" class="mt-2">
      Press <kbd>Backspace</kbd> to remove the last tag entered
    </b-form-text>
    <p>Value: {{ value }}</p>
  </div>
`,

    data() {
      return {
        value: ['apple', 'orange', 'grape'],
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

export const StylingOptions: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormTags },
    props: Object.keys(argTypes),
    template: `
  <div>
    <label for="tags-pills">Enter tags</label>
    <b-form-tags
      input-id="tags-pills"
      v-model="value"
      tag-variant="primary"
      tag-pills
      size="lg"
      separator=" "
      placeholder="Enter new tags separated by space"
     />
    <p class="mt-2">Value: {{ value }}</p>
  </div>
`,

    data() {
      return {
        value: ['apple', 'orange', 'grape'],
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

export const TagValidation: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormGroup, BFormTags },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-group label="Tags validation example" label-for="tags-validation" :state="state">
      <b-form-tags
        input-id="tags-validation"
        v-model="tags"
        :input-attrs="{ 'aria-describedby': 'tags-validation-help' }"
        :tag-validator="tagValidator"
        :state="state"
        separator=" "
       />

      <template #invalid-feedback>
        You must provide at least 3 tags and no more than 8
        </template>

      <template #description>
        <div id="tags-validation-help">
         Tags must be 3 to 5 characters in length and all lower
         case. Enter tags separated by spaces or press enter.
        </div>
      </template>
    </b-form-group>
  </div>
      `,

    data() {
      return {
        tags: [],
        dirty: false,
      }
    },
    computed: {
      state() {
        // Overall component validation state
        return this.dirty ? (this.tags.length > 2 && this.tags.length < 9) : null
      },
    },
    watch: {
      tags() {
        // Set the dirty flag on first change to the tags array
        this.dirty = true
      },
    },
    methods: {
      tagValidator(tag: string) {
        // Individual tag validator function
        return tag === tag.toLowerCase() && tag.length > 2 && tag.length < 6
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

export const DetectingNewInvalidAndDuplicateTags: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormTags },
    props: Object.keys(argTypes),
    template: `
  <div>
    <label for="tags-state-event">Enter tags</label>
    <b-form-tags
      input-id="tags-state-event"
      v-model="tags"
      :tag-validator="validator"
      placeholder="Enter tags (3-5 characters) separated by space"
      separator=" "
      @tag-state="onTagState"
     />
    <p class="mt-2">Tags: {{ tags }}</p>
    <p>Event values:</p>
    <ul>
        <li>validTags: {{ validTags }}</li>
        <li>invalidTags: {{ invalidTags }}</li>
        <li>duplicateTags: {{ duplicateTags }}</li>
    </ul>
  </div>
`,

    data() {
      return {
        tags: [],
        validTags: [],
        invalidTags: [],
        duplicateTags: [],
      }
    },
    methods: {
      onTagState(valid: string[], invalid: string[], duplicate: string[]) {
        this.validTags = valid
        this.invalidTags = invalid
        this.duplicateTags = duplicate
      },
      validator(tag: string) {
        return tag.length > 2 && tag.length < 6
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

export const LimitingTags: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormTags },
    props: Object.keys(argTypes),
    template: `
  <div>
    <label for="tags-limit">Enter tags</label>
    <b-form-tags input-id="tags-limit" v-model="value" :limit="limit" remove-on-delete />
    <p class="mt-2">Value: {{ value }}</p>
  </div>
`,

    data() {
      return {
        value: [],
        limit: 5,
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

export const UsingNativeBrowserInputs: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormTags, BInputGroup, BInputGroupAppend, BButton, BCard },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-tags v-model="value" no-outer-focus class="mb-2">
      <template v-slot="{ tags, inputAttrs, inputHandlers, addTag, removeTag }">
        <b-input-group aria-controls="my-custom-tags-list">
          <input
            v-bind="inputAttrs"
            v-on="inputHandlers"
            placeholder="New tag - Press enter to add"
            class="form-control">
          <b-input-group-append>
            <b-button @click="addTag()" variant="primary">Add</b-button>
          </b-input-group-append>
        </b-input-group>
        <ul
          id="my-custom-tags-list"
          class="list-unstyled d-inline-flex flex-wrap mb-0"
          aria-live="polite"
          aria-atomic="false"
          aria-relevant="additions removals"
        >
          <!-- Always use the tag value as the :key, not the index! -->
          <!-- Otherwise screen readers will not read the tag
               additions and removals correctly -->
          <b-card
            v-for="tag in tags"
            :key="tag"
            :id="\`my-custom-tags-tag_\${tag.replace(/\s/g, '_')}_\`"
            tag="li"
            class="mt-1 mr-1"
            body-class="py-1 pr-2 text-nowrap"
          >
            <strong>{{ tag }}</strong>
            <b-button
              @click="removeTag(tag)"
              variant="link"
              size="sm"
              :aria-controls="\`my-custom-tags-tag_\${tag.replace(/\s/g, '_')}_\`"
            >remove</b-button>
          </b-card>
        </ul>
        </template>
    </b-form-tags>
  </div>
      `,

    data() {
      return {
        value: ['apple', 'orange', 'banana', 'pear', 'peach'],
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

export const UsingCustomFormComponents: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormTags, BInputGroup, BFormInput, BInputGroupAppend, BButton, BFormTag },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-tags v-model="value" no-outer-focus class="mb-2">
      <template v-slot="{ tags, inputAttrs, inputHandlers, tagVariant, addTag, removeTag }">
        <b-input-group class="mb-2">
          <b-form-input
            v-bind="inputAttrs"
            v-on="inputHandlers"
            placeholder="New tag - Press enter to add"
            class="form-control"
          ></b-form-input>
          <b-input-group-append>
            <b-button @click="addTag()" variant="primary">Add</b-button>
          </b-input-group-append>
        </b-input-group>
        <div class="d-inline-block" style="font-size: 1.5rem;">
          <b-form-tag
            v-for="tag in tags"
            @remove="removeTag(tag)"
            :key="tag"
            :title="tag"
            :variant="tagVariant"
            class="mr-1"
          >{{ tag }}</b-form-tag>
        </div>
      `,

    data() {
      return {
        value: ['apple', 'orange', 'banana'],
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

export const UsingCustomFormComponents1: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormGroup, BFormTags, BFormTag, BFormSelect },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-group label="Tagged input using select" label-for="tags-component-select">
      <!-- Prop \`add-on-change\` is needed to enable adding tags vie the \`change\` event -->
      <b-form-tags
        id="tags-component-select"
        v-model="value"
        size="lg"
        class="mb-2"
        add-on-change
        no-outer-focus
      >
        <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
          <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
            <li v-for="tag in tags" :key="tag" class="list-inline-item">
              <b-form-tag
                @remove="removeTag(tag)"
                :title="tag"
                :disabled="disabled"
                variant="info"
              >{{ tag }}</b-form-tag>
            </li>
          </ul>
          <b-form-select
            v-bind="inputAttrs"
            v-on="inputHandlers"
            :disabled="disabled || availableOptions.length === 0"
            :options="availableOptions"
          >
            <template #first>
              
              <option disabled value="">Choose a tag...</option>
              </template>
          </b-form-select>
        </template>
      </b-form-tags>
    </b-form-group>
  </div>
            `,

    data() {
      return {
        options: ['Apple', 'Orange', 'Banana', 'Lime', 'Peach', 'Chocolate', 'Strawberry'],
        value: [],
      }
    },
    computed: {
      availableOptions() {
        return this.options.filter((opt: string) => !this.value.includes(opt))
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

export const UsingCustomFormComponents2: Story = {
  render: (args, { argTypes }) => ({
    components: { },
    props: Object.keys(argTypes),
    template: `
<template #default="{ inputAttrs, inputHandlers, removeTag, tags }">
  <custom-input
    :id="inputAttrs.id"
    :vistom-value-prop="inputAttrs.value"
    @custom-input-event="inputHandlers.input($event)"
    @custom-change-event="inputHandlers.change($event)"
    @keydown.native="inputHandlers.keydown($event)"
  ></custom-input>
  <template v-for="tag in tags">
    
  </template>
</template>
`,

    setup() {
      return { args }
    },
    args: {
      show: true,
    },
  }),
}

export const AdvancedCustomRenderingUsage: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormCheckbox, BFormTags, BInputGroup, BFormInput, BInputGroupAppend, BButton, BFormInvalidFeedback, BFormText },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-checkbox switch size="lg" v-model="disabled">Disable</b-form-checkbox>
    <b-form-tags
      v-model="value"
      @input="resetInputValue()"
      tag-variant="success"
      class="mb-2 mt-2"
      :disabled="disabled"
      no-outer-focus
      placeholder="Enter a new tag value and click Add"
      :state="state"
    >
      <template v-slot="{tags, inputId, placeholder, disabled, addTag, removeTag }">
        <b-input-group>
          
          <b-form-input
            v-model="newTag"
            :id="inputId"
            :placeholder="placeholder"
            :disabled="disabled"
            :formatter="formatter"
          ></b-form-input>
          <b-input-group-append>
            <b-button @click="addTag(newTag)" :disabled="disabled" variant="primary">Add</b-button>
          </b-input-group-append>
        </b-input-group>
        <b-form-invalid-feedback :state="state">
          Duplicate tag value cannot be added again!
        </b-form-invalid-feedback>
        <ul v-if="tags.length > 0" class="mb-0">
          <li v-for="tag in tags" :key="tag" :title="\`Tag: ${tag}\`" class="mt-2">
            <span  class="d-flex align-items-center">
              <span class="mr-2">{{ tag }}</span>
              <b-button
                :disabled="disabled"
                size="sm"
                variant="outline-danger"
                @click="removeTag(tag)"
              >
                remove tag
              </b-button>
            </span>
          </li>
        </ul>
        <b-form-text v-else>
          There are no tags specified. Add a new tag above.
        </b-form-text>
        </template>
        </b-form-tags>
      `,

    data() {
      return {
        newTag: '',
        disabled: false,
        value: [],
      }
    },
    computed: {
      state() {
        // Return false (invalid) if new tag is a duplicate
        return this.value.includes(this.newTag.trim()) ? false : null
      },
    },
    methods: {
      resetInputValue() {
        this.newTag = ''
      },
      formatter(value: string) {
        return value.toUpperCase()
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

export const AdvancedCustomRenderingUsage1: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormGroup, BFormTags, BFormTag, BDropdown, BDropdownForm, BFormInput, BDropdownDivider, BDropdownItemButton, BDropdownText },
    props: Object.keys(argTypes),
    template: `
  <div>
    <b-form-group label="Tagged input using dropdown" label-for="tags-with-dropdown">
      <b-form-tags id="tags-with-dropdown" v-model="value" no-outer-focus class="mb-2">
        <template v-slot="{ tags, disabled, addTag, removeTag }">
          <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
            <li v-for="tag in tags" :key="tag" class="list-inline-item">
              <b-form-tag
                @remove="removeTag(tag)"
                :title="tag"
                :disabled="disabled"
                variant="info"
              >{{ tag }}</b-form-tag>
            </li>
          </ul>

          <b-dropdown size="sm" variant="outline-secondary" block menu-class="w-100">
            <template #button-content>
              <i class="w-6 w-6 i-carbon-tag tag-fill" /> Choose tags
              </template>
            <b-dropdown-form @submit.stop.prevent="() => {}">
              <b-form-group
                label="Search tags"
                label-for="tag-search-input"
                label-cols-md="auto"
                class="mb-0"
                label-size="sm"
                :description="searchDesc"
                :disabled="disabled"
              >
                <b-form-input
                  v-model="search"
                  id="tag-search-input"
                  type="search"
                  size="sm"
                  autocomplete="off"
                 ></b-form-input>
              </b-form-group>
            </b-dropdown-form>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item-button
              v-for="option in availableOptions"
              :key="option"
              @click="onOptionClick({ option, addTag })"
            >
              {{ option }}
            </b-dropdown-item-button>
            <b-dropdown-text v-if="availableOptions.length === 0">
              There are no tags available to select
            </b-dropdown-text>
          </b-dropdown>
        </template>
      </b-form-tags>
    </b-form-group>
  </div>
            `,

    data() {
      return {
        options: ['Apple', 'Orange', 'Banana', 'Lime', 'Peach', 'Chocolate', 'Strawberry'],
        search: '',
        value: [],
      }
    },
    computed: {
      criteria() {
        // Compute the search criteria
        return this.search.trim().toLowerCase()
      },
      availableOptions() {
        const criteria = this.criteria
        // Filter out already selected options
        const options = this.options.filter((opt: string) => !this.value.includes(opt))
        if (criteria) {
          // Show only options that match criteria
          return options.filter((opt: string) => opt.toLowerCase().includes(criteria))
        }
        // Show all options available
        return options
      },
      searchDesc() {
        if (this.criteria && this.availableOptions.length === 0)
          return 'There are no tags matching your search criteria'

        return ''
      },
    },
    methods: {
      onOptionClick({ option, addTag }) {
        addTag(option)
        this.search = ''
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

export const CreatingWrapperComponents: Story = {
  render: (args, { argTypes }) => ({
    components: { BFormTags },
    template: `
  <b-form-tags :value="value" @input="$emit('input', $event)">
    <template v-slot="{ tags, addTag, removeTag, inputAttrs, inputHandlers }">
    <!-- Place your custom rendering here -->
    </template>
  </b-form-tags>
    `,

    name: 'MyCustomTags',
    model: {
      prop: 'value',
      event: 'input',
    },
    props: {
      value: {
        type: Array,
        default: () => [],
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
