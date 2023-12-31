<script setup lang="ts">
import type { Size } from '~/types/Size'

withDefaults(
  defineProps<{
    append?: string
    appendHtml?: string
    id?: string
    prepend?: string
    prependHtml?: string
    size?: Size
    tag?: string
  }>(),
  {
    append: undefined,
    appendHtml: undefined,
    id: undefined,
    prepend: undefined,
    prependHtml: undefined,
    size: 'md',
    tag: 'div',
  },
)
</script>

<template>
  <component
    :is="tag" :id="id" class="input-group" :class="{
      [`input-group-${size}`]: size !== 'md',
    }" role="group"
  >
    <slot name="prepend">
      <span v-if="!!prepend || !!prependHtml" class="input-group-text">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span v-if="!!prependHtml" v-html="prependHtml" />
        <span v-else>{{ prepend }}</span>
      </span>
    </slot>
    <slot />
    <slot name="append">
      <span v-if="!!append || !!appendHtml" class="input-group-text">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span v-if="!!appendHtml" v-html="appendHtml" />
        <span v-else>{{ append }}</span>
      </span>
    </slot>
  </component>
</template>

<style lang="scss" scoped>
$border-radius-lg: 0.3rem !default;
$border-radius-sm: 0.2rem !default;
$font-size-base: 1rem !default;

$font-size-sm: $font-size-base * 0.875 !default;
$font-size-lg: $font-size-base * 1.25 !default;

$input-padding-x-sm: 0.5rem !default;
$input-padding-x-lg: 1rem !default;
$input-padding-y-sm: 0.25rem !default;
$input-padding-y-lg: 0.5rem !default;

$bv-input-group-dropdown-patched: false !default;

.input-group
  > .form-floating:not(:first-child)
  > :not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(
    .invalid-feedback
  ) {
  margin-left: 0px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.input-group:not(.has-validation)
  > .form-floating:not(:last-child)
  > :not(.dropdown-toggle):not(.dropdown-menu) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

// Make sure to include these style definitions only once
@if $bv-input-group-dropdown-patched==false {
  $bv-input-group-dropdown-patched: true;

  // Workaround for https://github.com/bootstrap-vue/bootstrap-vue/issues/1560
  // Workaround for https://github.com/bootstrap-vue/bootstrap-vue/issues/2114 */
  // Based on: `~bootstrap/scss/_input-group.scss`
  .input-group {
    > .input-group-prepend > .btn-group,
    > .input-group-append:not(:last-child) > .btn-group,
    > .input-group-append:last-child > .btn-group:not(:last-child):not(.dropdown-toggle) {
      > .btn {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }

    > .input-group-append > .btn-group,
    > .input-group-prepend:not(:first-child) > .btn-group,
    > .input-group-prepend:first-child > .btn-group:not(:first-child) {
      > .btn {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
  }
}

.input-group-lg .input-group-append > .form-control,
.input-group-lg .input-group-append > .form-select,
.input-group-lg .input-group-append > .input-group-text,
.input-group-lg .input-group-append > .btn,
.input-group-lg .input-group-prepend > .form-control,
.input-group-lg .input-group-prepend > .form-select,
.input-group-lg .input-group-prepend > .input-group-text,
.input-group-lg .input-group-prepend > .btn {
  padding: $input-padding-y-lg $input-padding-x-lg;
  font-size: $font-size-lg;
  border-radius: $border-radius-lg;
}

.input-group-sm .input-group-append > .form-control,
.input-group-sm .input-group-append > .form-select,
.input-group-sm .input-group-append > .input-group-text,
.input-group-sm .input-group-append > .btn,
.input-group-sm .input-group-prepend > .form-control,
.input-group-sm .input-group-prepend > .form-select,
.input-group-sm .input-group-prepend > .input-group-text,
.input-group-sm .input-group-prepend > .btn {
  padding: $input-padding-y-sm $input-padding-x-sm;
  font-size: $font-size-sm;
  border-radius: $border-radius-sm;
}

.input-group {
  .btn-group:not(:last-child) > :not(:first-child) {
    border-start-end-radius: 0px;
    border-end-end-radius: 0px;
  }
  .btn-group:not(:last-child) > :not(:last-child) {
    border-start-start-radius: 0px;
    border-end-start-radius: 0px;
  }
  .btn-group:not(:last-child) > :not(:last-child) {
    border-start-end-radius: 0px;
    border-end-end-radius: 0px;
  }
  .btn-group:not(:first-child) > :not(:last-child) {
    border-end-start-radius: 0px;
    border-start-start-radius: 0px;
  }
}
</style>
