import type { Meta, StoryObj } from '@storybook/vue3'
import vitestResults from '@/tests/unit/results.json'
import BFormTags from '@/components/B/FormTags.vue'
import BFormText from '@/components/B/FormText.vue'
import BFormGroup from '@/components/B/FormGroup.vue'
import BInputGroup from '@/components/B/InputGroup.vue'
import BInputGroupAppend from '@/components/B/InputGroupAppend.vue'
import BButton from '@/components/B/Button.vue'
import BCard from '@/components/B/Card.vue'
import BFormInput from '@/components/B/FormInput.vue'
import BFormTag from '@/components/B/FormTag.vue'
import BFormSelect from '@/components/B/FormSelect.vue'
import BFormCheckbox from '@/components/B/FormCheckbox.vue'
import BFormInvalidFeedback from '@/components/B/FormInvalidFeedback.vue'
import BDropdown from '@/components/B/Dropdown.vue'
import BIcon from '@/components/B/Icon.vue'
import BDropdownForm from '@/components/B/DropdownForm.vue'
import BDropdownDivider from '@/components/B/DropdownDivider.vue'
import BDropdownItemButton from '@/components/B/DropdownItemButton.vue'
import BDropdownText from '@/components/B/DropdownText.vue'

const meta = {
  title: 'Components/FormTags',
  component: BFormTags,
  parameters: {
    vitest: {
      testFile: 'form-tags.test.tsx',
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
    <b-form-tags input-id="tags-basic" v-model="value"></b-form-tags>
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
    ></b-form-tags>
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
    ></b-form-tags>
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
    ></b-form-tags>
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
      ></b-form-tags>

      <template #invalid-feedback>
        You must provide at least 3 tags and no more than 8
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
      tags(newValue, oldValue) {
        // Set the dirty flag on first change to the tags array
        this.dirty = true
      },
    },
    methods: {
      tagValidator(tag) {
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
    ></b-form-tags>
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
      onTagState(valid, invalid, duplicate) {
        this.validTags = valid
        this.invalidTags = invalid
        this.duplicateTags = duplicate
      },
      validator(tag) {
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
    <b-form-tags input-id="tags-limit" v-model="value" :limit="limit" remove-on-delete></b-form-tags>
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
            :id="\`my-custom-tags-tag_${tag.replace(/\s/g, '_')}_\`"
            tag="li"
            class="mt-1 mr-1"
            body-class="py-1 pr-2 text-nowrap"
          >
            <strong>{{ tag }}</strong>
            <b-button
              @click="removeTag(tag)"
              variant="link"
              size="sm"
              :aria-controls="\`my-custom-tags-tag_${tag.replace(/\s/g, '_')}_\`"
            >remove</b-button>
          </b-card>
        </ul>
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
              <!-- This is required to prevent bugs with Safari -->
              <option disabled value="">Choose a tag...</option>
            `,

    data() {
      return {
        options: ['Apple', 'Orange', 'Banana', 'Lime', 'Peach', 'Chocolate', 'Strawberry'],
        value: [],
      }
    },
    computed: {
      availableOptions() {
        return this.options.filter(opt => !this.value.includes(opt))
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
    <!-- Your custom tag list here -->
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
          <!-- Always bind the id to the input so that it can be focused when needed -->
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
      formatter(value) {
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
    components: { BFormGroup, BFormTags, BFormTag, BDropdown, BIcon, BDropdownForm, BFormInput, BDropdownDivider, BDropdownItemButton, BDropdownText },
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
              <b-icon icon="tag-fill"></b-icon> Choose tags
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
        const options = this.options.filter(opt => !this.value.includes(opt))
        if (criteria) {
          // Show only options that match criteria
          return options.filter(opt => opt.toLowerCase().includes(criteria))
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
    props: Object.keys(argTypes),
    template: `
  <b-form-tags :value="value" @input="$emit('input', $event)">
    <template v-slot="{ tags, addTag, removeTag, inputAttrs, inputHandlers }">
     <!-- Place your custom rendering here -->
    `,

    name: 'MyCustomTags',
    components: { BFormTags },
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
