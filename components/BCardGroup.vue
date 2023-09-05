<script setup lang="ts">
withDefaults(
  defineProps<{
    columns?: boolean
    deck?: boolean
    tag?: string
  }>(),
  {
    columns: false,
    deck: false,
    tag: 'div',
  },
)
</script>

<template>
  <component :is="tag" :class="deck ? 'card-deck' : columns ? 'card-columns' : 'card-group'">
    <slot />
  </component>
</template>

<style type="scss">
.card-group>.card {
  margin-bottom: 0.75rem
}

@media (min-width:576px) {
  .card-group {
    display: flex;
    flex-flow: row wrap
  }

  .card-group>.card {
    flex: 1 0 0%;
    margin-bottom: 0
  }

  .card-group>.card+.card {
    margin-left: 0;
    border-left: 0
  }

  .card-group>.card:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0
  }

  .card-group>.card:not(:last-child) .card-header,
  .card-group>.card:not(:last-child) .card-img-top {
    border-top-right-radius: 0
  }

  .card-group>.card:not(:last-child) .card-footer,
  .card-group>.card:not(:last-child) .card-img-bottom {
    border-bottom-right-radius: 0
  }

  .card-group>.card:not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0
  }

  .card-group>.card:not(:first-child) .card-header,
  .card-group>.card:not(:first-child) .card-img-top {
    border-top-left-radius: 0
  }

  .card-group>.card:not(:first-child) .card-footer,
  .card-group>.card:not(:first-child) .card-img-bottom {
    border-bottom-left-radius: 0
  }
}
</style>
