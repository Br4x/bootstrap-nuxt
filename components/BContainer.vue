<script lang="ts">
import { type SlotsType } from 'vue'
import type { Position } from '@vueuse/core'
import type { ToastInstance } from './BToast/plugin'
import { useToast } from './BToast/plugin'
import BToaster from './BToaster.vue'
import type { Breakpoint } from '~/types/Breakpoint'

export default defineComponent({
  slots: Object as SlotsType<{
    default?: Record<string, never>
  }>,
  props: {
    gutterX: { type: String, default: null },
    gutterY: { type: String, default: null },
    fluid: { type: [Boolean, String] as PropType<boolean | Breakpoint>, default: false },
    toast: { type: Object, default: undefined },
    position: { type: String as unknown as PropType<Position>, default: undefined },
  },
  setup(props, { slots, expose }) {
    const container = ref()
    let toastInstance: ToastInstance | undefined

    const classes = computed(() => ({
      'container': !props.fluid,
      'container-fluid': typeof props.fluid === 'boolean' && props.fluid,
      [`container-${props.fluid}`]: typeof props.fluid === 'string',
      [`gx-${props.gutterX}`]: props.gutterX !== null,
      [`gy-${props.gutterY}`]: props.gutterY !== null,
    }))

    onMounted(() => {
      if (props.toast) {
        // toastInstance.setVmContainer(container)
      }
    })

    // let this be the container for the toast
    if (props.toast) {
      toastInstance = useToast({ container, root: props.toast.root })
      expose({
        // ...toastInstance?.useMethods,
      })
    }

    return () => {
      const subContainers: VNode[] = []

      toastInstance?.containerPositions.value.forEach((position) => {
        subContainers.push(h(BToaster, { key: position, instance: toastInstance, position }))
      })

      return h('div', { class: [classes.value, props.position], ref: container }, [
        ...subContainers,
        slots.default?.(),
      ])
    }
  },
  methods: {},
})
</script>

<style lang="scss">
.container,
.container-fluid {
  display: block;
}

.container,
.container-fluid,
.container-lg,
.container-md,
.container-sm,
.container-xl,
.container-xxl {
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  width: 100%;
  padding-right: calc(var(--bs-gutter-x) * .5);
  padding-left: calc(var(--bs-gutter-x) * .5);
  margin-right: auto;
  margin-left: auto
}

@media (min-width:576px) {

  .container,
  .container-sm {
    max-width: 540px
  }
}

@media (min-width:768px) {

  .container,
  .container-md,
  .container-sm {
    max-width: 720px
  }
}

@media (min-width:992px) {

  .container,
  .container-lg,
  .container-md,
  .container-sm {
    max-width: 960px
  }
}

@media (min-width:1200px) {

  .container,
  .container-lg,
  .container-md,
  .container-sm,
  .container-xl {
    max-width: 1140px
  }
}

@media (min-width:1400px) {

  .container,
  .container-lg,
  .container-md,
  .container-sm,
  .container-xl,
  .container-xxl {
    max-width: 1320px
  }
}
</style>
