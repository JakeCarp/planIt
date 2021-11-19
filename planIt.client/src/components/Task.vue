<template>
  <div class="task row mb-3">
    <div class="is-complete me-3">
      <input type="checkbox" v-model="task.isComplete" @change="toggleTask" />
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
    <div class="col-3 d-flex">
      <div v-if="task.creatorId === account.id" class="dropdown d-flex">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        ></button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li
            @click="moveTask(s.id)"
            v-for="s in sprints"
            :key="s.id"
            :class="
              task.sprintId === s.id
                ? 'visually-hidden dropdown-item'
                : 'dropdown-item'
            "
          >
            <p class="m-0 text-center">{{ s.name.toUpperCase() }}</p>
          </li>
        </ul>
      </div>
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
import Pop from '../utils/Pop'
import { tasksService } from '../services/TasksService'
import { useRoute } from 'vue-router'
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    return {
      route,
      sprints: computed(() => AppState.sprints),
      notes: computed(() => AppState.notes.filter(n => n.taskId === props.task.id)),
      account: computed(() => AppState.account),
      async toggleTask() {
        try {
          await tasksService.editTask(props.task, route.params.projectId, props.task.id)
        } catch (error) {
          logger.log(error)
          Pop.toast(error.message, 'error')
        }
      },
      async moveTask(sprintId) {
        try {
          await tasksService.editTask({ sprintId: sprintId }, route.params.projectId, props.task.id)
          Pop.toast('Task Moved', 'success')
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.is-complete {
  width: 1em;
}
</style>