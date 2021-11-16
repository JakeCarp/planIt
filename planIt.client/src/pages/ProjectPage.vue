<template>
  <div class="projectsPage container-fluid bg-img">
    <div class="card">
      <project :project="project" />
      <form @submit.prevent="createSprint">
        <input
          type="text"
          placeholder="...add a phase"
          name="title"
          v-model="sprintName.name"
        />
        <button type="submit">+</button>
      </form>
      <div>
        <Sprint v-for="s in sprints" :key="s.id" :sprint="s" />
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
export default {
  setup() {
    const sprintName = ref({})
    const route = useRoute()
    onMounted(async () => {
      try {
        await projectsService.getById(route.params.projectId)
        await sprintsService.getAll(route.params.projectId)
      }
      catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      sprintName,
      project: computed(() => AppState.activeProject),
      sprints: computed(() => AppState.sprints),
      async createSprint() {
        try {
          await sprintsService.createSprint(route.params.projectId, sprintName.value)
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
.bg-img {
  background-color: green;
  height: 100vh;
}
</style>