<template>
  <div class="home container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card m-4">
          <h1>TESTS CREATE PROJECT:</h1>
          <form @submit.prevent="createProject">
            <p class="m-0">Name:</p>
            <input v-model="newProjectData.name" class="m-2" type="text" />
            <p class="m-0">Description:</p>
            <input
              v-model="newProjectData.description"
              class="m-2"
              type="text"
            />
            <div>
              <button class="btn btn-success">CREATE PROJECT</button>
            </div>
          </form>
        </div>
        <div>
          <div>
            <button @click="getAll" class="btn btn-success ms-5 mb-3">
              GET ALL PROJECTS
            </button>
          </div>
          <div
            v-for="proj in projects"
            :key="proj.id"
            @click="routeTo(proj.id)"
          >
            {{ proj.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity"
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { projectsService } from "../services/ProjectsService"
import { useRouter } from "vue-router"
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
        router.push({ name: 'Project', params: { id: id } })
      },
      async createProject() {
        try {
          await projectsService.createProject(newProjectData.value)
          Pop.toast('Project Created', 'success')

        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      async getAll() {
        try {
          await projectsService.getAll()
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
</style>
