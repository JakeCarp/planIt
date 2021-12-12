<template>
  <div
    class="
      home
      container-fluid
      d-flex
      justify-content-center
      align-items-center
    "
  >
    <div
      class="
        justify-content-center
        animate__animated animate__fadeIn
        backwhite
        border border-black
      "
    >
      <div class="col-12">
        <div class="row size justify-content-center align-items-center">
          <div class="col-8">
            <div class="d-flex justify-content-between">
              <div class="align-self-end">
                <p class="font m-0">Your Plots:</p>
              </div>
              <div class="align-self-end">
                <img
                  data-bs-toggle="modal"
                  data-bs-target="#aundefineda"
                  class="grow selectable1"
                  src="../assets/img/newplot.png"
                  height="130"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="col-8">
            <div class="col-12 d-flex justify-content-between">
              <div class="col-7">
                <h5 v-if="projects.length > 0" class="onlyfont mt-1 mb-0">
                  Name:
                </h5>
              </div>
              <div class="col-3"></div>
            </div>
            <div>
              <div v-if="projects.length > 0" class="scrollbar container">
                <div
                  class="d-flex align-items-center"
                  v-for="proj in projects"
                  :key="proj.id"
                >
                  <div
                    class="
                      scard
                      card
                      projstrip
                      grow2
                      mt-3
                      elevation-3
                      selectable1
                      border-0
                    "
                    @click="routeTo(proj.id)"
                  >
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <h4 class="p-2 m-0 ms-2 spacing">{{ proj.name }}</h4>
                    </div>
                  </div>
                  <i
                    @click="removeProject(proj.id)"
                    class="
                      ms-3
                      mt-3
                      mdi mdi-trash-can
                      text-white
                      selectable1
                      me-3
                      px-1
                      border border-0 border-dark
                      rounded
                      bg-secondary
                    "
                  ></i>
                </div>
              </div>
              <div v-else class="scrollbar container">
                <p class="pt-4 f-20 onlyfont text-center">
                  Add a new plot to start!
                </p>
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
          newProjectData = {}

        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      async removeProject(id) {
        try {
          if (await Pop.confirm()) {
            await projectsService.removeProject(id)
            Pop.toast('Project Removed', 'success')
          }
          router.push({ name: 'Home' })
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
.home {
  height: 89vh;
}
.backwhite {
  background-color: aliceblue;
  border-width: 5px !important;
  border-style: solid !important;
  border-color: black !important;
  width: 80%;
  height: 70vh;
}
.size {
  height: 70vh;
}
.scard {
  width: 100%;
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
  background-color: rgb(209, 207, 207);
  color: rgb(32, 32, 32);
  font-family: "Bangers", cursive;
  letter-spacing: 1.5px;
}
.onlyfont {
  font-family: "Bangers", cursive;
}
.spacing {
  letter-spacing: 1.7px !important;
}
.scrollbar {
  height: 28vh;
  overflow-y: scroll;
}
.scrollbar::-webkit-scrollbar {
  width: 7px;
}
.scrollbar::-webkit-scrollbar-track {
  background: #2e2e2ebd;
  width: 7px;
  border-radius: 7px;
}
.scrollbar::-webkit-scrollbar-thumb {
  background-color: #adadad;
  border-radius: 7px;
}
// @media only screen and (max-width: 1600px) {
//   .backwhite {
//     background-image: url("../assets/img/ExtraLarge.png");
//     background-size: fill;
//     background-repeat: no-repeat;
//     background-position: 100%;
//   }
// }
</style>
