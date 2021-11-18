<template>
  <div class="home container-fluid">
    <div
      class="
        justify-content-center
        animate__animated animate__zoomInLeft
        backwhite
        size
        container-fluid
      "
    >
      <div class="col-12">
        <div class="row justify-content-center">
          <div class="col-7">
            <div class="d-flex topsize justify-content-between">
              <div class="align-self-end">
                <p class="font m-0">Your Plots:</p>
              </div>
              <div class="align-self-end">
                <img
                  data-bs-toggle="modal"
                  data-bs-target="#projModal"
                  class="grow selectable1"
                  src="../assets/img/newplot.png"
                  height="130"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="col-7">
            <div class="col-12 d-flex justify-content-between">
              <div class="col-7">
                <h5 class="onlyfont mt-1 mb-0">Name:</h5>
              </div>
              <div class="col-3">
                <h5 class="onlyfont mb-0">Started:</h5>
              </div>
            </div>
            <div>
              <div class="scroll container">
                <div
                  class="
                    card
                    projstrip
                    grow2
                    mt-3
                    elevation-3
                    selectable1
                    border-0
                  "
                  v-for="proj in projects"
                  :key="proj.id"
                  @click="routeTo(proj.id)"
                >
                  <h4 class="p-2 m-0 ms-2 spacing">{{ proj.name }}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from "@vue/reactivity"
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { projectsService } from "../services/ProjectsService"
import { useRouter } from "vue-router"
import { onMounted } from "@vue/runtime-core"
export default {
  setup() {
    const newProjectData = ref({})
    const router = useRouter()
    return {
      router,
      newProjectData,
      projects: computed(() => AppState.projects),
      routeTo(id) {
        logger.log(id)
        router.push({ name: 'Project', params: { projectId: id } })
      },
      async createProject() {
        try {
          await projectsService.createProject(newProjectData.value)
          Pop.toast('Project Created', 'success')

        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }

  }
}
</script>

<style scoped lang="scss">
.backwhite {
  background-image: url("../assets/img/Large.png");
  background-size: fill;
  background-repeat: no-repeat;
  background-position: 100%;
}
.size {
  height: 89vh;
}
.topsize {
  height: 30vh;
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
.grow2 {
  transition: all 0.2s ease-in-out;
}
.grow2:hover {
  transform: scale(1.02);
}
.projstrip {
  background-color: rgb(148, 148, 148);
  color: rgb(255, 255, 255);
  font-family: "Bangers", cursive;
  letter-spacing: 1.5px;
}
.onlyfont {
  font-family: "Bangers", cursive;
}
.spacing {
  letter-spacing: 1.7px !important;
}
.scroll {
  height: 28vh;
  overflow-y: scroll;
}
@media only screen and (max-width: 1150px) {
  .backwhite {
    background-image: url("../assets/img/Small.png") !important;
    background-size: fill;
    background-repeat: no-repeat;
    background-position: 100%;
  }
}
@media only screen and (max-width: 1427px) {
  .backwhite {
    background-image: url("../assets/img/Medium.png");
    background-size: fill;
    background-repeat: no-repeat;
    background-position: 100%;
  }
  @media only screen and (max-width: 1600px) {
    .backwhite {
      background-image: url("../assets/img/ExtraLarge.png");
      background-size: fill;
      background-repeat: no-repeat;
      background-position: 100%;
    }
  }
}
</style>
