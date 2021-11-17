<template>
  <div class="home container-fluid">
    <div class="row justify-content-center">
      <div class="col-12 backwhite size">
        <div class="row justify-content-center">
          <div class="col-7">
            <div class="d-flex topsize justify-content-between">
              <div class="align-self-end">
                <p class="font m-0">Your Plots:</p>
              </div>
              <div class="align-self-end">
                <a
                  class="selectable1"
                  data-bs-toggle="modal"
                  data-bs-target="#projModal"
                >
                  <img
                    class="grow"
                    src="../assets/img/newplot.png"
                    height="130"
                    alt=""
                /></a>
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
              <div
                class="
                  card
                  projstrip
                  mt-3
                  grow2
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
  <ProjectFormModal />
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
}
</style>
