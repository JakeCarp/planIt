<template>
  <div class="projectsPage">
    <project :project="project" />
  </div>
</template>


<script>
import { computed, onMounted } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { useRoute } from "vue-router"
import { sprintsService } from "../services/SprintsService"
import { AppState } from "../AppState"
import { projectsService } from '../services/ProjectsService'
export default {
  setup() {
    const account = computed(() => AppState.account)
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
      project: computed(() => AppState.activeProject),
      sprints: computed(() => AppState.sprints)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>