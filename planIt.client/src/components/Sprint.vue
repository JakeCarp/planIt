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
              <h5 class="p-1">
                {{ sprint.name }}
              </h5>
            </div>
          </div>
          <i
            v-if="sprint.isOpen"
            class="mdi mdi-account-group mdi-18px align-self-center"
            title="Total Goons Needed"
          >
            <span class="ms-2 codefont"> {{ countTotalWeight(tasks) }} </span>
          </i>

          <div class="d-flex">
            <div class="d-flex justify-content-center">
              <button
                class="codefont me-5 btn btn-outline-dark rounded-0"
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
                    placeholder=""
                    min="1"
                    max="50"
                    name="weight"
                    v-model="taskData.weight"
                  />
                  <i
                    class="mdi mdi-check colorcheck mdi-18px me-2 selectable1"
                    @click="createTask"
                  ></i>
                  <i
                    @click="addTaskBtn = !addTaskBtn"
                    class="mdi mdi-close mdi-18px selectable1 text-danger ms-1"
                  ></i>
                </form>
              </div>
            </div>
            <div class="d-flex align-items-center ms-5 pe-3">
              <p class="m-0 mb-1">
                Tasks Completed
                {{ tasks.filter((t) => t.isComplete).length }}/{{
                  tasks.length
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="tasks.length > 0"
        :id="'a' + sprint.id + 'a'"
        class="accordion collapse collapsestyle"
        aria-labelledby=""
        data-bs-parent="#accordionExample"
      >
        <div class="accordion-body bg-info scroll">
          <Task v-for="t in tasks" :key="t.id" :task="t" />
          <div class="text-end">
            <i
              v-if="sprint.creatorId === account.id"
              @click="removeSprint"
              class="
                mdi mdi-18px mdi-trash-can
                selectable1
                text-danger
                ms-1
                text-end
              "
            >
              Delete Scheme</i
            >
          </div>
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
import { sprintsService } from '../services/SprintsService'
import { Collapse, Dropdown } from 'bootstrap'

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
      account: computed(() => AppState.account),
      taskData,
      addTaskBtn,
      tasks: computed(() => AppState.tasks.filter(t => t.sprintId === props.sprint.id)),
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
      async moveTask() {
        try {
          logger.log('editing task')
        } catch (err) {
          logger.error(err)
          Pop.toast(err.message, 'error')
        }
      },
      countTotalWeight(tasks) {
        let total = 0
        tasks.forEach(t => {
          total += t.weight
        });
        return total
      },
      async removeSprint() {
        try {
          if (await Pop.confirm()) {
            await sprintsService.removeSprint(route.params.projectId, props.sprint.id)
            Pop.toast('Deleted Scheme')
          }
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
.scroll {
  height: auto;
  max-height: 28vh;
  overflow-y: scroll;
}
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