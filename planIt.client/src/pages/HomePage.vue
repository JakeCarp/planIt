<template>
  <div class="home container-fluid">
    <div class="row justify-content-center">
      <div class="col-12 backwhite size">
        <div class="">
          <div class="card m-4">
            <div>
              <div
                v-for="proj in projects"
                :key="proj.id"
                @click="routeTo(proj.id)"
              >
                {{ proj.name }}
              </div>
              <div>
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#projModal"
                  class="btn btn-dark"
                >
                  Plot a Scheme
                </button>
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
</style>
