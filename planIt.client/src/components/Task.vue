<template>
  <div class="task row mb-3">
    <div class="is-complete me-3">
      <input type="checkbox" v-model="task.isComplete" />
    </div>
    <div
      data-bs-toggle="offcanvas"
      :data-bs-target="'#a' + task.id + 'a'"
      aria-controls="offcanvasRight"
      class="col-4 border border-dark border-3 selectable"
    >
      <p class="m-0">
        {{ task.name.toUpperCase() }}
      </p>
    </div>
    <div class="col-12 d-flex ps-5">
      <span>{{ task.weight }} <i class="mdi mdi-account-group pe-3"></i></span>
      <span>{{ notes.length }} <i class="mdi mdi-chat"></i></span>
    </div>
  </div>
  <taskOffCanvas :task="task" :notes="notes" />
</template>


<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
import { momentService } from '../services/MomentService'
import { logger } from '../utils/Logger'
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      notes: computed(() => AppState.notes.filter(n => n.taskId === props.task.id))
    }
  }
}
</script>


<style lang="scss" scoped>
.is-complete {
  width: 1em;
}
</style>