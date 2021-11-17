<template>
  <div class="sprints">
    <div class="accordion-item collapsestyle">
      <div class="d-flex justify-content-start">
        <button
          class="accordion-button collapsed collapsestyle"
          type="button"
          data-bs-toggle="collapse"
          :data-bs-target="'#a' + sprint.id + 'a'"
          aria-expanded="false"
          aria-controls="collapseOne"
        ></button>
      </div>
      <h2 class="accordion-header collapsestyle">
        <div class="wid d-flex justify-content-between">
          <div class="codefont">
            {{ sprint.name }}
            <i v-if="sprint.isOpen" class="mdi mdi-cookie"></i>
          </div>

          <div class="d-flex me-2">
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
                    class="codefont"
                    type="text"
                    placeholder="...task name"
                    required
                    name="title"
                    v-model="taskData.name"
                  />
                  <label class="codefont me-1 ms-1">Goons:</label>
                  <input
                    class="codefont weightsize"
                    type="number"
                    required
                    placeholder="1"
                    min="1"
                    max="50"
                    name="weight"
                    v-model="taskData.weight"
                  />
                  <i
                    class="mdi mdi-check colorcheck mdi-18px"
                    @click="createTask"
                  ></i>
                </form>
                <i
                  @click="addTaskBtn = !addTaskBtn"
                  class="mdi mdi-close selectable1 text-danger ms-1"
                ></i>
              </div>
            </div>
            <div class="d-flex">
              <p>ADD TESK COUNT HERE</p>
              <i
                @click="removeSprint"
                class="mdi mdi-close selectable1 text-danger ms-1"
              ></i>
            </div>
          </div>
        </div>
      </h2>
      <div
        :id="'a' + sprint.id + 'a'"
        class="accordion collapse collapsestyle"
        aria-labelledby=""
        data-bs-parent="#accordionExample"
      >
        <div class="accordion-body collapsestyle">
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
    sprint: { type: Object, required: true }
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