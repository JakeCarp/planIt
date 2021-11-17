<template>
  <div class="projectsPage container-fluid bg-img">
    <div class="row justify-content-center flex">
      <div class="col-11 align-self-center">
        <div class="row">
          <div class="card spec border-5 p-4 size">
            <div class="d-flex m-5">
              <div class="margproj">
                <project :project="project" />
              </div>
              <div class="wid"></div>
              <div class="align-self-center">
                <a
                  @click="addSprintBtn = !addSprintBtn"
                  v-if="addSprintBtn === true"
                >
                  <img
                    class="grow"
                    src="../assets/img/scheme.png"
                    height="120"
                    alt=""
                /></a>
                <div v-else class="d-flex">
                  <form @submit.prevent="createSprint">
                    <label class="codefont me-1">Name:</label>
                    <input
                      class="codefont"
                      type="text"
                      placeholder="...scheme name"
                      name="title"
                      v-model="sprintName.name"
                    />
                    <a
                      class="mdi mdi-check colorcheck mdi-18px"
                      type="submit"
                    ></a>
                  </form>
                  <i
                    @click="addSprintBtn = !addSprintBtn"
                    class="mdi mdi-close selectable1 text-danger ms-1"
                  ></i>
                </div>
              </div>
            </div>
            <div>
              <div class="accordion" id="accordionExample"></div>
            </div>
            <div>
              <Sprint v-for="s in sprints" :key="s.id" :sprint="s" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, onMounted, ref } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { useRoute } from "vue-router"
import { sprintsService } from "../services/SprintsService"
import { AppState } from "../AppState"
import { projectsService } from '../services/ProjectsService'
import { tasksService } from '../services/TasksService'
export default {
  setup() {
    const sprintName = ref({})
    const route = useRoute()
    let addSprintBtn = ref(true)
    onMounted(async () => {
      try {
        await projectsService.getById(route.params.projectId)
        await sprintsService.getAll(route.params.projectId)
        await tasksService.getAll(route.params.projectId)
      }
      catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      addSprintBtn,
      sprintName,
      project: computed(() => AppState.activeProject),
      sprints: computed(() => AppState.sprints),
      tasks: computed(() => AppState.tasks),
      async createSprint() {
        try {
          addSprintBtn.value = true;
          await sprintsService.createSprint(route.params.projectId, sprintName.value)
          sprintName.value = {}
          Pop.toast('Phase Created', 'success')
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
.flex {
  height: 89vh;
}
.size {
  height: 80vh;
}
.spec {
  border-radius: 0;
  background-color: #fffdf4;
  border-color: #131313;
}
.onlyfont {
  font-family: "Bangers", cursive;
}
.font {
  font-family: "Bangers", cursive;
  font-size: 7vh !important;
}
.grow {
  transition: all 0.2s ease-in-out;
}
.grow:hover {
  transform: scale(1.3);
}
.wid {
  width: 40%;
}
.margproj {
  margin-left: 10%;
}
.codefont {
  font-family: "Fira Code", monospace;
}
.colorcheck {
  color: #00943e;
}
</style>