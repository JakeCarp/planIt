<template>
  <div class="sprints">
    <div class="accordion-item collapsestyle">
      <div class="accordion-header collapsestyle d-flex">
        <div class="wid d-flex justify-content-between align-items-center">
          <div
            class="d-flex align-item-center selectable1"
            data-bs-toggle="collapse"
            :data-bs-target="'#a' + sprint.id + 'a'"
            aria-expanded="false"
            aria-controls="collapseOne"
          >
            <div class="codefont mx-3 mt-1 d-flex align-items-center">
              <h5>
                {{ sprint.name.toUpperCase() }}
              </h5>
            </div>
            <i
              v-if="sprint.isOpen"
              class="mdi mdi-cookie align-self-center"
            ></i>
          </div>

          <div class="d-flex">
            <div class="d-flex justify-content-center">
              <button
                class="codefont me-5"
                @click="addTaskBtn = !addTaskBtn"
                v-if="addTaskBtn === true"
              >
                add task
              </button>
              <div v-else class="d-flex me-5">
                <form>
                  <label class="codefont me-1">Name:</label>
                  <input
                    class="codefont me-3 mt-1"
                    type="text"
                    placeholder="...task name"
                    required
                    name="title"
                    v-model="taskData.name"
                  />
                  <label class="codefont me-1 ms-1">Goons:</label>
                  <input
                    class="codefont weightsize me-1"
                    type="number"
                    required
                    placeholder="1"
                    min="1"
                    max="50"
                    name="weight"
                    v-model="taskData.weight"
                  />
                  <i
                    class="mdi mdi-check colorcheck mdi-18px me-2"
                    @click="createTask"
                  ></i>
                  <i
                    @click="addTaskBtn = !addTaskBtn"
                    class="mdi mdi-close mdi-18px selectable1 text-danger ms-1"
                  ></i>
                </form>
              </div>
            </div>
            <div class="d-flex">
              <p>{{ tasks.filter((t) => t.isComplete) }}/{{ tasks.length }}</p>
              <i
                @click="removeSprint"
                class="mdi mdi-close selectable1 text-danger ms-1"
              ></i>
            </div>
          </div>
        </div>
      </div>
      <div
        :id="'a' + sprint.id + 'a'"
        :class="
          index === 0
            ? 'accordion collapsestyle'
            : 'accordion collapse collapsestyle'
        "
        aria-labelledby=""
        data-bs-parent="#accordionExample"
      >
        <div class="accordion-body bg-info">
          <Task v-for="t in tasks" :key="t.id" :task="t" />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, ref } from '@vue/reactivity'
import { tasksService } from '../services/TasksService'
import Pop from '../utils/Pop'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'

export default {
  props: {
    sprint: { type: Object, required: true },
    index: { type: Number, required: true }
  },
  setup(props) {
    const route = useRoute()
    const taskData = ref({})
    let addTaskBtn = ref(true)
    logger.log(taskData)
    return {
      addTaskBtn,
      tasks: computed(() => AppState.tasks.filter(t => t.sprintId === props.sprint.id)),
      taskData,
      async createTask() {
        try {
          addTaskBtn.value = true;
          logger.log(taskData.value)
          taskData.value.sprintId = props.sprint.id
          await tasksService.createTask(route.params.projectId, taskData.value)
          taskData.value = {}
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      async removeSprint() {

      }
    }
  }
}
</script>


<style lang="scss" scoped>
.accordion-button {
  width: 1em;
}
.wid {
  width: 100%;
}
.middle {
  margin-right: 50%;
}
.codefont {
  font-family: "Fira Code", monospace;
}
.colorcheck {
  color: #00943e;
}
.weightsize {
  width: 5vh;
}
.collapsestyle {
  border-width: 3px !important;
  border-color: #00943e !important;
  border-radius: 0;
  background: #e4e4e4;
}
</style>