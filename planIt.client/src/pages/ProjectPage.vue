<template>
  <div class="projectsPage container-fluid bg-img">
    <div class="row justify-content-center flex">
      <div class="col-md-11 align-self-center">
        <div class="row">
          <div
            class="
              card
              spec
              border-5
              p-4
              size
              animate__animated animate__fadeIn
            "
          >
            <img
              class="hahaha"
              height="340"
              src="../assets/img/-11599422086x4tmudffg5-removebg-preview.png"
              alt=""
            />
            <div class="d-flex mobilecolumn mx-5 justify-content-center">
              <div>
                <project :project="project" />
              </div>
              <div class="wid disapearmobile"></div>
              <div class="align-self-center margmobile me-5">
                <img
                  @click="addSprintBtn = !addSprintBtn"
                  v-if="addSprintBtn === true"
                  class="grow"
                  src="../assets/img/scheme.png"
                  height="140"
                  alt=""
                />
                <div v-else class="d-flex">
                  <form>
                    <label class="codefont me-1">Name:</label>
                    <input
                      class="codefont"
                      type="text"
                      placeholder="...scheme name"
                      name="title"
                      v-model="sprintName.name"
                    />
                    <div class="div">
                      <i
                        class="mdi mdi-check colorcheck mdi-24px selectable"
                        @click="createSprint"
                      ></i>
                      <i
                        @click="addSprintBtn = !addSprintBtn"
                        class="
                          mdi mdi-24px mdi-close
                          selectable1
                          text-danger
                          ms-1
                        "
                      ></i>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div>
              <div class="accordion" id="accordionExample"></div>
            </div>
            <div
              class="
                mt-4
                scroll
                sizescheme
                d-flex
                flex-column
                align-self-center align-items-center
              "
            >
              <div class="align-self-center sprints" v-if="sprints.length > 0">
                <Sprint
                  v-for="(s, index) in sprints"
                  :key="s.id"
                  :sprint="s"
                  :index="index"
                />
              </div>
              <h3 class="codefont" v-else>Please Add A Scheme</h3>
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
import { notesService } from '../services/NotesService'
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
        await notesService.getAll(route.params.projectId)
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
          Pop.toast('Scheme Plotted', 'success')
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
.sizescheme {
  width: 85%;
}
.hahaha {
  position: absolute;
  z-index: -1;
  bottom: 5px;
  opacity: 0.8;
  left: 0;
}
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
  width: 30%;
}

.codefont {
  font-family: "Fira Code", monospace;
}
.colorcheck {
  color: #00943e;
}
.scroll {
  height: 60vh;
  overflow-y: scroll;
}
.scroll::-webkit-scrollbar {
  width: 0em;
}

.scroll::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

.scroll::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid slategrey;
}
.sprints {
  width: 100%;
}
@media only screen and (max-width: 500px) {
  .justi {
    justify-content: center;
    flex-direction: column;
  }
  .mobilecolumn {
    flex-direction: column;
  }
  .margmobile {
    margin: 0;
    justify-content: center;
  }
  .disapearmobile {
    display: none;
  }
  .margproj {
    margin-left: 0;
  }
}
</style>